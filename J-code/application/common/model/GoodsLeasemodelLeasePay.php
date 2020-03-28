<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-14
 * Time: 16:24
 */

namespace app\common\model;


use think\Model;

class GoodsLeasemodelLeasePay extends Model
{

    protected $table = 'gg_goods_leasemodel_lease_pay';

    public function getLease(){
        return $this->hasOne('GoodsLeasemodeLeaseModel','id','lease_id');
    }
}