<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-01-30
 * Time: 00:24
 */

namespace app\admin\model;


use think\Model;

/**
 * Class CarSeriesModel
 * @package app\admin\model
 * 汽车系列模型
 */
class CarSeriesModel extends Model
{
    protected $table='tp_car_series';

    public function carbrand(){
        return $this->hasOne('CarBrandModel','brandid','brand_id');
    }
    public function children(){
        return $this->hasMany('CarModelModel','series_id','series_id')
            ->field('series_id,model_name as label,series_id as model_id');

    }
}