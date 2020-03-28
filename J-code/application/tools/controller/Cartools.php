<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-02-03
 * Time: 17:36
 */

namespace app\tools\controller;


use app\admin\model\CarBrandModel;
use app\admin\model\CarModelModel;
use app\admin\model\CarSeriesModel;
use think\Controller;


header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, authKey, sessionId, Access-Token, X-Token,x-token,x-access-appid");

class Cartools extends Controller
{
    /**
     * 车型
     */
    public function CarBrand()
    {
        $json = file_get_contents('carmodel.json');//读取
        $data = json_decode($json);
        if (empty($data)) {
            $data = CarBrandModel::
            field('name as label,brandid as value')
                ->all();
            $data = $this->CarSeries($data);
            $json_string = json_encode($data);
            file_put_contents('carmodel.json', $json_string);//写入
        }
        ajax_return_ok($data);


    }

    public function CarSeries($data)
    {
        $arr = [];
        foreach ($data as $i => $item) {
            $arr[$i] = $item;
            $arr[$i]['children'] = [];
            $caser = CarSeriesModel::where('brand_id', $item['value'])
                ->field('factory_name as label,series_id as value,series_name')
                ->select();
            foreach ($caser as $k => $ki) {
                $caser[$k] = $ki;
                $caser[$k]['label'] = $ki['label'] . '-' . $ki['series_name'];
            }

            $arr[$i]['children'] = $caser;


        }
        return $this->CarModel($arr);
    }

    public function CarModel($data)
    {

        $arr = [];
        foreach ($data as $i => $item) {
//            $arr[$i]=$item;
            foreach ($item['children'] as $k => $kim) {
                $item['children'][$k]['children'] = CarModelModel::where('series_id', $kim['value'])
                    ->field('model_name as label,model_id as value')->select();
            }
            $arr[$i] = $item;
        }
        return $arr;
    }
}