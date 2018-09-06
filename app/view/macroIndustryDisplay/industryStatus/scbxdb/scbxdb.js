angular.module('myApp.macroIndustryDisplay.scbxdb', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('scbxdbCtrl',function($scope, $route, $http) {

        $scope.market="全部";
        $scope.time="OW";
        $scope.standard="沪深300";
        $scope.standardData=[];

        $http({
            method: 'POST',
            url: 'http://localhost:8080/ContrastOfMarketPerformance/ContrastOfMarketPerformance_all'
        }).then(function successCallback(response) {
            var Data=response.data;
            console.log(Data);
            $scope.indstnam=Data[0].indstnam;
            $scope.nearawkrisefalAll=Data[1].nearawkrisefal;
            $scope.nearamthrisefalAll=Data[2].nearamthrisefal;
            $scope.nearthrmthrisefalAll=Data[3].nearthrmthrisefal;
            $scope.ydtrisefalAll=Data[4].ydtrisefal;
            $scope.nearayearrisefalAll=Data[5].nearayearrisefal;

            $scope.createData();
            $scope.drawChart();

        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: 'http://localhost:8080/ContrastOfMarketPerformance/ContrastOfMarketPerformance_shanghaiAndShenzhenAShares'
        }).then(function successCallback(response) {
            var Data=response.data;
            console.log(Data);
            $scope.nearawkrisefalSS=Data[1].nearawkrisefal;
            $scope.nearamthrisefalSS=Data[2].nearamthrisefal;
            $scope.nearthrmthrisefalSS=Data[3].nearthrmthrisefal;
            $scope.ydtrisefalSS=Data[4].ydtrisefal;
            $scope.nearayearrisefalSS=Data[5].nearayearrisefal;

        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: 'http://localhost:8080/ContrastOfMarketPerformance/ContrastOfMarketPerformance_newThirdBoard'
        }).then(function successCallback(response) {
            var Data=response.data;
            console.log(Data);
            $scope.nearawkrisefalNTB=Data[1].nearawkrisefal;
            $scope.nearamthrisefalNTB=Data[2].nearamthrisefal;
            $scope.nearthrmthrisefalNTB=Data[3].nearthrmthrisefal;
            $scope.ydtrisefalNTB=Data[4].ydtrisefal;
            $scope.nearayearrisefalNTB=Data[5].nearayearrisefal;

        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

        $scope.COW=function () {
            $scope.time="OW";
        };

        $scope.COM=function () {
            $scope.time="OM";

        };

        $scope.CTM=function () {
            $scope.time="TM";

        };

        $scope.CYTD=function () {
            $scope.time="YTD";

        };

        $scope.COY=function () {
            $scope.time="OY";

        };

        $scope.changeMarket=function () {

        };



        $scope.createData=function () {
            switch ($scope.time){
                case 'OW':
                    switch ($scope.market){
                        case "全部":
                            $scope.data=$scope.nearawkrisefalAll;
                            break;
                        case "沪深A股":
                            $scope.data=$scope.nearawkrisefalSS;
                            break;
                        case "新三板做市":
                            $scope.data=$scope.nearawkrisefalNTB;
                            break;
                    }
                    switch ($scope.standard){
                        case "沪深300":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -3.00;
                            }
                            break;
                        case "三板做市":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -1.02;
                            }
                            break;
                        case "上证综指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -2.65;
                            }                                                    break;
                        case "深证成指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -3.79;
                            }                                                    break;
                        case "中小板指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -3.42;
                            }                                                    break;
                        case "创业板指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -4.21;
                            }                                                    break;
                    }
                    break;
                case 'OM':
                    switch ($scope.market){
                        case "全部":
                            $scope.data=$scope.nearamthrisefalAll;
                            break;
                        case "沪深A股":
                            $scope.data=$scope.nearamthrisefalSS;
                            break;
                        case "新三板做市":
                            $scope.data=$scope.nearamthrisefalNTB;
                            break;
                    }
                    switch ($scope.standard){
                        case "沪深300":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -0.52;
                            }                                                    break;
                        case "三板做市":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -4.48;
                            }                                                    break;
                        case "上证综指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -1.32;
                            }                                                    break;
                        case "深证成指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -2.32;
                            }                                                    break;
                        case "中小板指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -2.1;
                            }                                                    break;
                        case "创业板指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -3.47;
                            }                                                    break;
                    }
                    break;
                case 'TM':
                    switch ($scope.market){
                        case "全部":
                            $scope.data=$scope.nearthrmthrisefalAll;
                            break;
                        case "沪深A股":
                            $scope.data=$scope.nearthrmthrisefalSS;
                            break;
                        case "新三板做市":
                            $scope.data=$scope.nearthrmthrisefalNTB;
                            break;
                    }
                    switch ($scope.standard){
                        case "沪深300":
                            $scope.standardData=-13.38;
                            break;
                        case "三板做市":
                            $scope.standardData=-11.93;
                            break;
                        case "上证综指":
                            $scope.standardData=-12.51;
                            break;
                        case "深证成指":
                            $scope.standardData=-17.66;
                            break;
                        case "中小板指":
                            $scope.standardData=-16.82;
                            break;
                        case "创业板指":
                            $scope.standardData=-16.01;
                            break;
                    }
                    break;
                case 'YTD':
                    switch ($scope.market){
                        case "全部":
                            $scope.data=$scope.ydtrisefalAll;
                            break;
                        case "沪深A股":
                            $scope.data=$scope.ydtrisefalSS;
                            break;
                        case "新三板做市":
                            $scope.data=$scope.ydtrisefalNTB;
                            break;
                    }
                    switch ($scope.standard){
                        case "沪深300":
                            $scope.standardData=-14.42;
                            break;
                        case "三板做市":
                            $scope.standardData=-24.62;
                            break;
                        case "上证综指":
                            $scope.standardData=-19.98;
                            break;
                        case "深证成指":
                            $scope.standardData=-23.55;
                            break;
                        case "中小板指":
                            $scope.standardData=-21.8;
                            break;
                        case "创业板指":
                            $scope.standardData=-24.7;
                            break;
                    }
                    break;
                case 'OY':
                    switch ($scope.market){
                        case "全部":
                            $scope.data=$scope.nearayearrisefalAll;
                            break;
                        case "沪深A股":
                            $scope.data=$scope.nearayearrisefalSS;
                            break;
                        case "新三板做市":
                            $scope.data=$scope.nearayearrisefalNTB;
                            break;
                    }
                    switch ($scope.standard){
                        case "沪深300":
                            $scope.standardData=-14.24;
                            break;
                        case "三板做市":
                            $scope.standardData=-24.62;
                            break;
                        case "上证综指":
                            $scope.standardData=-19.98;
                            break;
                        case "深证成指":
                            $scope.standardData=-23.35;
                            break;
                        case "中小板指":
                            $scope.standardData=-21.8;
                            break;
                        case "创业板指":
                            $scope.standardData=-24.7;
                            break;
                    }
                    break;
            }


        };

        $scope.drawChart=function () {
            var myChart = echarts.init(document.getElementById('test'));

            var option = {
                title: {
                    text: '行业区间涨幅',
                    left:'center'
                },
                tooltip: {},
                legend: {
                },
                xAxis: {
                    data: $scope.indstnam
                },
                yAxis: {},
                series: [{
                    name:'涨跌幅',
                    type: 'bar',
                    data: $scope.data,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                // build a color map as your need.
                                if(params.data<0){return '#88A500';}
                                else{return '#344996';}
                            }
                        }
                    },


                },
                    {
                        name:'基准',
                        type:'line',
                        data:$scope.standardData,
                        itemStyle:{
                            normal:{
                                lineStyle:{
                                    width:2,
                                    type:'dotted'  //'dotted'虚线 'solid'实线
                                }
                            }
                        },
                    }]
            };


            myChart.setOption(option);
        };


    });