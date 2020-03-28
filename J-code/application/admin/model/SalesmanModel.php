<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-02-02
 * Time: 21:45
 */

namespace app\admin\model;


use think\Model;

class SalesmanModel extends Model
{
    protected $table = 'tp_salesman';
    protected $createTime = 'create_time';


    public function wechat()
    {
        return $this->hasOne('WechatUserModel', 'openid', 'openid');
    }

    public static function GetDataByList($data)
    {
        $where = [];
//        $where[] = ['status', 'neq', 2];
        $res = self::with(['wechat'])->where($where)
            ->paginate($data['limit'], false, ['query' => [$data['page']]]);
        return $res;

    }

}