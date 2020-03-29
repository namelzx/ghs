<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-04
 * Time: 01:57
 */

namespace app\admin\controller;


use app\app\model\UserModel;

class Wechatuser extends System
{

    public function GetDataByList()
    {
        $data = input('param.');
        $where = [];
        $res = UserModel::where($where)->order('nature asc')->paginate($data['limit'], false, ['query' => [$data['page']]]);
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

    public function PostRoleByUpdate()
    {
        $data = input('param.');
        $res = UserModel::where('id', 'in', $data['ids'])->data([$data['field'] => $data['status']])->update();
        ajax_return_ok($res);
    }

}