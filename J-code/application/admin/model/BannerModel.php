<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-12
 * Time: 01:26
 */

namespace app\admin\model;


use think\Model;

class BannerModel extends Model
{
    protected $table='ee_banner';
    public static function GetDataByList($data)
    {
        $where = [];
//        if (!empty($data['name'])) {
//            $where[] = ['name', 'eq', $data['name']];
//        }
        $res = self::where($where)->order('sort desc')->paginate($data['limit'], false, ['query' => $data['page']]);
        return $res;
    }
}