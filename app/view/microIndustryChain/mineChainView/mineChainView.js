angular.module('myApp.microIndustryChain.mineChainView', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('MineChainViewCtrl',function($scope, $route, $http, $stateParams) {

        $scope.addNewGraph = function () {
            $http({
                method: 'post',
                url: urlHead + 'newGraph',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                withCredentials: true,
                //cache: true, //避免多次请求后台数据
            }).then(function (response) {
                console.log(response.data);
            }, function () {
                console.error("Link Failed");
            });
        };

    });