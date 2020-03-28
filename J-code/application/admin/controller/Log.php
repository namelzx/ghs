<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-11-23
 * Time: 18:42
 */

namespace app\admin\controller;


class Log extends System
{
    public function index()
    {
        $data = input('param.');
        $res = model('LoginLog')->getLists($data);
        ajax_return_ok($res);
    }

}