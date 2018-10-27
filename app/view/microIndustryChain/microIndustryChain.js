angular.module('myApp.microIndustryChain', [
    'myApp.microIndustryChain.discoverChainView',
    'myApp.microIndustryChain.mineChainView',
    'myApp.microIndustryChain.createChainView',
    'myApp.microIndustryChain.previewChainView'
])

    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.when('/microIndustryChain', '/microIndustryChain/discoverChainView');

        $stateProvider
            .state('microIndustryChain.discoverChainView',{
                params:{"graphid":null},
                url:'/discoverChainView',
                templateUrl: 'view/microIndustryChain/discoverChainView/discoverChainView.html',
                controller: 'DiscoverChainViewCtrl'
            })
            .state('microIndustryChain.mineChainView',{
                url:'/mineChainView',
                templateUrl: 'view/microIndustryChain/mineChainView/mineChainView.html',
                controller: 'MineChainViewCtrl'
            })
            .state('microIndustryChain.createChainView',{
                url:'/createChainView/?:graphid',
                templateUrl: 'view/microIndustryChain/createChainView/createChainView.html',
                controller: 'CreateChainViewCtrl'
            })
            .state('microIndustryChain.previewChainView',{
                params:{"graphid":null},
                url:'/previewChainView/?:graphid',
                templateUrl: 'view/microIndustryChain/previewChainView/previewChainView.html',
                controller: 'PreviewChainViewCtrl'
            })
            .state('microIndustryChain.industryFactorAnalyze',{
                url:'/industryFactorAnalyze',
                templateUrl: 'view/microIndustryChain/industryFactorAnalyze/industryFactorAnalyze.html',
                controller: 'IndustryFactorAnalyzeCtrl'
            })
    })

    .controller('MicroIndustryChainCtrl',function($scope, $route, $http, $state) {

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
                //$state.go('login');
            }
        }, function () {
            console.error("session error");
        });


        $scope.clickDiscoverTab = function () {
            $('#discoverTab').addClass('tabs-li-selected');
            $('#mineTab').removeClass('tabs-li-selected');
        };

        $scope.clickMineTab = function () {
            if($scope.haslogined) {
                $('#mineTab').addClass('tabs-li-selected');
                $('#discoverTab').removeClass('tabs-li-selected');
            }
            else{
                $state.go('login')
            }
        };
    });