<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-02-01
 * Time: 01:15
 */

namespace app\admin\validate;


use think\Validate;

class ProductValidate extends Validate
{

    //验证规则
    protected $rule = [
        'title' => 'require',
        'class_id' => 'require',
        'quality_time' => 'require',

    ];

    //提示信息
    protected $message = [
        'title' => '产品标题必填',
        'class_id' => '分类必选',
        'quality_time' => '质保时间必填',

    ];

}