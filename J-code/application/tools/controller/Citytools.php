<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-04-13
 * Time: 22:37
 */

namespace app\tools\controller;


use app\app\model\CityModel;
use think\Controller;


header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, authKey, sessionId, Access-Token, X-Token,x-token,x-access-appid");

class Citytools extends Controller
{

    public function City()
    {

        $pid = input('param.pid', 0);
        $res = CityModel::
        field('name as label,id')
            ->where('pid', $pid)
            ->all();
//        $data = $this->getCity($data);
        ajax_return_ok($res);

    }

    public function Cityadminlist()
    {

        $data = CityModel::
        field('cityname as label,id as value')
            ->where('pid', 1)
            ->all();
        $data = $this->getCity($data);
        ajax_return_ok($data);

    }

    public function getCity($data)
    {
        $arr = [];
        foreach ($data as $i => $item) {
            $arr[$i] = $item;
            $arr[$i]['children'] = [];
            $caser = CityModel::where('pid', $item['value'])
                ->field('cityname as label,id as value')
                ->select();
            $arr[$i]['children'] = $caser;
        }
        return $this->CityArea($arr);
    }

    public function CityArea($data)
    {

        $arr = [];
        foreach ($data as $i => $item) {
            foreach ($item['children'] as $k => $kim) {
                $item['children'][$k]['children'] = CityModel::where('pid', $kim['value'])
                    ->field('cityname as label,id as value')
                    ->select();
            }
            $arr[$i] = $item;
        }
        return $arr;
    }

    public function GetCityByName()
    {
        $data = input('param.');
        $city = CityModel::where('name', $data['city'])->find();
        $area = CityModel::where(['name' => $data['district'], 'pid' => $city['id']])->find();
        $temp = [
            'provinces_id' => $city['pid'],
            'city_id' => $city['id'],
            'area_id' => $area['id']
        ];
        ajax_return_ok($temp);
    }

}