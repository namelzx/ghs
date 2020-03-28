<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-28
 * Time: 19:22
 */

namespace app\common\model;


use think\Model;

class CouponReceiveModel extends Model
{
    protected $table = 'gg_coupon_receive';
    protected $createTime = 'create_time';
    public function getCounpon(){
        return $this->hasOne('CouponModel','id','coupon_id');
    }

}