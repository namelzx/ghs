<?php

namespace app\admin\controller;

use app\common\util\UploadUtil;

/**
 * 上传
 * @author hardphp@163.com
 */


header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, authKey, sessionId, Access-Token, X-Token,x-token,x-access-appid");

class Upload extends \think\Controller
{
    public function _initialize()
    {
        //跨域访问
//        if (config('app_debug') == true) {
        header("Access-Control-Allow-Origin:*");
        // 响应类型
        header("Access-Control-Allow-Methods:GET,POST");
        // 响应头设置
        header("Access-Control-Allow-Headers:x-requested-with,content-type,x-access-token,x-access-appid");
//        }
    }

    //上传图片
    public function upimage()
    {
        $filename = request()->file('file');
        if (empty($filename)) {
            ajax_return_error('参数错误');
        }
        $url = uploadUtil::upimage($filename);
        $url = request()->domain() . $url;
        ajax_return_ok(['url' => $url]);
    }

    //上传图片
    public function upvideo()
    {
        $filename = request()->file('file');
        if (empty($filename)) {
            ajax_return_error('参数错误');
        }
        $url = uploadUtil::upvideo($filename);
        $url = request()->domain() . $url;
        ajax_return_ok(['url' => $url]);
    }

    //上传文件
    public function upfile()
    {
        $filename = input('filename', '', 'trim');
        if (empty($filename)) {
            ajax_return_error('参数错误');
        }
        $url = uploadUtil::upfile($filename);
        $url = request()->domain() . $url;
        ajax_return_ok(['url' => $url]);
    }
}
