angular.module('myApp.microIndustryChain.writeArticle', [
])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('WriteArticleCtrl',function($scope, $route, $http, $stateParams, $state) {

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

    });
