<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-08-06
 * Time: 13:07
 */

namespace app\common\model;


use think\Model;

class GoodsSukModel extends Model
{
    protected $table = 'gg_goods_suk';

    public function lease()
    {
        return $this->hasMany('GoodsSukLeaseModel', 'suk_id', 'id');
    }

    public function ebo()
    {
        return $this->hasMany('GoodsSukEboModel', 'suk_id', 'id');
    }
}