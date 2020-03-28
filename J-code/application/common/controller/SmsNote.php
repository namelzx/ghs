<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-02-09
 * Time: 00:02
 */

namespace app\common\controller;


use Qcloud\Sms\SmsMultiSender;
use think\Controller;

class SmsNote extends Controller
{
//    群发
    public function smsMulti()
    {
// $appid $appkey $templateId $smsSign为官方demo所带，请修改为你自己的
// 短信应用SDK AppID
        $appid = 1400180476; // 1400开头
// 短信应用SDK AppKey
        $appkey = "c8afefaeb1ee99532e29f89171b3afe4";
// 需要发送短信的手机号码
        $phoneNumbers = ['18677947067'];
// 短信模板ID，需要在短信应用中申请
        $templateId = 240267; // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
// 签名
        $smsSign = "改灯之家	"; // NOTE: 这里的签名只是示例，请使用真实的已申请的签名，签名参数使用的是`签名内容`，而不是`签名ID`
// 群发
        try {
            $msender = new SmsMultiSender($appid, $appkey);
            $result = $msender->send(0, "86", $phoneNumbers,
                "	尊敬的{1}，车牌：{2}，车型：{3}，阿帕已为您成功安排安装门店，[店名：{4}]，[电话：{5}]，[地址：{6}]，请收货后检查产品与配件是否完整，请提前1-2天与门店联系预约时间。详情查看阿帕之家公众号，感谢支持！", "", "");
            $rsp = json_decode($result);
            echo $result;
        } catch (\Exception $e) {
            echo var_dump($e);
        }
//暂停3秒
        sleep(3);
// 指定模板ID群发
        try {
            $msender = new SmsMultiSender($appid, $appkey);
            $params = ["654321", "5"];
            $result = $msender->sendWithParam("86", $phoneNumbers,
                $templateId, $params, $smsSign, "", ""); // 签名参数未提供或者为空时，会使用默认签名发送短信
            $rsp = json_decode($result);
            echo $result;
        } catch (\Exception $e) {
            echo var_dump($e);
        }
    }

//单条发送
    public function smsSend()
    {
// $appid $appkey $templateId $smsSign为官方demo所带，请修改为你自己的
// 短信应用SDK AppID
        $appid = 1400009099;
// 短信应用SDK AppKey
        $appkey = "9ff91d87c2cd7cd0ea762f141975d1df37481d48700d70ac37470aefc60f9bad";
// 你的手机号码。
        $phoneNumber = "21212313123";
// 短信模板ID，需要在短信应用中申请
        $templateId = 7839; // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
// 签名
        $smsSign = "腾讯云"; // NOTE: 这里的签名只是示例，请使用真实的已申请的签名，签名参数使用的是`签名内容`，而不是`签名ID`
// 单发短信
        try {
            $ssender = new SmsSingleSender($appid, $appkey);
            $result = $ssender->send(0, "86", $phoneNumber,
                "123456为您的登录验证码，请于5分钟内填写。如非本人操作，请忽略本短信。", "", "");
            $rsp = json_decode($result);
            echo $result;
        } catch (\Exception $e) {
            echo var_dump($e);
        }
//暂停3秒
        sleep(3);
// 指定模板ID单发短信
        try {
            $ssender = new SmsSingleSender($appid, $appkey);
            $params = ["654321", "5"];
            $result = $ssender->sendWithParam("86", $phoneNumber, $templateId,
                $params, $smsSign, "", ""); // 签名参数未提供或者为空时，会使用默认签名发送短信
            $rsp = json_decode($result);
            echo $result;
        } catch (\Exception $e) {
            echo var_dump($e);
        }
    }

}