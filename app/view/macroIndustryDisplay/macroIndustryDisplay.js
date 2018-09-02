angular.module('myApp.macroIndustryDisplay', [
    'myApp.macroIndustryDisplay.generalInfo',
    'myApp.macroIndustryDisplay.companyDetails',
    'myApp.macroIndustryDisplay.sellNum',
    'myApp.macroIndustryDisplay.holdNum',
    'myApp.macroIndustryDisplay.capacity',
    'myApp.macroIndustryDisplay.inventory',
    'myApp.macroIndustryDisplay.price',
    'myApp.macroIndustryDisplay.qyjx',
    'myApp.macroIndustryDisplay.hysxysj',
    'myApp.macroIndustryDisplay.hycw',
    'myApp.macroIndustryDisplay.hyssdw',
    'myApp.macroIndustryDisplay.hylsbj',
    'myApp.macroIndustryDisplay.scbxdb',

])

    .config(function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.when('/macroIndustryDisplay', '/macroIndustryDisplay/generalInfo');

        $stateProvider
            .state('macroIndustryDisplay.generalInfo',{
                url:'/generalInfo',
                templateUrl: 'view/macroIndustryDisplay/generalInfo/generalInfo.html',
                controller: 'GeneralInfoCtrl'
            })
            .state('macroIndustryDisplay.companyDetails', {
                url: '/companyDetails/:stkcd_toShow',
                templateUrl: 'view/macroIndustryDisplay/companyDetails/companyDetails.html',
                controller: 'CompanyDetailsCtrl'
            })
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
                url:'/hycw',
                templateUrl: 'view/macroIndustryDisplay/economicData/hycw/hycw.html',
                controller: 'hycwCtrl'
            });
        $stateProvider
            .state('macroIndustryDisplay.hyssdw',{
                url:'/hyssdw',
                templateUrl: 'view/macroIndustryDisplay/industryStatus/hyssdw/hyssdw.html',
                controller: 'hyssdwCtrl'
            });
        $stateProvider
            .state('macroIndustryDisplay.hylsbj',{
                url:'/hylsbj',
                templateUrl: 'view/macroIndustryDisplay/industryStatus/hylsbj/hylsbj.html',
                controller: 'hylsbjCtrl'
            });
        $stateProvider
            .state('macroIndustryDisplay.scbxdb',{
                url:'/scbxdb',
                templateUrl: 'view/macroIndustryDisplay/industryStatus/scbxdb/scbxdb.html',
                controller: 'scbxdbCtrl'
            });
    })

    .controller('MacroIndustryDisplayCtrl',function($scope, $route, $http) {
        $scope.toshowDataPane=false;
        $scope.toshowDataPane2=false;
        $scope.toshowDataPane3=false;


        $scope.showDataPane=function () {
            $scope.toshowDataPane=true;
        };
        $scope.hideDataPane=function () {
            $scope.toshowDataPane=false;
        };
        $scope.showDataPane2=function () {
            $scope.toshowDataPane2=true;
        };
        $scope.hideDataPane2=function () {
            $scope.toshowDataPane2=false;
        };
        $scope.showDataPane3=function () {
            $scope.toshowDataPane3=true;
        };
        $scope.hideDataPane3=function () {
            $scope.toshowDataPane3=false;
        };

        //导航栏的点击效果
        $('.header_macro .module_nav .nav').click(function (e) {
            console.log($('.header_macro .module_nav .nav.active'))
            $('.header_macro .module_nav .nav.active').removeClass('active');
            $(this).addClass('active');
            console.log($(this));
        })

        //
        // var myChart = echarts.init(document.getElementById('main'));
        //
        // // 指定图表的配置项和数据
        // var option = {
        //     title: {
        //         text: 'ECharts 入门示例'
        //     },
        //     tooltip: {},
        //     legend: {
        //         data:['销量']
        //     },
        //     xAxis: {
        //         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        //     },
        //     yAxis: {},
        //     series: [{
        //         name: '销量',
        //         type: 'bar',
        //         data: [5, 20, 360, 10, 10, 20]
        //     }]
        // };
        //
        // // 使用刚指定的配置项和数据显示图表。
        // myChart.setOption(option);
    });





