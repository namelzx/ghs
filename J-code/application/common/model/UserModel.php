<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-20
 * Time: 13:45
 */

namespace app\common\model;


use think\Model;

class UserModel extends Model
{
    protected $table = 'ee_user';
    protected $createTime = 'ucreate_time';

    public static function GetDataByList($data)
    {
        $where = [];
        if (!empty($data['title'])) {
            $where[] = ['nickName', '=', $data['title']];
        }
        $res = self::where($where)->paginate($data['limit'], false, ['query' => $data['page']]);
        return $res;
    }

}