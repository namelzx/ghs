<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-16
 * Time: 03:28
 */

namespace app\app\controller;


use EasyWeChat\Factory;

class Tools extends Base
{
    public function pay()
    {
        $weixin = config('weixin');
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
        $totalPrice = (float)$data['price'] * 100;
        $totalPrice = 1;
        $attributes = [
            'trade_type' => 'JSAPI', // JSAPI，NATIVE，APP...
            'body' => '123123',
            'detail' => '123123',
            'out_trade_no' => $out_trade_no,
            'total_fee' => $totalPrice, // 单位：分
            'notify_url' => '/', // 支付结果通知网址，如果不设置则会使用配置里的默认地址
            'openid' => 'oD-YF5h-NshE5TE7MLJg432c8otk', // trade_type=JSAPI，此参数必传，用户在商户appid下的唯一标识，
        ];
        $result = $app->order->unify($attributes);
        $config = array();


//        dump($result);

        if ($result['return_code'] == 'SUCCESS' && $result['result_code'] == 'SUCCESS') {
            $prepayId = $result['prepay_id'];
            $jssdk = $app->jssdk;
            $config = $jssdk->bridgeConfig($prepayId, false);
        }
        $arr = array(
            'timeStamp' => $config['timeStamp'],
            'nonceStr' => $config['nonceStr'],
            'package' => $config['package'],
            'signType' => 'MD5',
            'paySign' => $config['paySign'],
            'out_trade_no' => $out_trade_no
        );
        ajax_return_ok($arr);
    }
}