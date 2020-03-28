<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-18
 * Time: 21:04
 */

namespace app\common\controller;


class AmpHelper
{
    const API_DOMAIN = "https://openapi.alipay.com/gateway.do?";
    const API_METHOD_GENERATE_QR = 'alipay.open.app.qrcode.create';
    const API_METHOD_AUTH_TOKEN = 'alipay.system.oauth.token';
    const API_METHOD_GET_USER_INFO = 'alipay.user.info.share';

    const SIGN_TYPE_RSA2 = 'RSA2';
    const VERSION = '1.0';
    const FILE_CHARSET_UTF8 = "UTF-8";
    const FILE_CHARSET_GBK = "GBK";
    const RESPONSE_OUTER_NODE_QR = 'alipay_open_app_qrcode_create_response';
    const RESPONSE_OUTER_NODE_AUTH_TOKEN = 'alipay_system_oauth_token_response';
    const RESPONSE_OUTER_NODE_USER_INFO = 'alipay_user_info_share_response';
    const RESPONSE_OUTER_NODE_ERROR_RESPONSE = 'error_response';

    const STATUS_CODE_SUCCESS = 10000;
    const STATUS_CODE_EXCEPT = 20000;


    /**
     * 获取用户信息接口，根据token
     * @param $code 授权码
     * 通过授权码获取用户的信息
     */
    public static function getAmpUserInfoByAuthCode($code){
        $aliUserInfo = [];
        $tokenData = AmpHelper::getAmpToken($code);
        //如果token不存在，这种主要是为了处理支付宝的异常记录
        if(isset($tokenData['code'])){
            return $tokenData;
        }
        $token = formatArrValue($tokenData,'access_token');
        if($token){
            $userBusiParam = self::getAmpUserBaseParam($token);
            $url = self::buildRequestUrl($userBusiParam);
            $resonse = self::getResponse($url,self::RESPONSE_OUTER_NODE_USER_INFO);
            if($resonse['code'] == self::STATUS_CODE_SUCCESS){
                //有效的字段列
                $userInfoColumn = ['user_id','avatar','province','city','nick_name','is_student_certified','user_type','user_status','is_certified','gender'];
                foreach ($userInfoColumn as $column){
                    $aliUserInfo[$column] = formatArrValue($resonse,$column,'');
                }

            }else{
                $exceptColumns = ['code','msg','sub_code','sub_msg'];
                foreach ($exceptColumns as $column){
                    $aliUserInfo[$column] = formatArrValue($resonse,$column,'');
                }
            }
        }
        return $aliUserInfo;
    }


    /**
     * 获取小程序token接口
     */
    public static function getAmpToken($code){
        $param = self::getAuthBaseParam($code);
        $url = self::buildRequestUrl($param);
        $response = self::getResponse($url,self::RESPONSE_OUTER_NODE_AUTH_TOKEN);
        $tokenResult = [];
        if(isset($response['code']) && $response['code'] != self::STATUS_CODE_SUCCESS){
            $exceptColumns = ['code','msg','sub_code','sub_msg'];
            foreach ($exceptColumns as $column){
                $tokenResult[$column] = formatArrValue($response,$column,'');
            }
        }else{
            $tokenResult = $response;
        }
        return $tokenResult;
    }

    /**
     * 获取二维码链接接口
     * 433ac5ea4c044378826afe1532bcVX78
     * https://openapi.alipay.com/gateway.do?timestamp=2013-01-01 08:08:08&method=alipay.open.app.qrcode.create&app_id=2893&sign_type=RSA2&sign=ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE&version=1.0&biz_content=
    {"url_param":"/index.html?name=ali&loc=hz", "query_param":"name=1&age=2", "describe":"二维码描述"}
     */
    public static function generateQrCode($mpPage = 'pages/index',$queryParam = [],$describe){
        $param = self::getQrcodeBaseParam($mpPage,$queryParam,$describe );
        $url = self::buildRequestUrl($param);
        $response = self::getResponse($url,self::RESPONSE_OUTER_NODE_QR);
        return $response;
    }


    /**
     * 获取返回的数据，对返回的结果做进一步的封装和解析,因为支付宝的每个接口的返回都是由一个特定的
     * key组成的，因此这里直接封装了而一个通用的方法，对于不同的接口只需要更改相应的node节点就可以了
     */
    public static function getResponse($url,$responseNode){
        $json = curlRequest($url);
        $response = json_decode($json,true);
        $responseContent = formatArrValue($response,$responseNode,[]);
        $errResponse = formatArrValue($response,self::RESPONSE_OUTER_NODE_ERROR_RESPONSE,[]);
        if($errResponse){
            return $errResponse;
        }
        return $responseContent;
    }

    /**
     * 获取请求的链接
     */
    public static function buildQrRequestUrl($mpPage = 'pages/index',$queryParam = []){
        $paramStr = http_build_query(self::getQrBaseParam($mpPage,$queryParam));
        return self::API_DOMAIN . $paramStr;
    }



    /**
     * 构建请求链接
     */
    public static function buildRequestUrl($param){
        $paramStr = http_build_query($param);
        return self::API_DOMAIN . $paramStr;
    }


    /**
     * 获取用户的基础信息接口
     */
    public static function getAmpUserBaseParam($token){
        $busiParam = [
            'auth_token' => $token,
        ];
        $param = self::buildApiBuisinessParam($busiParam,self::API_METHOD_GET_USER_INFO);
        return $param;

    }

    /**
     *获取二维码的基础参数
     */
    public static function getQrcodeBaseParam($page= 'pages/index/index',$queryParam = [],$describe = ''){
        $busiParam = [
            'biz_content' => self::getQrBizContent($page,$queryParam,$describe)
        ];
        $param = self::buildApiBuisinessParam($busiParam,self::API_METHOD_GENERATE_QR);
        return $param;

    }

    /**
     *获取授权的基础参数
     */
    public static function getAuthBaseParam($code,$refreshToken = ''){
        $busiParam = [
            'grant_type' => 'authorization_code',
            'code' => $code,
            'refresh_token' => $refreshToken,
        ];
        $param = self::buildApiBuisinessParam($busiParam,self::API_METHOD_AUTH_TOKEN);
        return $param;
    }


    /**
     * 构建业务参数
     */
    public static function buildApiBuisinessParam($businessParam,$apiMethod){
        $pubParam = self::getApiPubParam($apiMethod);
        $businessParam = array_merge($pubParam,$businessParam);
        $signContent = self::getSignContent($businessParam);
        error_log('sign_content ===========>'.$signContent);
        $rsaHelper = new RsaHelper();
        $sign = $rsaHelper->createSign($signContent);
        error_log('sign ===========>'.$sign);
        $businessParam['sign'] = $sign;
        return $businessParam;
    }


    /**
     * 公共参数
     *
     */
    public static function getApiPubParam($apiMethod){
        $ampBaseInfo = BusinessHelper::getAmpBaseInfo();
        $param = [
            'timestamp' => date('Y-m-d H:i:s') ,
            'method' => $apiMethod,
            'app_id' => formatArrValue($ampBaseInfo,'appid',config('param.amp.appid')),
            'sign_type' =>self::SIGN_TYPE_RSA2,
            'charset' =>self::FILE_CHARSET_UTF8,
            'version' =>self::VERSION,
        ];
        return $param;
    }


    /**
     * 获取签名的内容
     */
    public static function getSignContent($params) {
        ksort($params);
        $stringToBeSigned = "";
        $i = 0;
        foreach ($params as $k => $v) {
            if (!empty($v) && "@" != substr($v, 0, 1)) {
                if ($i == 0) {
                    $stringToBeSigned .= "$k" . "=" . "$v";
                } else {
                    $stringToBeSigned .= "&" . "$k" . "=" . "$v";
                }
                $i++;
            }
        }
        unset ($k, $v);
        return $stringToBeSigned;
    }


    public static function convertArrToQueryParam($param){
        $queryParam = [];
        foreach ($param as $key => $val){
            $obj = $key.'='.$val;
            array_push($queryParam,$obj);
        }
        $queryStr = implode('&',$queryParam);
        return $queryStr;
    }

    /**
     * 转换字符集编码
     * @param $data
     * @param $targetCharset
     * @return string
     */
    public static function characet($data, $targetCharset) {
        if (!empty($data)) {
            $fileType = self::FILE_CHARSET_UTF8;
            if (strcasecmp($fileType, $targetCharset) != 0) {
                $data = mb_convert_encoding($data, $targetCharset, $fileType);
            }
        }
        return $data;
    }

    /**
     * 获取业务参数内容
     */
    public static function getQrBizContent($page, $queryParam = [],$describe = ''){
        if(is_array($queryParam)){
            $queryParam = http_build_query($queryParam);
        }
        $obj = [
            'url_param' => $page,
            'query_param' => $queryParam,
            'describe' => $describe
        ];
        $bizContent = json_encode($obj,JSON_UNESCAPED_UNICODE);
        return $bizContent;
    }
}