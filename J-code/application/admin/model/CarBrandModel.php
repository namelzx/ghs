<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-01-30
 * Time: 00:22
 */

namespace app\admin\model;


use think\Model;

/**
 * Class CarBrandModel
 * @package app\admin\model
 * 汽车品牌模型
 */
class CarBrandModel extends Model
{

    protected $table = 'tp_car_brand';

    public function children()
    {
        return $this
            ->hasMany('CarSeriesModel', 'brand_id', 'brandid');
//            ->field('brand_id,factory_name as label,series_id as value');
    }
}