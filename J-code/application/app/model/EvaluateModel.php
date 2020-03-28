<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-25
 * Time: 01:30
 */

namespace app\app\model;


use think\Model;

class EvaluateModel extends Model
{
    protected $table = 'ee_evaluate';
    protected $createTime = 'create_time';

    public function user()
    {
        return $this->hasOne('UserModel', 'id', 'user_id');
    }
}