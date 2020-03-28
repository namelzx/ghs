<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-11-23
 * Time: 23:36
 */

namespace app\admin\model;


use think\Model;

class BolgMuenModel extends Model
{
    protected $table = 'tp_bolg_muen';
    protected $createTime = 'create_time';

    public static function GetDataByList($data)
    {
        $res = self::paginate($data['limit'], false, ['query' => [$data['page']]]);
        return $res;

    }
}