angular.module('myApp.macroIndustryDisplay.hylsbj', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('hylsbjCtrl',function($scope, $route, $http) {
        $http({
            method: 'POST',
            url: 'http://localhost:8080/ComparisonOfIndustryHistory/ComparisonOfIndustryHistory_all'
        }).then(function successCallback(response) {
            var Data=response.data
            console.log(Data)
            var cordebtratio=[];

            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,4));
                cordebtratio.push(Data[i].cordebtratio);



            }
            var myChart4= echarts.init(document.getElementById('zgqcqyzcfzl'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国汽车企业资产负债率',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['资产负债率'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                xAxis: {
                    data: year,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {                    axisLabel: {
                        formatter: '{value} %',
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }},
                series: [

                    {
                        name: '资产负债率',
                        type: 'line',
                        data: cordebtratio,
                    }
                ]
            };
            myChart4.setOption(option);


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

    });