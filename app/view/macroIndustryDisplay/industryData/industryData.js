angular.module('myApp.macroIndustryDisplay.industryData', [

])

    .config(function($stateProvider,$urlRouterProvider){
    })

    .controller('IndustryDataCtrl',function($scope, $route, $http, $stateParams) {
        //设置标题栏响应nav为active,应付刷新等情况
        $($('.header_macro .module_nav .nav.active')).removeClass('active');
        $($('.header_macro .module_nav .nav')[2]).addClass('active')

        $().ready(function () {
            // console.log('111')
            //通过地址传参定位
            var link = $('#'+$stateParams.target);
            console.log(link)
            $.smoothScroll({
                scrollTarget: link
            });
        })
        /**
         * -------------------------------
         * -------------------------------
         * 侧边导航栏
         */
        //点击定位到页面位置
        $('.nav_item').click(function (e) {
            e.preventDefault();
            // console.log(e.target);
            // console.log($($(e.target).attr('href')))
            var link = this;
            $.smoothScroll({
                scrollTarget: link.hash
            });
        })
        $('.nav2_item').click(function (e) {
            e.preventDefault();
            // console.log(e.target);
            // console.log($($(e.target).attr('href')))
            var link = this;
            $.smoothScroll({
                scrollTarget: link.hash
            });
        })
        $('.part h3 a').click(function (e) {
            e.preventDefault();
            var link = this;
            $.smoothScroll({
                scrollTarget: link.hash
            });
        })
        //导航条
        $(window).scroll(function (e) {
            var parts = $('.part');
            for(var i = 0; i < parts.length; i++){
                var part = $(parts[i]);
                // if(part.offset().top >= $(window).scrollTop()){
                if(part.offset().top+part.height() >= $(window).scrollTop()+$(window).height()/3){
                    // console.log(part.offset().top + "  " + $(window).scrollTop())
                    var targetNav = $(".navBar a[href='#" + part.attr('id') + "']");

                    // console.log(targetNav)
                    if($('.nav_item.active').attr('href') == targetNav.attr('href')){           //如果未改变
                        // console.log('same')
                        break;
                    }
                    $('.nav_item.active').parent().removeClass('active');
                    $('.nav_item.active').parent().children('.icon_active').hide();      //隐藏汽车icon
                    $('.nav_item.active').parent().children('ul').hide();           //隐藏二级列表
                    $('.nav_item.active').removeClass('active');
                    targetNav.addClass('active');
                    targetNav.parent().addClass('active');
                    targetNav.parent().children('.icon_active').show();             //显示汽车icon
                    targetNav.parent().children('ul').show();             //显示二级列表
                    break;
                }
            }
            //对2级列表
            var parts2 = $('.part2');
            for(var i = 0; i < parts2.length; i++){
                var part2 = $(parts2[i]);
                // if(part.offset().top >= $(window).scrollTop()){
                if(part2.offset().top+part2.height() >= $(window).scrollTop()+$(window).height()/3){
                    // console.log(part.offset().top + "  " + $(window).scrollTop())
                    // console.log(part2.attr('id'))
                    var targetNav = $(".navBar .nav2_item[href='#" + part2.attr('id') + "']");

                    // console.log(targetNav)
                    if($('.nav2_item.active').attr('href') == targetNav.attr('href')){           //如果未改变
                        // console.log('same')
                        break;
                    }
                    $('.nav2_item.active').removeClass('active');
                    targetNav.addClass('active');
                    break;
                }
            }
        })

        /**
         * -------------------------------
         * -------------------------------
         * 行业产能
         */
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
                    text: '中国国内制造乘用车产量',
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
                color:['#857bff','#FFF566','#89c997','#FFC266'],
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
                color:['#857bff'],
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
                color:['#FFF566','#857bff'],
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
                color:['#857bff','#FFF566','#89c997','#FFC266'],
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
                color:['#857bff'],
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
                color:['#857bff','#FFF566','#89c997','#FFC266','#7B4DD0','#857bff','#953C7E','#0A20F5','#4DCC01','#C66700','#DF4CDD','#EBC306','#039765','#C52687','#4196E6'],
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
                color:['#FFF566','#EBC306','#89c997','#FFC266','#7B4DD0','#1A96B1','#953C7E','#0A20F5','#4DCC01','#C66700','#DF4CDD','#857bff','#039765'],
                title: {
                    text: '中国主要汽车集团产量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['北京汽车工业控股公司','华晨汽车集团','比亚迪汽车','长安汽车集团','奇瑞汽车','东风汽车集团','第一汽车集团','浙江吉利集团','长城汽车','广州汽车工业集团','安徽江淮汽车工业集团','上汽集团','中国重型汽车集团'],
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


        /**
         * -------------------------------
         * -------------------------------
         * 行业库存
         */
        $http({
            method: 'POST',
            url: urlHead+'industryData/inventory/ccpch/qchyccpch'
        }).then(function successCallback(response) {
            var Data=response.data;
            var finishedgoodschn=[];



            var year=[];
            for(var i=0;i<Data.length;i++) {
                year.push(Data[i].year.substr(0,4));
                finishedgoodschn.push(Data[i].finishedgoodschn);

            }
            var myChart1 = echarts.init(document.getElementById('zgqchyccpch'));
            option = {
                color:['#857bff'],
                title: {
                    text: '中国汽车行业产成品存货',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['产成品存货'],
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
                        name: '产成品存货',
                        type: 'bar',
                        data: finishedgoodschn,
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
                color:['#FFF566','#857bff','#89c997','#FFC266'],
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
                color:['#857bff'],
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


        /**
         * --------------------------------
         * --------------------------------
         * 价格
         */
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
                color:['#857bff'],
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
                color:['#857bff'],
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



        /**
         * -------------------------------
         * -------------------------------
         * 汽车保有量
         */
        $http({
            method: 'POST',
            url: urlHead+'industryData/holdNum/qcbyl/zgqcbyl'
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
                color:['#857bff'],
                title: {
                    text: '中国汽车保有量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['保有量'],
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
            url: urlHead+'industryData/holdNum/qcbyl/zgqcmqrbyl'
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
                color:['#857bff'],
                title: {
                    text: '中国汽车每千人保有量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['每千人保有量'],
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
            url: urlHead+'industryData/holdNum/qczc/zgxzcmyqcsl'
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
                color:['#89c997','#FFF566','#857bff','#FFC266'],
                title: {
                    text: '中国新注册民用汽车数量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['民用客车','民用货车','民用其他汽车','民用汽车'],
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
                        name: '民用汽车',
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
            url: urlHead+'industryData/holdNum/qqqcbyl/qqqcbyl'
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
                color:['#857bff'],
                title: {
                    text: '全球汽车保有量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['保有量'],
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
            url: urlHead+'industryData/holdNum/qqqcbyl/qqmqrqcbyl'
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
                color:['#857bff'],
                title: {
                    text: '全球每千人汽车保有量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['每千人保有量'],
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


        /**
         * -------------------------------
         * -------------------------------
         * 整车销量
         */
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
                color:['#857bff','#FFF566','#89c997','#FFC266','#7B4DD0','#1A96B1','#953C7E'],
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
                color:['#857bff'],
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
                color:['#857bff'],
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
                color:['#857bff','#FFF566','#89c997','#FFC266'],
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
                color:['#FFF566','#857bff','#89c997'],
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
                color:['#857bff'],
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
                color:['#857bff','#FFF566','#89c997','#FFC266'],
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
                color:['#857bff'],
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
                color:['#FFF566','#857bff','#89c997','#FFC266','#7B4DD0'],
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
                color:['#857bff','#FFF566','#89c997'],
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
                color:['#857bff'],
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
                color:['#FFF566','#857bff','#89c997','#FFC266','#7B4DD0'],
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
                color:['#857bff','#FFF566','#89c997'],
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
                color:['#857bff','#FFF566'],
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
                color:['#857bff','#FFF566'],
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
                color:['#857bff','#FFF566','#89c997'],
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
                color:['#857bff','#FFF566'],
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
                color:['#857bff','#FFF566','#89c997','#FFC266'],
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

    })