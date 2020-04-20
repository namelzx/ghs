<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-04
 * Time: 04:08
 */

namespace app\admin\controller;


use app\admin\model\CityModel;

class City extends System
{
    /**
     * 获取数据列表
     */
    public function GetDataByList()
    {
        $data = input('param.');
        $res = CityModel::GetDataByList($data);
        return json(['msg' => '获取成功', 'data' => $res, 'code' => 20000], 200);
    }

    /**
     * 更新||保存
     */
    public function PostDataBySave()
    {
        $data = input('param.');
        $data['create_time'] = time();
        $temp=[
            'name'=>$data['name']
        ];
        if (empty($data['id'])) {
            $res = CityModel::create($temp);
            return json(['msg' => '添加成功', 'data' => $res, 'code' => 20000], 200);

        } else {
            $res = CityModel::where('id', $data['id'])->data($temp)->update();
            return json(['msg' => '更新成功', 'data' => $res, 'code' => 20000], 200);
        }
    }

    /**
     * 删除
     */
    public function GetIdByDel()
    {
        $data = input('param.');
        $res = CityModel::where('id', $data['id'])->delete();
        return json(['msg' => '删除成功', 'data' => $res, 'code' => 20000], 200);

    }


    /**
     * 获取所有的一级分类
     */
    public function GetCity()
    {
        $res = CityModel::all();
        return json(['msg' => '获取成功', 'data' => $res, 'code' => 20000], 200);

    }


}