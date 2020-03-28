<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-02-01
 * Time: 15:03
 */

namespace app\admin\controller;


use app\admin\model\EcshopClassModel;

class Ecshopclass extends System
{

    public function PostDataByAdd()
    {
        $data = input('param.');
        if (empty($data['id'])) {
            $res = EcshopClassModel::create($data);
            ajax_return_ok($res);
        } else {

            $res = EcshopClassModel::where('id', $data['id'])->data($data)->update();
            ajax_return_ok($res);
        }
    }

    public function GetDataByList()
    {
        $pid = input('pid', 0, 'intval');
        $res = EcshopClassModel::where('pid', $pid)->order('sort_order asc')->select();
        ajax_return_ok($res);
    }

    public function PostDataByUpSort()
    {
        $data = input('param.');
        foreach ($data as $i => $item) {
            EcshopClassModel::where('id', $item['id'])->data('sort_order', $item['sort_order'] + 1)->update();
        }
        ajax_return_ok('更新成功');
    }


    public function GetIdByDelete()
    {
        $data = input('param.');
        $res = EcshopClassModel::where('id', $data['id'])->delete();
        EcshopClassModel::where('pid', $data['id'])->delete();
        ajax_return_ok($res);
    }

    public function GetDataByAll()
    {
        $data = input('param.');
        $res = EcshopClassModel::all();
        ajax_return_ok($res);
    }

    //获取多级树数据
    public function GetecshopByList(){
        $res=EcshopClassModel::where('pid',0)->field('id as value,field_title as label')->all();
        foreach ($res as $i=>$item){
            $res[$i]['children']=EcshopClassModel::where('pid',$item['value'])->field('id as value,field_title as label')->all();
        }
        ajax_return_ok($res);
    }

}