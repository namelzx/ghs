<?php

namespace app\admin\controller;

use app\common\controller\Base;

/**
 * 系统基类
 * @author hardphp@163.com
 *
 */



header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, authKey, sessionId, Access-Token, X-Token,x-token,x-access-appid");

class System extends Base
{
    public function _initialize()
    {
        parent::_initialize();

    }


}
