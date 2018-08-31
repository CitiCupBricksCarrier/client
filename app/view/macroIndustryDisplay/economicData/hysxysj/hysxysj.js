angular.module('myApp.macroIndustryDisplay.hysxysj', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('hysxysjCtrl',function($scope, $route, $http) {

        $http({
            method: 'POST',
            url: 'http://localhost:8080/economicData/hysxysj/zggcjg'
        }).then(function successCallback(response) {
            var Data=response.data;
            var coldrolledordinary=[];
            var galvanized=[];
            var hotrolledordinary=[];
            var hotrolledstrip=[];

            var month=[];
            for(var i=0;i<Data.length;i++) {
                month.push(Data[i].month.substr(0,7));
                coldrolledordinary.push(Data[i].coldrolledordinary);
                galvanized.push(Data[i].galvanized);
                hotrolledordinary.push(Data[i].hotrolledordinary);
                hotrolledstrip.push(Data[i].hotrolledstrip);



            }
            //#3449960
            var myChart1= echarts.init(document.getElementById('zggcjg'));
            option = {
                color:['#344996','#88A500','#FF7800','#E52600'],
                title: {
                    text: '中国钢材价格'
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['180*2.5热轧带钢现货','1mm镀锌板现货','3mm热轧普通薄板现货','1mm冷轧普通薄板现货'],

                },
                xAxis: {
                    data: month
                },
                yAxis: {},
                series: [

                    {
                        name: '180*2.5热轧带钢现货',
                        type: 'bar',
                        data: hotrolledstrip,
                    },
                    {
                        name: '1mm镀锌板现货',
                        type: 'bar',
                        data: galvanized,
                    },
                    {
                        name: '3mm热轧普通薄板现货',
                        type: 'bar',
                        data: hotrolledordinary,
                    },
                    {
                        name: '1mm冷轧普通薄板现货',
                        type: 'bar',
                        data: coldrolledordinary,
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
            url: 'http://localhost:8080/economicData/hysxysj/zggllkzzl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var hwpassturnover=[];

            var month=[];
            for(var i=0;i<Data.length;i++) {
                month.push(Data[i].month.substr(0,7));
                hwpassturnover.push(Data[i].hwpassturnover);



            }
            var myChart2= echarts.init(document.getElementById('zggllkzzl'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国公路旅客周转量'
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['公路旅客'],

                },
                xAxis: {
                    data: month
                },
                yAxis: {},
                series: [

                    {
                        name: '公路旅客',
                        type: 'bar',
                        data: hwpassturnover,
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
            url: 'http://localhost:8080/economicData/hysxysj/zggdzctzjgzs'
        }).then(function successCallback(response) {
            var Data=response.data;
            var fixedassetinv=[];

            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,7));
                fixedassetinv.push(Data[i].fixedassetinv);



            }
            var myChart3= echarts.init(document.getElementById('zggdzctzjgzs'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国固定资产投资价格指数'
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['固定资产投资'],

                },
                xAxis: {
                    data: year
                },
                yAxis: {},
                series: [

                    {
                        name: '固定资产投资',
                        type: 'bar',
                        data: fixedassetinv,
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
            url: 'http://localhost:8080/economicData/hysxysj/zgjmxfzc'
        }).then(function successCallback(response) {
            var Data=response.data;
            var percapitaexp=[];

            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,7));
                percapitaexp.push(Data[i].percapitaexp);



            }
            var myChart4= echarts.init(document.getElementById('zgjmxfzc'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国居民消费支出'
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['居民消费支出'],

                },
                xAxis: {
                    data: year
                },
                yAxis: {},
                series: [

                    {
                        name: '居民消费支出',
                        type: 'bar',
                        data: percapitaexp,
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
            url: 'http://localhost:8080/economicData/hysxysj/zgkcxl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var bussales=[];

            var month=[];
            for(var i=0;i<Data.length;i++) {
                month.push(Data[i].month.substr(0,7));
                bussales.push(Data[i].bussales);



            }
            var myChart5= echarts.init(document.getElementById('zgkcxl'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国客车销量'
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['客车'],

                },
                xAxis: {
                    data: month
                },
                yAxis: {},
                series: [

                    {
                        name: '客车',
                        type: 'bar',
                        data: bussales,
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
            url: 'http://localhost:8080/economicData/hysxysj/zgrjgdpzs'
        }).then(function successCallback(response) {
            var Data=response.data;
            var percapitagdp=[];

            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,4));
                percapitagdp.push(Data[i].percapitagdp);



            }
            var myChart6= echarts.init(document.getElementById('zgrjgdpzs'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国人均GDP指数'
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['人均GDP指数'],

                },
                xAxis: {
                    data: year
                },
                yAxis: { axisLabel: {
                        formatter: '{value} %'
                    }},
                series: [

                    {
                        name: '人均GDP指数',
                        type: 'bar',
                        data: percapitagdp,
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
            url: 'http://localhost:8080/economicData/hysxysj/zgtrxjyjscj'
        }).then(function successCallback(response) {
            var Data=response.data;
            var ntrubmonavemktpri=[];

            var month=[];
            for(var i=0;i<Data.length;i++) {
                month.push(Data[i].month.substr(0,7));
                ntrubmonavemktpri.push(Data[i].ntrubmonavemktpri);



            }
            var myChart7= echarts.init(document.getElementById('zgtrxjyjscj'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国天然橡胶月均市场价'
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['天然橡胶'],

                },
                xAxis: {
                    data: month
                },
                yAxis: {},
                series: [

                    {
                        name: '天然橡胶',
                        type: 'bar',
                        data: ntrubmonavemktpri,
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
            url: 'http://localhost:8080/economicData/hysxysj/zgzkcl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var hvtruckop=[];

            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,7));
                hvtruckop.push(Data[i].hvtruckop);



            }
            var myChart8= echarts.init(document.getElementById('zgzkcl'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国重卡产量'
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['重卡'],

                },
                xAxis: {
                    data: year
                },
                yAxis: {},
                series: [

                    {
                        name: '重卡',
                        type: 'bar',
                        data: hvtruckop,
                    }
                ]
            };
            myChart8.setOption(option);


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });
    });