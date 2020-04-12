<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-07
 * Time: 03:11
 */

namespace app\app\controller;


use app\api\controller\Wechat;
use app\app\model\EvaluateModel;
use app\app\model\GoodsModel;
use app\app\model\OrderModel;
use app\app\model\ShopModel;
use app\app\model\UserModel;
use app\common\model\CommissionModel;
use app\common\model\ConfigModel;
use app\common\model\OrderGoodsModel;
use app\common\model\ShopMoneyLogModel;

class Order extends Base
{
    public function GetDataByInfo()
    {
        $data = input('param.');
        $res = OrderModel::with(['goods'])->where('id', $data['id'])->find();
        ajax_return_ok($res);
    }

    /**
     * 根据用户信息获取所需订单
     */
    public function GetUserIdByList()
    {
        $data = input('param.');
        $where = [];
        if (!empty($data['status'])) {
            if ($data['status'] !== 'undefined') {
                $where[] = ['status', 'eq', $data['status']];
            }
        }
        $res = OrderModel::with(['goods'])
            ->order('id desc')
            ->where($where)->paginate($data['limit'], false, ['query' => $data['page']]);
        ajax_return_ok($res);
    }

    public function PostDataByUpdate()
    {
        $data = input('param.');
        $where = [];
        $order = [];
        $getorder = OrderModel::where('id', $data['id'])->find();
        $getuser = UserModel::where('id', $getorder['shop_id'])->find();
        if (!empty($data['id'])) {
            $where[] = ['id', 'eq', $data['id']];
            $order['status'] = $data['status'];
            if ($data['status'] === 2) {
                $order['out_trade_no'] = $data['out_trade_no'];
            }
        }
        if (!empty($getorder['shop_id'])) {
            dump(1,$data['status']);
            if ($data['status'] === 2) {
                //发通知给卖家
                $semd = [
                    'template_id' => 'gHQSOcCng-4XY0DlM2b7dZlifhDeu24qoKiAcfbFa5s', // 所需下发的订阅模板id
                    'touser' => $getuser['openid'],     // 接收者（用户）的 openid
                    'page' => '/pages/member/shop/orderinfo/orderinfo?id=' . $data['id'],       // 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
                    'data' => [         // 模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }
                        'character_string1' => [
                            'value' => $getorder['order_no'],
                        ],
                        'amount3' => [
                            'value' => $getorder['totalPrice'],
                        ],
                        'date4' => [
                            'value' => date('yy-m-d', time()),
                        ],
                        'name5' => [
                            'value' => $getorder['buyerName'],
                        ],
                        'thing6' => [
                            'value' => $getorder['addressText'],
                        ],
                    ],
                ];
                $we = new Wechat();
                $semd = $we->SendMessage($semd);
                dump($semd);
            }
        }
        $order['paymentTime'] = time();
        OrderModel::where($where)->data($order)->update();
        ajax_return_ok($data['id']);
    }

    public function PostdataByStatus()
    {
        $data = input('param.');
        $res = GoodsModel::where('id', 'in', $data['in_id'])->data(['status' => 1])->update();

        ajax_return_ok($res);
    }

    public function GetShopOrderByUpdate()
    {
        $data = input('param.');
        $res = OrderModel::where('id', $data['id'])->data(['status' => $data['status']])->update();
        $order = OrderModel::where('id', $data['id'])->find();
        if ((int)$data['status'] === 4) {
            OrderModel::where('id', $data['id'])->data(['receiveTime' => time()])->update();
            if ((int)$order['type'] === 2) {
                //如果是2那么就是店铺 需要扣除佣金
                $poundage = ConfigModel::where('id', 1)->value('poundage');//获取百分比
                $deductpoundage = $order['totalPrice'] * ($poundage / 100);//扣除手续费


                ShopModel::where('user_id', $order['shop_id'])->setInc('balance', $order['totalPrice'] - $deductpoundage);//增加店铺佣金

                //手续费日志
                $ptemp = [
                    'title' => '订单收入',
                    'shop_id' => $order['shop_id'],//所属店铺
                    'price' => $order['totalPrice'] - $deductpoundage,//扣除手续费
                    'type' => 1,
                    'order_id' => $data['id']
                ];
                ShopMoneyLogModel::create($ptemp);//增加店铺金额

                //手续费日志
                $ptemp = [
                    'title' => '平台服务费',
                    'shop_id' => $order['shop_id'],//所属店铺
                    'price' => $deductpoundage,//扣除的手续费
                    'type' => 2,
                    'order_id' => $data['id']
                ];
                ShopMoneyLogModel::create($ptemp);//所扣除手续费
            }
            //判断用户是否是店长 如果是店长 那么就进行佣金分配
            $is_shop = UserModel::where('id', $order['dis_id'])->value('is_shop');
            if (!empty($is_shop) && $is_shop) {
                //增加可提现余额
                UserModel::where('id', $order['dis_id'])->setInc('available_commission', (float)$order['head_price']);
                //增加累计金额
                UserModel::where('id', $order['dis_id'])->setInc('cumulative_commission', (float)$order['head_price']);

                $temp = [
                    'title' => '分享佣金',
                    'order_id' => $data['id'],
                    'price' => $order['head_price'],
                    'user_id' => $order['dis_id'],
                ];
                CommissionModel::create($temp);
            }
            $allgoods = OrderGoodsModel::where('order_id', $data['id'])->select();
            foreach ($allgoods as $i => $item) {
                GoodsModel::where('id', $item['goods_id'])->setInc('sales', $item['totalBuyNum']);
                //获取所属商品的产品经理  //增加佣金给业务经理
                $product_id = GoodsModel::where('id', $item['goods_id'])->value('product_id');
                if (!empty($product_id)) {
                    UserModel::where('id', $product_id)->setInc('available_commission', (float)$order['manager_price']);
                    //增加累计金额
                    UserModel::where('id', $product_id)->setInc('cumulative_commission', (float)$order['manager_price']);
                }
            }
        }
//        ajax_return_ok($res);
    }

    public function PostevakuteByAdd()
    {
        $data = input('param.');
        $res = EvaluateModel::create($data);
        OrderModel::where('id', $data['order_id'])->data(['status' => 5, 'commentTime' => time()])->update();
        ajax_return_ok($res);
    }

}