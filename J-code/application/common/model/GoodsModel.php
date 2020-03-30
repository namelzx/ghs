<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-13
 * Time: 16:39
 */

namespace app\common\model;


use think\Model;

//商品表
class GoodsModel extends Model
{
    protected $table = 'ee_goods';
    protected $createTime = 'create_time';
    protected $updateTime = 'create_time';

    public static function GetDataByList($data)
    {

        $where = [];
        if (!empty($data['title'])) {
            $where[] = ['name', 'eq', $data['title']];
        }
        if (!empty($data['status'])) {
            $where[] = ['status', 'eq', $data['status']];
        }
        if (!empty($data['type'])) {
            $where[] = ['type', 'eq', $data['type']];
        }


           if (!empty($data['community'])) {
               $where[] = ['community', 'eq', $data['community']];
           }
        if (!empty($data['category_id'])) {
            $where[] = ['category_id', 'eq', $data['category_id']];
        }
        $res = self::with(['creategory', 'brand'])->where($where)->where('status','neq',3)->paginate($data['limit'], false, ['query' => $data['page']]);
        return $res;
    }

    public function leasemode()
    {
        return $this->hasMany('GoodsLeasemodeModel', 'goods_id', 'id');
    }

    public function specifications()
    {
        return $this->hasMany('ParameterModel', 'goods_id', 'id');
    }

    /**
     * @return \think\model\relation\HasOne
     * 所属分类
     */
    public function creategory()
    {
        return $this->hasOne('CategoryModel', 'id', 'category_id');
    }

    //获取数据列表

    public function brand()
    {
        return $this->hasOne('BrandModel', 'id', 'brand_id');
    }

    public function goodsSuk()
    {
        return $this->hasMany('GoodsSukModel', 'goods_id', 'id');
    }

    public  function rule(){
        return $this->hasOne('RulesArticleModel','id','rules_id');
    }
}