<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-31
 * Time: 04:43
 */

namespace app\admin\controller;


use app\admin\model\ShopModel;
use app\admin\model\UserModel;
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
     * 提现审核
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

        $user = UserModel::where('id', $data['user_id'])->find();

        if ($data['type'] === 1) {

            if ($data['status'] === 1) {
                $pass = time() . make_password(6);
                $res = $app->transfer->toBalance([
                    'partner_trade_no' => $pass, // 商户订单号，需保持唯一性(只能是字母或者数字，不能包含有符号)
                    'openid' => $user['openid'],
                    'check_name' => 'NO_CHECK', // NO_CHECK：不校验真实姓名, FORCE_CHECK：强校验真实姓名
                    're_user_name' => '梁泽祥', // 如果 check_name 设置为FORCE_CHECK，则必填用户真实姓名
                    'amount' => (float)$data['money'] * 100, // 企业付款金额，单位为分
                    'desc' => '提现', // 企业付款操作说明信息。必填
                ]);
                if (!empty($res['payment_no'])) {
                    WithdrawalModel::where('id', 'in', $data['id'])->data(['status' => $data['status']])->update();
                    ajax_return_ok($res);
                } else {

                    ajax_return_error($res['err_code_des']);
                }

            }
        } else {
            if ($data['status'] === 1) {
                $pass = time() . make_password(6);
                $res = $app->transfer->toBalance([
                    'partner_trade_no' => $pass, // 商户订单号，需保持唯一性(只能是字母或者数字，不能包含有符号)
                    'openid' => $user['openid'],
                    'check_name' => 'NO_CHECK', // NO_CHECK：不校验真实姓名, FORCE_CHECK：强校验真实姓名
                    're_user_name' => '', // 如果 check_name 设置为FORCE_CHECK，则必填用户真实姓名
                    'amount' => (float)$data['money'] * 100, // 企业付款金额，单位为分
                    'desc' => '提现', // 企业付款操作说明信息。必填
                ]);
                if (!empty($res['payment_no'])) {

                    WithdrawalModel::where('id', 'in', $data['id'])->data(['status' => $data['status']])->update();
                    ajax_return_ok($res);
                } else {
                    ajax_return_error($res['err_code_des']);

                }


            }
        }
    }

    public
    function GetOpenidByFind()
    {
        $data = input('param.');
        $res = WithdrawalModel::where('openid', $data['openid'])->find();
        if (empty($res)) {
            ajax_return_ok(404, '没有找到');
        }
        ajax_return_ok($res);
    }

}