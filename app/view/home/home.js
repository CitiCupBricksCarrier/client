angular.module('myApp.home', [

])

    .config(function($stateProvider,$urlRouterProvider){

    })

    .controller('HomeCtrl',function($scope, $route, $http, $state) {
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
                //$state.go('login');
            }
        }, function () {
            console.error("login error1");
        });



    });