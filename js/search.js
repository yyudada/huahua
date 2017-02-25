
// 11.创建 正在热映的控制器的模块 并且创建一个正在热映控制器
angular.module('movieApp.searchCtrl', [])
    .controller('searchCtrl', ['$scope', '$movieServ', '$routeParams', function($scope, $movieServ, $routeParams) {
        //$routeParams.pageid 这个参数就是当前页面展示的页码数 // 1 2
        //给当前页码数初始化一个值 如果没有传入pageid 给默认值1
        $routeParams.pageid = $routeParams.pageid || 1;
        $scope.isLoading = false;
        //6. 暴露当前页码数
        $scope.pageid = $routeParams.pageid;
        //console.log($routeParams.pageid);
        $scope.searchName = $routeParams.searchName;
        $scope.movie = {};
        var start = ($routeParams.pageid - 1) * 5;
        $movieServ.jsonp('https://api.douban.com/v2/movie/search',
            {
                q:$routeParams.searchName,
                count: 5,
                start: start
            },
            function(data) {
            $scope.movie = data;
            //console.log(data);
            //2.暴露上一页的页码数
            $scope.prevPage = $routeParams.pageid - 1;
            if ($routeParams.pageid <= 1) {
                $scope.prevPage = 1;
            }
            //3.暴露下一页的页码数
            $scope.nextPage = ($routeParams.pageid - 0) + 1;
            //4.暴露总页数  16/ 5 == 4
            $scope.pageCount = Math.ceil(data.total / 5);
            if ($scope.nextPage == $scope.pageCount) {
                $scope.nextPage = $scope.pageCount;
            }
            //5.暴露一个总条数
            $scope.total = data.total;
            $scope.isLoading = true;
            //手动触发脏检查 因为这是我们自己写的异步代码 不会通知angular去刷新页面
            $scope.$apply();
        });
    }]);
