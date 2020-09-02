<?php


namespace app\app\validate;


use think\facade\Validate;

class ProjectValidate extends Validate
{

    protected $rule = [
        'name' => 'require',
        'total' => 'require',
        'type' => 'require',
        'nature' => 'require',
        'unit' => 'require',
        'manager' => 'require',
        'tel' => 'require',
        'enterprise' => 'require',
        'enterprisename' => 'require',
        'enterprisephone' => 'require',
        'supervision' => 'require',
        'supervision_name' => 'require',
        'chairman_name' => 'require',
        'chairman_tel' => 'require',
        'start_time' => 'require',
        'end_time' => 'require',


        'area' => 'require',
        'informant' => 'require',
        'informant_tel' => 'require',
        'result' => 'require',
        'checkPhone' => 'require',

        'reguulatory' => 'require',
        'inspector_tel' => 'require',
        'enterprise_name' => 'require',
        'enterprise_tel' => 'require',
        'regulatory' => 'require',
        'project_address' => 'require',

    ];

    protected $message = [
        'name.require' => '项目名称',
        'total.require' => '项目总人数',
        'type.require' => '项目类型项目',
        'nature.require' => '单位性质',
        'unit.require' => '承建单位',
        'manager.require' => '经理姓名',
        'tel.require' => '经理电话',
        'enterprise.require' => '劳务企业名称',
        'enterprisename.require' => '劳务企业联系人姓名',
        'tel.require' => '经理电话必填',
        'enterprisephone.require' => '劳务企业联系人电话',
        'supervision.require' => '项目监理单位名称',
        'supervision_name.require' => '监理单位联系人姓名',
        'chairman_name.require' => '项目工会主席姓名',
        'chairman_tel.require' => '项目工会主席电话',
        'start_time.require' => '开工时间',
        'end_time.require' => '竣工时间',
        'area.require' => '项目所属城区',

        'informant.require' => '填报人姓名',
        'informant_tel.require' => '填报人电话',
        'result.require' => '创先争优目标',
        'checkPhone.require' => '注册时报名的电话',
        'reguulatory.require' => '项目所属城区监管单位',
        'enterprise_name.require' => '企业工会主席/副主席',
        'enterprise_tel.require' => '企业工会主席姓名及联系方式',
        'regulatory.require' => '监管单位',
        'project_address.require' => '项目地址',
    ];


}