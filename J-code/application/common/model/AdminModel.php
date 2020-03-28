<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-13
 * Time: 16:36
 */

namespace app\common\model;


use think\Model;

//管理员登陆表
class AdminModel extends Model
{
    protected $table = 'gg_admin';

    public static function getDataByList($data)
    {
        $res = self::paginate($data['limit'], false, ['query' => $data['page']]);
        return $res;
    }

}