<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-02-08
 * Time: 22:33
 */

namespace app\common\controller;


header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, authKey, sessionId, Access-Token, X-Token");

class Upload extends Base
{

    public function upimage()
    {

        try {
            $file = request()->file('file');
            // 移动到框架应用根目录/uploads/ 目录下
            $info = $file->move('./uploads/');
            if ($info) {
                $path = $info->getSaveName();
                $fileName = 'http://aystest.10huisp.com/uploads/' . $info->getSaveName();
                ajax_return_ok($fileName);
            } else {
                // 上传失败获取错误信息
                echo $file->getError();
            }
        } catch (Exception $e) {
            return json($e->getMessage());
        }
        return json($file);
    }
}