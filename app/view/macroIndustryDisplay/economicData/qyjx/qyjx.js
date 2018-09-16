angular.module('myApp.macroIndustryDisplay.qyjx', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('qyjxCtrl',function($scope, $route, $http) {
        $http({
            method: 'POST',
            url: urlHead+'economicData/qyjx/qbcyrypjrs'
        }).then(function successCallback(response) {
            var Data=response.data;
            var numempave=[];

            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,4));
                numempave.push(Data[i].numempave);



            }
            var myChart1= echarts.init(document.getElementById('zgqchyqbcyrypjrs'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国汽车行业全部从业人员平均人数',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['全部从业人员'],
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
                yAxis: {axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }},
                series: [

                    {
                        name: '全部从业人员',
                        type: 'bar',
                        data: numempave,
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
            url: urlHead+'economicData/qyjx/snxspjzzl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var thryearsalesgrowratecomave=[];

            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,4));
                thryearsalesgrowratecomave.push(Data[i].thryearsalesgrowratecomave);



            }
            var myChart2= echarts.init(document.getElementById('zgqcqysnxspjzzl'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国汽车企业三年销售平均增长率',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['三年销售平均增长率'],
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
                        name: '三年销售平均增长率',
                        type: 'line',
                        data: thryearsalesgrowratecomave,
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
            url: urlHead+'economicData/qyjx/xjldfzbl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var cashcurdebtratio=[];

            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,4));
                cashcurdebtratio.push(Data[i].cashcurdebtratio);



            }
            var myChart2= echarts.init(document.getElementById('zgqcqyxjldfzbl'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国汽车企业现金流动负债比率',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['现金流动负债比率'],
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
                yAxis: {
                    axisLabel: {
                        formatter: '{value} %',
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                series: [

                    {
                        name: '现金流动负债比率',
                        type: 'line',
                        data: cashcurdebtratio,
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
            url: urlHead+'economicData/qyjx/xslrl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var corsalespromargin=[];

            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,4));
                corsalespromargin.push(Data[i].corsalespromargin);



            }
            var myChart4= echarts.init(document.getElementById('zgqcqyxslrl'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国汽车企业销售利润率',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['销售利润率'],
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
                        name: '销售利润率',
                        type: 'line',
                        data: corsalespromargin,
                    }
                ]
            };
            myChart4.setOption(option);


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: urlHead+'economicData/qyjx/zcfzl'
        }).then(function successCallback(response) {
            var Data=response.data
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