<?php

namespace app\index\controller;

use app\common\controller\HyperDown;
use EasyWeChat\Factory;
use think\Db;

class Index extends Base
{
    public function index()
    {
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
    $res=   $app->transfer->toBalance([
            'partner_trade_no' => make_password(6), // 商户订单号，需保持唯一性(只能是字母或者数字，不能包含有符号)
            'openid' => 'oD-YF5h-NshE5TE7MLJg432c8otk',
            'check_name' => 'NO_CHECK', // NO_CHECK：不校验真实姓名, FORCE_CHECK：强校验真实姓名
            're_user_name' => '', // 如果 check_name 设置为FORCE_CHECK，则必填用户真实姓名
            'amount' => 1, // 企业付款金额，单位为分
            'desc' => '理赔', // 企业付款操作说明信息。必填
        ]);
    dump($res);

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
