<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-04-01
 * Time: 04:20
 */

namespace app\common\model;


use think\Model;

class ShopMoneyLogModel extends Model
{
    protected $table = 'ee_shop_money_log';
    protected $createTime = 'create_time';

}