<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-02-15
 * Time: 13:52
 */

namespace app\api\controller;


use EasyWeChat\Factory;
use think\Controller;

class Wechat extends Controller
{
    public function SendMessage($data)
    {


        $config = [
            'app_id' => 'wxae80c2472ba27081',
            'secret' => 'ad22904510c570ce34510fd592e049fa',
            // 指定 API 调用返回结果的类型：array(default)/collection/object/raw/自定义类名
            'response_type' => 'array',
            //...
        ];
        $app = Factory::miniProgram($config);
        $res = $app->subscribe_message->send($data);
        return $res;

    }

}