<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-04
 * Time: 01:57
 */

namespace app\admin\controller;


use app\admin\model\WechatUserModel;

class Wechatuser extends System
{

    public function GetDataByList()
    {
        $data = input('param.');
        $where = [];
        $res = WechatUserModel::where($where)->paginate($data['limit'], false, ['query' => [$data['page']]]);
        ajax_return_ok($res);
    }

    public function GetOpenidByFind()
    {
        $data = input('param.');
        $res = WechatUserModel::where('openid', $data['openid'])->find();
        if (empty($res)) {
            ajax_return_ok(404, '没有找到');
        }
        ajax_return_ok($res);
    }

}