angular.module('myApp.microIndustryChain', [
    'myApp.microIndustryChain.createChainView',
    'myApp.microIndustryChain.previewChainView'
])

    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('microIndustryChain.createChainView',{
                url:'/createChainView',
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

    .controller('MicroIndustryChainCtrl',function($scope, $route, $http) {
    });