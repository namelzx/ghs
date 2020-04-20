<?php
/**
 * Created by PhpStorm.
 * User: lzx
 * Date: 2019-09-14
 * Time: 23:15
 */

Route::group('api/app/', function () {

    Route::rule('upload', 'api/Base/upload'); /*文件上传*/

    Route::rule('pay', 'app/Tools/Pay'); /*支付*/


    Route::rule('Send', 'api/SendSms/Send'); /*文件上传*/

    Route::rule('toPay', 'api/pay/toPay'); /*支付*/

    Route::rule('getPlat', 'api/Base/getPlat'); /*支付*/
    Route::rule('cheDist', 'api/dist/cheDist'); /*检测分销用户是否提交*/

    Route::rule('refund', 'api/Base/refund'); /*退款*/

    Route::rule('PostCollection', 'api/Collection/PostCollection'); /*收藏*/


    Route::rule('distribution', 'api/Base/distribution'); /*进行分销操作*/

    Route::rule('buildBg', 'api/Base/buildBg'); /*生成海报*/

    Route::rule('BuildCode', 'api/Base/BuildCode'); /*生成二维码*/


    Route::rule('GetBannerByList', 'api/Banner/GetBannerByList'); /*文件上传*/

    Route::rule('shop/GetShopByList', 'api/shop/GetShopByList'); /* 登陆*/
    Route::get('shop/GetShopGoodsByList', 'api/shop/GetShopGoodsByList'); /* 根据店铺id获取店铺所有的数据*/

    Route::get('shop/GetIdGoodsByInfo', 'api/shop/GetIdGoodsByInfo'); /* 根据店铺id获取店铺所有的数据*/


    Route::get('shop/GetShopListGoodsByCategory', 'api/shop/GetShopListGoodsByCategory'); /* 根据店铺店铺展示2*/


    Route::get('city/getProvinces', 'api/shop/getProvinces'); /* 获取省份*/
    Route::get('city/getArea', 'api/shop/getArea'); /* 获取区域*/


    /**
     * 获取优惠卷
     */
    Route::rule('coupons/GetUserByCoupons', 'api/Coupon/GetUserByCoupons'); /* 查询可用优惠卷列表*/
    Route::rule('coupons/PostUserCoupon', 'api/Coupon/PostUserCoupon'); /* 领取优惠卷*/
    Route::rule('coupons/GetCounpn', 'api/Coupon/GetCounpn'); /* 领取优惠卷*/
    Route::rule('home/GetappByHome', 'app/Home/GetAppByHome'); /*获取首页数据*/

    /**
     * 用户模块
     */
    Route::post('user/postUserByRegistered', 'app/user/postUserByRegistered');//用户注册
    Route::get('user/GetUserByInfo', 'app/user/GetUserByInfo');//绑定用户信息
    Route::post('user/PostDataByDist', 'app/user/PostDataByDist');//收藏房间
    Route::post('user/PostUserByData', 'app/user/PostUserByData');//绑定信息
    Route::get('user/GetUserGoodsByList', 'app/user/GetUserGoodsByList');//获取用户店铺商品
    Route::post('user/PostdataByStatus', 'app/user/PostdataByStatus');//商品入库&上架
    Route::post('user/PostdataByDel', 'app/user/PostdataByDel');//删除商品


    Route::get('user/GetUserCommissByInfo', 'app/user/GetUserCommissByInfo');//获取用户佣金体系

    Route::post('user/GetUserWithdrawlByList', 'app/user/GetUserWithdrawlByList');//获取用户佣金体系


    /**
     * 城市管理
     */
    Route::get('city/GetCity', 'app/Region/GetCity');//获取城市列表
    Route::get('city/GetCommunityBylist', 'app/Region/GetCommunityBylist');//获取城市列表


    /**
     * 分类管理
     */
    Route::get('Category/GetCategoryByList', 'app/Category/GetCategoryByList');//分类管理


    /**
     * 商品管理
     */

    Route::get('Goods/GetDataByList', 'app/Goods/GetDataByList');//获取商品
    Route::get('Goods/GetDataByInfo', 'app/Goods/GetDataByInfo');//获取详情
    Route::post('Goods/PostDataByAdd', 'app/Goods/PostDataByAdd');//添加商品

    Route::get('Goods/GetDataByGooslist', 'app/Goods/GetDataByInfo');//获取详情


    //小区管理
    Route::get('Community/GetDataBylist', 'app/Community/GetDataBylist');//获取小区

    Route::post('Community/PostDataByAdd', 'app/Community/PostDataByAdd');//添加小区


    /**
     * 用户店铺
     */
    Route::rule('shop/PostDataByAdd', 'app/Shop/PostDataByAdd');//添加店铺

    Route::rule('shop/GetUserIdByInfo', 'app/Shop/GetUserIdByInfo');//获取店铺信息
    Route::rule('shop/GetShoplistInfo', 'app/Shop/GetShoplistInfo');//展示店铺信息


    Route::rule('shop/GetShopHomeByData', 'app/Shop/GetShopHomeByData');//用户主页数据

    Route::rule('shop/PostAudheByAdd', 'app/Shop/PostAudheByAdd');//用户提现信息认证
    Route::rule('shop/CheUserByAudhe', 'app/Shop/CheUserByAudhe');//用户提现信息认证

    Route::rule('shop/PostDataByWithdrawal', 'app/Shop/PostDataByWithdrawal');//用户提现

    Route::rule('shop/GetMoneyByLog', 'app/Shop/GetMoneyByLog');//店铺提现记录


    /**
     * 地址管理
     */

    Route::rule('tools/GetCityByName', 'tools/Citytools/GetCityByName'); /* 通过城市和区获取地址id*/
    
    Route::rule('city/GetByCitylist', 'app/Region/GetByCitylist'); /* 获取用户地址*/

    Route::rule('Useraddress/PostDataByAdd', 'app/Useraddress/PostDataByAdd'); /* 添加地址*/

    Route::rule('Useraddress/GetDataByUseradderss', 'app/Useraddress/GetDataByUseradderss'); /* 获取用户地址*/
    Route::rule('address/getAddressBydetailed', 'api/Address/getAddressBydetailed'); /* 获取地址详情*/

    Route::rule('address/postAddress', 'api/Address/postAddress'); /* 添加地址*/
    Route::rule('address/getAddressBydetailed', 'api/Address/getAddressBydetailed'); /* 获取地址详情*/

    Route::rule('address/GetDataByDelete', 'api/Address/GetDataByDelete'); /*  删除数据*/
    Route::rule('address/gettAddress', 'api/Address/gettAddress'); /* 获取选中地址*/
    Route::rule('address/getAddressByItems', 'api/Address/getAddressByItems'); /* 获取地址列表*/
    Route::rule('address/getDefaultAddress', 'api/Address/getDefaultAddress'); /* 获取地址列表*/
    Route::rule('address/getUserAddressCount', 'api/Address/getUserAddressCount'); /* 查看地址数量*/

    /**
     * 订单管理模块
     */
    Route::rule('order/PostDataBycreateOrder', 'app/Pay/PostDataBycreateOrder'); /* 提交用户订单*/

    Route::rule('order/GetDataByInfo', 'app/order/GetDataByInfo'); /* 订单详细*/

    Route::rule('order/PostDataByUpdate', 'app/order/PostDataByUpdate'); /* 修改订单状态*/

    Route::rule('order/GetShopOrderByUpdate', 'app/order/GetShopOrderByUpdate'); /* 用户签收*/


    Route::rule('order/GetUserIdByList', 'app/order/GetUserIdByList'); /* 获取用户订单*/
    Route::rule('order/PayLog', 'app/Pay/PayLog'); /*支付日志*/
    Route::rule('order/postEvakuteByAdd', 'app/order/PostevakuteByAdd'); /* 订单评论*/


    /**
     * 商家订单管理
     */
    Route::rule('ordershop/GetShopOrderByList', 'app/shop/GetShopOrderByList'); /* 获取商家的订单*/
    Route::rule('ordershop/GetShopOrderByUpdate', 'app/shop/GetShopOrderByUpdate'); /* 获取商家的订单*/


    /**
     * 文章管理
     */
    Route::rule('Article/GetDataByArticle', 'api/Article/GetDataByArticle'); /* 获取用户订单*/
    Route::rule('Article/GetDataByDetailed', 'api/Article/GetDataByDetailed'); /* 获取用户订单*/
    Route::rule('Article/PostDataByEav', 'api/Article/PostDataByEav'); /* 文章评价*/
    Route::rule('Article/GetIdByEav', 'api/Article/GetIdByEav'); /* 获取文章评论*/
    Route::rule('Article/GetEavIdByLike', 'api/Article/GetEavIdByLike'); /* 用户评论点赞*/
    Route::rule('Article/GetArticleIdByLike', 'api/Article/GetArticleIdByLike'); /* 用户评论点赞*/

    /**
     * 签到
     */
    Route::rule('Dist/GetUserDistLog', 'api/Dist/GetUserDistLog'); /* 获取用户订单*/
    Route::rule('Dist/PostUserByIntegral', 'api/Dist/PostUserByIntegral'); /* 获取用户订单*/
    Route::rule('Dist/GetUserByIntegral', 'api/Dist/GetUserByIntegral'); /* 统计用户的积分*/


    Route::rule('IntGoods/GetIntegralByGoods', 'api/IntGoods/GetIntegralByGoods'); /* 获取用户订单*/


    Route::rule('IntOrder/PostOrderByData', 'api/IntOrder/PostOrderByData'); /* 提交用户订单*/
    Route::rule('IntOrder/GetUserByOrder', 'api/IntOrder/GetUserByOrder'); /* 获取用户订单*/
    Route::rule('IntOrder/GetIdByCancel', 'api/IntOrder/GetIdByCancel'); /* 取消订单*/
    Route::rule('IntOrder/PostDataByEva', 'api/IntOrder/PostDataByEva'); /* 取消订单*/
    Route::rule('IntOrder/GetOrderIdByFind', 'api/IntOrder/GetOrderIdByFind'); /* 订单详细*/

    /**
     * 分销模块管理
     */
    Route::rule('Dist/GetUserByDist', 'api/Dist/GetUserByDist'); /* 获取分销订单*/
    Route::rule('Dist/GetUserByTeam', 'api/Dist/GetUserByTeam'); /* 获取我的团队*/

    /**
     * 收藏
     */
    Route::rule('Coll/GetCollGoods', 'api/Collection/GetCollGoods'); /* 获取分销订单*/


});