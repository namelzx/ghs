<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-01-29
 * Time: 17:55
 */

namespace app\tools\controller;


use think\Controller;

class Models extends Controller
{


    protected $brand = "http://www.autohome.com.cn/ashx/AjaxIndexCarFind.ashx?type=1";

    protected $series = 'http://www.autohome.com.cn/ashx/AjaxIndexCarFind.ashx?type=3&value={}';
    protected $model = 'http://www.autohome.com.cn/ashx/AjaxIndexCarFind.ashx?type=5&value={}';

    /**
     * 获取车型号
     */
    public function GetCar()
    {

        $res = $this->curlSend($this->brand);
        dump($res);

    }


    //调用获取路径
    public function curlSend($url, $data = '')
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); //不进行证书验证
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); //不进行主机头验证
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //结果不直接输出在屏幕上
        $data && curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        $data ? curl_setopt($ch, CURLOPT_POST, true) : curl_setopt($ch, CURLOPT_POST, false);  //发送的方式
        curl_setopt($ch, CURLOPT_URL, $url);   //发送的地址
        $result = curl_exec($ch);
        curl_close($ch);
        $info = json_decode($result, true);
        return $info;
    }

}