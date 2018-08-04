angular.module('myApp.macroIndustryDisplay', [
    'myApp.macroIndustryDisplay.generalInfo',
    'myApp.macroIndustryDisplay.companyDetails',
    'myApp.macroIndustryDisplay.sellNum'
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
                url: '/companyDetails/:stkcd_toShow',
                templateUrl: 'view/macroIndustryDisplay/companyDetails/companyDetails.html',
                controller: 'CompanyDetailsCtrl'
            })
        $stateProvider
            .state('macroIndustryDisplay.sellNum',{
                url:'/sellNum',
                templateUrl: 'view/macroIndustryDisplay/industryData/sellNum/sellNum.html',
                controller: 'sellNumCtrl'
            })
    })

    .controller('MacroIndustryDisplayCtrl',function($scope, $route, $http) {
        $scope.toshowDataPane=false;
        $scope.showDataPane=function () {
            $scope.toshowDataPane=true;
        }
        $scope.hideDataPane=function () {
            $scope.toshowDataPane=false;
        }
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





