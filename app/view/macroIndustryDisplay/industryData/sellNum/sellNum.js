angular.module('myApp.macroIndustryDisplay.sellNum', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('sellNumCtrl',function($scope, $route, $http) {

        $http({
            method: 'POST',
            url: urlHead+'industryData/sellNum/cycxl/cycfppxl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var brandamer=[];
            var brandfrance=[];
            var brandger=[];
            var brandjapan=[];
            var brandkorea=[];
            var brandother=[];
            var brandself=[];
            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,10));
                brandamer.push(Data[i].brandamer);
                brandother.push(Data[i].brandother);
                brandself.push(Data[i].brandself);
                brandfrance.push(Data[i].brandfrance);
                brandkorea.push(Data[i].brandkorea);
                brandger.push(Data[i].brandger);
                brandjapan.push(Data[i].brandjapan);
            }
            var myChart5 = echarts.init(document.getElementById('zgcycfppxl'));
            option = {
                color:['#344996','#88A500','#FF7800','#E52600','#7B4DD0','#1A96B1','#953C7E'],
                title: {
                    text: '中国乘用车分品牌销量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['其他品牌','自主品牌','日系品牌','德系品牌','美系品牌','韩系品牌','法系品牌'],
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
                yAxis: {axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }},
                series: [
                    {
                        name: '自主品牌',
                        type: 'bar',
                        data: brandself,
                    },
                    {
                        name: '日系品牌',
                        type: 'bar',
                        data: brandjapan,
                    },
                    {
                        name: '德系品牌',
                        type: 'bar',
                        data: brandger,
                    },
                    {
                        name: '美系品牌',
                        type: 'bar',
                        data: brandamer,
                    },
                    {
                        name: '韩系品牌',
                        type: 'bar',
                        data: brandkorea,
                    },

                    {
                        name: '法系品牌',
                        type: 'bar',
                        data: brandfrance,
                    },
                    {
                        name: '其他品牌',
                        type: 'bar',
                        data: brandother,
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
            url: urlHead+'industryData/sellNum/zgqcxl/zgqcxl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var f1=[];
            var autosaleschn=[];
            for(var i=0;i<Data.length;i++){
                f1.push(Data[i].f1.substr(0,4));
                autosaleschn.push(Data[i].autosaleschn);
            }
                var myChart1 = echarts.init(document.getElementById('zgqcxl'));
                // 指定图表的配置项和数据
                var option = {
                    color:['#344996'],
                    title: {
                        text: '中国汽车销量',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {},
                    legend: {
                        data:['汽车'],
                        y:'bottom',
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
                    yAxis: {axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }},
                    series: [{
                        name: '汽车',
                        type: 'bar',
                        data: autosaleschn
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart1.setOption(option);

        }, function errorCallback(response) {
            // 请求失败执行代码
        });


        $http({
            method: 'POST',
            url: urlHead+'industryData/sellNum/cycxl/cycxl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var f1=[];
            var passsaleschn=[];
            for(var i=0;i<Data.length;i++){
                f1.push(Data[i].f1.substr(0,7));
                passsaleschn.push(Data[i].passsaleschn);
            }
                var myChart2 = echarts.init(document.getElementById('zgcycxl'));
                // 指定图表的配置项和数据
                var option = {
                    color:['#344996'],
                    title: {
                        text: '中国乘用车销量',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {},
                    legend: {
                        data:['乘用车'],
                        y:'bottom',
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
                    yAxis: {axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }},
                    series: [{
                        name: '乘用车',
                        type: 'bar',
                        data: passsaleschn
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart2.setOption(option);

        }, function errorCallback(response) {
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: urlHead+'industryData/sellNum/cycxl/cycfcxxl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var f1=[];
            var acrosssaleschn =[];
            var basicsaleschn=[];
            var mpvsaleschn=[];
            var suvsaleschn=[];
            for(var i=0;i<Data.length;i++){
                f1.push(Data[i].f1.substr(0,7));
                acrosssaleschn.push(Data[i].acrosssaleschn);
                basicsaleschn.push(Data[i].basicsaleschn);
                mpvsaleschn.push(Data[i].mpvsaleschn);
                suvsaleschn.push(Data[i].suvsaleschn);
            }
                var myChart3 = echarts.init(document.getElementById('zgcycfcxxl'));
                // 指定图表的配置项和数据
                var option = {
                    color:['#344996','#88A500','#FF7800','#E52600'],
                    title: {
                        text: '中国乘用车分车型销量',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {},
                    legend: {
                        data:['基本型乘用车(轿车)','多功能乘用车(MPV)','运动型多功能乘用车(SUV)','交叉型乘用车'],
                        y:'bottom',
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
                    yAxis: {axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }},
                    series: [{
                        name: '基本型乘用车(轿车)',
                        type: 'bar',
                        data: basicsaleschn
                    },
                        {
                            name: '多功能乘用车(MPV)',
                            type: 'bar',
                            data: mpvsaleschn
                        },
                        {
                            name: '运动型多功能乘用车(SUV)',
                            type: 'bar',
                            data: suvsaleschn
                        },
                        {
                            name: '交叉型乘用车',
                            type: 'bar',
                            data: acrosssaleschn
                        }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart3.setOption(option);

        }, function errorCallback(response) {
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: urlHead+'industryData/sellNum/cycxl/cycfrllxxl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var f1=[];
            var dieselsaleschn =[];
            var gassaleschn=[];
            var otherfuelsaleschn=[];
            for(var i=0;i<Data.length;i++){
                f1.push(Data[i].f1.substr(0,7));
                dieselsaleschn.push(Data[i].dieselsaleschn);
                gassaleschn.push(Data[i].gassaleschn);
                otherfuelsaleschn.push(Data[i].otherfuelsaleschn);
            }
                var myChart4 = echarts.init(document.getElementById('zgcycfrllxxl'));
                // 指定图表的配置项和数据
                var option = {
                    color:['#344996','#88A500','#FF7800'],
                    title: {
                        text: '中国乘用车分燃料类型销量',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {},
                    legend: {
                        data:['柴油','汽油','其他燃料'],
                        y:'bottom',
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
                    yAxis: {axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }},
                    series: [{
                        name: '柴油',
                        type: 'bar',
                        data: dieselsaleschn
                    },
                        {
                            name: '汽油',
                            type: 'bar',
                            data: gassaleschn
                        },
                        {
                            name: '其他燃料',
                            type: 'bar',
                            data: otherfuelsaleschn
                        }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart4.setOption(option);

        }, function errorCallback(response) {
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: urlHead+'industryData/sellNum/cycxl/gnzzcycxl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var f1=[];
            var passsalesmichn =[];
            for(var i=0;i<Data.length;i++){
                f1.push(Data[i].f1.substr(0,7));
                passsalesmichn.push(Data[i].passsalesmichn);
            }
                var myChart6 = echarts.init(document.getElementById('zggnzzcycxl'));
                // 指定图表的配置项和数据
                var option = {
                    color:['#344996'],
                    title: {
                        text: '中国国内制造乘用车销量',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {},
                    legend: {
                        data:['乘用车'],
                        y:'bottom',
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
                    yAxis: {axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }},
                    series: [{
                        name: '乘用车',
                        type: 'bar',
                        data: passsalesmichn
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart6.setOption(option);

        }, function errorCallback(response) {
            // 请求失败执行代码
        });


        $http({
            method: 'POST',
            url: urlHead+'industryData/sellNum/cycxl/gnzzcycfcxxl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var f1=[];
            var acrosssalesmichn =[];
            var basicsalesmichn=[];
            var mpvsalesmichn=[];
            var suvsalesmichn=[];
            for(var i=0;i<Data.length;i++){
                f1.push(Data[i].f1.substr(0,4));
                acrosssalesmichn.push(Data[i].acrosssalesmichn);
                basicsalesmichn.push(Data[i].basicsalesmichn);
                mpvsalesmichn.push(Data[i].mpvsalesmichn);
                suvsalesmichn.push(Data[i].suvsalesmichn);
            }
                var myChart7 = echarts.init(document.getElementById('zggnzzcycfcxxl'));
                // 指定图表的配置项和数据
                var option = {
                    color:['#344996','#88A500','#FF7800','#E52600'],
                    title: {
                        text: '中国国内制造乘用车分车型销量',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {},
                    legend: {
                        data:['基本型乘用车(轿车)','多功能乘用车(MPV)','运动型多功能乘用车(SUV)','交叉型乘用车'],
                        y:'bottom',
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
                    yAxis: {axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }},
                    series: [{
                        name: '基本型乘用车(轿车)',
                        type: 'bar',
                        data: basicsalesmichn
                    },
                        {
                            name: '多功能乘用车(MPV)',
                            type: 'bar',
                            data: mpvsalesmichn
                        },
                        {
                            name: '运动型多功能乘用车(SUV)',
                            type: 'bar',
                            data: suvsalesmichn
                        },
                        {
                            name: '交叉型乘用车',
                            type: 'bar',
                            data: acrosssalesmichn
                        }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart7.setOption(option);

        }, function errorCallback(response) {
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: urlHead+'industryData/sellNum/sycxl/sycxl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var f1=[];
            var commersaleschn =[];
            for(var i=0;i<Data.length;i++){
                f1.push(Data[i].f1.substr(0,7));
                commersaleschn.push(Data[i].commersaleschn);
            }
                var myChart8 = echarts.init(document.getElementById('zgsycxl'));
                // 指定图表的配置项和数据
                var option = {
                    color:['#344996'],
                    title: {
                        text: '中国商用车销量',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {},
                    legend: {
                        data:['商用车'],
                        y:'bottom',
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
                    yAxis: {axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }},
                    series: [{
                        name: '商用车',
                        type: 'bar',
                        data: commersaleschn
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart8.setOption(option);

        }, function errorCallback(response) {
        });

        $http({
            method: 'POST',
            url: urlHead+'industryData/sellNum/sycxl/sycfcxxl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var f1=[];
            var coachsaleschn =[];
            var imcomplcoachsaleschn=[];
            var trucksaleschn=[];
            var incompltrucksaleschn=[];
            var semisaleschn=[];
            for(var i=0;i<Data.length;i++){
                f1.push(Data[i].f1.substr(0,7));
                coachsaleschn.push(Data[i].coachsaleschn);
                imcomplcoachsaleschn.push(Data[i].imcomplcoachsaleschn);
                trucksaleschn.push(Data[i].trucksaleschn);
                incompltrucksaleschn.push(Data[i].incompltrucksaleschn);
                semisaleschn.push(Data[i].semisaleschn);
            }
                var myChart8 = echarts.init(document.getElementById('zgsycfcxxl'));
                // 指定图表的配置项和数据
                var option = {
                    color:['#344996','#88A500','#FF7800','#E52600','#7B4DD0'],
                    title: {
                        text: '中国商用车分车型销量',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {},
                    legend: {
                        data:['客车','货车','半挂牵引车','客车非完整车辆','货车非完整车辆'],
                        y:'bottom',
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
                    yAxis: {axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }},
                    series: [{
                        name: '客车',
                        type: 'bar',
                        data: coachsaleschn
                    },
                        {
                            name: '货车',
                            type: 'bar',
                            data: trucksaleschn
                        },
                        {
                            name: '半挂牵引车',
                            type: 'bar',
                            data: semisaleschn

                        },
                        {
                            name: '客车非完整车辆',
                            type: 'bar',
                            data: imcomplcoachsaleschn
                        },
                        {
                            name: '货车非完整车辆',
                            type: 'bar',
                            data: incompltrucksaleschn
                        }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart8.setOption(option);

        }, function errorCallback(response) {
            // 请求失败执行代码
        });


        $http({
            method: 'POST',
            url: urlHead+'industryData/sellNum/sycxl/sycfrllxxl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var f1=[];
            var comdieselsaleschn =[];
            var comgassaleschn=[];
            var comotherfuelsaleschn=[];
            for(var i=0;i<Data.length;i++){
                f1.push(Data[i].f1.substr(0,7));
                comdieselsaleschn.push(Data[i].comdieselsaleschn);
                comgassaleschn.push(Data[i].comgassaleschn);
                comotherfuelsaleschn.push(Data[i].comotherfuelsaleschn);
            }
            var myChart9 = echarts.init(document.getElementById('zgsycfrllxxl'));
            // 指定图表的配置项和数据
            var option = {
                color:['#344996','#88A500','#FF7800'],
                title: {
                    text: '中国商用车分燃料类型销量',
                    textStyle: {
                        color: '#fff'
                    }

                },
                tooltip: {},
                legend: {
                    data:['柴油商用车','汽油商用车','其他燃料商用车'],
                    y:'bottom',
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
                yAxis: {axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }},
                series: [{
                    name: '柴油商用车',
                    type: 'bar',
                    data: comdieselsaleschn
                },
                    {
                        name: '汽油商用车',
                        type: 'bar',
                        data: comgassaleschn
                    },
                    {
                        name: '其他燃料商用车',
                        type: 'bar',
                        data: comotherfuelsaleschn

                    }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart9.setOption(option);

        }, function errorCallback(response) {
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: urlHead+'industryData/sellNum/sycxl/gnzzsycxl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var f1=[];
            var commersalesmichn =[];
            for(var i=0;i<Data.length;i++){
                f1.push(Data[i].f1.substr(0,7));
                commersalesmichn.push(Data[i].commersalesmichn);
            }
            var myChart10 = echarts.init(document.getElementById('zggnzzsycxl'));
            // 指定图表的配置项和数据
            var option = {
                color:['#344996'],
                title: {
                    text: '中国国内制造商用车销量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    data:['商用车'],
                    y:'bottom',
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
                yAxis: {axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }},
                series: [{
                    name: '商用车',
                    type: 'bar',
                    data: commersalesmichn
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart10.setOption(option);

        }, function errorCallback(response) {
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: urlHead+'industryData/sellNum/sycxl/gnzzsycfcxxl'
        }).then(function successCallback(response) {

            var Data=response.data;
            var f1=[];
            var coachsalesmichn =[];
            var imcomplcoachsalesmichn=[];
            var trucksalesmichn=[];
            var incompltrucksalesmichn=[];
            var semisalesmichn=[];
            for(var i=0;i<Data.length;i++){
                f1.push(Data[i].f1.substr(0,7));
                coachsalesmichn.push(Data[i].coachsalesmichn);
                imcomplcoachsalesmichn.push(Data[i].imcomplcoachsalesmichn);
                trucksalesmichn.push(Data[i].trucksalesmichn);
                incompltrucksalesmichn.push(Data[i].incompltrucksalesmichn);
                semisalesmichn.push(Data[i].semisalesmichn);
            }
            var myChart11 = echarts.init(document.getElementById('zggnzzsycfcxxl'));
            // 指定图表的配置项和数据
            var option = {
                color:['#344996','#88A500','#FF7800','#E52600','#7B4DD0'],
                title: {
                    text: '中国国内制造商用车分车型销量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    data:['客车','货车','半挂牵引车','客车非完整车辆','货车非完整车辆'],
                    y:'bottom',
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
                yAxis: {axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }},
                series: [{
                    name: '客车',
                    type: 'bar',
                    data: coachsalesmichn
                },
                    {
                        name: '货车',
                        type: 'bar',
                        data: trucksalesmichn
                    },
                    {
                        name: '半挂牵引车',
                        type: 'bar',
                        data: semisalesmichn

                    },
                    {
                        name: '客车非完整车辆',
                        type: 'bar',
                        data: imcomplcoachsalesmichn
                    },
                    {
                        name: '货车非完整车辆',
                        type: 'bar',
                        data: incompltrucksalesmichn
                    }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart11.setOption(option);

        }, function errorCallback(response) {
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: urlHead+'industryData/sellNum/sycxl/gnzzsycfrllxxl'
        }).then(function successCallback(response) {

            var Data=response.data;
            var f1=[];
            var comdieselsalesmichn =[];
            var comgassalesmichn=[];
            var comotherfuelsalesmichn=[];

            for(var i=0;i<Data.length;i++){
                f1.push(Data[i].f1.substr(0,7));
                comdieselsalesmichn.push(Data[i].comdieselsalesmichn);
                comgassalesmichn.push(Data[i].comgassalesmichn);
                comotherfuelsalesmichn.push(Data[i].comotherfuelsalesmichn);

            }
            var myChart12 = echarts.init(document.getElementById('zggnzzsycfrllxxl'));
            // 指定图表的配置项和数据
            var option = {
                color:['#344996','#88A500','#FF7800'],
                title: {
                    text: '中国国内制造商用车分燃料类型销量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    data:['柴油','汽油','其他燃料'],
                    y:'bottom',
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
                yAxis: {axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }},
                series: [{
                    name: '柴油',
                    type: 'bar',
                    data: comdieselsalesmichn
                },
                    {
                        name: '汽油',
                        type: 'bar',
                        data: comgassalesmichn
                    },
                    {
                        name: '其他燃料',
                        type: 'bar',
                        data: comotherfuelsalesmichn

                    }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart12.setOption(option);

        }, function errorCallback(response) {
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: urlHead+'industryData/sellNum/qqqcxl/qqcycxl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var f1=[];
            var passsaleseur =[];
            var passsalesworld=[];

            for(var i=0;i<Data.length;i++){
                f1.push(Data[i].f1.substr(0,4));
                passsaleseur.push(Data[i].passsaleseur);
                passsalesworld.push(Data[i].passsalesworld);

            }
            var myChart13 = echarts.init(document.getElementById('qqcycxl'));
            // 指定图表的配置项和数据
            var option = {
                color:['#344996','#88A500'],
                title: {
                    text: '全球乘用车销量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    data:['全球','欧盟27国欧洲自由贸易区'],
                    y:'bottom',
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
                yAxis: {axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }},
                series: [{
                    name: '全球',
                    type: 'bar',
                    data: passsalesworld
                },
                    {
                        name: '欧盟27国欧洲自由贸易区',
                        type: 'bar',
                        data: passsaleseur
                    }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart13.setOption(option);

        }, function errorCallback(response) {
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: urlHead+'industryData/sellNum/qqqcxl/qqsycxl'
        }).then(function successCallback(response) {

            var Data=response.data;
            var f1=[];
            var commersaleseur =[];
            var commersalesworld=[];

            for(var i=0;i<Data.length;i++){
                f1.push(Data[i].f1.substr(0,4));
                commersaleseur.push(Data[i].commersaleseur);
                commersalesworld.push(Data[i].commersalesworld);

            }
            var myChart14 = echarts.init(document.getElementById('qqsycxl'));
            // 指定图表的配置项和数据
            var option = {
                color:['#344996','#88A500'],
                title: {
                    text: '全球商用车销量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    data:['全球','欧盟27国欧洲自由贸易区'],
                    y:'bottom',
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
                yAxis: {axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }},
                series: [{
                    name: '全球',
                    type: 'bar',
                    data: commersalesworld
                },
                    {
                        name: '欧盟27国欧洲自由贸易区',
                        type: 'bar',
                        data: commersaleseur
                    }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart14.setOption(option);

        }, function errorCallback(response) {
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: urlHead+'industryData/sellNum/qqqcxl/mgqcxl'
        }).then(function successCallback(response) {

            var Data=response.data;
            var f1=[];
            var autosalesusa =[];
            var basicsalesusa=[];
            var trucksalesusa=[];

            for(var i=0;i<Data.length;i++){
                f1.push(Data[i].f1.substr(0,4));
                autosalesusa.push(Data[i].autosalesusa);
                basicsalesusa.push(Data[i].basicsalesusa);
                trucksalesusa.push(Data[i].trucksalesusa);

            }
            var myChart15 = echarts.init(document.getElementById('mgqcxl'));
            // 指定图表的配置项和数据
            var option = {
                color:['#344996','#88A500','#FF7800'],
                title: {
                    text: '美国汽车销量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    data:['汽车','基本型乘用车(轿车)','卡车'],
                    y:'bottom',
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
                yAxis: {axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }},
                series: [{
                    name: '汽车',
                    type: 'bar',
                    data: autosalesusa
                },
                    {
                        name: '基本型乘用车(轿车)',
                        type: 'bar',
                        data: basicsalesusa
                    },
                    {
                        name: '卡车',
                        type: 'bar',
                        data: trucksalesusa
                    }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart15.setOption(option);

        }, function errorCallback(response) {
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: urlHead+'industryData/sellNum/qqqcxl/dgqcxl'
        }).then(function successCallback(response) {

            var Data=response.data;

            var f1=[];
            var passsalesger =[];
            var commersalesger=[];

            for(var i=0;i<Data.length;i++){
                f1.push(Data[i].f1.substr(0,7));
                passsalesger.push(Data[i].passsalesger);
                commersalesger.push(Data[i].commersalesger);

            }
            var myChart16 = echarts.init(document.getElementById('dgqcxl'));
            // 指定图表的配置项和数据
            var option = {
                color:['#344996','#88A500'],
                title: {
                    text: '德国汽车销量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    data:['乘用车','商用车'],
                    y:'bottom',
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
                yAxis: {axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }},
                series: [{
                    name: '乘用车',
                    type: 'bar',
                    data: passsalesger
                },
                    {
                        name: '商用车',
                        type: 'bar',
                        data: commersalesger
                    }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart16.setOption(option);

        }, function errorCallback(response) {
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: urlHead+'industryData/sellNum/qqqcxl/rbqcxl'
        }).then(function successCallback(response) {

            var Data=response.data;

            var f1=[];
            var autosalesjapan =[];
            var coachsalesjapan=[];
            var passsalesjapan=[];
            var trucksalesjapan=[];

            for(var i=0;i<Data.length;i++){
                f1.push(Data[i].f1.substr(0,7));
                autosalesjapan.push(Data[i].autosalesjapan);
                coachsalesjapan.push(Data[i].coachsalesjapan);
                passsalesjapan.push(Data[i].passsalesjapan);
                trucksalesjapan.push(Data[i].trucksalesjapan);

            }
            var myChart17 = echarts.init(document.getElementById('rbqcxl'));
            // 指定图表的配置项和数据
            var option = {
                color:['#344996','#88A500','#FF7800','#E52600'],
                title: {
                    text: '日本汽车销量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    data:['乘用车','货车','客车','汽车(右)'],
                    y:'bottom',
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
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                    {

                             type:'value',
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }

                    }],
                series: [{
                    name: '乘用车',
                    type: 'bar',
                    data: passsalesjapan
                },
                    {
                        name: '货车',
                        type: 'bar',
                        data: trucksalesjapan
                    },
                    {
                        name: '客车',
                        type: 'bar',
                        data: coachsalesjapan
                    },
                    {
                        name: '汽车(右)',
                        type: 'line',
                        data: autosalesjapan,
                        yAxisIndex:1
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart17.setOption(option);

        }, function errorCallback(response) {
            // 请求失败执行代码
        });


    });