<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-16
 * Time: 00:33
 */

namespace app\common\model;


use think\Model;

class CouponModel extends Model
{
    protected $table = 'gg_coupon';
    protected $createTime = 'create_time';
    protected $updateTime = 'create_time';

    public function getUserCoupon(){
        return $this->hasOne('CouponReceiveModel','coupon_id','id');
    }

    //获取数据列表
    public static function GetDataByList($data)
    {
        $where = [];
        if (!empty($data['title'])) {
            $where[] = ['name', '=', $data['title']];
        }
        $res = self::where($where)->paginate($data['limit'], false, ['query' => $data['page']]);
        return $res;

    }

}