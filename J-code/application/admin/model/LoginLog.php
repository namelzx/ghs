<?php

namespace app\admin\model;

use think\Db;
use think\Model;

/**
 * 管理员登陆日志
 */
class LoginLog extends Model
{
    /** 添加日志
     * @param $data
     */
    public function add($data)
    {
        return Db::name('login_log')->insertGetId($data);
    }

    /**
     * 获取管理员列表
     */
    public function getLists($data)
    {
        $where = [];
        if (!empty($data['uid'])) {
            $where[] = ['uid', 'eq', $data['uid']];
        }
        if (!empty($data['userName'])) {
            $where[] = ['userName', 'eq', $data['userName']];
        }
        if (!empty($data['loginIp'])) {
            $where[] = ['loginIp', 'eq', $data['loginIp']];
        }
        if (!empty($data['loginIp'])) {
            $where[] = ['loginIp', 'eq', $data['loginIp']];
        }
        if (!empty($data['startTime'])) {
            $where[] = ['loginTime', 'between time', [$data['startTime'], $data['endTime']]];
        }
        return Db::name('login_log')->alias('a')
            ->order('id desc')
            ->where($where)
            ->paginate($data['psize'], false, ['query' => [
                'page' => $data['page']
            ]]);
    }
}
