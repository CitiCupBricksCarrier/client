angular.module('myApp.personal', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('PersonalCtrl',function($scope, $route, $http, $state) {

        $scope.logout = function () {
            $http({
                method: 'post',
                url: urlHead + 'logout',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                withCredentials: true
                //cache: true, //避免多次请求后台数据
            }).then(function (response) {
                if(response.data == "success"){
                    $scope.haslogined = false;
                    $state.go('login');
                }
            }, function () {
                console.error("log out error");
            });
        }

    });