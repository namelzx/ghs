<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-08
 * Time: 22:36
 */

namespace app\app\controller;


use app\admin\model\CommunityModel;

class Community extends Base
{
    public function GetDataBylist()
    {
        $res = CommunityModel::all();
        ajax_return_ok($res);
    }

}