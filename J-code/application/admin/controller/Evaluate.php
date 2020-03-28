<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-29
 * Time: 01:24
 */

namespace app\admin\controller;


use app\admin\model\EvaluateModel;
use app\admin\model\OrderModel;
use app\admin\model\UserModel;

class Evaluate extends System
{
    /**
     * 获取数据列表
     */
    public function GetDataByList()
    {
        $data = input('param.');
        $res = EvaluateModel::GetDataByList($data);
        ajax_return_ok($res);
    }


    public function GetIdByDelete()
    {
        $data = input('param.');

        $res = EvaluateModel::where('id', 'in', $data['id'])->delete();
        ajax_return_ok($res);
    }


    /**
     * 订单结算
     */
    public function postOrderClose()
    {
        $data = input('param.');
        $data['status'] = 6;// 6为订单结算
        $data['close_time'] = time();
        $res = OrderModel::where('id', $data['id'])->data($data)->update();
        return json(['msg' => '结算成功', 'data' => $res, 'code' => 20000]);

    }

}