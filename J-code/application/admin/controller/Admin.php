<?php

namespace app\admin\controller;

/**
 * 管理员管理
 * @author hardphp@163.com
 */
class Admin extends System
{

//    protected $middleware = ['check'];


    /**
     * 列表
     */
    public function index()
    {
        if ($this->request->isPost()) {
            //搜索参数
            $isEnabled = input('isEnabled', -1, 'intval');
            $userName = input('userName', '', 'trim');
            $phone = input('phone', '', 'trim');
            $realName = input('realName', '', 'trim');
            $startTime = input('startTime', '', 'strtotime');
            $endTime = input('endTime', '', 'strtotime');
            $order = input('order/a', 'a.id desc');
            $page = input('page', 1, 'intval');
            $psize = input('psize', 10, 'intval');
            $groupId = input('groupId', 10, 'intval');
            $lists = model('Admin', 'logic')->getLists($userName, $phone, $realName, $startTime, $endTime, $isEnabled, $order, $page, $psize, $groupId);
            $result['total'] = model('Admin', 'logic')->getTotal($userName, $phone, $realName, $startTime, $endTime, $isEnabled);
            $result['data'] = $lists;
            ajax_return_ok($result);
        }
    }

    //获取登录用户信息
    public function getuser()
    {

        $user = $this->user;


        $access = my_model('AuthRule', 'logic', 'admin')->getAuthByGroupIdToTree($user['groupId']);

        $routers = [];

        $access = $this->bubble_sort($access);

        foreach ($access as $v) {
            $temp = $this->getdata($v);
            foreach ($v['children'] as $vo => $ivo) {
                $temp['children'][] = $this->getdata($ivo);
                if (!empty($ivo['children'])) {


                    $children = $this->bubble_sort($ivo['children']);
                    $temp['children'][$vo]['children'] = $this->getMuen($children);
                }
            }
            $routers[] = $temp;
        }
        $user['access'] = $routers;

        $user['group'] = my_model('AuthGroup', 'model', 'admin')->getGroupById($user['groupId']);

        ajax_return_ok($user);
    }

    protected function bubble_sort($arr)
    {
        $len = count($arr);
        for ($i = 0; $i < $len - 1; $i++) {//循环对比的轮数
            for ($j = 0; $j < $len - $i - 1; $j++) {//当前轮相邻元素循环对比
                if ($arr[$j]['sorts'] > $arr[$j + 1]['sorts']) {//如果前边的大于后边的
                    $tmp = $arr[$j];//交换数据
                    $arr[$j] = $arr[$j + 1];
                    $arr[$j + 1] = $tmp;
                }
            }
        }
        return $arr;
    }

    protected function getMuen($idata)
    {
        $temp = [];
        foreach ($idata as $i => $data) {
            $temp[$i]['path'] = $data['path'];
            $temp[$i]['component'] = $data['component'];
            $temp[$i]['name'] = $data['name'];
            if ($data['hidden'] > -1) {
                $temp[$i]['hidden'] = (boolean)$data['hidden'];
            }
            if ($data['alwaysShow'] > -1) {
                $temp[$i]['alwaysShow'] = (boolean)$data['alwaysShow'];
            }
            if ($data['redirect']) {
                $temp[$i]['redirect'] = $data['redirect'];
            }
            $temp[$i]['meta']['title'] = $data['title'];
            $temp[$i]['meta']['icon'] = $data['icon'];
            if ($data['noCache'] > -1) {
                $temp[$i]['meta']['noCache'] = (boolean)$data['noCache'];
            }
        }

        return $temp;
    }

    protected function getdata($data)
    {

        $temp = [];
        $temp['path'] = $data['path'];
        $temp['component'] = $data['component'];
        $temp['name'] = $data['name'];
        if ($data['hidden'] > -1) {
            $temp['hidden'] = (boolean)$data['hidden'];
        }
        if ($data['alwaysShow'] > -1) {
            $temp['alwaysShow'] = (boolean)$data['alwaysShow'];
        }
        if ($data['redirect']) {
            $temp['redirect'] = $data['redirect'];
        }
        $temp['meta']['title'] = $data['title'];
        $temp['meta']['icon'] = $data['icon'];
        if ($data['noCache'] > -1) {
            $temp['meta']['noCache'] = (boolean)$data['noCache'];
        }


        return $temp;
    }


    /** 详情
     * @return mixed
     */
    public function getinfo()
    {
        $uid = input('id', '0', 'int');
        if ($uid == 0) {
            ajax_return_error('参数有误！');
        }
        $info = model('Admin', 'logic')->getAdminById($uid);
        ajax_return_ok($info);
    }

    /**
     * 保存
     */
    public function save()
    {
        $id = input('id', '0', 'int');
        //接收数据
        $data = [
            'groupId' => input('groupId', '', 'trim'),
            'userName' => input('userName', '', 'trim'),
            'realName' => input('realName', '', 'trim'),
            'img' => input('img', '', 'trim'),
            'phone' => input('phone', '', 'trim'),
            'email' => input('email', '', 'trim'),
            'password' => input('password', '', 'trim'),
            'isEnabled' => input('isEnabled', 0, 'int'),
        ];
        $validate = validate('Admin');
        $result = $validate->scene('save')->check($data);
        if (!$result) {
            $error = $validate->getError();
            ajax_return_error($error);
        }
        $res = model('Admin', 'logic')->modify($id, $data);
        if ($res == false) {
            ajax_return_error('保存失败！');
        } else {
            ajax_return_ok(['id' => $res], '保存成功！');
        }
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
            if (model('Admin', 'logic')->del($id)) {
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
            model('Admin', 'logic')->delall($ids);
            ajax_return_ok([], '删除成功！');
        }
    }

    public function change()
    {

        $val = input('val', '', 'int');
        $field = input('field', '', 'trim');
        $value = input('value', '', 'int');
        if (empty($field)) {
            ajax_return_error('参数有误！');
        }
        $res = model('Admin', 'logic')->change($val, $field, $value);
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
            $res = model('Admin', 'logic')->change($v, $field, $value);
        }

        ajax_return_ok([], '修改成功！');

    }

    /**
     * 修改密码
     */
    public function setpwd()
    {
        //接收数据
        $data = [
            'oldPwd' => input('oldPwd', '', 'trim'),
            'newPwd' => input('newPwd', '', 'trim'),
            'newPwd2' => input('newPwd2', '', 'trim')
        ];
        //验证输入数据合法性
        $validate = validate('Password');
        $result = $validate->check($data);
        if (!$result) {
            $error = $validate->getError();
            ajax_return_error($error);
        }
        $res = model('Admin', 'logic')->setPwd($this->uid, $data['newPwd'], $data['oldPwd']);
        if ($res) {
            ajax_return_ok([], '修改成功！');
        } else {
            ajax_return_error('修改失败！');
        }
    }

    /**
     * 修改个人资料
     */
    public function modify()
    {
        $id = $this->uid;
        //接收数据
        $data = [
            'realName' => input('realName', '', 'trim'),
            'img' => input('img', '', 'trim'),
            'phone' => input('phone', '', 'trim'),
            'email' => input('email', '', 'trim'),
            'password' => input('password', '', 'trim'),
        ];
        $validate = validate('Admin');
        $result = $validate->scene('modify')->check($data);
        if (!$result) {
            $error = $validate->getError();
            ajax_return_error($error);
        }
        $res = model('Admin', 'logic')->modify($id, $data);
        if ($res == false) {
            ajax_return_error('保存失败！');
        } else {
            ajax_return_ok(['id' => $res], '保存成功！');
        }
    }

    public function logout()
    {
        ajax_return_ok();
    }
}
