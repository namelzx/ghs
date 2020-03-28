<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-01-27
 * Time: 22:05
 */

namespace app\admin\model;


use think\Model;

class ShopModel extends Model
{
    protected $table = 'tp_shop';
    protected $createTime = 'create_time';



    public function getShoptypeAttr($value)
    {
        $status = [0=> '普通', 1=> '普通',  2 => '阿帕认证', 3 => '阿帕3星', 4 => '阿帕4星', 5 => '阿帕5星'];
        return $status[$value];
    }
    public function wechat()
    {
        return $this->hasOne('WechatUserModel', 'id', 'user_id');
    }

    public function env()
    {
        return $this->hasMany('ShopEnvModel', 'shop_id', 'id');
    }
    public function rejected(){
        return $this->hasMany('ShopRejectedModel','shop_id','id');
    }


    public function salesman(){
        return $this->hasOne('SalesmanModel','id','salesman_id');
    }

    public static function GetDataByList($data)
    {

        $where = [];
        if (!empty($data['shopname'])) {
            $where[] = ['shopname', 'like', '%' . $data['shopname'] . '%'];
        }

        if (!empty($data['shopkeeper'])) {
            $where[] = ['shopkeeper', 'like', '%' . $data['shopkeeper'] . '%'];
        }

        if (!empty($data['tel'])) {
            $where[] = ['tel', 'like', '%' . $data['tel'] . '%'];
        }
        if (!empty($data['status'])) {
            $where[] = ['status', 'eq',  $data['status']];
        }
        $res = self::with(['wechat', 'env'])
            ->where($where)
            ->paginate($data['limit'], false, ['query' => [$data['page']]]);
        return $res;
    }
}