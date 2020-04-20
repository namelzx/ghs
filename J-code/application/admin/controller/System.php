<?php

namespace app\admin\controller;

use app\common\controller\Base;
use EasyWeChat\Factory;

/**
 * 系统基类
 * @author hardphp@163.com
 *
 */



header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, authKey, sessionId, Access-Token, X-Token,x-token,x-access-appid");

class System extends Base
{

    public $config;

    public function _initialize()
    {
        parent::_initialize();
        $this->config = [
            'app_id' => 'wxae80c2472ba27081',
            'secret' => 'ad22904510c570ce34510fd592e049fa',
            // 指定 API 调用返回结果的类型：array(default)/collection/object/raw/自定义类名
            'response_type' => 'array',
            'log' => [
                'level' => 'debug',
                'file' => __DIR__ . '/wechat.log',
            ],
        ];

    }

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
            'page' => 'pages/details/index',
            'width' => 600,
        ]);
        $name = $id . time();
        if ($response instanceof \EasyWeChat\Kernel\Http\StreamResponse) {
            $response->saveAs('./code/', $name . '.jpg');
        }
        return '/code/' . $name . '.jpg';
    }


}
