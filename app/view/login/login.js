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

          $http({
            method: 'post',
            url: urlHead + 'getLoginParams',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            cache: true, //避免多次请求后台数据
            withCredentials: true
          }).then(function (response) {

            var modulus = null,
                exponent = null,
                eventId = null,
                bizToken = null;

            console.log(response);
            modulus = response.data.modulus;
            eventId = response.data.eventid;
            exponent = response.data.exponent;
            bizToken = response.data.bizToken;


            var pub = new RSAKey();
            pub.setPublic(modulus, exponent);
            var unencrypted_data = eventId + ",b" + $scope.password;
            var encrypted_password = pub.encryptB(getByteArray(unencrypted_data)).toString(16);


            var datas = {
              "username": $scope.username,
                "ori":$scope.password,
              "password": encrypted_password,
              "bizToken": bizToken
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

          }, function () {
            console.error("get login params error");
          });



        }


    });