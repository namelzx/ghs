<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-02-24
 * Time: 15:50
 */

namespace app\admin\model;


use think\Model;

class PayOrderModel extends Model
{
    protected $table = 'tp_payorder';
    protected $createTime = 'create_time';

    public function getStatusAttr($value)
    {
        $status = [1 => '待初审', 2 => '待财审1', 3 => '待财审2', 4 => '待结算', 5 => '已结算', 6 => '驳回'];
        return $status[$value];
    }


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
            'after'
        ])
            ->where($where)
            ->withCount('access', function ($query) {
                $query->where('type', 'return');
            })->order('status')->

            paginate($data['limit'], false, ['query' => [$data['page']]]);
        return $res;
    }

    public static function PostDataByALL($data)
    {
        $res = self::create($data);
        return $res;
    }
}