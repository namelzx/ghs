<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-30
 * Time: 10:24
 */

namespace app\admin\controller;


use app\app\model\OrderGoodsModel;
use app\common\model\OrderBuyoutModel;
use app\common\model\OrderCourierModel;
use app\common\model\OrderModel;

class Order extends System
{


    /**
     * 获取数据列表
     */
    public function GetDataByList()
    {
        $data = input('param.');
        if (!empty($data['goodsname'])) {
            $data['order_id_in'] = OrderGoodsModel::where('name', 'like', $data['goodsname'] . '%')->column('order_id');

        }
        $res = OrderModel::GetDataByList($data);
        return json(['msg' => '获取成功', 'data' => $res, 'code' => 20000], 200);
    }


    /**
     * 获取买断订单
     */

    public function GetBuyoutByList()
    {
        $data = input('param.');
        $res = OrderBuyoutModel::GetDataByList($data);
        return json(['msg' => '获取成功', 'data' => $res, 'code' => 20000], 200);
    }

    /**
     * 取消订单
     */
    public function PostDataByCancel()
    {

        $data = input('param.');
        $res = OrderModel::where('id', $data['id'])->data($data)->update();
        return json(['msg' => '订单取消成功', 'data' => $res, 'code' => 20000], 200);

    }


    /**
     * 获取订单详细
     */
    public function GetIdByDetails()
    {
        $data = input('param.');
        $res = OrderModel::with(['goods'])->where('id', $data['id'])->find();
        ajax_return_ok($res);
        $logistics = "";
        if (!empty($res['get_courier'])) {

            $requestData = "{'OrderCode':'" . $res['get_courier']['out_courier_no'] . "','ShipperCode':'" . $res['get_courier']['courier']['value'] . "','LogisticCode':'" . $res['get_courier']['out_courier_no'] . "'}";


            $logistics = json_decode($this->getOrderTracesByJson($requestData));

            if (!empty($logistics)) {

                $res['logis'] = $logistics->Traces[count($logistics->Traces) - 1];

            }
        }

        return json(['msg' => '获取订单信息', 'data' => $res, 'code' => 20000]);
    }


    public function postCourier()
    {
        $data = input('param.');
        $res = OrderCourierModel::create($data);
        OrderModel::where('id', $data['order_id'])->data(['status' => 3])->update();//更新订单状态为已发货
        return json(['msg' => '提交成功', 'data' => $res, 'code' => 20000]);
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

    /**
     * 发货
     */
    public function deliveryOrder()
    {
        $data = input('param.');
        $data['status'] = 3;
        $data['deliveryTime'] = time();
        $res = OrderModel::where('id', $data['id'])->data($data)->update();
        ajax_return_ok($res);

    }
}