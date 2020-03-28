<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-14
 * Time: 16:19
 */

namespace app\common\model;


use think\Model;

class GoodsLeasemodeLeaseModel extends Model
{
    protected $table = 'gg_goods_leasemode_lease';


    public function pay()
    {

        return $this->hasMany('GoodsLeasemodelLeasePay', 'lease_id', 'id');
    }

    public function getLeaseModel(){
        return $this->hasOne('GoodsLeasemodeModel','id','leasemodel_id');
    }
}