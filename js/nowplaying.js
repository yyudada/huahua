// 11.创建 正在热映的控制器的模块 并且创建一个正在热映控制器
angular.module('movieApp.nowplayingCtrl', [])
    .controller('nowplayingCtrl', ['$scope', '$movieServ','$routeParams', function($scope, $movieServ,$routeParams) {
        //1. 实现电影列表的展示功能
        // 1.创建一个电影列表的属性
        //console.log($routeParams.pageid);
        $scope.isLoading = false;

        $routeParams.pageid = $routeParams.pageid || 1;
        $scope.movie = {};
        $scope.pageid = $routeParams.pageid;
        var start = ($routeParams.pageid-1)*5;
        $movieServ.jsonp('https://api.douban.com/v2/movie/in_theaters', {
            count: 5,
            start: start
        }, function(data) {

            console.log(data);

            $scope.movie = data;
            $scope.prevPage = $routeParams.pageid - 1;
            if($routeParams.pageid <= 1){
                $scope.prevPage = 1;
            }
            $scope.nextPage = ($routeParams.pageid - 0) + 1;
            $scope.pageCount = Math.ceil(data.total/5);
            if($routeParams.pageid >= $scope.pageCount){
                $scope.nextPage = $scope.pageCount;
            }
            $scope.total = data.total;
            $scope.isLoading = true;
            $scope.$apply();
        })


    }]);
