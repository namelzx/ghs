<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-13
 * Time: 17:32
 */

namespace app\admin\controller;


use app\common\model\CategoryModel;

class Category extends System
{
    /**
     * 获取数据列表
     */
    public function GetDataByList()
    {
        $data = input('param.');
        $res = CategoryModel::GetDataByList($data);
        return json(['msg' => '获取成功', 'data' => $res, 'code' => 20000], 200);
    }

    /**
     * 更新||保存
     */
    public function PostDataBySave()
    {
        $data = input('param.');
        $data['create_time'] = time();
        if (empty($data['id'])) {
            $res = CategoryModel::create($data);
            return json(['msg' => '添加成功', 'data' => $res, 'code' => 20000], 200);

        } else {
            $res = CategoryModel::where('id', $data['id'])->data($data)->update();
            return json(['msg' => '更新成功', 'data' => $res, 'code' => 20000], 200);
        }
    }

    /**
     * 删除
     */
    public function GetIdByDel()
    {
        $data = input('param.');
        $res = CategoryModel::where('id', $data['id'])->delete();
        return json(['msg' => '删除成功', 'data' => $res, 'code' => 20000], 200);

    }


    /**
     * 获取所有的一级分类
     */
    public function GetCategory()
    {
        $res = CategoryModel::where('pid', 0)->select();
        return json(['msg' => '获取成功', 'data' => $res, 'code' => 20000], 200);

    }

}