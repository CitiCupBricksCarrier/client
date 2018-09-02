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
                params:{"graphid":null},
                url:'/createChainView/?:graphid',
                templateUrl: 'view/microIndustryChain/createChainView/createChainView.html',
                controller: 'CreateChainViewCtrl'
            })
            .state('microIndustryChain.previewChainView',{
                params:{"nodeIDList":null, "nodeList":null, "nodeDisplayList":null, "connectionList":null},
                url:'/previewChainView',
                templateUrl: 'view/microIndustryChain/previewChainView/previewChainView.html',
                controller: 'PreviewChainViewCtrl'
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
            $('#discoverTab').addClass('active');
            $('#mineTab').removeClass('active');
        };

        $scope.clickMineTab = function () {
            if($scope.haslogined) {
                $('#mineTab').addClass('active');
                $('#discoverTab').removeClass('active');
            }
            else{
                $state.go('login')
            }
        };
    });