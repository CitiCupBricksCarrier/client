angular.module('myApp.login', [

])

    .config(function($stateProvider,$urlRouterProvider){

    })

    .controller('LoginCtrl',function($scope, $route, $http) {


        $scope.login = function() {
            $http({
                method: 'get',
                url: 'getSession',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                //cache: true, //避免多次请求后台数据
            }).then(function (response) {
                if(response.data!="null"){
                    loginNotice("您("+response.data+")已登陆，无需重复登陆");
                }else{
                    if($scope.username==null){
                        loginNotice("请正确输入邮箱");//可改为其他样式
                    }else if($scope.password==null||$scope.password==""){
                        loginNotice("请输入密码");//可改为其他样式
                    }else {
                        var datas = {
                            "username": $scope.username,
                            "password": $scope.password
                        };
                        var result = JSON.stringify(datas);
                        $http({
                            method: 'post',
                            url: 'login',
                            params: {
                                "data": result
                            },
                            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                            cache: true //避免多次请求后台数据
                        }).then(function (response) {
                            if (response.data == "fail") {
                                loginNotice("请确认用户名和密码");//可改为其他样式
                            } else if(response.data == "success"){
                                loginNotice("登陆成功");//可改为其他样式
                                $scope.haslogined = true;
                                $http({
                                    method: 'post',
                                    url: 'getUserDetail',
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                                    //cache: true, //避免多次请求后台数据
                                }).then(function (response) {
                                    $scope.userType=response.data.type;//此处即为当前用户的身份，分别为worker,sponsor,admin
                                    $scope.userCredit=response.data.credit;
                                    $scope.userName=response.data.name;
                                }, function () {
                                    loginNotice("身份信息获取错误4");
                                });
                                document.getElementById('closeLoginModalButton').click();
                                $window.location.reload();
                            }else{
                                loginNotice("登陆失败3");
                            }
                        }, function () {
                            loginNotice("登陆错误2");
                        });
                    }
                }
            }, function () {
                alert("登陆错误1");
            });
        };


    });