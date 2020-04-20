<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-19
 * Time: 01:04
 */

namespace app\common\model;


use think\Model;

class OrderModel extends Model
{

    protected $table = 'ee_order';
    protected $createTime = 'create_time';
    protected $updateTime = 'update_time';

    //获取用户的信息
    public function getUser()
    {
        return $this->hasOne('UserModel', 'id', 'user_id');
    }

    //获取商品信息
    public function goods()
    {
        return $this->hasMany('OrderGoodsModel', 'order_id', 'id');
    }


    //快递订单
    public function getCourier()
    {
        return $this->hasOne('OrderCourierModel', 'order_id', 'id');
    }
    public static function GetDataByList($data)
    {


        $where = [];
        if (!empty($data['order_id_in'])) {
            $where[] = ['id', 'in', $data['order_id_in']];
        }
        $res = self::with(['getUser']);

        if (!empty($data['time'])) {
            $res = $res->where('create_time', 'between time', $data['time']);
        }

        if (!empty($data['order_no'])) {
            $res = $res->where('out_trade_no', $data['order_no']);
        }

        if (!empty($data['status'])) {
            $res = $res->where('status', $data['status']);
        }
        $res = $res->where($where)->
        order('status asc,create_time desc')->
        paginate($data['limit'], false, ['query' => $data['page']]);
        return $res;

    }
}