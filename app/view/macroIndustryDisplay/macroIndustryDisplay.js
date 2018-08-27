var app=angular.module('myApp.macroIndustryDisplay', [
    'myApp.macroIndustryDisplay.generalInfo',
    'myApp.macroIndustryDisplay.sellNum',
    'myApp.macroIndustryDisplay.holdNum',
    'myApp.macroIndustryDisplay.capacity',
    'myApp.macroIndustryDisplay.inventory',
    'myApp.macroIndustryDisplay.price',
    'myApp.macroIndustryDisplay.qyjx',
    'myApp.macroIndustryDisplay.hysxysj',
    'myApp.macroIndustryDisplay.hycw',


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
        $stateProvider
            .state('macroIndustryDisplay.qyjx',{
                url:'/qyjx',
                templateUrl: 'view/macroIndustryDisplay/economicData/qyjx/qyjx.html',
                controller: 'qyjxCtrl'
            });
        $stateProvider
            .state('macroIndustryDisplay.hysxysj',{
                url:'/hysxysj',
                templateUrl: 'view/macroIndustryDisplay/economicData/hysxysj/hysxysj.html',
                controller: 'hysxysjCtrl'
            });
        $stateProvider
            .state('macroIndustryDisplay.hycw',{
                url:'/htcw',
                templateUrl: 'view/macroIndustryDisplay/economicData/hycw/hycw.html',
                controller: 'hycwCtrl'
            });
    })

    .controller('MacroIndustryDisplayCtrl',function($scope, $route, $http) {
        $scope.toshowDataPane=false;
        $scope.toshowDataPane2=false;

        $scope.showDataPane=function () {
            $scope.toshowDataPane=true;
        }
        $scope.hideDataPane=function () {
            $scope.toshowDataPane=false;
        };
        $scope.showDataPane2=function () {
            $scope.toshowDataPane2=true;
        };
        $scope.hideDataPane2=function () {
            $scope.toshowDataPane2=false;
        };
    });





