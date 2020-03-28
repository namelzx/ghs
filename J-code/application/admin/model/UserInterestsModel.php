<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-04
 * Time: 02:31
 */

namespace app\admin\model;


use think\Model;

class UserInterestsModel extends Model
{
    protected $table = 'ee_user_interests';
    protected $createTime = 'create_time';

    public static function GetDataByList($data)
    {

        $where = [];
        if (!empty($data['title'])) {
            $where[] = ['name', 'eq', $data['title']];
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