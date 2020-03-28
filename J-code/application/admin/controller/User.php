<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-28
 * Time: 23:13
 */

namespace app\admin\controller;


use app\app\model\UserModel;

class User extends System
{

    public function GetDataByList()
    {
        $data = input('param.');
        $where = [];
        $res = UserModel::where($where)->paginate($data['limit'], false, ['query' => [$data['page']]]);
        ajax_return_ok($res);
    }

    public function GetOpenidByFind()
    {
        $data = input('param.');
        $res = UserModel::where('openid', $data['openid'])->find();
        if (empty($res)) {
            ajax_return_ok(404, '没有找到');
        }
        ajax_return_ok($res);
    }


}