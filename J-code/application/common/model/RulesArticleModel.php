<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-08-29
 * Time: 02:04
 */

namespace app\common\model;


use think\Model;

class RulesArticleModel extends Model
{
    protected $table = 'gg_rules_article';
    protected $createTime = 'create_time';

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