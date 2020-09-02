<?php


namespace app\app\controller;


use app\app\model\EvaluateModel;

class Eva extends Base
{
    public function GetGoodsEvaByList()
    {
        $data = input('param.');
        $res = EvaluateModel::with(['user'])-> where('goods_id', $data['id'])->select();
        ajax_return_ok($res);
    }


}