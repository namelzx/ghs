<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-07-13
 * Time: 16:42
 */

namespace app\common\model;


use think\Model;

class ThemeModel extends Model
{
    protected $table = 'gg_theme';

    protected $createTime = 'create_time';
    protected $updateTime = 'create_time';

    public static function GetDataByList($data)
    {

        $where = [];
        if (!empty($data['title'])) {
            $where[] = ['name', '=', $data['title']];
        }
        $res = self::where($where)->where(['status'=>1])->paginate($data['limit'], false, ['query' => $data['page']]);
        return $res;
    }
    //获取数据列表

    public function getTheme()
    {
        return $this->hasMany('ThemeGoodsModel', 'theme_id', 'id');
    }
}