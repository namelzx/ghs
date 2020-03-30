<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-31
 * Time: 04:43
 */

namespace app\admin\controller;


use app\admin\model\ShopModel;
use app\common\model\WithdrawalModel;

class Shopwithdrawal extends System
{


    public function GetDataByList()
    {
        $data = input('param.');
        $where = [];
        $res = WithdrawalModel::with(['user'])
            ->where('status', 2)
            ->where($where)->paginate($data['limit'], false, ['query' => [$data['page']]]);
        ajax_return_ok($res);
    }

    /**
     * 审核
     */
    public function PostDataByAudit()
    {
        $data = input('param.');
        if ($data['status'] === 1) {

            $res = WithdrawalModel::where('id', 'in', $data['ids'])->data([$data['field'] => $data['status']])->update();
            ajax_return_ok($data);

        } else {
            $arr = [];
            $all = WithdrawalModel::where('id', 'in', $data['ids'])->select();
            foreach ($all as $i => $item) {
                ShopModel::where('user_id', $item['user_id'])->setInc('balance', (float)$item['money']);
            }
            ajax_return_ok($all);

        }
    }

    public function GetOpenidByFind()
    {
        $data = input('param.');
        $res = WithdrawalModel::where('openid', $data['openid'])->find();
        if (empty($res)) {
            ajax_return_ok(404, '没有找到');
        }
        ajax_return_ok($res);
    }

}