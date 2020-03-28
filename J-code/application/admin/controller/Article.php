<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-11-24
 * Time: 01:01
 */

namespace app\admin\controller;


use app\admin\model\ArticleModel;

class Article extends System
{

    public function GetDataByList()
    {
        $data = input('param.');
        $res = ArticleModel::GetDataByList($data);
        ajax_return_ok($res);
    }

    public function PostDataBySave()
    {
        $data = input('param.');
        $data['create_time'] = time();
        if (!empty($data['id'])) {
            $res = ArticleModel::where('id', $data['id'])->data($data)->update();
            ajax_return_ok($res, '修改成功');
        }
        $res = ArticleModel::create($data);
        ajax_return_ok($res, '添加成功');
    }

    public function del()
    {
        $data = input('param.');
        $res = ArticleModel::where('id', $data['id'])->delete();
        ajax_return_ok($res);
    }

    public function delall()
    {
        $data = input('param.');
        $res = ArticleModel::where('id', 'in', $data['ids'])->delete();
        ajax_return_ok($res);
    }

    public function getinfo()
    {
        $data = input('param.');
        $res = ArticleModel::where('id', $data['id'])->find();
        ajax_return_ok($res);
    }
}