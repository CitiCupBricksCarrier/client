angular.module('myApp.macroIndustryDisplay.economicData', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('EconomicDataCtrl',function($scope, $route, $http, $stateParams) {

        //设置标题栏响应nav为active,应付刷新等情况
        $($('.header_macro .module_nav .nav.active')).removeClass('active');
        $($('.header_macro .module_nav .nav')[3]).addClass('active')

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
         * 行业财务
         */
        $http({
            method: 'POST',
            url: urlHead+'economicData/hycw/hygk/srzgdpbz'
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
                color:['#857bff','#FFC266'],
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
            url: urlHead+'economicData/hycw/hygk/qyhksqysl'
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
                color:['#857bff','#FFF566'],
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
            url: urlHead+'economicData/hycw/cwsj/fzzj'
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
                color:['#857bff'],
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
            url: urlHead+'economicData/hycw/cwsj/lrze'
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
                color:['#857bff'],
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
            url: urlHead+'economicData/hycw/cwsj/zyywcb'
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
                color:['#857bff'],
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
            url: urlHead+'economicData/hycw/cwsj/zczj'
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
                color:['#857bff'],
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
            url: urlHead+'economicData/qyjx/gdzctz/gdzttze'
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
                color:['#857bff','#FFF566','#89c997','#E52600','#7B4DD0','#FFC266'],
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
            url: urlHead+'economicData/qyjx/gdzctz/gdzctzzqgtzbz'
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
                color:['#857bff'],
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


        /**
         * -------------------------------
         * -------------------------------
         * 行业上下游数据
         */
        $http({
            method: 'POST',
            url: urlHead+'economicData/hysxysj/zggcjg'
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
                color:['#FFF566','#857bff','#89c997','#FFC266'],
                title: {
                    text: '中国钢材价格',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['180*2.5热轧带钢现货','1mm镀锌板现货','3mm热轧普通薄板现货','1mm冷轧普通薄板现货'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                xAxis: {
                    data: month,
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
            url: urlHead+'economicData/hysxysj/zggllkzzl'
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
                color:['#857bff'],
                title: {
                    text: '中国公路旅客周转量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['公路旅客'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                xAxis: {
                    data: month,
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
            url: urlHead+'economicData/hysxysj/zggdzctzjgzs'
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
                color:['#857bff'],
                title: {
                    text: '中国固定资产投资价格指数',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['固定资产投资'],
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
            url: urlHead+'economicData/hysxysj/zgjmxfzc'
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
                color:['#857bff'],
                title: {
                    text: '中国居民消费支出',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['居民消费支出'],
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
            url: urlHead+'economicData/hysxysj/zgkcxl'
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
                color:['#857bff'],
                title: {
                    text: '中国客车销量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['客车'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                xAxis: {
                    data: month,
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
            url: urlHead+'economicData/hysxysj/zgrjgdpzs'
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
                color:['#857bff'],
                title: {
                    text: '中国人均GDP指数',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['人均GDP指数'],
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
                yAxis: { axisLabel: {
                        formatter: '{value} %',
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
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
            url: urlHead+'economicData/hysxysj/zgtrxjyjscj'
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
                color:['#857bff'],
                title: {
                    text: '中国天然橡胶月均市场价',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['天然橡胶'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                xAxis: {
                    data: month,
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
            url: urlHead+'economicData/hysxysj/zgzkcl'
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
                color:['#857bff'],
                title: {
                    text: '中国重卡产量',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['重卡'],
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


        /**
         * -------------------------------
         * -------------------------------
         * 企业绩效
         */
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
                color:['#857bff'],
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
                color:['#857bff'],
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
                color:['#857bff'],
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
                color:['#857bff'],
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
                color:['#857bff'],
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