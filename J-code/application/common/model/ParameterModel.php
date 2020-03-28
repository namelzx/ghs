<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-14
 * Time: 16:38
 */

namespace app\common\model;


use think\Model;

class ParameterModel extends Model
{
    protected $table = 'gg_parameter';

    public function infotype()
    {
        return $this->hasMany('ParameterInfoModel', 'parameter_id', 'id');
    }

}