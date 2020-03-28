<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-11-24
 * Time: 01:00
 */

namespace app\admin\model;


use think\Model;

class ArticleModel extends Model
{
    protected $table = 'tp_article';
    protected $createTime = 'create_time';

    public static function GetDataByList($data)
    {
        $res = self::paginate($data['limit'], false, ['query' => [$data['page']]]);
        return $res;

    }
}