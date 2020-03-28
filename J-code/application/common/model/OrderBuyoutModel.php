<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-09-01
 * Time: 16:19
 */

namespace app\common\model;


use think\Model;

/**
 * Class OrderBuyoutModel
 * @package app\common\mode
 * 买断订单表
 */
class OrderBuyoutModel extends Model
{
    protected $table = 'gg_order_buyout';
    protected $createTime = 'create_time';

    public function order()
    {
        return $this->hasOne('OrderModel', 'id', 'order_id');
    }

    public static function GetDataByList($data)
    {

        $res = self::with(['order' => ['getUser', 'getGoods', 'getLeaseModel', 'getLease', 'getPay' => ['getLease' => ['getLeaseModel']], 'getPeriods', 'getAddress', 'getUserCoupon']]);

        if (!empty($data['time'])) {
            $res = $res->where('create_time', 'between time', $data['time']);
        }

        if (!empty($data['order_no'])) {
            $res = $res->where('out_trade_no', $data['order_no']);
        }

        if (!empty($data['status'])) {
            $res = $res->where('OrderModel.status', $data['status']);
        }

        $res = $res->paginate($data['limit'], false, ['query' => $data['page']]);
        return $res;

    }

}