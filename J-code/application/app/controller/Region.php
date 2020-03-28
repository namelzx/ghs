<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-05
 * Time: 04:10
 */

namespace app\app\controller;


use app\app\model\CityModel;
use think\Db;

class Region extends Base
{
    public function GetCity()
    {
        $res = CityModel::all();
        ajax_return_ok($res);
    }

    public function GetCommunityBylist()
    {
        $data = input('param.');
        $res=Db::name('community')->select();
        ajax_return_ok($res);

    }

}