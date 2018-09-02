angular.module('myApp.macroIndustryDisplay.hyssdw', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('hyssdwCtrl',function($scope, $route, $http) {

        $http({
            method: 'POST',
            url: 'http://localhost:8080/economicData/hycw/hygk/srzgdpbz'
        }).then(function successCallback(response) {
            var Data=response.data;
            var industryinc=[];
            var shareofgdp=[];



            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,4));
                industryinc.push(Data[i].industryinc);
                shareofgdp.push(Data[i].shareofgdp);

            }
            var myChart1 = echarts.init(document.getElementById('test'));
            option = {
                color:['#344996','#88A500'],
                title: {
                    text: '中国汽车行业收入占GDP比重'
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['行业收入','行业收入占GDP比重(右)'],

                },
                xAxis: {
                    data: year
                },
                yAxis: [{    name:'行业收入',
                    type:'value',
                    splitNumber:10
                },
                    {    name:'行业收入占GDP比重(右)',
                        type:'value',
                        splitNumber:8,
                        axisLabel:{
                            formatter: '{value} %'
                        },
                    }
                ],
                series: [

                    {
                        name: '行业收入',
                        type: 'bar',
                        data: industryinc,
                        yAxisIndex:0
                    },
                    {
                        name: '行业收入占GDP比重(右)',
                        type: 'line',
                        data: shareofgdp,
                        yAxisIndex:1

                    }

                ]
            };
            myChart1.setOption(option);


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

    });