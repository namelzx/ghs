<?php

namespace app\admin\controller;

use app\common\controller\Api;

/**
 * 后台登陆
 * @author hardphp@163.com
 */

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, authKey, sessionId, Access-Token, X-Token,x-token");

class Login extends Api
{
    /**
     * 登录
     */
    public function login()
    {
        if ($this->request->isPost()) {
            //接收数据
            $data = [
                'userName' => input('username', '', 'trim'),
                'password' => input('password', '', 'trim'),
                //'verify'   => input('verify', '', 'trim')
            ];
            $validate = validate('Admin');
            $result = $validate->scene('login')->check($data);
            if (!$result) {
                $error = $validate->getError();
                ajax_return_error($error);
            }
//            // 登录验证并获取包含访问令牌的用户
            $result = model('Admin', 'logic')->login($data['userName'], $data['password']);
            ajax_return_ok($result, '登录成功');
        }
    }


}
