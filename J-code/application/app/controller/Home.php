<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-10
 * Time: 19:07
 */

namespace app\app\controller;


use app\admin\model\BannerModel;
use app\app\model\GoodsModel;

class Home extends Base
{
    /**
     * 获取小程序首页数据
     */
    public function GetAppByHome()
    {
        $banner = BannerModel::limit(5)->select();
        $faddish = GoodsModel::where('faddish', 1)->limit(5)->select();
        ajax_return_ok(['banner' => $banner, 'faddish' => $faddish]);

    }

}