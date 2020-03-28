<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-08-23
 * Time: 23:45
 */

namespace app\common\model;


use think\Model;

class OrderCourierModel extends Model
{
    protected $table = 'gg_order_courier';
    protected $createTime = 'create_time';

    public function Courier()
    {
        return $this->hasOne('CourieModel', 'id', 'courier_id');
    }

}