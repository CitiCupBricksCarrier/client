angular.module('myApp.macroIndustryDisplay.inventory', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('inventoryCtrl',function($scope, $route, $http) {
        $http({
            method: 'POST',
            url: urlHead+'industryData/inventory/kcxs/qcjxskcxs'
        }).then(function successCallback(response) {
            var Data=response.data;
            var distrifinishedfoodschn=[];
            var importdistrifinishedgoodschn=[];
            var jointdistrifinishedfoodschn=[];
            var selfdistrifinishedfoodschn=[];


            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,7));
                distrifinishedfoodschn.push(Data[i].distrifinishedfoodschn);
                importdistrifinishedgoodschn.push(Data[i].importdistrifinishedgoodschn);
                jointdistrifinishedfoodschn.push(Data[i].jointdistrifinishedfoodschn);
                selfdistrifinishedfoodschn.push(Data[i].selfdistrifinishedfoodschn);
            }
            var myChart2 = echarts.init(document.getElementById('zgqcjxskcxs'));
            option = {
                color:['#344996','#88A500','#FF7800','#E52600'],
                title: {
                    text: '中国汽车经销商库存系数',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['进口汽车','自主汽车','合资汽车','汽车(右)'],
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
                yAxis: [{
                            type:'value',
                            max:8,
                            splitNumber:10,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                        },
                        {
                        type:'value',
                            splitNumber:8,
                            min:0.5,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            }

                        }
                ],
                series: [

                    {
                        name: '进口汽车',
                        type: 'bar',
                        data: importdistrifinishedgoodschn,
                        yAxisIndex:0
                    },
                    {
                        name: '自主汽车',
                        type: 'bar',
                        data: selfdistrifinishedfoodschn,
                        yAxisIndex:0

                    },
                    {
                        name: '合资汽车',
                        type: 'bar',
                        data: jointdistrifinishedfoodschn,
                        yAxisIndex:0

                    },
                    {
                        name: '汽车(右)',
                        type: 'line',
                        data: distrifinishedfoodschn,
                        yAxisIndex:1
                    }
                ]
            };
            myChart2.setOption(option);


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });


        $http({
            method: 'POST',
            url: urlHead+'industryData/inventory/kcyjzs/qcjxskcyjzs'
        }).then(function successCallback(response) {
            var Data=response.data;
            var stockewarningindexchn=[];



            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,7));
                stockewarningindexchn.push(Data[i].stockewarningindexchn);

            }
            var myChart3 = echarts.init(document.getElementById('zgqcjxskcyjzs'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国汽车经销商库存预警指数',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['库存预警指数'],
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
                yAxis: [{
                    type:'value',
                    min:35,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                }
                ],
                series: [

                    {
                        name: '库存预警指数',
                        type: 'line',
                        data: stockewarningindexchn,
                    }
                ]
            };
            myChart3.setOption(option);


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

    });