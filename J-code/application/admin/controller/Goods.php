<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-13
 * Time: 18:17
 */

namespace app\admin\controller;


use app\admin\model\UserModel;
use app\common\model\GoodsModel;
use app\tools\controller\createCode;

class Goods extends System
{

    /**
     * 获取数据列表
     */
    public function GetDataByList()
    {
        $data = input('param.');
        $res = GoodsModel::GetDataByList($data);
        return json(['msg' => '获取成功', 'data' => $res, 'code' => 20000], 200);
    }

    /**
     * 更新||保存
     */
    public function PostDataBySave()
    {
        $data = input('param.');

        $createCode = new createCode();
        if (!empty($data['id'])) {


            $data['code'] = $this->Code($data['id']);

            $this->PostDataUpdate($data);
            return json(['msg' => '更新成功', 'data' => '', 'code' => 20000], 200);
        }
//
        $res = GoodsModel::create($data); //单纯添加商品

        $code = $this->Code($res['id']);

        GoodsModel::where('id', $res['id'])->data(['code' => $code])->update();

        return json(['msg' => '成功', 'code' => 20000], 200);

    }

    public function PostDataUpdate($data)
    {
        $model = new GoodsModel();
        $model->allowField(true)->save($data, ['id' => $data['id']]);

    }

    /**
     * 删除
     */
    public function GetIdByDel()
    {
        $data = input('param.');
        $res = GoodsModel::where('id', $data['id'])->data(['status' => 3])->update();
        return json(['msg' => '删除成功', 'data' => $res, 'code' => 20000], 200);
    }


    /**
     * 获取
     */
    public function GetIdByDetails()
    {
        $data = input('param.');

        $res = GoodsModel::where('id', $data['id'])->find();
        $product = UserModel::where('is_product', 1)->select();
        return json(['msg' => '获取详情', 'data' => $res, 'code' => 20000, 'product' => $product], 200);
    }

    /**
     * 更新上架状态
     */
    public function change()
    {
        $val = input('val', '', 'int');
        $field = input('field', '', 'trim');
        $value = input('value', '', 'int');
        if (empty($field)) {
            ajax_return_error('参数有误！');
        }
        $res = GoodsModel::where('id', $val)->data([$field => $value])->update();
        if ($res) {
            ajax_return_ok([], '修改成功！');
        } else {
            ajax_return_error('修改失败！');
        }

    }

    public function changeall()
    {
        $val = input('val', '', 'trim');
        $field = input('field', '', 'trim');
        $value = input('value', '', 'int');
        if (empty($val)) {
            ajax_return_error('参数有误！');
        }
        if (empty($field)) {
            ajax_return_error('参数有误！');
        }

        $ids = explode(',', $val);
        foreach ($ids as $v) {

            GoodsModel::where('id', $v)->data([$field => $value])->update();
//            $res = model('AuthRule', 'logic')->change($v, $field, $value);
        }

        ajax_return_ok([], '修改成功！');

    }


    /**
     * 删除
     */
    public function del()
    {
        $id = input('id', '0', 'int');
        if ($id == 0) {
            ajax_return_error('参数有误！');
        } else {
            if ($id == 1) {
                ajax_return_error('该记录不能删除！');
            }
            if (GoodsModel::where('id', $id)->delete()) {
                ajax_return_ok([], '删除成功！');
            } else {
                ajax_return_error('删除失败！');
            }
        }
    }

    /**
     * 批量删除
     */
    public function delall()
    {
        $ids = input('ids', '', 'trim');
        if (empty($ids)) {
            ajax_return_error('参数有误！');
        } else {
            $ids = explode(',', $ids);
            $ids = array_diff($ids, [1]);
            GoodsModel::where('id', 'in', $ids)->delete();
//            model('AuthGroup', 'logic')->delall($ids);
            ajax_return_ok([], '删除成功！');
        }
    }

}