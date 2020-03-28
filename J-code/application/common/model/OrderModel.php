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

    protected $table = 'gg_order';
    protected $createTime = 'create_time';
    protected $updateTime = 'update_time';

    public function getGoods()
    {
        return $this->hasOne('GoodsModel', 'id', 'goods_id');
    }

    public function suk()
    {
        return $this->hasOne('GoodsSukModel', 'id', 'suk_id');
    }

    //获取商品租期模式
    public function getLeaseModel()
    {
        return $this->hasOne('GoodsLeasemodeModel', 'id', 'leasemode_id');
    }

    //获取商品租期
    public function getLease()
    {
        return $this->hasOne('GoodsLeasemodeLeaseModel', 'id', 'leas_id');
    }

    //获取商品支付方式
    public function getPay()
    {
        return $this->hasOne('GoodsLeasemodelLeasePay', 'id', 'pay_id');
    }

    public function getPeriods()
    {
        return $this->hasMany('OrderPeriodsModel', 'order_id', 'id');
    }

    //获取订单用户的地址
    public function getAddress()
    {
        return $this->hasOne('AddressModel', 'id', 'address_id');
    }

    //获取用户使用的优惠卷
    public function getUserCoupon()
    {
        return $this->hasOne('CouponReceiveModel', 'id', 'coupons_id');
    }

    //获取用户的信息
    public function getUser()
    {
        return $this->hasOne('UserModel', 'id', 'user_id');
    }

    //快递订单
    public function getCourier()
    {
        return $this->hasOne('OrderCourierModel', 'order_id', 'id');
    }

    public static function GetDataByList($data)
    {

        $res = self::hasWhere('getAddress', function ($query) use ($data) {
            if (!empty($data['name'])) {
                if (!empty($data['mobile'])) {
                    $temp = [
                        'name' => $data['name'],
                        'mobile' => $data['mobile']
                    ];
                    $query->where($temp);
                } else {

                    $query->where('name', $data['name']);

                }
            } else {
                if (!empty($data['mobile'])) {
                    $query->where('mobile', $data['mobile']);
                }
            }
        })->with(['getUser', 'getGoods', 'getLeaseModel', 'getLease', 'getPay' => ['getLease' => ['getLeaseModel']], 'getPeriods', 'getAddress', 'getUserCoupon']);

        if (!empty($data['time'])) {
            $res = $res->where('create_time', 'between time', $data['time']);
        }

        if (!empty($data['order_no'])) {
            $res = $res->where('out_trade_no', $data['order_no']);
        }

        if (!empty($data['status'])) {
            $res = $res->where('OrderModel.status', $data['status']);
        }

        $res = $res->paginate($data['limit'], false, ['query' => $data['page']]);
        return $res;

    }
}