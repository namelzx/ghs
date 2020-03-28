<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-19
 * Time: 16:18
 */

namespace app\common\model;


use think\Model;

class AddressModel extends Model
{

    protected $table = 'gg_address';

    public static function PostDataByadd($data)
    {
        $res = self::insert($data);
        return $res;
    }


}