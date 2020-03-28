<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-08-23
 * Time: 17:28
 */

namespace app\common\model;


use think\Model;

class CourieModel extends Model
{
    protected $table='gg_courier';

    public static function getDataByList($data)
    {
        $res = self::paginate($data['limit'], false, ['query' => $data['page']]);
        return $res;
    }

}