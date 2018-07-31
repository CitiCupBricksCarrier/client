angular.module('myApp.macroIndustryDisplay.sellNum', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('sellNumCtrl',function($scope, $route, $http) {


        var myChart1 = echarts.init(document.getElementById('zgqcxl'));
        $http({
            method: 'POST',
            url: 'http://localhost:8080/industryData/sellNum/cycxl/cycfppxl'
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

            for(var i=0;i<Data.length-1;i++) {
                f1.push(Data[i].f1.substr(0,10));
                brandamer.push(Data[i].brandamer);
                brandother.push(Data[i].brandother);
                brandself.push(Data[i].brandself);
                brandfrance.push(Data[i].brandfrance);
                brandkorea.push(Data[i].brandkorea);
                brandger.push(Data[i].brandger);
                brandjapan.push(Data[i].brandjapan);
            }
            console.log(f1)
            var myChart5 = echarts.init(document.getElementById('zgcycfppxl'));
            option = {
                color:['#344996','#88A500','#FF7800','#E52600','#7B4DD0','#1A96B1','#953C7E'],
                title: {
                    text: '中国乘用车分品牌销量'
                },
                tooltip: {},
                legend: {
                    y:'bottom',
                    data:['其他品牌','自主品牌','日系品牌','德系品牌','美系品牌','韩系品牌','法系品牌'],

                },
                xAxis: {
                    data: f1
                },
                yAxis: {},
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
          /* for(var i=0;i<response.data.length;i++){
                brandamer.push(Data[i].brandamer);
                brandfrance.push(Data[i].brandfrance);
                brandger.push(Data[i].brandger);
                brandjapan.push(Data[i].brandjapan);
                brandkorea.push(Data[i].brandkorea);
                brandother.push(Data[i].brandother);
                brandself.push(Data[i].brandself);

            }*/

        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

   // 指定图表的配置项和数据
   var option = {
       title: {
           text: '中国汽车销量'
       },
       tooltip: {},
       legend: {
           data:['mvp','suv']
       },
       xAxis: {
           data: ['',"衬衫",'',"羊毛衫",'',"雪纺衫"]
       },
       yAxis: {},
       series: [{
           name: 'mvp',
           type: 'bar',
           data: [25, 20, 36, 10, 10, 20],
       },{
           name:'suv',
           type:'line',
           data:[45, 50, 31, 10, 10, 20],
       }]
   };

   // 使用刚指定的配置项和数据显示图表。
   myChart1.setOption(option);

        var myChart2 = echarts.init(document.getElementById('zgcycxl'));
        option = {
            title: {
                text: '中国乘用车销量'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [1,2]
            }]
        };
        myChart2.setOption(option);

        var myChart3 = echarts.init(document.getElementById('zgcycfcxxl'));
        option = {
            title: {
                text: '中国乘用车分车型销量'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        myChart3.setOption(option);

        var myChart4 = echarts.init(document.getElementById('zgcycfrllxxl'));
        option = {
            title: {
                text: '中国乘用车分燃料类型销量'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        myChart4.setOption(option);



        var myChart6 = echarts.init(document.getElementById('zggnzzcycxl'));
        option = {
            title: {
                text: '中国国内制造'+'\n'+'乘用车销量'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        myChart6.setOption(option);

        var myChart7 = echarts.init(document.getElementById('zggnzzcycfcxxl'));
        option = {
            title: {
                text: '中国国内制造'+'\n'+'乘用车分车型销量'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        myChart7.setOption(option);



        var myChart8 = echarts.init(document.getElementById('zgsycxl'));
        option = {
            title: {
                text: '中国商用车销量'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        myChart8.setOption(option);

        var myChart9 = echarts.init(document.getElementById('zgsycfcxxl'));
        option = {
            title: {
                text: '中国商用车分车型销量'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        myChart9.setOption(option);

        var myChart10 = echarts.init(document.getElementById('zgsycfrllxxl'));
        option = {
            title: {
                text: '中国商用车分燃料类型销量'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        myChart10.setOption(option);

        var myChart11 = echarts.init(document.getElementById('zggnzzsycxl'));
        option = {
            title: {
                text: '中国国内制造'+'\n'+'商用车销量'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        myChart11.setOption(option);

        var myChart12 = echarts.init(document.getElementById('zggnzzsycfcxxl'));
        option = {
            title: {
                text: '中国国内制造'+'\n'+'商用车分车型销量'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        myChart12.setOption(option);

        var myChart13 = echarts.init(document.getElementById('zggnzzsycfrllxxl'));
        option = {
            title: {
                text: '中国国内制造'+'\n'+'商用车分燃料类型销量'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        myChart13.setOption(option);
    });