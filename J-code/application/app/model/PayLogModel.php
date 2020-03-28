<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-16
 * Time: 03:56
 */

namespace app\app\model;


use think\Model;

class PayLogModel extends Model
{
    protected $table = 'ee_pay_log';
    protected $createTime = 'create_time';

}