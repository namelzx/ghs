<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-07
 * Time: 02:45
 */

namespace app\app\model;


use think\Model;

class OrderModel extends Model
{
    protected $table = 'ee_order';

    public function goods()
    {
        return $this->hasMany('OrderGoodsModel', 'order_id', 'id');
    }

}