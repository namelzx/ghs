<?php

namespace app\common\controller;

use app\common\util\AuthUtil;
use think\App;


/**
 * 后台接口基类
 * @author hardphp@163.com
 *
 */


header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, authKey, sessionId, Access-Token, X-Token,x-token");

class Base extends Api
{
    //用户信息
    protected $user = [];
    protected $uid = 0;

    public function __construct(App $app = null)
    {
        parent::__construct($app);

        //身份验证
        $result = AuthUtil::checkUser('admin');
        if ($result['status']) {
            $this->user = $result['msg'];
            $this->uid = $result['msg']['id'];
        }
        //权限验证
        $module = strtolower(request()->module());
        $controller = strtolower(request()->controller());
        $action = strtolower(request()->action());
        $nowUrl = $module . '/' . $controller . '/' . $action;
        $access = my_model('AuthRule', 'logic', 'admin')->hasAccessByName($nowUrl, $result['msg']['groupId']);
        if (!$access) {
            ajax_return_error('无权访问！');
        }
    }

    public function _initialize()
    {


        parent::_initialize();


    }

}
