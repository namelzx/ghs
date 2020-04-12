<?php

namespace app\index\controller;

use app\common\controller\HyperDown;
use EasyWeChat\Factory;
use think\Db;

class Index extends Base
{
    public function index()
    {
        $data=[];
//        $send=SM

        $config = [
            'app_id' => 'wxae80c2472ba27081',
            'secret' => 'ad22904510c570ce34510fd592e049fa',
            // 指定 API 调用返回结果的类型：array(default)/collection/object/raw/自定义类名
            'response_type' => 'array',
            //...
        ];
        $app = Factory::miniProgram($config);

        $data = [
            'template_id' => 'gHQSOcCng-4XY0DlM2b7dcrl626D-F8TylKkrYUcOgU', // 所需下发的订阅模板id
            'touser' => 'oD-YF5h-NshE5TE7MLJg432c8otk',     // 接收者（用户）的 openid
            'page' => '/pages/index/index',       // 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
            'data' => [         // 模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }
                'character_string1' => [
                    'value' => 1,
                ],
                'thing2' => [
                    'value' => 10,
                ],
                'amount3' => [
                    'value' => 39,
                ],
                'date4' => [
                    'value' => date('yy-m-d', time()),
                ],
            ],
        ];

     $res=   $app->subscribe_message->send($data);

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
