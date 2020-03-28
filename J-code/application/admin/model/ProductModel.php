<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-02-01
 * Time: 00:50
 */

namespace app\admin\model;


use think\Model;

class ProductModel extends Model
{
    protected $table='tp_product';

    public function classif(){
        return $this->hasOne('ProductClassModel','id','class_id');
    }
    public static function GetDataByList($data)
    {
        $where = [];
        if (!empty($data['title'])) {

            $where[] = ['title', 'like', '%' . $data['title'] . '%'];
        }

        if (!empty($data['class_id'])) {
            $where[] = ['class_id', 'eq',  $data['class_id'] ];
        }

        if (!empty($data['pid'])) {
            $where[] = ['pid', 'eq',  $data['pid'] ];
        }
        $res = self::with(['classif'])
            ->where($where)
            ->paginate($data['limit'], false, ['query' => [$data['page']]]);
        return $res;

    }

}