<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-02-24
 * Time: 01:42
 */

namespace app\admin\validate;


use think\Validate;

class ReturnedValidDate extends Validate
{

    //验证规则
    protected $rule = [
        'price' => 'require',
        'courier' => 'require',
        'courier_order_no' => 'require',
        'name' => 'require',

    ];
    //提示信息
    protected $message = [
        'price' => '价格必填',
        'courier' => '快递公司必填',
        'courier_order_no' => '订单号必填',
        'name' => '退货理由'
    ];
}