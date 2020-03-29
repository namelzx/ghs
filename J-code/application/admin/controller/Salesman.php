<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-02-02
 * Time: 21:46
 */

namespace app\admin\controller;


use app\admin\model\SalesmanModel;
use app\app\model\UserModel;

class Salesman extends System
{

    public function PostDataByAdd()
    {

        $data = input('param.');
        if (empty($data['id'])) {
            $res = SalesmanModel::create($data);
            ajax_return_ok($res);
        } else {
            $temp = [
                'realName' => $data['realName'],
                'phone' => $data['phone'],
                'openid' => $data['openid']
            ];
            $res = SalesmanModel::where('id', $data['id'])
                ->data($temp)->update();
            ajax_return_ok($res);

        }
    }

    public function GetDataByList()
    {
        $data = input('param.');
        $where[] = ['is_salesman', 'eq', 1];
        $res = UserModel::where($where)->order('nature asc')->paginate($data['limit'], false, ['query' => [$data['page']]]);
        ajax_return_ok($res);
    }

    public function del()
    {
        $data = input('param.');

        $res = SalesmanModel::where('id', $data['id'])->data(['status' => 2])->update();
        ajax_return_ok($res, '删除成功');
    }

    public function GetSaleByAll()
    {
        $res = SalesmanModel::where('status', 'neq', 2)->all();
        ajax_return_ok($res);
    }

}