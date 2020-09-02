<?php


namespace app\api\controller;


use app\admin\model\UserModel;
use app\app\model\GoodsModel;
use app\app\model\OrderGoodsModel;
use app\app\model\ShopModel;
use app\common\model\CommissionModel;
use app\common\model\ConfigModel;
use app\common\model\OrderModel;
use app\common\model\ShopMoneyLogModel;

class Order
{
    public function cheOrder()
    {
        $res = OrderModel::
        whereTime('deliveryTime', '-1 day')
            ->where('type', 1)->
            where('status', 3)
            ->select();
        $tp = [];
        foreach ($res as $i => $item) {
            $db = $this->GetShopOrderByUpdate($item['id']);
            array_push($tp, $db);
        }
    }


    public function cheshopOrder()
    {
        $res = OrderModel::
        whereTime('create_time', '-5 day')
            ->where('type', 2)->
            where('status', 3)
            ->select();
        $tp = [];
        foreach ($res as $i => $item) {
            $db = $this->GetShopOrderByUpdate($item['id']);
            array_push($tp, $db);
        }
    }

    public function GetShopOrderByUpdate($id)
    {
        $res = \app\app\model\OrderModel::where('id', $id)->data(['status' => 4])->update();
        $order = OrderModel::where('id', $id)->find();
        OrderModel::where('id', $id)->data(['receiveTime' => time()])->update();
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
                'order_id' => $id
            ];
            ShopMoneyLogModel::create($ptemp);//增加店铺金额

            //手续费日志
            $ptemp = [
                'title' => '平台服务费',
                'shop_id' => $order['shop_id'],//所属店铺
                'price' => $deductpoundage,//扣除的手续费
                'type' => 2,
                'order_id' => $id
            ];
            ShopMoneyLogModel::create($ptemp);//所扣除手续费
        }
        //判断用户是否是店长 如果是店长 那么就进行佣金分配
        $is_shop = \app\app\model\UserModel::where('id', $order['dis_id'])->value('is_shop');
        if (!empty($is_shop) && $is_shop) {
            //增加可提现余额
            UserModel::where('id', $order['dis_id'])->setInc('available_commission', (float)$order['head_price']);
            //增加累计金额
            UserModel::where('id', $order['dis_id'])->setInc('cumulative_commission', (float)$order['head_price']);

            $temp = [
                'title' => '分享佣金',
                'order_id' => $id,
                'price' => $order['head_price'],
                'user_id' => $order['dis_id'],
            ];
            CommissionModel::create($temp);
        }
        $allgoods = \app\common\model\OrderGoodsModel::where('order_id', $id)->select();
        foreach ($allgoods as $i => $item) {
            GoodsModel::where('id', $item['goods_id'])->setInc('sales', $item['totalBuyNum']);
            GoodsModel::where('id', $item['goods_id'])->setDec('inventory', $item['totalBuyNum']);
            //获取所属商品的产品经理  //增加佣金给业务经理
            $product_id = GoodsModel::where('id', $item['goods_id'])->value('product_id');
            if (!empty($product_id)) {
                UserModel::where('id', $product_id)->setInc('available_commission', (float)$order['manager_price']);
                //增加累计金额
                UserModel::where('id', $product_id)->setInc('cumulative_commission', (float)$order['manager_price']);
            }
        }
        if (!empty($order['dis_id'])) {
            $disuser = UserModel::where('id', $order['dis_id'])->find();
            $user = UserModel::where('id', $order['user_id'])->find();
            UserModel::where('id', $order['dis_id'])->setDec('shop_notice', 1);
            $semd = [
                'template_id' => 'VBZVNkSYnlufR7hXMxmV1LFVNHdbQlv4OKesClBZz04', // 所需下发的订阅模板id
                'touser' => $disuser['openid'],     // 接收者（用户）的 openid
                'page' => 'pages/tabBar/user/invite/invite',       // 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
                'data' => [         // 模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }
                    'amount1' => [
                        'value' => $order['head_price'],
                    ],
                    'thing2' => [
                        'value' => '你邀请的好友' . $user['nickName'] . '订单已完成',
                    ],
                    'thing3' => [
                        'value' => '随买 推荐有奖',
                    ],
                    'time4' => [
                        'value' => date('yy-m-d', time()),
                    ],
                ],
            ];
            $we = new Wechat();
            $res = $we->SendMessage($semd);
            return $res;
        }
    }

}