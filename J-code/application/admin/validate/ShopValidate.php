<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-01-25
 * Time: 16:36
 */

namespace app\admin\validate;


use think\Validate;

class ShopValidate extends Validate
{

    //验证规则
    protected $rule = [
        'avatarUrl' => 'require',
        'nickName' => 'require',
        'shopname' => 'require',
        'location' => 'require',
        'shopkeeper' => 'require',
        'tel' => 'require',
    ];

    //提示信息
    protected $message = [
        'avatarUrl' => '微信头像必填',
        'nickName' => '微信昵称必填',
        'shopname' => '店铺名称必填',
        'location' => '店铺地址必填',
        'shopkeeper' => '店主必填',
        'tel' => '联系电话必填',
    ];

}