<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-04
 * Time: 04:17
 */

namespace app\admin\controller;


use app\admin\model\CommunityModel;

class Community extends System
{
    /**
     * 获取数据列表
     */
    public function GetDataByList()
    {
        $data = input('param.');
        $res = CommunityModel::GetDataByList($data);
        return json(['msg' => '获取成功', 'data' => $res, 'code' => 20000], 200);
    }

    /**
     * 更新||保存
     */
    public function PostDataBySave()
    {
        $data = input('param.');
        $data['create_time'] = time();
        if (!empty($data['city_model'])) {
            for ($i = 0; $i < count($data['city_model']); $i++) {
                if ($i === 0) {
                    $data['province'] = $data['city_model'][$i];
                }
                if ($i === 1) {
                    $data['city'] = $data['city_model'][$i];
                }
                if ($i === 2) {
                    $data['area'] = $data['city_model'][$i];
                    $data['city_id'] = $data['area'];
                }

            }

        }
        if (empty($data['id'])) {

            $temp = [
                'name' => $data['name'],
                'location' => $data['location'],
                'status' => $data['status'],
                'sort' => $data['sort'],
            ];

            if (!empty($data['city_model'])) {
                $temp['city_code'] = implode(',', $data['city_model']);
            }

            if (!empty($data['province'])) {
                $temp['province'] = $data['province'];
            }

            if (!empty($data['city'])) {
                $temp['city'] = $data['city'];
            }

            if (!empty($data['area'])) {
                $temp['area'] = $data['area'];
                $data['city_id'] = $data['area'];
            }

            $tem = $this->getCoord($data['location']);
            $temp['lat'] = $tem['lat'];
            $temp['lng'] = $tem['lng'];
            $res = CommunityModel::create($temp);
            ajax_return_ok($res);
//            return json(['msg' => '添加成功', 'data' => $res, 'code' => 20000], 200);

        } else {
            $temp = [
                'city_id' => $data['city_id'],
                'name' => $data['name'],
                'location' => $data['location'],
                'status' => $data['status'],
            ];

            if (!empty($data['city_model'])) {
                $temp['city_code'] = implode(',', $data['city_model']);
            }

            if (!empty($data['province'])) {
                $temp['province'] = $data['province'];
            }

            if (!empty($data['city'])) {
                $temp['city'] = $data['city'];
            }

            if (!empty($data['area'])) {
                $temp['area'] = $data['area'];
            }

            $tem = $this->getCoord($data['location']);
            $temp['lat'] = $tem['lat'];
            $temp['lng'] = $tem['lng'];
            $res = CommunityModel::where('id', $data['id'])->data($temp)->update();
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
        $res = CommunityModel::where('id', $data['id'])->delete();
        return json(['msg' => '删除成功', 'data' => $res, 'code' => 20000], 200);

    }


    /**
     * 获取所有的一级分类
     */
    public function GetCity()
    {
        $res = CommunityModel::all();
        return json(['msg' => '获取成功', 'data' => $res, 'code' => 20000], 200);

    }

    public function getCoord($address)
    {
        $url = 'https://apis.map.qq.com/ws/geocoder/v1/?address=' . $address . '&key=XB2BZ-J7PW3-DIZ3P-YC34A-BWFW7-ELBOI';
        $res = curlSend($url);
        if ($res['message'] !== 'query ok') {
            return $res['message'];
        }
        return $res['result']['location'];
    }

    /**
     * 获取所有的小区
     */
    public function GetCommunityByall()
    {
        $res = CommunityModel::all();
        ajax_return_ok($res);

    }
}