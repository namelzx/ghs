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
            'app_id' => 'wxae80c2472ba27081',
            'secret' => 'ad22904510c570ce34510fd592e049fa',
            // 指定 API 调用返回结果的类型：array(default)/collection/object/raw/自定义类名
            'response_type' => 'array',
            'log' => [
                'level' => 'debug',
                'file' => __DIR__ . '/wechat.log',
            ],
        ];

        $app = Factory::miniProgram($config);


        $data = [
            'template_id' => 'X0uUIhn5jENF4vHQ2m-69RzcEwyd9NMDGHvQxWiwLGs',
            'touser' => 'oD-YF5h-NshE5TE7MLJg432c8otk',
            'page' => 'pages/index/index',       // 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
            'data' => [         // 模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }
                'character_string1' => [
                    'value' => 'D15709561387648910',
                ],
                'thing2' => [
                    'value' => '精品小青菜',
                ],
                'amount3' => [
                    'value' => '10元',
                ],
                'date4' => [
                    'value' => '2020-02-23 15:06',
                ],
            ],
        ];
        

       $res= $app->subscribe_message->send($data);
        dump($res);
//        $response = $app->app_code->getUnlimit(191, [
//            'page' => 'pages/member/shop/goodsinfo/index',
//            'width' => 600,
//        ]);
//        $id = 191;
//
//        if ($response instanceof \EasyWeChat\Kernel\Http\StreamResponse) {
//            $filename = $response->saveAs('./code/', $id . '.jpg');
//        }

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
