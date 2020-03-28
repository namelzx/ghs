<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-08
 * Time: 23:14
 */

namespace app\app\model;


use think\Model;

class ShopModel extends Model
{
    protected $table = 'ee_shop';
    protected $createTime = 'create_time';


    public function user(){
        return $this->hasOne('UserModel','id','user_id');
    }
    public function community(){
        return $this->hasOne('CommunityModel','id','community_id');
    }

}