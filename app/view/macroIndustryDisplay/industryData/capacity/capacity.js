angular.module('myApp.macroIndustryDisplay.capacity', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('capacityCtrl',function($scope, $route, $http) {
        $http({
            method: 'POST',
            url: urlHead+'industryData/capacity/cyc/zggnzzcyccl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var passproductionmichn=[];
            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,4));
                passproductionmichn.push(Data[i].passproductionmichn);

            }
            var myChart1 = echarts.init(document.getElementById('zggnzzcyccl'));
            option = {
                color:['#857bff'],
                title: {
                    text: 'z',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['乘用车'],
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
                        name: '乘用车',
                        type: 'bar',
                        data: passproductionmichn,
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
            url: urlHead+'industryData/capacity/cyc/zggnzzcycfcxcl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var acrossproductionmichn=[];
            var basicproductionmichn=[];
            var mpvproductionmichn=[];
            var suvproductionmichn=[];

            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,4));
                acrossproductionmichn.push(Data[i].acrossproductionmichn);
                basicproductionmichn.push(Data[i].basicproductionmichn);
                mpvproductionmichn.push(Data[i].mpvproductionmichn);
                suvproductionmichn.push(Data[i].suvproductionmichn);

            }
            var myChart2 = echarts.init(document.getElementById('zggnzzcycfcxcl'));
            option = {
                color:['#344996','#88A500','#FF7800','#E52600'],
                title: {
                    text: '中国国内制造乘用车分车型产量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['基本型乘用车(轿车)','多功能乘用车(MPV)','运动型多用途乘用车(SUV)','交叉型乘用车'],
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
                        name: '基本型乘用车(轿车)',
                        type: 'bar',
                        data: basicproductionmichn,
                    },
                    {
                        name: '多功能乘用车(MPV)',
                        type: 'bar',
                        data: mpvproductionmichn,
                    },
                    {
                        name: '运动型多用途乘用车(SUV)',
                        type: 'bar',
                        data: suvproductionmichn,
                    },
                    {
                        name: '交叉型乘用车',
                        type: 'bar',
                        data: acrossproductionmichn,
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
            url: urlHead+'industryData/capacity/syc/zggnzzsyccl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var commerproductionmichn=[];
            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,4));
                commerproductionmichn.push(Data[i].commerproductionmichn);

            }
            var myChart3 = echarts.init(document.getElementById('zggnzzsyccl'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国国内制造商用车产量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['商用车'],
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
                        name: '商用车',
                        type: 'bar',
                        data: commerproductionmichn,
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
            url: urlHead+'industryData/capacity/cyc/zggnzzsycfcxcl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var coachproductionmichn=[];
            var truckproductionmichn=[];

            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,4));
                coachproductionmichn.push(Data[i].coachproductionmichn);
                truckproductionmichn.push(Data[i].truckproductionmichn);


            }
            var myChart4 = echarts.init(document.getElementById('zggnzzsycfcxcl'));
            option = {
                color:['#344996','#88A500'],
                title: {
                    text: '中国国内制造商用车分车型产量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['客车','货车'],
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
                        name: '客车',
                        type: 'bar',
                        data: coachproductionmichn,
                    },
                    {
                        name: '货车',
                        type: 'bar',
                        data: truckproductionmichn,
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
            url: urlHead+'industryData/capacity/xzcn/zgqccyxzcn'
        }).then(function successCallback(response) {
            var Data=response.data;
            var basicnewcap=[];
            var coachnewcap=[];
            var othernewcap=[];
            var trucknewcap=[];

            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,4));
                basicnewcap.push(Data[i].basicnewcap);
                coachnewcap.push(Data[i].coachnewcap);
                othernewcap.push(Data[i].othernewcap);
                trucknewcap.push(Data[i].trucknewcap);

            }
            var myChart5 = echarts.init(document.getElementById('zgqchyxzcn'));
            option = {
                color:['#344996','#88A500','#FF7800','#E52600'],
                title: {
                    text: '中国汽车行业新增产能',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['基本型乘用车(轿车)','客车','货车','其他汽车'],
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
                        name: '基本型乘用车(轿车)',
                        type: 'bar',
                        data: basicnewcap,
                    },
                    {
                        name: '客车',
                        type: 'bar',
                        data: coachnewcap,
                    },
                    {
                        name: '货车',
                        type: 'bar',
                        data: trucknewcap,
                    },
                    {
                        name: '其他汽车',
                        type: 'bar',
                        data: othernewcap,
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
            url: urlHead+'industryData/capacity/zgqccl/zgqccl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var yieldchn=[];
            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,4));
                yieldchn.push(Data[i].yieldchn);

            }
            var myChart6 = echarts.init(document.getElementById('zgqccl'));
            option = {
                color:['#344996'],
                title: {
                    text: '中国汽车产量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['汽车'],
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
                        name: '汽车',
                        type: 'bar',
                        data: yieldchn,
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
            url: urlHead+'industryData/capacity/zgqccl/zgzyqcjtjbxcyccl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var bjxdbasicyieldchn=[];
            var bydbasicyieldchn=[];
            var cherybasicyieldchn=[];
            var dfbasicyieldchn=[];
            var fawtoyotabasicyieldchn=[];
            var fawvolkbasicyieldchn=[];
            var geelybasicyieldchn=[];
            var gzhondabasicyieldchn=[];
            var gztoyotabasicyieldchn=[];
            var mazdabasicyieldchn=[];
            var saicvolkbasicyieldchn=[];
            var shgmbasicyieldchn=[];
            var slbasicyieldchn=[];
            var xialibasicyieldchn=[];
            var ydqybasicyieldchn=[];

            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,4));
                bjxdbasicyieldchn.push(Data[i].bjxdbasicyieldchn);
                bydbasicyieldchn.push(Data[i].bydbasicyieldchn);
                cherybasicyieldchn.push(Data[i].cherybasicyieldchn);
                dfbasicyieldchn.push(Data[i].dfbasicyieldchn);
                fawtoyotabasicyieldchn.push(Data[i].fawtoyotabasicyieldchn);
                fawvolkbasicyieldchn.push(Data[i].fawvolkbasicyieldchn);
                geelybasicyieldchn.push(Data[i].geelybasicyieldchn    );
                gzhondabasicyieldchn.push(Data[i].gzhondabasicyieldchn);
                gztoyotabasicyieldchn.push(Data[i].gztoyotabasicyieldchn);
                mazdabasicyieldchn.push(Data[i].mazdabasicyieldchn);
                saicvolkbasicyieldchn.push(Data[i].saicvolkbasicyieldchn);
                shgmbasicyieldchn.push(Data[i].shgmbasicyieldchn);
                slbasicyieldchn.push(Data[i].slbasicyieldchn);
                xialibasicyieldchn.push(Data[i].xialibasicyieldchn);
                ydqybasicyieldchn.push(Data[i].ydqybasicyieldchn);


            }
            var myChart7 = echarts.init(document.getElementById('zgzyqcjtjbxcyccl'));
            option = {
                color:['#3449960','#88A500','#FF7800','#E52600','#7B4DD0','#1A96B1','#953C7E','#0A20F5','#4DCC01','#C66700','#DF4CDD','#EBC306','#039765','#C52687','#4196E6'],
                title: {
                    text: '中国主要汽车集团基本型乘用车(轿车)产量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['北京现代汽车','比亚迪汽车','奇瑞汽车','东风日产','一汽丰田','一汽大众汽车','吉利集团浙江豪情汽车','广州本田汽车','广汽丰田','长安福特马自达','上海大众汽车','上海通用汽车','神龙汽车','天津一汽夏利汽车','东风悦达起亚汽车'],
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
                grid: { // 控制图的大小，调整下面这些值就可以，
                    y2: 100,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                },
                series: [
                    {
                        name: '北京现代汽车',
                        type: 'bar',
                        data: bjxdbasicyieldchn,
                    },
                    {
                        name: '比亚迪汽车',
                        type: 'bar' ,
                        data: bydbasicyieldchn,
                    },
                    {
                        name: '奇瑞汽车',
                        type: 'bar',
                        data: cherybasicyieldchn,
                    },
                    {
                        name: '东风日产',
                        type: 'bar',
                        data: dfbasicyieldchn,
                    },
                    {
                        name: '一汽丰田',
                        type: 'bar',
                        data: fawtoyotabasicyieldchn,
                    },
                    {
                        name: '一汽大众汽车',
                        type: 'bar',
                        data: fawvolkbasicyieldchn,
                    },
                    {
                        name: '吉利集团浙江豪情汽车',
                        type: 'bar',
                        data: geelybasicyieldchn,
                    },
                    {
                        name: '广州本田汽车',
                        type: 'bar',
                        data: gzhondabasicyieldchn,
                    },
                    {
                        name: '广汽丰田',
                        type: 'bar',
                        data: gztoyotabasicyieldchn,
                    },
                    {
                        name: '长安福特马自达',
                        type: 'bar',
                        data: mazdabasicyieldchn,
                    },
                    {
                        name: '上海大众汽车',
                        type: 'bar',
                        data: saicvolkbasicyieldchn,
                    },
                    {
                        name: '上海通用汽车',
                        type: 'bar',
                        data: shgmbasicyieldchn,
                    },
                    {
                        name: '神龙汽车',
                        type: 'bar',
                        data: slbasicyieldchn,
                    },
                    {
                        name: '天津一汽夏利汽车',
                        type: 'bar',
                        data: xialibasicyieldchn,
                    },
                    {
                        name: '东风悦达起亚汽车',
                        type: 'bar',
                        data: ydqybasicyieldchn,
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
            url: urlHead+'industryData/capacity/zgqccl/zgzyqcjtcl'
        }).then(function successCallback(response) {
            var Data=response.data;
            var bjyieldchn=[];
            var briautoyieldchn=[];
            var bydyieldchn=[];
            var cayieldchn=[];
            var cheryyieldchn=[];
            var dfyieldchn=[];
            var fawyieldchn=[];
            var geelyyieldchn=[];
            var gwyieldchn=[];
            var gzyieldchn=[];
            var jacyieldchn=[];
            var saicyieldchn=[];
            var zxyieldchn=[];

            var f1=[];
            for(var i=0;i<Data.length;i++) {
                f1.push(Data[i].f1.substr(0,4));
                bjyieldchn.push(Data[i].bjyieldchn);
                briautoyieldchn.push(Data[i].briautoyieldchn);
                bydyieldchn.push(Data[i].bydyieldchn);
                cayieldchn.push(Data[i].cayieldchn);
                cheryyieldchn.push(Data[i].cheryyieldchn);
                dfyieldchn.push(Data[i].dfyieldchn);
                fawyieldchn.push(Data[i].fawyieldchn);
                geelyyieldchn.push(Data[i].geelyyieldchn    );
                gwyieldchn.push(Data[i].gwyieldchn);
                gzyieldchn.push(Data[i].gzyieldchn);
                jacyieldchn.push(Data[i].jacyieldchn);
                saicyieldchn.push(Data[i].saicyieldchn);
                zxyieldchn.push(Data[i].zxyieldchn);


            }
            var myChart8 = echarts.init(document.getElementById('zgzyqcjtcl'));
            option = {
                color:['#3449960','#88A500','#FF7800','#E52600','#7B4DD0','#1A96B1','#953C7E','#0A20F5','#4DCC01','#C66700','#DF4CDD','#EBC306','#039765'],
                title: {
                    text: '中国主要汽车集团产量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['第一汽车集团','上汽集团','东风汽车集团','北京汽车工业控股公司','长安汽车集团','广州汽车工业集团','安徽江淮汽车工业集团','奇瑞汽车','华晨汽车集团','浙江吉利集团','长城汽车','比亚迪汽车','中国重型汽车集团'],
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
                grid: { // 控制图的大小，调整下面这些值就可以，
                    y2: 80,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                },
                series: [
                    {
                        name: '北京汽车工业控股公司',
                        type: 'bar',
                        data: bjyieldchn,
                    },
                    {
                        name: '华晨汽车集团',
                        type: 'bar',
                        data: briautoyieldchn,
                    },
                    {
                        name: '比亚迪汽车',
                        type: 'bar',
                        data: bydyieldchn,
                    },
                    {
                        name: '长安汽车集团',
                        type: 'bar',
                        data: cayieldchn,
                    },
                    {
                        name: '奇瑞汽车',
                        type: 'bar',
                        data: cheryyieldchn,
                    },
                    {
                        name: '东风汽车集团',
                        type: 'bar',
                        data: dfyieldchn,
                    },
                    {
                        name: '第一汽车集团',
                        type: 'bar',
                        data: fawyieldchn,
                    },
                    {
                        name: '浙江吉利集团',
                        type: 'bar',
                        data: geelyyieldchn,
                    },
                    {
                        name: '长城汽车',
                        type: 'bar',
                        data: gwyieldchn,
                    },
                    {
                        name: '广州汽车工业集团',
                        type: 'bar',
                        data: gzyieldchn,
                    },
                    {
                        name: '安徽江淮汽车工业集团',
                        type: 'bar',
                        data: jacyieldchn,
                    },
                    {
                        name: '上汽集团',
                        type: 'bar',
                        data: saicyieldchn,
                    },
                    {
                        name: '中国重型汽车集团',
                        type: 'bar',
                        data: zxyieldchn,
                    }
                ]
            };
            myChart8.setOption(option);


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

    });