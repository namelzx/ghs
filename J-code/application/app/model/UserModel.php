<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-05
 * Time: 02:18
 */

namespace app\app\model;


use think\Model;

class UserModel extends Model
{
    protected $table = 'ee_user';
    protected $createTime = 'create_time';

    public static function postUserByRegistered($data, $p_id = 0)
    {
        $res = self::where('openid', $data['openid'])->find();
        if (empty($res)) {
            $data['p_id'] = $p_id;
            $user = self::create($data);
            return $user;
        } else {
            self::where('openid', $data['openid'])->data($data)->update();
        }
        return $res;
    }

}