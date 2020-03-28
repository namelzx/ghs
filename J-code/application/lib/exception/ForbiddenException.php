<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-12-11
 * Time: 16:54
 */

namespace app\lib\exception;


class ForbiddenException extends BaseException
{
    public $code = 403;
    public $msg = '权限不足';
    public $errorCode = 10001;

}