<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-29
 * Time: 01:24
 */

namespace app\admin\model;


use think\Model;

class EvaluateModel extends Model
{
    protected $table = 'ee_evaluate';

    public function user()
    {
        return $this->hasOne('UserModel', 'id', 'user_id');
    }

    public function order()
    {
        return $this->hasOne('OrderModel', 'id', 'order_id');
    }

    public static function GetDataByList($data)
    {

        $where = [];
        if (!empty($data['nickName'])) {
            $user_id = UserModel::where('nickName', 'like', $data['nickName'] . '%')->value('id');
            $where[] = ['user_id', 'eq', $user_id];
        }

        if (!empty($data['out_trade_no'])) {
            $order_id = OrderModel::where('out_trade_no', 'eq', $data['out_trade_no'])->value('id');
            $where[] = ['order_id', 'eq', $order_id];
        }
        if (!empty($data['desc'])) {
            $where[] = ['desc', 'like', $data['desc'] . '%'];
        }
        $res = self::with(['user', 'order'])
            ->where($where)
            ->paginate($data['limit'], false, ['query' => [$data['page']]]);
        return $res;
    }

}