<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-12-11
 * Time: 16:41
 */

namespace app\lib\exception;


use think\Exception;

class BaseException extends Exception
{


//    定义http状态码
    public $code=400;
    public $msg="通用参数错误";
    public $errorCode="10000";
    public function __construct($param=[])
    {
        if(!is_array($param))
        {
            return;
        }
        if(array_key_exists('code',$param))
        {
            $this->code=$param['code'];
        }
        if(array_key_exists('msg',$param))
        {
            $this->msg=$param['msg'];
        }
        if(array_key_exists('errorCode',$param))
        {
            $this->errorCode=$param['errorCode'];
        }

    }

}