<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

Route::get('think', function () {
    return 'hello,ThinkPHP5!';
});

Route::get('hello/:name', 'index/hello');
//
    Route::rule('user/login', 'admin/Login/index');
Route::rule('smsMulti', 'api/Smsnote/smsMulti');

Route::rule('smsSend', 'api/Smsnote/smsSend');
Route::rule('Tosms', 'api/Smsnote/Tosms');


Route::rule('roles/index', '/admin/roles/index');



Route::rule('SendMessage', 'api/Wechat/SendMessage');


/**
 * 共用配置
 */
Route::rule('base/upload', 'shop/base/upload'); /* 上传图片*/




//
//Route::get('/:id', 'index/index/index');
//
//Route::get('/index/index/:id', 'index/index/index');

return [

];
