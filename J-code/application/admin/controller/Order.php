<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-30
 * Time: 10:24
 */

namespace app\admin\controller;


use app\admin\model\UserModel;
use app\admin\model\WechatUserModel;
use app\api\controller\Wechat;
use app\app\model\OrderGoodsModel;
use app\common\model\OrderBuyoutModel;
use app\common\model\OrderCourierModel;
use app\common\model\OrderModel;
use EasyWeChat\Factory;

class Order extends System
{


    /**
     * 获取数据列表
     */
    public function GetDataByList()
    {
        $data = input('param.');
        if (!empty($data['goodsname'])) {
            $data['order_id_in'] = OrderGoodsModel::where('name', 'like', '%' . $data['goodsname'] . '%')->column('order_id');
            if (empty($data['order_id_in'])) {
                return json(['msg' => '获取成功', 'data' => ['total' => 0, 'data' => []], 'code' => 20000], 200);
            }
        }
        $data['is_admin'] = 1;
        $res = OrderModel::GetDataByList($data);
        return json(['msg' => '获取成功', 'data' => $res, 'code' => 20000], 200);
    }


    /**
     * 获取买断订单
     */

    public function GetBuyoutByList()
    {
        $data = input('param.');
        $res = OrderBuyoutModel::GetDataByList($data);
        return json(['msg' => '获取成功', 'data' => $res, 'code' => 20000], 200);
    }

    /**
     * 取消订单
     */
    public function PostDataByCancel()
    {

        $data = input('param.');
        $res = OrderModel::where('id', $data['id'])->data($data)->update();
        return json(['msg' => '订单取消成功', 'data' => $res, 'code' => 20000], 200);

    }


    /**
     * 获取订单详细
     */
    public function GetIdByDetails()
    {
        $data = input('param.');
        $res = OrderModel::with(['goods'])->where('id', $data['id'])->find();
        ajax_return_ok($res);
        $logistics = "";
        if (!empty($res['get_courier'])) {

            $requestData = "{'OrderCode':'" . $res['get_courier']['out_courier_no'] . "','ShipperCode':'" . $res['get_courier']['courier']['value'] . "','LogisticCode':'" . $res['get_courier']['out_courier_no'] . "'}";


            $logistics = json_decode($this->getOrderTracesByJson($requestData));

            if (!empty($logistics)) {

                $res['logis'] = $logistics->Traces[count($logistics->Traces) - 1];

            }
        }

        return json(['msg' => '获取订单信息', 'data' => $res, 'code' => 20000]);
    }


    public function postCourier()
    {
        $data = input('param.');
        $res = OrderCourierModel::create($data);
        OrderModel::where('id', $data['order_id'])->data(['delivery_time' => time()])->update();
        return json(['msg' => '提交成功', 'data' => '1', 'code' => 20000]);
    }

    /**
     * 订单结算
     */
    public function postOrderClose()
    {
        $data = input('param.');
        $data['status'] = 6;// 6为订单结算
        $data['close_time'] = time();
        $res = OrderModel::where('id', $data['id'])->data($data)->update();
        return json(['msg' => '结算成功', 'data' => $res, 'code' => 20000]);

    }

    /**
     * 发货
     */
    public function deliveryOrder()
    {
        $data = input('param.');
        $data['status'] = 3;
        $data['deliveryTime'] = time();
        $order = OrderModel::get($data['id']);
        $goods = OrderGoodsModel::where('order_id', $order['id'])->select();
        $goods_title = '';
        foreach ($goods as $i => $itme) {
            $goods_title = $goods_title . ' ' . $itme['name'];
        }
        $openid = UserModel::where('id', $order['user_id'])->value('openid');
        $semd = [
            'template_id' => 'X0uUIhn5jENF4vHQ2m-69RzcEwyd9NMDGHvQxWiwLGs', // 所需下发的订阅模板id
            'touser' => $openid,     // 接收者（用户）的 openid
            'page' => '/pages/userCenter/pages/orderDetail/orderDetail?id=' . $data['id'],       // 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
            'data' => [         // 模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }
                'thing1' => [
                    'value' => $goods_title,
                ],
                'name2' => [
                    'value' => (string)$order['buyerName'],
                ],
                'phone_number3' => [
                    'value' => $order['mobile'],
                ],
                'date4' => [
                    'value' => date('yy-m-d', time()),
                ],

            ],
        ];
        $we = new Wechat();
        $we->SendMessage($semd);
        $res = OrderModel::where('id', $data['id'])->data($data)->update();
        ajax_return_ok($res);

    }


    public function PostDataByRefund()
    {
        $data = input('param.');
        $config = [
            // 必要配置
            'app_id' => 'wxae80c2472ba27081',
            'mch_id' => '1573988331',
            'key' => 'qwertyuiopasdfghjklzxcvbnm123456',   // API 密钥
            // 如需使用敏感接口（如退款、发送红包等）需要配置 API 证书路径(登录商户平台下载 API 证书)
            'cert_path' => getcwd() . '/cert/apiclient_cert.pem', // XXX: 绝对路径！！！！
            'key_path' => getcwd() . '/cert/apiclient_key.pem',
            'notify_url' => '默认的订单回调地址',     // 你也可以在下单时单独设置来想覆盖它
        ];

        $app = Factory::payment($config);

        $out_trade_no = time() . rand(1000, 9999);
        $result = $app->refund->byOutTradeNumber($data['out_trade_no'], $out_trade_no, $data['totalPrice'] * 100, $data['totalPrice'] * 100, [
            // 可在此处传入其他参数，详细参数见微信支付文档
            'refund_desc' => '订单退款',
        ]);
        OrderModel::where('id', $data['id'])->data(['status' => -1])->update();
        ajax_return_ok($result);
    }

    public function GetQueryBydownload()
    {

        $data = input('param.');
        $where = [];
        if (!empty($data['is_admin'])) {
            $where[] = ['type', 'eq', 1];
        }
        if (!empty($data['goodsname'])) {
            $data['order_id_in'] = OrderGoodsModel::where('name', 'like', '%' . $data['goodsname'] . '%')->column('order_id');
            if (empty($data['order_id_in'])) {
                return json(['msg' => '获取成功', 'data' => ['total' => 0, 'data' => []], 'code' => 20000], 200);
            }
        }

        if (!empty($data['order_id_in'])) {
            $where[] = ['id', 'in', $data['order_id_in']];
        }
        $res = OrderModel::with(['getUser']);
        if (!empty($data['time'])) {
            $res = $res->where('create_time', 'between time', $data['time']);
        }
        if (!empty($data['createTime'])) {
            $res = $res->where('create_time', 'between time', $data['createTime']);
        }
        if (!empty($data['orderSn'])) {
            $res = $res->where('id', 'eq', $data['orderSn']);

        }


        if (!empty($data['receiverKeyword'])) {
            $res = $res->
            whereOr('buyerName', 'like', '%' . $data['receiverKeyword'] . '%')->
            whereOr('mobile', 'like', '%' . $data['receiverKeyword'] . '%');
        }


        if (!empty($data['order_no'])) {
            $res = $res->where('out_trade_no', $data['order_no']);
        }


        if (!empty($data['status'])) {
            $res = $res->where('status', $data['status']);
        }
        $order = $res->where($where)->where('type', 1)->order('id desc')->select();
        $temp = [
            'data' => $this->Gorder($order),
            'filterVal' => [
                'id',
                'out_trade_no',
                'buyerName',
                'create_time',
                'totalPrice',
                'pay_type',
                'addressText',
                'mobile'
            ],
            'tHeader' => [
                '编号',
                '微信流水单号',
                '下单人',
                '购买时间',
                '订单金额',
                '支付方式',
                '收货地址',
                '联系方式'
            ]
        ];
        ajax_return_ok($temp);
    }

    public function Gorder($data)
    {
        $arr = [];
        foreach ($data as $i => $item) {
            $arr[$i] = $item;
            $arr[$i]['pay_type'] = '微信支付';
        }
        return $arr;
    }
}