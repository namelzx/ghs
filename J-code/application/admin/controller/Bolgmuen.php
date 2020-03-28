<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-11-23
 * Time: 23:39
 */

namespace app\admin\controller;


use app\admin\model\BolgMuenModel;

class Bolgmuen extends System
{
    public function index()
    {
        $data = input('param.');
        $res = BolgMuenModel::GetDataByList($data);
        ajax_return_ok($res);
    }


    /** 详情
     * @return mixed
     */
    public function getinfo()
    {
        $data = input('param.');
        $info = BolgMuenModel::where('id', $data['id'])->find();
        ajax_return_ok($info);
    }


    public function save()
    {
        $data = input('param.');
        if (!empty($data['id'])) {
            model('BolgMuenModel')->allowField(true)->save($data, ['id' => $data['id']]);
            ajax_return_ok(['id' => $data['id']], '保存成功！');
        }
        $res = BolgMuenModel::create($data);
        ajax_return_ok($res);
    }

    public function delall()
    {
        $data = input('param.');
        $res = model('BolgMuenModel')->whereIn('id', $data['ids'])->delete();
        ajax_return_ok($res);
    }

    public function del()
    {
        $data = input('param.');
        $res = model('BolgMuenModel')->whereIn('id', $data['id'])->delete();
        ajax_return_ok($res);
    }

    public function changeall()
    {
        $data = input('param.');
        $res = model('BolgMuenModel')->whereIn('id', $data['val'])->data([$data['field'] => $data['value']])->update();
        ajax_return_ok($res, '更新成功');
    }


    /**
     * 获取所有菜单
     */
    public function muenall()
    {
        $res = BolgMuenModel::where('status', 1)->select();
        ajax_return_ok($res);
    }

}