<?php


namespace app\app\controller;




use app\app\model\OrderModel;
use app\app\model\UserLocationModel;

class Useraddress extends Base
{
    public function PostDataByAdd()
    {
        $data = input('param.');
        if (empty($data['id'])) {
            $res = UserLocationModel::create($data);
            ajax_return_ok($res);
        }
        else {
            $temp = [
                'name'=>$data['name'],
                'phone'=>$data['phone'],
                'address'=>$data['address'],
                'city_code'=>$data['city_code']
            ];
            $res = UserLocationModel::where('id', $data['id'])->data($temp)->update();
            ajax_return_ok($res);
        }
    }
    


    public function GetDataByUseradderss() {
        $data = input('param.');
        $order = [
            'id' => 'desc',
            'status' => 1
        ];
        $res = UserLocationModel::where('user_id', $data['id'])->order($order)->select();
        ajax_return_ok($res);
    }
}