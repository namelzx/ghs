<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-02-01
 * Time: 16:51
 */

namespace app\admin\model;


use think\Model;

class OrderModel extends Model
{
    protected $table = 'ee_order';
    protected $createTime = 'create_time';
    protected $updateTime = 'update_time';

//    public function getStatusAttr($value)
//    {
//        $status = [0 => '待处理', 1 => '待确认(业务)', 2 => '待确认(门店)', 3 => '待安装', 4 => '已安装', 5 => '财审1', 6 => '财审2', 7 => '待结算', 8 => '已结算', 9 => '驳回', 10 => '退货', 11 => '删除', 12 => '已评价'];
//        return $status[$value];
//    }

    //车型
    public function carmodel()
    {
        return $this->hasOne('CarModelModel', 'model_id', 'car_model_id');
    }

    //购买平台
    public function lazada()
    {
        return $this->hasOne('EcshopClassModel', 'id', 'lazada_id');
    }

    public function product()
    {
        return $this->hasOne('ProductModel', 'id', 'buy_product_id');
    }

    public function weacht()
    {
        return $this->hasOne('WechatUserModel', 'openid', 'openid');
    }

    //主业务员
    public function sales()
    {
        return $this->hasOne('SalesmanModel', 'id', 'salesman_id');
    }

    //次业务员
    public function insales()
    {
        return $this->hasOne('SalesmanModel', 'id', 'in_salesman_id');
    }

    public function shop()
    {
        return $this->hasOne('ShopModel', 'id', 'shop_id');
    }


    public function access()
    {
        return $this->hasMany('OrderSaleModel', 'order_id', 'id');

    }


//售前客服
    public function pre()
    {
        return $this->hasOne('Admin', 'id', 'pre_sales');
    }

// 售后客服
    public function after()
    {
        return $this->hasOne('Admin', 'id', 'after_sale');
    }

    //订单评价
    public function eva(){
        return $this->hasOne('OrderEvaModel','order_id','id');
    }

    /**
     * 查询方法
     */
    public function GetDataByList($data, $where)
    {
        $res = self::with([
            'lazada',
            'product' => ['classif'],
            'weacht',
            'sales',
            'insales',
            'shop',
            'pre',
            'after',
            'eva'
        ])
            ->where($where)
            ->withCount('access', function ($query) {
                $query->where('type', 'return');
            })->order('id desc')->

            paginate($data['limit'], false, ['query' => [$data['page']]]);

        return $res;

    }


    public static function PostDataByALL($data)
    {
        $res = self::create($data);
        return $res;
    }

}