<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-02-07
 * Time: 23:15
 */

namespace app\admin\model;


use think\Model;

class OrderLogModel extends Model
{
    protected $table='tp_order_log';
    protected $createTime='create_time';
}