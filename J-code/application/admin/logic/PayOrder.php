<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-02-24
 * Time: 15:57
 */

namespace app\admin\logic;


use app\admin\model\EcshopClassModel;
use app\admin\model\WechatUserModel;
use think\Db;
use think\Model;

class payOrder extends Model
{

    public function getLists($data)
    {

        $where = [];
        if (!empty($data['id'])) {
            $where[] = ['id', 'eq', $data['id']];
        }


        if (!empty($data['openid'])) {
            $where[] = ['openid', 'eq', $data['openid']];
        }

        if (!empty($data['openid'])) {
            $where[] = ['openid', 'eq', $data['openid']];
        }

        if (!empty($data['nickname'])) {
            $getopenid = WechatUserModel::where('nickname', $data['nickname'])->value('openid');
            $where[] = ['openid', 'eq', $getopenid];

        }


        if (!empty($data['lazada_list'])) {
            if (count($data['lazada_list']) > 1) {
                $lazada_list = implode(',', $data['lazada_list']);

            } else {
                $lazada_list = $data['lazada_list'][0];
            }
            $where[] = ['lazada_list', 'eq', $lazada_list];
        }

        if (!empty($data['startTime'])) {
            $startTime = strtotime($data['startTime'][0]);
            $endTime = strtotime($data['startTime'][1]);
            $where[] = ['create_time', 'between time', [$startTime, $endTime]];
        }
        //车型条件
        if (!empty($data['car_model'])) {
            if (count($data['car_model']) > 1) {
                $car_model = implode(',', $data['car_model']);

            } else {
                $car_model = $data['car_model'][0];
            }
            $where[] = ['car_model', 'eq', $car_model];
        }

        if (!empty($data['buy_product_id'])) {
            if (count($data['buy_product_id']) > 1) {
                $buy_product_id = implode(',', $data['buy_product_id']);

            } else {
                $buy_product_id = $data['buy_product_id'][0];
            }
            $where[] = ['buy_product_id', 'eq', $buy_product_id];
        }

        if (!empty($data['cityCode'])) {
            $cityCode = implode(',', $data['cityCode']);
            $where[] = ['city_code', 'eq', $cityCode];
        }
        if (!empty($data['buy_order_no'])) {

            $where[] = ['buy_order_no', 'eq', $data['buy_order_no']];
        }
        if (!empty($data['contact'])) {

            $where[] = ['contact', 'eq', $data['contact']];
        }
        if (!empty($data['contact'])) {

            $where[] = ['contact', 'eq', $data['contact']];
        }
        if (!empty($data['salesman_id'])) {

            $where[] = ['salesman_id', 'eq', $data['salesman_id']];
        }
        if (!empty($data['salesman_id'])) {

            $where[] = ['salesman_id', 'eq', $data['salesman_id']];
        }
        if (!empty($data['in_salesman_id'])) {
            $where[] = ['in_salesman_id', 'eq', $data['in_salesman_id']];
        }

        if (!empty($data['is_visit'])) {
            $where[] = ['is_visit', 'eq', $data['is_visit']];
        }

        if (!empty($data['is_after'])) {
            $where[] = ['is_after', 'eq', $data['is_after']];
        }


        if (!empty($data['service'])) {
            $where[] = ['service', 'eq', $data['service']];
        }
        if (!empty($data['shop_id'])) {
            $where[] = ['shop_id', 'eq', $data['shop_id']];
        }

        if (!empty($data['status']) && $data['status'] !== 'all') {

//            if ($data['status'] === '1') {
//                $where[] = ['status', 'in', [1, 9]];
//            }else{
            $where[] = ['status', 'eq', $data['status']];
//            }

        }
        if ($data['status'] === '0') {
            $where[] = ['status', 'in', [0, 9]];
        }

        $user = my_model('PayOrderModel', 'model', 'admin')->GetDataByList($data, $where);

        $coudata = Db::name('payorder')->field('count(id) as total,status')->group('status')->select();
        $temp = [
            'data' => $this->getCar($user->items()),
            'total' => $user->total(),
            'countdata' => $coudata
        ];

        return $temp;
    }

    public function getCar($data)
    {
        $arr = [];
        foreach ($data as $i => $item) {
            $arr[$i] = $item;
            $carmodel = $item['carmodel']['model_name'];
            $carseries = $item['carmodel']['carseries']['series_name'];
            $carbrand = $item['carmodel']['carseries']['carbrand']['name'];
            $label_array = explode(",", $item['car_model']);

            $brand = Db::name('car_brand')->where('brandid', $label_array[0])->value('name');


            $factory_name = Db::name('car_series')->where('series_id', $label_array[1])->field('factory_name,series_name')->find();
            $model = Db::name('car_model')->where('model_id', $label_array[2])->value('model_name');
            $arr[$i]['model_title'] = $brand . ' ' . $factory_name['series_name'] . ' ' . $model;

            $arr[$i]['carmodel_title'] = $carbrand . '' . $carseries . '' . $carmodel;
            $getplazada = EcshopClassModel::where('id', $item['lazada']['pid'])->value('field_title');
            $arr[$i]['lazada_title'] = $item['lazada']['field_title'] . $getplazada;
            $productlist = explode(",", $item['buy_product_id']);
            $arr[$i]['product_titile'] = Db::name('product_class')->where('id', $productlist[count($productlist) - 1])->value('field_title');
        }
        return $arr;

    }
}