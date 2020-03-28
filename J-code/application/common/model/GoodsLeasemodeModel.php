<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-14
 * Time: 16:15
 */

namespace app\common\model;


use think\Model;

class GoodsLeasemodeModel extends Model
{
    protected $table = 'gg_goods_leasemode';

    public function lease()
    {

        return $this->hasMany('GoodsLeasemodeLeaseModel', 'leasemodel_id', 'id');

    }

}