angular.module('myApp.microIndustryChain', [
    'myApp.microIndustryChain.createChainView'
])

    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('microIndustryChain.createChainView',{
                url:'/createChainView',
                templateUrl: 'view/microIndustryChain/createChainView/createChainView.html',
                controller: 'CreateChainViewCtrl'
            })
    })

    .controller('MicroIndustryChainCtrl',function($scope, $route, $http) {
    });