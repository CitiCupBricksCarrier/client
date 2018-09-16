angular.module('myApp.macroIndustryDisplay.price', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('priceCtrl',function($scope, $route, $http) {
        $http({
            method: 'POST',
            url: urlHead+'industryData/price/cycztjgbhzs/cycztjgbhzs'
        }).then(function successCallback(response) {
            var Data=response.data;
            var totalpricechangeindex=[];

            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,4));
                totalpricechangeindex.push(Data[i].totalpricechangeindex);



            }
            var myChart1= echarts.init(document.getElementById('cycztjgbhzs'));
            option = {
                color:['#344996'],
                title: {
                    text: '乘用车整体价格变化指数',
                    textStyle: {
                        color: '#FFFFFF'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['整体价格变化指数'],
                    textStyle: {
                        color: '#FFFFFF'
                    }
                },
                xAxis: {
                    data: f1,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                series: [

                    {
                        name: '整体价格变化指数',
                        type: 'line',
                        data: totalpricechangeindex,
                    }
                ]
            };
            myChart1.setOption(option);


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });
        $http({
            method: 'POST',
            url: urlHead+'industryData/price/cycztjgbhzs/cycztzdyhzs'
        }).then(function successCallback(response) {
            var Data=response.data;
            var overallterminalpreferenceindex=[];

            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,4));
                overallterminalpreferenceindex.push(Data[i].overallterminalpreferenceindex);



            }
            var myChart2= echarts.init(document.getElementById('cycztzdyhzs'));
            option = {
                color:['#344996'],
                title: {
                    text: '乘用车整体终端优惠指数',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['整体终端优惠指数'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                xAxis: {
                    data: f1,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }},
                series: [

                    {
                        name: '整体终端优惠指数',
                        type: 'line',
                        data: overallterminalpreferenceindex,
                    }
                ]
            };
            myChart2.setOption(option);


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

    });