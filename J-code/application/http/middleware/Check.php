<?php

namespace app\http\middleware;

class Check
{
    public function handle($request, \Closure $next)
    {

        $response = $next($request);



        // 添加中间件执行代码



        return $response;
    }
}
