var app=angular.module('myApp.macroIndustryDisplay', [
    'myApp.macroIndustryDisplay.generalInfo',
    'myApp.macroIndustryDisplay.sellNum',
    'myApp.macroIndustryDisplay.holdNum',
    'myApp.macroIndustryDisplay.capacity',
    'myApp.macroIndustryDisplay.inventory',
    'myApp.macroIndustryDisplay.price',
    'myApp.macroIndustryDisplay.registerNum',

])

    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('macroIndustryDisplay.generalInfo',{
                url:'/generalInfo',
                templateUrl: 'view/macroIndustryDisplay/generalInfo/generalInfo.html',
                controller: 'GeneralInfoCtrl'
            })
        $stateProvider
            .state('macroIndustryDisplay.sellNum',{
                url:'/sellNum',
                templateUrl: 'view/macroIndustryDisplay/industryData/sellNum/sellNum.html',
                controller: 'sellNumCtrl'
            });
        $stateProvider
            .state('macroIndustryDisplay.holdNum',{
                url:'/holdNum',
                templateUrl: 'view/macroIndustryDisplay/industryData/sellNum/holdNum.html',
                controller: 'holdNumCtrl'
            });
        $stateProvider
            .state('macroIndustryDisplay.capacity',{
                url:'/capacity',
                templateUrl: 'view/macroIndustryDisplay/industryData/sellNum/capacity.html',
                controller: 'capacityCtrl'
            });
        $stateProvider
            .state('macroIndustryDisplay.inventory',{
                url:'/inventory',
                templateUrl: 'view/macroIndustryDisplay/industryData/sellNum/inventory.html',
                controller: 'inventoryCtrl'
            });
        $stateProvider
            .state('macroIndustryDisplay.price',{
                url:'/price',
                templateUrl: 'view/macroIndustryDisplay/industryData/sellNum/price.html',
                controller: 'priceCtrl'
            });
        $stateProvider
            .state('macroIndustryDisplay.registerNum',{
                url:'/registerNum',
                templateUrl: 'view/macroIndustryDisplay/industryData/sellNum/registerNum.html',
                controller: 'registerNumCtrl'
            });
    })

    .controller('MacroIndustryDisplayCtrl',function($scope, $route, $http) {
        $scope.toshowDataPane=false;
        $scope.showDataPane=function () {
            $scope.toshowDataPane=true;
        }
        $scope.hideDataPane=function () {
            $scope.toshowDataPane=false;
        }


    });





