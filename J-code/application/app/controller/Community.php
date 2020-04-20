<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-08
 * Time: 22:36
 */

namespace app\app\controller;


use app\admin\model\CommunityModel;
use app\app\model\CityModel;

class Community extends Base
{
    public function GetDataBylist()
    {
        $res = CommunityModel::all();
        ajax_return_ok($res);
    }

    public function PostDataByAdd()
    {
        $data = input('param.');
        if (empty($data['location'])) {
            ajax_return_error('请输入地址');
        }

        $tem = $this->getCoord($data['location']);
        if ($tem === '查询无结果') {
            ajax_return_error($tem);
        }
        $getarea = CityModel::where('name', 'like', '%' . $tem['title'] . '%')->find();
        $data['area'] = $getarea['id'];
        $data['city'] = $getarea['pid'];
        $province = CityModel::where('id', 'eq', $getarea['pid'])->find();
        $data['province'] = $province['pid'];
        $data['city_code'] = $data['province'] . ',' . $data['city'] . ',' . $data['area'];
        $data['lat'] = $tem['location']['lat'];
        $data['lng'] = $tem['location']['lng'];
        $res = CommunityModel::create($data);
        ajax_return_ok($res);
    }

    public function getCoord($address)
    {
        $url = 'https://apis.map.qq.com/ws/geocoder/v1/?address=' . $address . '&key=XB2BZ-J7PW3-DIZ3P-YC34A-BWFW7-ELBOI';
        $res = curlSend($url);
        if ($res['message'] !== 'query ok') {
            return $res['message'];
        }
        return $res['result'];
    }
}