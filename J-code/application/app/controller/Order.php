<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-07
 * Time: 03:11
 */

namespace app\app\controller;


use app\app\model\EvaluateModel;
use app\app\model\GoodsModel;
use app\app\model\OrderModel;
use app\app\model\ShopModel;

class Order extends Base
{
    public function GetDataByInfo()
    {
        $data = input('param.');
        $res = OrderModel::with(['goods'])->where('id', $data['id'])->find();
        ajax_return_ok($res);
    }

    /**
     * 根据用户信息获取所需订单
     */
    public function GetUserIdByList()
    {
        $data = input('param.');
        $where = [];
        if (!empty($data['status'])) {
            if ($data['status'] !== 'undefined') {
                $where[] = ['status', 'eq', $data['status']];
            }
        }
        $res = OrderModel::with(['goods'])
            ->order('id desc')
            ->where($where)->paginate($data['limit'], false, ['query' => $data['page']]);
        ajax_return_ok($res);
    }

    public function PostDataByUpdate()
    {
        $data = input('param.');
        $where = [];
        $order = [];
        if (!empty($data['id'])) {
            $where[] = ['id', 'eq', $data['id']];
            $order['status'] = $data['status'];
            if ($data['status'] === 2) {
                $order['out_trade_no'] = $data['out_trade_no'];
            }
        }
        $order['paymentTime'] = time();
        OrderModel::where($where)->data($order)->update();
        ajax_return_ok($data['id']);
    }

    public function PostdataByStatus()
    {
        $data = input('param.');
        $res = GoodsModel::where('id', 'in', $data['in_id'])->data(['status' => 1])->update();

        ajax_return_ok($res);
    }

    public function GetShopOrderByUpdate()
    {
        $data = input('param.');
        $res = OrderModel::where('id', $data['id'])->data(['status' => $data['status']])->update();
        $order = OrderModel::where('id', $data['id'])->find();
        if ((int)$data['status'] === 4) {
            OrderModel::where('id', $data['id'])->data(['receiveTime' => time()])->update();
            ShopModel::where('id', $order['shop_id'])->setInc('balance', $order['totalPrice']);
        }
        ajax_return_ok($res);
    }


    public function PostevakuteByAdd()
    {
        $data = input('param.');
        $res = EvaluateModel::create($data);
        OrderModel::where('id', $data['order_id'])->data(['status' => 5,'commentTime'=>time()])->update();
        ajax_return_ok($res);
    }

}