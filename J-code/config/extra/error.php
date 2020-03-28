<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

return [

    //错误码定义
    /************10001-10099  系统相关错误；10101-10199，接口相关；10201-10299，支付相关；10301-10399 ，用户相关；10801-10899 第三方相关 ；10901-10999 保留给第三方定义 ；101001+具体业务相关。***********/

    //10001-10099  系统相关错误
    10000   => '无错误',
    10001   => '一般错误',
    10002   => '系统错误',
    10003   => '配置缺少',
    10004   => '文件上传错误',

    //10101-10199，接口相关
    10101 => '签名参数缺失',
    10102 => '接口签名验证失败',
    10103 => 'appid不存在',
    10104 => 'appId已被禁用',

    //10301-10399 ，用户相关
    10301 => '用户已被禁用',
    10302 => '用户不存在',
    10303 => '用户密码错误',
    10304 => '用户组已被禁用',
    10305 => '用户在其它设备登录',
    10306 => '用户访问令牌缺失',
    10307 => '用户访问令牌过期',
    10308 => '用户登录方式错误',


];
