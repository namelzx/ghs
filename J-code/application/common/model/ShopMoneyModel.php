<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-02-15
 * Time: 21:40
 */

namespace app\common\model;


use think\Model;

class ShopMoneyModel extends Model
{
    protected $table = 'tp_shop_money';
    protected $createTime = 'create_time';

    public function shop()
    {
        return $this->hasOne('ShopModel','id','shop_id');
    }

}