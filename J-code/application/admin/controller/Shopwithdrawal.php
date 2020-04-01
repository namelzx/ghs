<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-31
 * Time: 04:43
 */

namespace app\admin\controller;


use app\admin\model\ShopModel;
use app\common\model\WithdrawalModel;
use EasyWeChat\Factory;

class Shopwithdrawal extends System
{


    public function GetDataByList()
    {
        $data = input('param.');
        $where = [];
        $res = WithdrawalModel::with(['user'])
            ->where('status', 2)
            ->where($where)->paginate($data['limit'], false, ['query' => [$data['page']]]);
        ajax_return_ok($res);
    }

    /**
     * 审核
     */
    public function PostDataByAudit()
    {
        $data = input('param.');

        $config = [
            // 必要配置
            'app_id' => 'wxae80c2472ba27081',
            'mch_id' => '1573988331',
            'key' => 'qwertyuiopasdfghjklzxcvbnm123456',   // API 密钥
            // 如需使用敏感接口（如退款、发送红包等）需要配置 API 证书路径(登录商户平台下载 API 证书)
            'cert_path' => getcwd() . '/cert/apiclient_cert.pem', // XXX: 绝对路径！！！！
            'key_path' => getcwd() . '/cert/apiclient_key.pem',
            'notify_url' => '默认的订单回调地址',     // 你也可以在下单时单独设置来想覆盖它
        ];

        $app = Factory::payment($config);

        if ($data['status'] === 1) {

            $res = WithdrawalModel::where('id', 'in', $data['ids'])->data([$data['field'] => $data['status']])->update();
            ajax_return_ok($data);

        } else {
            $arr = [];
            $all = WithdrawalModel::where('id', 'in', $data['ids'])->select();
            foreach ($all as $i => $item) {
                ShopModel::where('user_id', $item['user_id'])->setInc('balance', (float)$item['money']);
            }
            ajax_return_ok($all);

        }
    }

    public function GetOpenidByFind()
    {
        $data = input('param.');
        $res = WithdrawalModel::where('openid', $data['openid'])->find();
        if (empty($res)) {
            ajax_return_ok(404, '没有找到');
        }
        ajax_return_ok($res);
    }

}