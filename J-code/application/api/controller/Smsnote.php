<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-02-09
 * Time: 15:55
 */

namespace app\api\controller;

use think\Controller;

class Smsnote extends Controller
{
//    群发
    public function smsMulti($templateId = 492855, $phoneNumbers = ['18677947067'], $content = '')
    {
// $appid $appkey $templateId $smsSign为官方demo所带，请修改为你自己的
// 短信应用SDK AppID
        $appid = 1400180476; // 1400开头
// 短信应用SDK AppKey
        $appkey = "c8afefaeb1ee99532e29f89171b3afe4";
// 需要发送短信的手机号码
// 短信模板ID，需要在短信应用中申请
        $templateId = $templateId; // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
// 签名
        $smsSign = "改灯之家	"; // NOTE: 这里的签名只是示例，请使用真实的已申请的签名，签名参数使用的是`签名内容`，而不是`签名ID`
// 群发

        try {
            $msender = new SmsMultiSender($appid, $appkey);
            $result = $msender->send(0, "86", $phoneNumbers,
                $content, "", "");
            $rsp = json_decode($result);
//            echo $result;
            return $rsp;
        } catch (\Exception $e) {
            return $e;
//            echo var_dump($e);
        }
/*//暂停3秒
        sleep(3);
// 指定模板ID群发
        try {
            $msender = new SmsMultiSender($appid, $appkey);
            $params = ["654321", "5"];
            $result = $msender->sendWithParam("86", $phoneNumbers,
                $templateId, $params, $smsSign, "", ""); // 签名参数未提供或者为空时，会使用默认签名发送短信
            $rsp = json_decode($result);
//            echo $result;
        } catch (\Exception $e) {
//            echo var_dump($e);
        }*/
    }

//单条发送
    public function smsSend($templateId,$phoneNumber,$conent)
    {
        $appid = 1400180476; // 1400开头
// 短信应用SDK AppKey
        $appkey = "c8afefaeb1ee99532e29f89171b3afe4";
// 需要发送短信的手机号码
        $phoneNumber = $phoneNumber;
// 短信模板ID，需要在短信应用中申请
        $templateId =$templateId; // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
// 签名
        $smsSign = "改灯之家	"; // NOTE: 这里的签名只是示例，请使用真实的已申请的签名，签名参数使用的是`签名内容`，而不是`签名ID`
// 群发
        try {
            $ssender = new SmsSingleSender($appid, $appkey);
            $result = $ssender->send(0, "86", $phoneNumber,
                $conent, "", "");
            $rsp = json_decode($result);
//            echo $result;
        } catch (\Exception $e) {
//            echo var_dump($e);
        }
//暂停3秒
// 指定模板ID单发短信
//        try {
//            $ssender = new SmsSingleSender($appid, $appkey);
//            $params = ["654321", "5"];
//            $result = $ssender->sendWithParam("86", $phoneNumber, $templateId,
//                $params, $smsSign, "", ""); // 签名参数未提供或者为空时，会使用默认签名发送短信
//            $rsp = json_decode($result);
////            echo $result;
//        } catch (\Exception $e) {
////            echo var_dump($e);
//        }
    }

    public function Tosms()
    {
        $content = "您有一笔新的订单，安装车型 33，安装产品 55，请尽快处理，规定时间内任未处理，订单将自动驳回。详情可通过 77 公众号查看。";
        $sm = $this->smsMulti(533017, ['18677947067'], $content);
        return $sm;
    }

}