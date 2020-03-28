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
            'app_id' => 'wxa81ab244ee136c47',
            'secret' => '6669295ed71c5de46abb991ce1fb5939',

            // 指定 API 调用返回结果的类型：array(default)/collection/object/raw/自定义类名
            'response_type' => 'array',
            //...
        ];
        $app = Factory::officialAccount($config);
      $res=  $app->template_message->send($data);
        return  $res;

    }

}