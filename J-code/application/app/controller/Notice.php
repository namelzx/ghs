<?php


namespace app\app\controller;


use app\app\model\UserModel;

class Notice extends Base
{
    public function GetDataByNotice()
    {
        $data = input('param.');
        if ((int)$data['type'] === 1) {
            UserModel::where('id', $data['user_id'])->setInc('merchants_notice', 1);
            $temp = ['gHQSOcCng-4XY0DlM2b7dZlifhDeu24qoKiAcfbFa5s', 'X0uUIhn5jENF4vHQ2m-69RzcEwyd9NMDGHvQxWiwLGs', 'wVyeppelYymqlhqmveaTIiA_S7tIled9l_1cETl5o-0'];
            ajax_return_ok($temp);
        }
        UserModel::where('id', $data['user_id'])->setInc('shop_notice', 1);
        $temp = ['VBZVNkSYnlufR7hXMxmV1LFVNHdbQlv4OKesClBZz04', 'wVyeppelYymqlhqmveaTIiA_S7tIled9l_1cETl5o-0'];
        ajax_return_ok($temp);
//        'gHQSOcCng-4XY0DlM2b7dZlifhDeu24qoKiAcfbFa5s',

    }

}