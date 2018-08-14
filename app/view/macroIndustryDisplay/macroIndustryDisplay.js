var app=angular.module('myApp.macroIndustryDisplay', [
    'myApp.macroIndustryDisplay.generalInfo',
    'myApp.macroIndustryDisplay.sellNum',
    'myApp.macroIndustryDisplay.holdNum',
    'myApp.macroIndustryDisplay.capacity',
    'myApp.macroIndustryDisplay.inventory',
    'myApp.macroIndustryDisplay.price',

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
                templateUrl: 'view/macroIndustryDisplay/industryData/holdNum/holdNum.html',
                controller: 'holdNumCtrl'
            });
        $stateProvider
            .state('macroIndustryDisplay.capacity',{
                url:'/capacity',
                templateUrl: 'view/macroIndustryDisplay/industryData/capacity/capacity.html',
                controller: 'capacityCtrl'
            });
        $stateProvider
            .state('macroIndustryDisplay.inventory',{
                url:'/inventory',
                templateUrl: 'view/macroIndustryDisplay/industryData/inventory/inventory.html',
                controller: 'inventoryCtrl'
            });
        $stateProvider
            .state('macroIndustryDisplay.price',{
                url:'/price',
                templateUrl: 'view/macroIndustryDisplay/industryData/price/price.html',
                controller: 'priceCtrl'
            });

    })

    .controller('MacroIndustryDisplayCtrl',function($scope, $route, $http) {
        $scope.toshowDataPane=false;
        $scope.showDataPane=function () {
            $scope.toshowDataPane=true;
        }
        $scope.hideDataPane=function () {
            $scope.toshowDataPane=false;
        };


    });





