angular.module('myApp.macroIndustryDisplay.holdNum', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('holdNumCtrl',function($scope, $route, $http) {
        $http({
            method: 'POST',
            url: 'http://localhost:8080/industryData/holdNum/qcbyl/zgqcbyl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var carownchn=[];
            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,4));
                carownchn.push(Data[i].carownchn);

            }
            var myChart1 = echarts.init(document.getElementById('zgqcbyl'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国汽车保有量'
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['保有量'],

                },
                xAxis: {
                    data: f1
                },
                yAxis: {},
                series: [
                    {
                        name: '保有量',
                        type: 'bar',
                        data: carownchn,
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
            url: 'http://localhost:8080/industryData/holdNum/qcbyl/zgqcmqrbyl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var carownperthouchn=[];
            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,4));
                carownperthouchn.push(Data[i].carownperthouchn);

            }
            var myChart2 = echarts.init(document.getElementById('zgqcmqrbyl'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国汽车每千人保有量'
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['每千人保有量'],

                },
                xAxis: {
                    data: f1
                },
                yAxis: {},
                series: [
                    {
                        name: '每千人保有量',
                        type: 'bar',
                        data: carownperthouchn,
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
            url: 'http://localhost:8080/industryData/holdNum/qczc/zgxzcmyqcsl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var civilcarchn=[];
            var civilcoachchn=[];
            var civilotherchn=[];
            var civiltruckchn=[];
            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,4));
                civilcarchn.push(Data[i].civilcarchn);
                civilcoachchn.push(Data[i].civilcoachchn);
                civilotherchn.push(Data[i].civilotherchn);
                civiltruckchn.push(Data[i].civiltruckchn);


            }
            var myChart3 = echarts.init(document.getElementById('zgxzcmyqcsl'));
            option = {
                color:['#FF7800','#88A500','#344996','#E52600'],
                title: {
                    text: '中国新注册民用汽车数量'
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['民用客车','民用货车','民用其他汽车','民用汽车(右)'],

                },
                xAxis: {
                    data: f1
                },
                yAxis: {},
                series: [

                    {
                        name: '民用其他汽车',
                        type: 'bar',
                        data: civilotherchn,
                        stack:'b'
                    },
                    {
                        name: '民用货车',
                        type: 'bar',
                        data: civiltruckchn,
                        stack:'b'

                    },
                    {
                        name: '民用客车',
                        type: 'bar',
                        data: civilcoachchn,
                        stack:'b'
                    },
                    {
                        name: '民用汽车(右)',
                        type: 'line',
                        data: civilcarchn,
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
            url: 'http://localhost:8080/industryData/holdNum/qqqcbyl/qqqcbyl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var carownworld=[];

            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,4));
                carownworld.push(Data[i].carownworld);



            }
            var myChart4 = echarts.init(document.getElementById('qqqcbyl'));
            option = {
                color:['#344996'],
                title: {
                    text: '全球汽车保有量'
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['保有量'],

                },
                xAxis: {
                    data: f1
                },
                yAxis: {},
                series: [

                    {
                        name: '保有量',
                        type: 'bar',
                        data: carownworld,
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
            url: 'http://localhost:8080/industryData/holdNum/qqqcbyl/qqmqrqcbyl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var carownperthouworld=[];

            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,4));
                carownperthouworld.push(Data[i].carownperthouworld);



            }
            var myChart4 = echarts.init(document.getElementById('qqmqrqcbyl'));
            option = {
                color:['#344996'],
                title: {
                    text: '全球每千人汽车保有量'
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['每千人保有量'],

                },
                xAxis: {
                    data: f1
                },
                yAxis: {},
                series: [

                    {
                        name: '每千人保有量',
                        type: 'bar',
                        data: carownperthouworld,
                    }
                ]
            };
            myChart4.setOption(option);


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });
    });