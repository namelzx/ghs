<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-13
 * Time: 16:37
 */

namespace app\common\model;


use think\Model;

//商品分类表
class CategoryModel extends Model
{
    protected $table = 'ee_category';
    protected $createTime = 'create_time';
    protected $updateTime = 'create_time';

    public static function GetDataByList($data)
    {

        $where = [];
        if (!empty($data['title'])) {
            $where[] = ['name', '=', $data['title']];
        }
        $res = self::where($where)->paginate($data['limit'], false, ['query' => $data['page']]);
        return $res;

    }

    //获取数据列表

    public function getGoods()
    {
        return $this->hasMany('GoodsModel', 'category_id', 'id');
    }

}