angular.module('myApp.macroIndustryDisplay', [
    'myApp.macroIndustryDisplay.generalInfo'
])

    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('macroIndustryDisplay.generalInfo',{
                url:'/generalInfo',
                templateUrl: 'view/macroIndustryDisplay/generalInfo/generalInfo.html',
                controller: 'GeneralInfoCtrl'
            })
    })

    .controller('MacroIndustryDisplayCtrl',function($scope, $route, $http) {
    });