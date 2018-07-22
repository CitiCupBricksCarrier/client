angular.module('myApp.macroIndustryDisplay', [
    'myApp.macroIndustryDisplay.generalInfo',
    'myApp.macroIndustryDisplay.companyDetails'
])

    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('macroIndustryDisplay.generalInfo',{
                url:'/generalInfo',
                templateUrl: 'view/macroIndustryDisplay/generalInfo/generalInfo.html',
                controller: 'GeneralInfoCtrl'
            })
        $stateProvider
            .state('macroIndustryDisplay.companyDetails', {
                url: '/companyDetails/:companyName',
                templateUrl: 'view/macroIndustryDisplay/companyDetails/companyDetails.html',
                controller: 'CompanyDetailsCtrl'
            })
    })

    .controller('MacroIndustryDisplayCtrl',function($scope, $route, $http) {
    });