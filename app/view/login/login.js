angular.module('myApp.login', [

])

    .config(function($stateProvider,$urlRouterProvider){

    })

    .controller('LoginCtrl',function($scope, $route, $http, $state) {

        $http({
            method: 'post',
            url: urlHead + 'getSession',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            withCredentials: true
            //cache: true, //避免多次请求后台数据
        }).then(function (response) {
            if(response.data != "null"){
                $scope.haslogined = true;
                $state.go('home');
            }
        }, function () {
            console.error("login error1");
        });



        $scope.login = function() {
            var datas = {
                "username": $scope.username,
                "password": $scope.password
            };
            var result = JSON.stringify(datas);
            $http({
                method: 'post',
                url: urlHead + 'login',
                params: {
                    "data": result
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                cache: true, //避免多次请求后台数据
                withCredentials: true
            }).then(function (response) {
                if (response.data == "fail") {
                    $scope.notice = "请确认用户名和密码";//可改为其他样式
                } else if(response.data == "success"){
                    $scope.haslogined = true;
                    $state.go('home');
                }else{
                    alert(response.data);
                }
            }, function () {
                console.error("login error2");
            });
        }


    });