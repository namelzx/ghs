<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-12-11
 * Time: 16:42
 */

namespace app\lib\exception;


use think\exception\Handle;

class ExceptionHandler extends Handle
{

    private $code;
    private $msg;
    private $errorCode;
    public function render(\Exception $e)
    {
        if($e instanceof BaseException)
        {
            $this->code=$e->code;
            $this->msg=$e->msg;
            $this->errorCode=$e->errorCode;
        }
        else
        {
            if(config('app_debug'))
            {
                return parent::render($e);
            }
            else
            {
                $this->code=200;
                $this->msg=$e->getMessage();
                $this->errorCode=999;
//                $this->recordErrorLog($e);
            }

        }
        $err=[
            'errorCode'=>$this->errorCode,
            'message'=>$this->msg,
//            'url'=>Request::instance()->url()
        ];
        return json($err,$this->code);
    }
    private function recordErrorLog(\Exception $e){
        Log::init([
            'type'  => 'File',
            // 日志保存目录
            'path'  => LOG_PATH,
            // 日志记录级别
            'level' => ['error'],
        ]);

        Log::record($e->getMessage(),'error');
    }

}