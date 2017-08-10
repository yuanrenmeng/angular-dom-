/**
 * Created by Administrator on 2017/6/19.
 */
//0.导入用的到js文件到index.html中
(function (angular) {
    //1.定义模块
    var app = angular.module('app', ['ngRoute']);
    //2.定义控制器
    app.controller('appController', ['$scope', function ($scope) {
        //5.初始化变量
        $scope.title = "豆瓣电影";
    }]);
    // 3/4 绑定模块和控制器
    //5，把电影列表抽取出去单独做一个movie_list.html，为了路由配置的时候导入模板
    //6.配置路由,在app模块中注入路由模块，在要添加路由的html标签中添加ng-view
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/movie/:id', {
            templateUrl: 'movie_list.html',
            controller: 'movieListController'
        }).otherwise({
            redirectTo: '/movie/in_theaters'
        })
    }]);

    //7.注入$http服务,如果要创建个控制器的话记得要绑定到页面也要绑定到配置路由中
    app.controller('movieListController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        // console.log($routeParams);//obj{id:in_theaters}
        //11.在电影里面模板中添加loading图片，在这里设置初始化请求时等待图片显示true，
        //到下面$http服务中获取到数据的时候，更新图片显示给false
        $scope.isLoading = true;

        //8.使用$http服务通过PHP桥接请求豆瓣数据
        // $http({
        //     url:'movie_list.php',//9.实现PHP通过传参不同请求不同类型的数据
        //     method:'get',
        //     params:{
        //         start:0,
        //         id: $routeParams.id
        //     }
        // }).then(function(res){
        //     //10.请求成功，获取返回数据res.data，然后在movie_list.html通过遍历数据
        //     //获取数据更新界面
        //     $scope.listArr = res.data;
        //     //11.1让loading图片消失
        //     $scope.isLoading = false;
        //
        // }).catch(function(err){});
        //抽取的代码，刚进来的时候就加载最先的第五条数据
        changePage(1);

        //13.点击上一页下一页获取对应的数据
        var curpage = 1;
        $scope.page = function (type) {
            if (type) {
                curpage--;
                changePage(curpage);
            } else {
                curpage++;
                changePage(curpage);
            }
        };

        //封装点击的页码获取的数据的函数
        function changePage(curpage) {
            $http({
                url: 'movie_list.php',
                method: 'get',
                params: {
                    start: (curpage - 1) * 5,
                    id: $routeParams.id
                }
            }).then(function (res) {
                //请求成功，获取返回数据res.data，然后在movie_list.html通过遍历数据
                //获取数据更新界面
                $scope.listArr = res.data;
                $scope.isLoading = false;
            }).catch(function (err) {
            });
        }

        // //14.搜索电影
        // $scope.search = function () {
        //     var inputVlue = $scope.searchD;
        //     $http({
        //         url: 'movie_list.php',
        //         method: 'get',
        //         params: {
        //             start: (curpage - 1) * 5,
        //             id: $routeParams.id
        //         }
        //     }).then(function (res) {
        //         //请求成功，获取返回数据res.data，然后在movie_list.html通过遍历数据
        //         //获取数据更新界面
        //         for (var i = 0; i < res.data.subjects.length; i++) {
        //             var obj = res.data.subjects[i];
        //             obj.indexs = i;
        //
        //             if(inputVlue == obj.title){//怎么拿到当条数据？？？
        //                 console.log(111);
        //                 console.log(this.indexs);
        //                 console.log(indexs);
        //                 console.log(222);
        //                 $scope.listArr = res.data.subjects[index];
        //
        //
        //             }
        //         }
        //         $scope.isLoading = false;
        //     }).catch(function (err) {
        //     });
        // }

    }]);

    //12.配置详情页,到PHP中获取豆瓣api的网络地址
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/detail/:id', {
            templateUrl: 'detail_tpl.html',
            controller: 'movieListController'
        }).otherwise({
            redirectTo: '/movie/in_theaters'
        })
    }]);

    var active = document.getElementsByClassName('content_l')[0];
    var li = active.getElementsByTagName('li');
    for (var i = 0; i < li.length; i++) {
        li[i].onclick = function () {
            for (var j = 0; j < li.length; j++) {
                li[j].className = '';
            }
            this.className = 'active';
        }
    }



})(angular);