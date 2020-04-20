<?php

namespace app\index\controller;

use app\common\controller\HyperDown;
use app\tools\controller\Logistics;
use think\Db;

class Index extends Base
{
    public function index()
    {

        $Logistics = new Logistics();
        $res = $Logistics->getOrderTracesByJson();
        ajax_return_ok(json_decode( $res));
    }

    public function info()
    {
        $val = input('id', 1, 'int');
        $res = Db::name('article')->get($val);
        $hyper = new HyperDown();
        $html = $hyper->makeHtml($res['content']);
        $this->assign('html', $html);
        $this->assign('info', $res);
        return view();
    }

    public function hello($name = 'ThinkPHP5')
    {
        return 'hello,' . $name;
    }
}
