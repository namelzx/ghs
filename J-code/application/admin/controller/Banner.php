<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-12
 * Time: 01:25
 */

namespace app\admin\controller;


use app\admin\model\BannerModel;

class Banner extends System
{


    /**
     * 获取数据列表
     */
    public function GetDataByList()
    {
        $data = input('param.');
        $res = BannerModel::GetDataByList($data);
        ajax_return_ok($res);
    }

    /**
     * 更新||保存
     */
    public function PostDataBySave()
    {
        $data = input('param.');
        $data['create_time'] = time();
        if (empty($data['id'])) {

            $data['endTime']=strtotime($data['endTime']);
            $data['startTime']=strtotime($data['startTime']);
            $res = BannerModel::create($data);
            ajax_return_ok($res);
//            return json(['msg' => '添加成功', 'data' => $res, 'code' => 20000], 200);

        } else {
            $data['endTime']=strtotime($data['endTime']);
            $data['startTime']=strtotime($data['startTime']);
            $res = BannerModel::where('id',$data['id'])->data($data)->update();
            ajax_return_ok($res);
//            return json(['msg' => '更新成功', 'data' => $res, 'code' => 20000], 200);
        }
    }

    /**
     * 删除
     */
    public function GetIdByDel()
    {
        $data = input('param.');
        $res = BannerModel::where('id', $data['id'])->delete();
        return json(['msg' => '删除成功', 'data' => $res, 'code' => 20000], 200);

    }

    public function getHomeAdvertise()
    {
        $data = input('param.');
        $res = BannerModel::where('id', $data['id'])->find();
        ajax_return_ok($res);
    }





}