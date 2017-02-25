angular.module('movieApp.indexCtrl',[])
    .controller('indexCtrl',['$scope','$location',function ($scope,$location) {
        $scope.searchName = '';
        $scope.search = function () {
            $location.url('/search/' + $scope.searchName);
        }
    }])