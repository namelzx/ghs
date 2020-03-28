<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-15
 * Time: 10:24
 */

namespace app\admin\controller;


use app\common\model\ThemeGoodsModel;
use app\common\model\ThemeModel;
use think\Db;

class Theme extends Base
{


    /**
     * 获取数据列表
     */
    public function GetDataByList()
    {
        $data = input('param.');
        $res = ThemeModel::GetDataByList($data);
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
            $res = ThemeModel::create($data);
            return json(['msg' => '添加成功', 'data' => $res, 'code' => 20000], 200);

        } else {
            $res = ThemeModel::where('id', $data['id'])->data($data)->update();
            return json(['msg' => '更新成功', 'data' => $res, 'code' => 20000], 200);
        }
    }

    /**
     * 删除
     */
    public function GetIdByDel()
    {
        $data = input('param.');
        $res = ThemeModel::where('id', $data['id'])->data(['status' => 3])->update();;
        return json(['msg' => '删除成功', 'data' => $res, 'code' => 20000], 200);

    }


    /**
     * 获取所有的一级分类
     */
    public function GetCategory()
    {
        $res = ThemeModel::where('pid', 0)->select();
        return json(['msg' => '获取成功', 'data' => $res, 'code' => 20000], 200);

    }

    public function PostThemeBySave()
    {
        $data = input('param.');
        ThemeGoodsModel::where('theme_id', $data['theme_id'])->delete();
        Db::name('theme_goods')->insertAll($data['temp']);
        return json(['msg' => '提交成功', 'data' => '', 'code' => 20000], 200);
    }

    public function GetThemeIdByItems()
    {
        $data = input('param.');
        $res = ThemeGoodsModel::where('theme_id', $data['theme_id'])->select();
        return json(['msg' => '获取主题商品', 'data' => $res, 'code' => 20000], 200);

    }
}
