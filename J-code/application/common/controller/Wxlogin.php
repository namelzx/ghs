<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-12-03
 * Time: 23:07
 */

namespace app\common\controller;


class Wxlogin
{

    private $appId ;                 //微信公众号APPID
    private $appSecret ;          //密匙
    private $redirect_uri ;

    public function __construct($config = array())
    {
        $this->appId = $config['appId'];
        $this->appSecret = $config['appSecret'];
        $this->redirect_uri = $config['redirect_uri'];
    }


    /**
     * 获取授权token
     * @param $code
     * @return bool|string
     */
    public function getUserAccessToken($code)
    {


//          $url="https://open.weixin.qq.com/connect/oauth2/authorize?appid=$this->appId&redirect_uri=$this->appSecret&response_type=$code&scope=SCOPE&state=STATE#wechat_redirec";
        $url="https://api.weixin.qq.com/sns/oauth2/access_token?appid=$this->appId&secret=$this->appSecret&code=$code&grant_type=authorization_code";

        $res = file_get_contents($url);

        return json_decode($res);
    }
    /**
     * 获取用户信息
     * @param $accessToken
     * @return mixed
     */
    public function getUserInfo($accessToken)
    {
        $url = "https://api.weixin.qq.com/sns/userinfo?access_token=$accessToken->access_token&openid=$accessToken->openid&lang=zh_CN";
        $UserInfo = file_get_contents($url);
        return json_decode($UserInfo, true);
    }

    /**
     * 此AccessToken   与 getUserAccessToken不一样
     * 获得AccessToken
     * @return mixed
     */
    public function getAccessToken()
    {
        // 获取缓存
        $access = cache('access_token');
        // 缓存不存在-重新创建
        if (empty($access)) {
            // 获取 access token
            $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$this -> appid}&secret={$this->appsecret}";
            $accessToken = file_get_contents($url);

            $accessToken = json_decode($accessToken);
            // 保存至缓存
            $access = $accessToken->access_token;
            cache('access_token', $access, 7000);
        }
        return $access;
    }

}