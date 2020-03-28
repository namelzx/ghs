<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-16
 * Time: 21:47
 */

namespace app\common\model;


use think\Model;

class NewsModel extends Model
{
    protected $table = 'gg_news';


    protected $createTime = 'create_time';
    protected $updateTime = 'create_time';

    //获取数据列表
    public static function GetDataByList($data)
    {

        $where = [];
        if (!empty($data['title'])) {
            $where[] = ['name', '=', $data['title']];
        }
        $res = self::where($where)->paginate($data['limit'], false, ['query' => $data['page']]);
        return $res;

    }

}