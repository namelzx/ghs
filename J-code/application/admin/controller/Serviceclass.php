<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-02-01
 * Time: 15:24
 */

namespace app\admin\controller;


//服务项目
use app\admin\model\ServiceClassModel;

class Serviceclass extends System
{

    public function PostDataByAdd()
    {
        $data = input('param.');
        if (empty($data['id'])) {
            $res = ServiceClassModel::create($data);
            ajax_return_ok($res);
        } else {

            $res = ServiceClassModel::where('id', $data['id'])->data($data)->update();
            ajax_return_ok($res);
        }
    }

    public function GetDataByList()
    {
        $pid = input('pid', 0, 'intval');
        $res = ServiceClassModel::where('pid', $pid)->order('sort_order asc')->select();
        ajax_return_ok($res);
    }

    public function PostDataByUpSort()
    {
        $data = input('param.');
        foreach ($data as $i => $item) {
            ServiceClassModel::where('id', $item['id'])->data('sort_order', $item['sort_order'] + 1)->update();
        }
        ajax_return_ok('更新成功');
    }


    public function GetIdByDelete()
    {
        $data = input('param.');
        $res = ServiceClassModel::where('id', $data['id'])->delete();
        ServiceClassModel::where('pid', $data['id'])->delete();
        ajax_return_ok($res);
    }

    public function GetDataByAll()
    {
        $data = input('param.');

        $res = ServiceClassModel::all();
        ajax_return_ok($res);
    }

}