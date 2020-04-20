<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-04-19
 * Time: 07:57
 */

namespace app\admin\controller;


use app\admin\model\OrderModel;

class Home extends System

{
    /**
     * 获取统计数据
     */
    public function GetDataByretail()
    {

        $data = input('param.');
        $temp = [];
        $where = [];
        $temp['no_payment'] = OrderModel::where('status', 1)->whereOr($where)->count();
        $temp['hair'] = OrderModel::where('status', 2)->whereOr($where)->count();//待发货
        $temp['receiving'] = OrderModel::where('status', 4)->whereOr($where)->count();//待签收
        $temp['complete'] = OrderModel::where('status', 5)->whereOr($where)->count();//待已完成
        $temp['total'] = OrderModel::where($where)->count();//待已完成
        $temp['totalPrice'] = OrderModel::where('status', '>', 2)->where($where)->sum('totalPrice');//待已完成
        ajax_return_ok($temp);
    }

}