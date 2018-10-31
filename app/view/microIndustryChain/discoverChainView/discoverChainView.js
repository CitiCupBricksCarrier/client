angular.module('myApp.microIndustryChain.discoverChainView', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('DiscoverChainViewCtrl',function($scope, $route, $http, $stateParams) {

        $http({
            method: 'post',
            url: urlHead + 'getSession',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            withCredentials: true
            //cache: true, //避免多次请求后台数据
        }).then(function (response) {
            if(response.data != "null"){
                $scope.haslogined = true;
            }
            else{
                $scope.haslogined = false;
            }
        }, function () {
            console.error("session error");
        });


        $http({
            method: 'post',
            url: urlHead + 'getAllGraphList',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            withCredentials: true
            //cache: true, //避免多次请求后台数据
        }).then(function (response) {
            $scope.allGraphList = response.data;
        }, function () {
            console.error("get graph list error");
        });

        $http({
            url: urlHead + 'getAllArctiles',
            method: 'post',
            // contentType: "application/json",
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            withCredentials: true
        }).then(function successCallBack(response) {
            // console.log(2323,response.data)
            $scope.allArticleList = response.data;
        }, function errorCallBack(response) {
            console.log("erreor");
        });

    });