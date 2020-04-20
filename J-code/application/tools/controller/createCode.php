<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-10
 * Time: 16:12
 */

namespace app\tools\controller;


use EasyWeChat\Factory;
use think\Controller;

class createCode extends Controller
{
    public function Code($id)
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
        $response = $app->app_code->getUnlimit($id, [
            'page' => 'pages/member/shop/goodsinfo/index',
            'width' => 600,
        ]);
        $name = $id . time();
        if ($response instanceof \EasyWeChat\Kernel\Http\StreamResponse) {
            $response->saveAs('./code/', $name . '.jpg');
        }
        return '/code/' . $name . '.jpg';
    }

}