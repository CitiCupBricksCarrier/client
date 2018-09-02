angular.module('myApp.macroIndustryDisplay.hycw', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('hycwCtrl',function($scope, $route, $http) {

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
            var myChart1 = echarts.init(document.getElementById('srzgdpbz'));
            option = {
                color:['#344996','#88A500'],
                title: {
                    text: '中国汽车行业收入占GDP比重',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['行业收入','行业收入占GDP比重(右)'],
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
                yAxis: [{
                    type:'value',
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
                        axisLabel:{
                            formatter: '{value} %',
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
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

        $http({
            method: 'POST',
            url: 'http://localhost:8080/economicData/hycw/hygk/qyhksqysl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var enterprise=[];
            var lossmkenterprise=[];



            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,4));
                enterprise.push(Data[i].enterprise);
                lossmkenterprise.push(Data[i].lossmkenterprise);

            }
            var myChart2 = echarts.init(document.getElementById('qyhksqysl'));
            option = {
                color:['#344996','#88A500'],
                title: {
                    text: '中国汽车行业企业和亏损企业数量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['企业','亏损企业'],
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
                        name: '企业',
                        type: 'bar',
                        data: enterprise,
                    },
                    {
                        name: '亏损企业',
                        type: 'bar',
                        data: lossmkenterprise,

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
            url: 'http://localhost:8080/economicData/hycw/cwsj/fzzj'
        }).then(function successCallback(response) {
            var Data=response.data;
            var totalliailities=[];



            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,4));
                totalliailities.push(Data[i].totalliailities);

            }
            var myChart3 = echarts.init(document.getElementById('fzzj'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国汽车行业负债总计',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['负债总计'],
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
                        name: '负债总计',
                        type: 'bar',
                        data: totalliailities,
                    }

                ]
            };
            myChart3.setOption(option);


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: 'http://localhost:8080/economicData/hycw/cwsj/lrze'
        }).then(function successCallback(response) {
            var Data=response.data;
            var totalpro=[];



            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,4));
                totalpro.push(Data[i].totalpro);

            }
            var myChart4 = echarts.init(document.getElementById('lrze'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国汽车行业利润总额',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['利润总额'],
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
                        name: '利润总额',
                        type: 'bar',
                        data: totalpro,
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
            url: 'http://localhost:8080/economicData/hycw/cwsj/zyywcb'
        }).then(function successCallback(response) {
            var Data=response.data;
            var mainbusicost=[];



            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,4));
                mainbusicost.push(Data[i].mainbusicost);

            }
            var myChart5 = echarts.init(document.getElementById('zyywcb'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国汽车行业主营业务成本',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['主营业务成本'],
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
                        name: '主营业务成本',
                        type: 'bar',
                        data: mainbusicost,
                    }

                ]
            };
            myChart5.setOption(option);


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });
        $http({
            method: 'POST',
            url: 'http://localhost:8080/economicData/hycw/cwsj/zczj'
        }).then(function successCallback(response) {
            var Data=response.data
            var totalassets=[];



            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,4));
                totalassets.push(Data[i].totalassets);

            }
            var myChart6 = echarts.init(document.getElementById('zczj'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国汽车行业资产总计',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['资产总计'],
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
                        name: '资产总计',
                        type: 'bar',
                        data: totalassets,
                    }

                ]
            };
            myChart6.setOption(option);


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: 'http://localhost:8080/economicData/qyjx/gdzctz/gdzttze'
        }).then(function successCallback(response) {
            var Data=response.data
            var autoandmoto=[];
            var automobile=[];
            var modcar=[];
            var motorcycle=[];
            var totalauto=[];
            var vehicleeng=[];



            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,4));
                autoandmoto.push(Data[i].autoandmoto);
                automobile.push(Data[i].automobile);
                modcar.push(Data[i].modcar);
                motorcycle.push(Data[i].motorcycle);
                totalauto.push(Data[i].totalauto);
                vehicleeng.push(Data[i].vehicleeng);

            }
            var myChart7 = echarts.init(document.getElementById('gdzctze'));
            option = {
                color:['#344996','#88A500','#FF7800','#E52600','#7B4DD0','#1A96B1'],
                title: {
                    text: '中国汽车行业固定资产投资额',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['汽车行业','改装车行业','摩托车行业','车用发动机行业','汽车与摩托车零部件行业','汽车行业总计(右)'],
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
                yAxis:  [{
                    type:'value',
                    splitNumber:8,
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
                        name: '汽车行业',
                        type: 'bar',
                        data: automobile,
                        stack:'fc'

                    },
                    {
                        name: '改装车行业',
                        type: 'bar',
                        data: modcar,
                        stack:'fc'
                    },
                    {
                        name: '摩托车行业',
                        type: 'bar',
                        data: motorcycle,
                        stack:'fc'

                    },
                    {
                        name: '车用发动机行业',
                        type: 'bar',
                        data: vehicleeng,
                        stack:'fc'

                    },
                    {
                        name: '汽车与摩托车零部件行业',
                        type: 'bar',
                        data: autoandmoto,
                        stack:'fc'
                    },
                    {
                        name: '汽车行业总计(右)',
                        type: 'line',
                        data: totalauto,
                        yAxisIndex:1
                    }

                ]
            };
            myChart7.setOption(option);


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: 'http://localhost:8080/economicData/qyjx/gdzctz/gdzctzzqgtzbz'
        }).then(function successCallback(response) {
            var Data=response.data
            var fixedassetinvpro=[];



            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,4));
                fixedassetinvpro.push(Data[i].fixedassetinvpro);

            }
            var myChart8 = echarts.init(document.getElementById('gdzctzzqgtzbz'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国汽车行业固定资产投资占全国投资比重',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['固定资产投资占全国投资比重'],
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
                        name: '固定资产投资占全国投资比重',
                        type: 'line',
                        data: fixedassetinvpro,
                    }

                ]
            };
            myChart8.setOption(option);


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

    });