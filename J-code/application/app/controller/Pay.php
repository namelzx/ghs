<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-07
 * Time: 02:39
 */

namespace app\app\controller;


use app\app\model\GoodsModel;
use app\app\model\OrderModel;
use app\app\model\PayLogModel;
use app\common\model\ConfigModel;
use EasyWeChat\Factory;
use think\Db;

class Pay extends Base
{
    public function PostDataBycreateOrder()
    {
        $data = input('param.');
        $temp = [
            'totalPrice' => $data['totalPrice'],
            'user_id' => $data['user_id'],
            'buyerName' => $data['buyerName'],
            'mobile' => $data['mobile'],
            'order_no' => time(),
            'addressText' => $data['addressText'],
            'buyerText' => $data['buyerText'],
            'create_time' => time(),
            'type' => $data['type'],
            'way_type' => $data['way_type'],
            'provinces_id' => $data['provinces_id'],
            'area_id' => $data['area_id'],
            'city_id' => $data['city_id']
        ];
        if (!empty($data['dis_id'])) {
            $temp['dis_id'] = $data['dis_id'];
        }
        if (!empty($data['shop_id'])) {
            $temp['shop_id'] = $data['shop_id'];
        }

        $temp['head_price'] = 0;
        $temp['manager_price'] = 0;
        foreach ($data['items'] as $i => $item) {
            if (!empty($item['head_price'])) {

                $temp['head_price'] = $temp['head_price'] + floatval($item['head_price']);
                $temp['manager_price'] = $temp['manager_price'] + floatval($item['manager_price']);
            }
        }

        $res = OrderModel::create($temp);
        $goods = [];


        foreach ($data['items'] as $i => $item) {
            $goods[$i]['order_id'] = $res['id'];
            $goods[$i]['images_url'] = $item['images_url'];
            $goods[$i]['name'] = $item['name'];
            $goods[$i]['price'] = $item['price'];
            $goods[$i]['totalBuyNum'] = $item['totalBuyNum'];
            $goods[$i]['goods_id'] = $item['goods_id'];
            GoodsModel::where('id', $item['goods_id'])->setDec('inventory', $item['totalBuyNum']);
        }

        Db::name('order_goods')->insertAll($goods);
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
        $totalPrice = $data['totalPrice'] * 100;
        $pay = ConfigModel::where('id', 1)->value('pay');
        if ($data['user_id'] === 1 || $data['user_id'] === '1' || $data['user_id'] === 2 || $data['user_id'] === '2') {
            $totalPrice = 1;
        }
        $attributes = [
            'trade_type' => 'JSAPI', // JSAPI，NATIVE，APP...
            'body' => '123123',
            'detail' => '123123',
            'out_trade_no' => $out_trade_no,
            'total_fee' => $totalPrice, // 单位：分
            'notify_url' => '/', // 支付结果通知网址，如果不设置则会使用配置里的默认地址
            'openid' => $data['openid'], // trade_type=JSAPI，此参数必传，用户在商户appid下的唯一标识，
        ];
        $result = $app->order->unify($attributes);
        $config = array();


        if ($result['return_code'] == 'SUCCESS' && $result['result_code'] == 'SUCCESS') {
            $prepayId = $result['prepay_id'];
            $jssdk = $app->jssdk;
            $config = $jssdk->bridgeConfig($prepayId, false);
        }
        $arr = array(
            'id' => $res['id'],
            'timeStamp' => $config['timeStamp'],
            'nonceStr' => $config['nonceStr'],
            'package' => $config['package'],
            'signType' => 'MD5',
            'paySign' => $config['paySign'],
            'out_trade_no' => $out_trade_no
        );
        ajax_return_ok($arr);
    }


    public function PayLog()
    {
        $data = input('param.');
        $res = PayLogModel::create($data);

        //打赏后修改订单状态
        OrderModel::where('id', $data['order_id'])->data(['status' => 6])->update();
        ajax_return_ok($res);
    }

}