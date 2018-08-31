angular.module('myApp.login', [

])

    .config(function($stateProvider,$urlRouterProvider){

    })

    .controller('LoginCtrl',function($scope, $route, $http) {


        $scope.login = function() {
            $http({
                method: 'post',
                url: urlHead + 'getSession',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                withCredentials: true
                //cache: true, //避免多次请求后台数据
            }).then(function (response) {
                if(response.data != "null"){
                    alert("您("+response.data+")已登陆，无需重复登陆");
                }else{
                    if($scope.username == null){
                        alert("请正确输入邮箱");//可改为其他样式
                    }else if($scope.password == null||$scope.password==""){
                        alert("请输入密码");//可改为其他样式
                    }else {
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
                                alert("请确认用户名和密码");//可改为其他样式
                            } else if(response.data == "success"){
                                alert("登陆成功");//可改为其他样式
                                $scope.haslogined = true;
                                $window.location.reload();
                            }else{
                                alert(response.data);
                            }
                        }, function () {
                            alert("登陆错误2");
                        });
                    }
                }
            }, function () {
                alert("登陆错误1");
            });
        };


    });