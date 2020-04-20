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
        $where = [];
        if (!empty($data['city'])) {
            $where[] = ['location', 'like', '%' . $data['city'] . '%'];
        }
        if (!empty($data['name'])) {
            $where[] = ['name', 'like', '%' . $data['name'] . '%'];
        }
        $res = Db::name('community')->where($where)->select();
        ajax_return_ok($res);
    }


    //收货人所选区域数据
    public function GetByCitylist()
    {
        $data = input('param.');
        $where = [];
        if (empty($data['id'])) {
            $where[] = ['grade', 'eq', 1];
        } else {
            $where[] = ['pid', 'eq', $data['id']];
        }
        $res = CityModel::where($where)->select();
        ajax_return_ok($res);
    }

}