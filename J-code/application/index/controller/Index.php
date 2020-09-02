<?php

namespace app\index\controller;

use app\api\controller\Wechat;
use app\app\model\OrderModel;
use app\common\controller\HyperDown;
use app\tools\controller\Logistics;
use think\Db;
use EasyWeChat\Factory;

class Index extends Base
{
    public function index()
    {


//
//        $host = "https://kdwlcxf.market.alicloudapi.com";
//        $path = "/kdwlcx";
//        $method = "GET";
//        $appcode = "196e07f7d6e64e7f967daa4ee1c609d0";
//        $headers = array();
//        array_push($headers, "Authorization:APPCODE " . $appcode);
//        $querys = "no=292810233476";
//        $bodys = "";
//        $url = $host . $path . "?" . $querys;
//
//        $curl = curl_init();
//        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
//        curl_setopt($curl, CURLOPT_URL, $url);
//        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
//        curl_setopt($curl, CURLOPT_FAILONERROR, false);
//        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
//        curl_setopt($curl, CURLOPT_HEADER, false);
//        //curl_setopt($curl, CURLOPT_HEADER, true); 如不输出json, 请打开这行代码，打印调试头部状态码。
//        //状态码: 200 正常；400 URL无效；401 appCode错误； 403 次数用完； 500 API网管错误
//        if (1 == strpos("$".$host, "https://"))
//        {
//            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
//            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
//        }
//        $out_put = curl_exec($curl);
//        echo $out_put;
//        die();
//        $config = [
//            // 必要配置
//            'app_id' => 'wxae80c2472ba27081',
//            'mch_id' => '1573988331',
//            'key' => 'qwertyuiopasdfghjklzxcvbnm123456',   // API 密钥
//            // 如需使用敏感接口（如退款、发送红包等）需要配置 API 证书路径(登录商户平台下载 API 证书)
//            'cert_path' => getcwd() . '/cert/apiclient_cert.pem', // XXX: 绝对路径！！！！
//            'key_path' => getcwd() . '/cert/apiclient_key.pem',
//            'notify_url' => '默认的订单回调地址',     // 你也可以在下单时单独设置来想覆盖它
//        ];
//        $app = Factory::payment($config);
//        $pass = time() . make_password(6);
//        $res = $app->transfer->toBalance([
//            'partner_trade_no' => $pass, // 商户订单号，需保持唯一性(只能是字母或者数字，不能包含有符号)
//            'openid' => 'oD-YF5h-NshE5TE7MLJg432c8otk',
//            'check_name' => 'FORCE_CHECK', // NO_CHECK：不校验真实姓名, FORCE_CHECK：强校验真实姓名
//            're_user_name' => '梁泽祥', // 如果 check_name 设置为FORCE_CHECK，则必填用户真实姓名
//            'amount' => 1*1000, // 企业付款金额，单位为分
//            'desc' => '理赔', // 企业付款操作说明信息。必填
//        ]);
////        $data = OrderModel::where('shop_id', 16)->delete();
//        ajax_return_ok($res);
    }

    public function info()
    {
        $val = input('id', 1, 'int');
        $res = Db::name('article')->get($val);
        $hyper = new HyperDown();
        $html = $hyper->makeHtml($res['content']);
        $this->assign('html', $html);
        $this->assign('info', $res);
        return view();
    }

    public function hello($name = 'ThinkPHP5')
    {
        return 'hello,' . $name;
    }
}
