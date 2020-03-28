<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-15
 * Time: 23:59
 */

namespace app\common\model;


use think\Model;

class ThemeGoodsModel extends Model
{

    protected $table = 'gg_theme_goods';

    public function getGoods()
    {
        return $this->hasOne('GoodsModel', 'id', 'goods_id');
    }


}