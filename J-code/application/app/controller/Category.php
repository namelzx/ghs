<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-05
 * Time: 05:07
 */

namespace app\app\controller;


use think\Db;

class Category extends Base
{
    public function GetCategoryByList()
    {
        $res = Db::name('category')->where('status',1)->where('status_hm',1)->order('sort')->all();
        ajax_return_ok($res);
    }

}