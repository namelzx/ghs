<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-04
 * Time: 04:17
 */

namespace app\admin\model;


use think\Model;

class CommunityModel extends Model
{
    protected $table = 'ee_community';

    public function city()
    {
        return $this->hasOne('cityModel', 'id', 'city_id');
    }

    public static function GetDataByList($data)
    {
        $where = [];
        if (!empty($data['title'])) {
            $where[] = ['name', '=', $data['title']];
        }
        $res = self::with(['city'])->where($where)->order('sort')->paginate($data['limit'], false, ['query' => $data['page']]);
        return $res;
    }

    //获取数据列表

    public function getGoods()
    {
        return $this->hasMany('GoodsModel', 'category_id', 'id');
    }

}