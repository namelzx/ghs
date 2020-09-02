<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2020-03-04
 * Time: 01:57
 */

namespace app\admin\controller;


use app\app\model\UserModel;
use EasyWeChat\Factory;

class Wechatuser extends System
{

    public function GetDataByList()
    {
        $data = input('param.');
        $where = [];
        if (!empty($data['nickName'])) {
            $where[] = ['nickName', 'like', '%' . $data['nickName'] . '%'];

        }
        $res = UserModel::where($where)->order('nature asc')->where('nature', 'neq', 2)->paginate($data['limit'], false, ['query' => [$data['page']]]);
        ajax_return_ok($res);
    }

    public function GetOpenidByFind()
    {
        $data = input('param.');
        $res = UserModel::where('openid', $data['openid'])->find();
        if (empty($res)) {
            ajax_return_ok(404, '没有找到');
        }
        ajax_return_ok($res);
    }

    public function PostRoleByUpdate()
    {
        $data = input('param.');
        $res = UserModel::where('id', 'in', $data['ids'])->data([$data['field'] => $data['status']])->update();
        ajax_return_ok($res);
    }


    public function Postwithdrawal()
    {
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
        $pass = time() . make_password(6);
        $res = $app->transfer->toBalance([
            'partner_trade_no' => $pass, // 商户订单号，需保持唯一性(只能是字母或者数字，不能包含有符号)
            'openid' => 'oD-YF5h-NshE5TE7MLJg432c8otk',
            'check_name' => 'FORCE_CHECK', // NO_CHECK：不校验真实姓名, FORCE_CHECK：强校验真实姓名
            're_user_name' => '梁泽祥', // 如果 check_name 设置为FORCE_CHECK，则必填用户真实姓名
            'amount' => 1*1000, // 企业付款金额，单位为分
            'desc' => '理赔', // 企业付款操作说明信息。必填
        ]);
//        $data = OrderModel::where('shop_id', 16)->delete();
        ajax_return_ok($res);
    }

}