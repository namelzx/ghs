<?php

namespace app\common\util;


class TreeUtil
{

    /**
     * [getParents 获取分类id所有父级分类]
     * @param  [type] $list [2维数组]
     * @param  [type] $id   [指定id]
     * @param  string $pk [主键标识]
     * @param  string $pid [父级标识]
     * @return [array]      [父类数组]
     */
    public static function getParents($list, $id, $pk = 'id', $pid = 'parentId')
    {

        $tree = array();
        foreach ($list as $v) {
            if ($v[$pk] == $id) {
                $tree[] = $v;
                $tree = array_merge(self::getParents($list, $v[$pid]), $tree);
            }
        }

        return $tree;
    }

    /**
     * [getParentsId 获取分类id所有父级分类id]
     * @param  [type] $list [2维数组]
     * @param  [type] $id   [指定id]
     * @param  string $pk [主键标识]
     * @param  string $pid [父级标识]
     * @return [array]      [父类数组]
     */
    public static function getParentsId($list, $id, $pk = 'id', $pid = 'parentId')
    {

        $tree = array();
        foreach ($list as $v) {
            if ($v[$pk] == $id) {
                $tree[] = $v[$pk];
                $tree = array_merge(self::getParentsId($list, $v[$pid], $pk, $pid), $tree);
            }
        }

        return $tree;
    }

    /**
     * [listToTreeOne 格式化分类，生成一维数组 ,根据path 属性]
     * @param  [type]  $list   [数组]
     * @param  integer $root [指定根节点]
     * @param  string $prefix [前缀标识]
     * @param  string $pk [主键标识]
     * @param  string $pid [父级标识]
     * @param  string $html [前缀字符]
     * @return [type]          [description]
     */
    public static function listToTreeOne($list, $root = 0, $prefix = '', $pk = 'id', $pid = 'parentId', $html = 'html')
    {

        $tree = array();
        foreach ($list as $v) {
            if ($v[$pid] == $root) {
                if ($v[$pid] == 0) {
                    $level = 0;
                } else {
                    $level = count(self::getParentsId($list, $v[$pk], $pk, $pid));
                }

                $v[$html] = str_repeat("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", $level);
                $v[$html] = $v[$html] ? ($v[$html] . $prefix) : $v[$html];
                $tree[] = $v;
                $level++;
                $tree = array_merge($tree, self::listToTreeOne($list, $v[$pk], $prefix, $pk, $pid, $html));
            }
        }

        return $tree;
    }


    /**
     * [listToTreeMulti 格式化分类--生成多维数组 ，子数组放在child 属性中]
     * @param  [type]  $list  [数组]
     * @param  integer $root [指定根节点]
     * @param  string $pk [主键标识]
     * @param  string $pid [父级标识]
     * @param  string $child [子级标识]
     * @return [type]         [description]
     */
    public static function listToTreeMulti($list, $root = 0, $pk = 'id', $pid = 'parentId', $child = 'child')
    {

        $new_array = [];
        foreach ($list as $v) {
            $new_array[$v['id']] = $v;
        }
        //遍历新的数组，对每一个值的pid进行判断，判断新数组中是否存在键名为pid的值，如果存在，当前值为存在的pid的子节点，不存在，当前值为一级节点，添加到返回的数据中作为一级节点。这里使用引用传值是因为直接传值是不会影响到函数外边的变量值，我们这里要给一级节点添加子节点（sons），所以需要用到引用传值。
        $return_tree = [];
        foreach ($new_array as $kk => $vv) {

            if (isset($new_array[$vv['pid']])) {

                $new_array[$vv['pid']]['children'][] = &$new_array[$kk];
            } else {
                $return_tree[] = &$new_array[$kk];
            }
        }


        return $return_tree;
    }


    /**
     * [list_to_tree 格式化分类，生成多维数组的树]
     * @param  [type]  $list  [数组]
     * @param  integer $root [指定根节点]
     * @param  string $pk [主键标识]
     * @param  string $pid [父级标识]
     * @param  string $child [子级标识]
     * @return [type]         [description]
     */
    public static function list_to_tree($list, $root = 0, $pk = 'id', $pid = 'parentId', $child = 'child')
    {
        // 创建Tree
        $tree = array();
        if (is_array($list)) {
            // 创建基于主键的数组引用
            $refer = array();
            foreach ($list as $key => $data) {
                $refer[$data[$pk]] =& $list[$key];
            }

            foreach ($list as $key => $data) {
                // 判断是否存在parent
                $parentId = $data[$pid];
                if ($root == $parentId) {
                    $tree[] =& $list[$key];
                } else {
                    if (isset($refer[$parentId])) {
                        $parent =& $refer[$parentId];
                        $parent[$child][] =& $list[$key];
                    }
                }
            }
        }

        return $tree;
    }


}