<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-06-30
 * Time: 11:25
 */

Route::group('api/admin/', function () {


    Route::rule('GetAdminByHome', 'admin/home/GetAdminByHome'); /* 上传*/

    Route::rule('getuser', 'admin/admin/getuser'); /* 上传*/

    Route::rule('login', 'admin/Login/login'); /* 上传*/

    Route::rule('upload', 'admin/base/upload'); /* 上传*/
    Route::rule('library', 'admin/base/library'); /* 获取图片库*/

    Route::rule('rulesarticle', 'admin/base/rulesarticle'); /* 获取图片库*/


    Route::rule('user/login', 'admin/Login/login'); /* 登陆*/
    Route::rule('user/info', 'admin/Login/info'); /* 获取当前登陆信息*/
    Route::rule('user/logout', 'admin/Login/logout'); /* 获取当前登陆信息*/


    /**
     * 分类模块管理
     */
    Route::rule('category/GetDataByList', 'admin/Category/GetDataByList'); /* 获取分类列表*/
    Route::rule('category/PostDataBySave', 'admin/Category/PostDataBySave'); /* 更新或保存数据*/
    Route::rule('category/GetIdByDel', 'admin/Category/GetIdByDel'); /* 删除数据*/

    Route::rule('category/GetCategory', 'admin/Category/GetCategory'); /* 获取所有的一级分类*/


    /**
     * 品牌模块
     */
    Route::rule('brand/GetDataByList', 'admin/brand/GetDataByList'); /* 获取分类列表*/
    Route::rule('brand/PostDataBySave', 'admin/brand/PostDataBySave'); /* 更新或保存数据*/
    Route::rule('brand/GetIdByDel', 'admin/brand/GetIdByDel'); /* 删除数据*/
    Route::rule('brand/GetCategoryIdByItems', 'admin/brand/GetCategoryIdByItems'); /* 删除数据*/


    /**
     * 商品模块
     */

    Route::rule('goods/GetDataByList', 'admin/goods/GetDataByList'); /* 获取列表*/
    Route::rule('goods/PostDataBySave', 'admin/goods/PostDataBySave'); /* 更新或保存数据*/
    Route::rule('goods/GetIdByDel', 'admin/goods/GetIdByDel'); /* 删除数据*/
    Route::rule('goods/GetIdByDetails', 'admin/goods/GetIdByDetails'); /* 商品详情*/
    Route::rule('goods/PostDataByUp', 'admin/goods/PostDataByUp'); /* 更新商品状态*/


    /**
     * 主题管理
     */
    Route::rule('theme/GetDataByList', 'admin/theme/GetDataByList'); /* 获取分类列表*/
    Route::rule('theme/PostDataBySave', 'admin/theme/PostDataBySave'); /* 更新或保存数据*/
    Route::rule('theme/GetIdByDel', 'admin/theme/GetIdByDel'); /* 删除数据*/
    Route::rule('theme/GetCategoryIdByItems', 'admin/theme/GetCategoryIdByItems'); /* 删除数据*/
    Route::rule('theme/PostThemeBySave', 'admin/theme/PostThemeBySave'); /* 删除数据*/
    Route::rule('theme/GetCategory', 'admin/Category/GetCategory'); /* 获取所有的一级分类*/
    Route::rule('theme/GetThemeIdByItems', 'admin/theme/GetThemeIdByItems'); /* 获取所有的一级分类*/

    /**
     * 优惠卷表
     */
    Route::rule('coupon/GetDataByList', 'admin/coupon/GetDataByList'); /* 获取分类列表*/
    Route::rule('coupon/PostDataBySave', 'admin/coupon/PostDataBySave'); /* 更新或保存数据*/
    Route::rule('coupon/GetIdByDel', 'admin/coupon/GetIdByDel'); /* 删除数据*/
    Route::rule('coupon/GetCategory', 'admin/coupon/GetCategory'); /* 获取所有的一级分类*/


    /**
     * 新闻管理
     */
    Route::rule('news/GetDataByList', 'admin/news/GetDataByList'); /* 获取分类列表*/
    Route::rule('news/PostDataBySave', 'admin/news/PostDataBySave'); /* 更新或保存数据*/
    Route::rule('news/GetIdByDel', 'admin/news/GetIdByDel'); /* 删除数据*/
    Route::rule('news/GetIdByDetails', 'admin/news/GetIdByDetails'); /* 商品详情*/
    /**
     * 招聘板块
     */
    Route::rule('recruit/GetDataByList', 'admin/recruit/GetDataByList'); /* 获取分类列表*/
    Route::rule('recruit/PostDataBySave', 'admin/recruit/PostDataBySave'); /* 更新或保存数据*/
    Route::rule('recruit/GetIdByDel', 'admin/recruit/GetIdByDel'); /* 删除数据*/
    Route::rule('recruit/GetIdByDetails', 'admin/recruit/GetIdByDetails'); /* 商品详情*/


    /**
     * 订单板块
     */






    /**
     * 管理员板块
     */
    Route::get('/admin/getDataByDetail', 'admin/admin/getDataByDetail');//获取商品分类
    Route::post('/admin/postDataByAdd', 'admin/admin/postDataByAdd');//获取商品分类
    Route::get('/admin/getIdByDel', 'admin/admin/getIdByDel');//获取商品分类


    /**
     * 快递板块
     */
    Route::get('/courier/getDataByDetail', 'admin/courier/getDataByDetail');//获取商品分类
    Route::post('/courier/postDataByAdd', 'admin/courier/postDataByAdd');//获取商品分类
    Route::get('/courier/getIdByDel', 'admin/courier/getIdByDel');//获取商品分类

    Route::get('/courier/all', 'admin/courier/getall');//获取商品分类


    /**
     *用户列表
     */

    Route::get('/user/GetDataByList', 'admin/user/GetDataByList');//获取用户列表

    /**
     * 商品规则
     */

    Route::get('/Rulesarticle/GetDataByList', 'admin/Rulesarticle/GetDataByList');//获取商品分类
    Route::post('/Rulesarticle/PostDataBySave', 'admin/Rulesarticle/PostDataBySave');//获取商品分类
    Route::get('/Rulesarticle/GetIdByDetails', 'admin/Rulesarticle/getDataByDetail');//获取商品分类


});
