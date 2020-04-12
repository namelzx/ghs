<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-06
 * Time: 02:50
 */

namespace app\app\controller;


use app\app\model\EvaluateModel;
use app\common\model\GoodsModel;
use app\tools\controller\createCode;

class Goods extends Base
{
    public function GetDataByList()
    {
        $data = input('param.');
        $where = [];
        $where[] = ['status', 'eq', 1];
        if (!empty($data['category_id'])) {
            $where[] = ['category_id', 'eq', $data['category_id']];
        }

        if (!empty($data['user_id'])) {
            $where[] = ['shop_id', 'eq', $data['user_id']];
        }
        $res = GoodsModel::where($where)->paginate($data['limit'], false, ['query' => [$data['page']]]);
        ajax_return_ok($res);
    }

    public function GetDataByInfo()
    {
        $data = input('param.');
        $res = GoodsModel::where('id', $data['id'])->find();
        $Eva = EvaluateModel::with(['user'])->where('goods_id', 'in', $data['id'])->select();
        $res['eva'] = $Eva;
        ajax_return_ok($res);

    }

    public function PostDataByAdd()
    {
        $data = input('param.');
        $data['type'] = 2;
        if (empty($data['id'])) {
            $res = GoodsModel::create($data);
            $createCode = new createCode();
            $code = $createCode->Code($res['id']);
            GoodsModel::where('id', $res['id'])->data(['code' => $code])->update();
        }else{
            $temp=[
                'images_url'=>$data['images_url'],
                'img_banner'=>$data['img_banner'],
                'img_list'=>$data['img_list'],
                'inventory'=>$data['inventory'],
                'line_price'=>$data['line_price'],
                'price'=>$data['price'],
                'sellpoint'=>$data['sellpoint'],
                'setlinePrice'=>$data['setlinePrice'],
                'shop_id'=>$data['shop_id'],
                'tel'=>$data['tel'],
                'videosrc'=>$data['videosrc']
            ];
            $res = GoodsModel::where('id',$data['id'])->data($data)->update();
            $createCode = new createCode();
            $code = $createCode->Code($data['id']);
            GoodsModel::where('id', $data['id'])->data(['code' => $code])->update();
        }
        ajax_return_ok($res);
    }

}