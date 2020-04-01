<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-31
 * Time: 23:39
 */

namespace app\admin\controller;


use app\common\model\ConfigModel;

class Config extends System
{
    public function GetConfigByInfo()
    {
        $res = ConfigModel::find();
        ajax_return_ok($res);
    }

    public function PostDataByUpdate()
    {
        $data = input('param.');
        $res = ConfigModel::where('id', $data['id'])->data($data)->update();
        ajax_return_ok($res);
    }

}