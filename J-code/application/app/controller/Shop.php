<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-08
 * Time: 23:15
 */

namespace app\app\controller;


use app\app\model\OrderModel;
use app\app\model\ShopModel;
use app\app\model\UserAudheModel;

class Shop extends Base
{

    public function GetShopHomeByData()
    {
        $data = input('param.');
        //预计收益
        $res['expect'] = OrderModel::where('shop_id', $data['user_id'])->where('status', '<', 4)->sum('totalPrice');
        //累计收益
        $res['cumulative'] = OrderModel::where('shop_id', $data['user_id'])->where('status', '>', 3)->sum('totalPrice');
        //未完成订单
        $res['no_order'] = OrderModel::where('shop_id', $data['user_id'])->where('status', '<', 4)->count('id');

        $res['day_no_order'] = OrderModel::where('shop_id', $data['user_id'])
            ->whereTime('create_time', 'today')
            ->where('status', '<', 4)->count('id');
        //完成订单
        $res['sucss_order'] = OrderModel::where('shop_id', $data['user_id'])->where('status', 'eq', 4)->count('id');
        $res['day_sucss_order'] = OrderModel::where('shop_id', $data['user_id'])
            ->whereTime('create_time', 'today')
            ->where('status', 'eq', 4)->count('id');
        ajax_return_ok($res);
    }

    public function PostDataByAdd()
    {
        $data = input('param.');
        if (empty($data['id'])) {
            $res = ShopModel::create($data);
            ajax_return_ok($res);
        } else {
            $temp = [
                'community_id' => $data['community_id'],
                'name' => $data['name'],
                'user_id' => $data['user_id'],
                'address' => $data['address'],
                'shop_img' => $data['shop_img'],
                'desc' => $data['desc'],
                'tel' => $data['tel']
            ];
            $res = ShopModel::where('user_id', $data['user_id'])->data($temp)->update();
        }
        ajax_return_ok($res);
    }

    public function GetUserIdByInfo()
    {
        $data = input('param.');
        $res = ShopModel::with(['community'])->where('user_id', $data['user_id'])->find();
        ajax_return_ok($res);
    }

    public function GetShoplistInfo()
    {
        $data = input('param.');
        $res = ShopModel::with(['community', 'user'])->where('user_id', $data['user_id'])->find();
        ajax_return_ok($res);
    }

    public function GetShopOrderByList()
    {
        $data = input('param.');
        $where = [];
        if (!empty($data['status'])) {
            if ($data['status'] !== 'undefined') {
                $where[] = ['status', 'eq', $data['status']];
            }
        }
        $where[] = ['shop_id', 'eq', $data['user_id']];
        $res = OrderModel::with(['goods'])->where($where)->order('status asc,create_time desc')->paginate($data['limit'], false, ['query' => $data['page']]);
        ajax_return_ok($res);
    }

    public function GetShopOrderByUpdate()
    {
        $data = input('param.');
        $res = OrderModel::where('id', $data['id'])->data(['status' => $data['status']])->update();
        ajax_return_ok($res);
    }


    /**
     * 提交认证
     */
    public function PostAudheByAdd()
    {
        $data = input('param.');
        $cheaudhe = UserAudheModel::where('user_id', $data['user_id'])->count();
        if ($cheaudhe < 1) {
            $res = UserAudheModel::create($data);
            ajax_return_ok($res);
        }
        ajax_return_error('认证审核已存在');
    }

    /**
     * 检测用户 审核状态
     */
    public function CheUserByAudhe()
    {
        $data = input('param.');
        $cheaudhe = UserAudheModel::where('user_id', $data['user_id'])->find();
        ajax_return_ok($cheaudhe);
    }
}