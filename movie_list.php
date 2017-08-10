<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/6/19
 * Time: 13:12
 */
header("Content-Type: text/html;charset=utf-8");
$id = $_GET['id'];
$start = $_GET['start'];
//echo  $start;
if ($id == 'in_theaters') {
    echo file_get_contents('https://api.douban.com/v2/movie/in_theaters?start='.$start.'&count=5&apiKey=0b2bdeda43b5688921839c8ecb20399b');
} else if ($id == 'coming_soon') {
    echo file_get_contents('https://api.douban.com/v2/movie/coming_soon?start='.$start.'&count=5&apiKey=0b2bdeda43b5688921839c8ecb20399b');
} else if($id == 'top250'){
    echo file_get_contents('https://api.douban.com/v2/movie/top250?start='.$start.'&count=5&apiKey=0b2bdeda43b5688921839c8ecb20399b');
}else{
    echo file_get_contents( 'https://api.douban.com/v2/movie/subject/'.$id.'?apiKey=0b2bdeda43b5688921839c8ecb20399b');
}
