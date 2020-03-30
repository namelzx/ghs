<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-31
 * Time: 04:18
 */

namespace app\common\model;


use think\Model;

class WithdrawalModel extends Model
{
    protected $table = 'ee_withdrawal';
    protected $createTime = 'create_time';

    public function user()
    {
        return $this->hasOne('UserModel', 'id', 'user_id');
    }

}