<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-01-30
 * Time: 00:25
 */

namespace app\admin\model;


use think\Model;

/**
 * Class CarModelModel
 * @package app\admin\model
 * 车型模型
 */
class CarModelModel extends Model
{
    protected $table='tp_car_model';

    public function carseries(){
        return $this->hasOne('CarSeriesModel','series_id','series_id');
    }

}