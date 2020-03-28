<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-04
 * Time: 02:31
 */

namespace app\admin\controller;


use app\admin\model\UserInterestsModel;

class Userinterests extends System
{


    /**
     * 获取数据列表
     */
    public function GetDataByList()
    {
        $data = input('param.');
        $res = UserInterestsModel::GetDataByList($data);
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
            $res = UserInterestsModel::create($data);
            return json(['msg' => '添加成功', 'data' => $res, 'code' => 20000], 200);

        } else {
            $res = UserInterestsModel::where('id', $data['id'])->data($data)->update();
            return json(['msg' => '更新成功', 'data' => $res, 'code' => 20000], 200);
        }
    }

    /**
     * 删除
     */
    public function GetIdByDel()
    {
        $data = input('param.');
        $res = UserInterestsModel::where('id', $data['id'])->delete();
        return json(['msg' => '删除成功', 'data' => $res, 'code' => 20000], 200);

    }


    /**
     * 获取所有的一级分类
     */
    public function GetCategory()
    {
        $res = UserInterestsModel::where('pid', 0)->select();
        return json(['msg' => '获取成功', 'data' => $res, 'code' => 20000], 200);

    }
}