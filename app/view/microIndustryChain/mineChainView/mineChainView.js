angular.module('myApp.microIndustryChain.mineChainView', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('MineChainViewCtrl',function($scope, $route, $http, $stateParams, $state, $window) {
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
                $state.go('login');
            }
        }, function () {
            console.error("session error");
        });


        $http({
            method: 'post',
            url: urlHead + 'getOwnGraphList',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            withCredentials: true
            //cache: true, //避免多次请求后台数据
        }).then(function (response) {
            $scope.ownGraphList = response.data;
        }, function () {
            console.error("get graph list error");
        });



        $scope.addNewGraph = function () {
            $http({
                method: 'post',
                url: urlHead + 'newGraph',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                withCredentials: true,
                //cache: true, //避免多次请求后台数据
            }).then(function (response) {
                console.log(response.data);
                $window.location.reload();
            }, function () {
                console.error("Link Failed");
            });
        };

    });