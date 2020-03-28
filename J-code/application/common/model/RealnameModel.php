<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-19
 * Time: 23:53
 */

namespace app\common\model;


use think\Model;

class RealnameModel extends Model
{
    protected $table = 'gg_realname';
    protected $createTime = 'create_time';
    protected $updateTime = 'update_time';
}