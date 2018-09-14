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
            $scope.drawTable();

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
            document.getElementById('OWB').setAttribute('class','button2');
            document.getElementById('OMB').setAttribute('class','button');
            document.getElementById('TMB').setAttribute('class','button');
            document.getElementById('YTDB').setAttribute('class','button');
            document.getElementById('OYB').setAttribute('class','button');

            $scope.time="OW";
            $scope.createData();
            $scope.drawChart();
        };

        $scope.COM=function () {
            document.getElementById('OWB').setAttribute('class','button');
            document.getElementById('OMB').setAttribute('class','button2');
            document.getElementById('TMB').setAttribute('class','button');
            document.getElementById('YTDB').setAttribute('class','button');
            document.getElementById('OYB').setAttribute('class','button');
            $scope.time="OM";
            $scope.createData();
            $scope.drawChart();
        };

        $scope.CTM=function () {
            document.getElementById('OWB').setAttribute('class','button');
            document.getElementById('OMB').setAttribute('class','button');
            document.getElementById('TMB').setAttribute('class','button2');
            document.getElementById('YTDB').setAttribute('class','button');
            document.getElementById('OYB').setAttribute('class','button');
            $scope.time="TM";
            $scope.createData();
            $scope.drawChart();
        };

        $scope.CYTD=function () {
            document.getElementById('OWB').setAttribute('class','button');
            document.getElementById('OMB').setAttribute('class','button');
            document.getElementById('TMB').setAttribute('class','button');
            document.getElementById('YTDB').setAttribute('class','button2');
            document.getElementById('OYB').setAttribute('class','button');
            $scope.time="YTD";
            $scope.createData();
            $scope.drawChart();
        };

        $scope.COY=function () {
            document.getElementById('OWB').setAttribute('class','button');
            document.getElementById('OMB').setAttribute('class','button');
            document.getElementById('TMB').setAttribute('class','button');
            document.getElementById('YTDB').setAttribute('class','button');
            document.getElementById('OYB').setAttribute('class','button2');
            $scope.time="OY";
            $scope.createData();
            $scope.drawChart();
        };



        $scope.changeMarket=function () {
            $scope.createData();
            $scope.drawChart();
            $scope.drawTable();
            switch ($scope.time){
                case 'OW':
                    document.getElementById('OWB').focus();
                    break;
                case 'OM':
                    document.getElementById('OMB').focus();
                    break;
                case 'TM':
                    document.getElementById('TMB').focus();
                    break;
                case 'YTD':
                    document.getElementById('YTDB').focus();
                    break;
                case 'OY':
                    document.getElementById('OYB').focus();
                    break;
            }
        };

        $scope.changeStandard=function(){
            $scope.createData();
            $scope.drawChart();

            switch ($scope.time){
                case 'OW':
                    document.getElementById('OWB').focus();
                    break;
                case 'OM':
                    document.getElementById('OMB').focus();
                    break;
                case 'TM':
                    document.getElementById('TMB').focus();
                    break;
                case 'YTD':
                    document.getElementById('YTDB').focus();
                    break;
                case 'OY':
                    document.getElementById('OYB').focus();
                    break;
            }
        }


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
                            }
                            break;
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
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -13.38;
                            }
                            break;
                        case "三板做市":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -11.93;
                            }
                            break;
                        case "上证综指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -12.51;
                            }
                            break;
                        case "深证成指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -17.66;
                            }
                            break;
                        case "中小板指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -16.82;
                            }
                            break;
                        case "创业板指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -16.01;
                            }
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
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -14.42;
                            }
                            break;
                        case "三板做市":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -24.62;
                            }
                            break;
                        case "上证综指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -19.98;
                            }
                            break;
                        case "深证成指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -23.55;
                            }
                            break;
                        case "中小板指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -21.8;
                            }
                            break;
                        case "创业板指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -24.7;
                            }
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
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -14.42;
                            }
                            break;
                        case "三板做市":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -24.62;
                            }
                            break;
                        case "上证综指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -19.98;
                            }
                            break;
                        case "深证成指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -23.35;
                            }
                            break;
                        case "中小板指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -21.8;
                            }
                            break;
                        case "创业板指":
                            for(var i=0;i<72;i++) {
                                $scope.standardData[i] = -24.7;
                            }
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
                tooltip: {
                    formatter: function (params) {
                        if(params.seriesIndex==0){
                            return params.name+':'+params.data;
                        }
                        else {
                            return '基准 '+$scope.standard+':'+$scope.standardData[0];
                        }
                    },
                },
                legend: {
                },
                xAxis: {
                    data: $scope.indstnam
                },
                yAxis: {
                    min:$scope.judge(),
                    axisLabel: {
                        formatter: '{value} %',
                        show: true
                    }

                },
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

            $scope.getMinOfArray=function (array) {
                var min=1000;
                for(var i=0;i<array.length;i++){

                    if(parseInt(array[i])<parseInt(min)&&array[i]!='--'){
                        min=array[i];
                    }
                }
                return min;
            };

            $scope.judge=function () {

              if($scope.getMinOfArray($scope.data)<$scope.standardData[0]) return Math.round($scope.getMinOfArray($scope.data)-5);
                else return Math.round($scope.standardData[0]-5);
            };


            $scope.drawTable=function () {
               var str="";
                str+="<tr>\n" +
                    "  <th>序号</th>\n" +
                    "  <th>行业名称</th>\n" +
                    "  <th>近一周<br>涨跌幅(%)</th>\n" +
                    "  <th>近一月<br>涨跌幅(%)</th>\n" +
                    "  <th>近三月<br>涨跌幅(%)</th>\n" +
                    "  <th>年初至今<br>涨跌幅(%)</th>\n" +
                    "  <th>近一年<br>涨跌幅(%)</th>\n" +
                    "\n" +
                    "</tr>";
                switch ($scope.market){
                    case '全部':
                        for(var i=0;i<$scope.indstnam.length;i++){
                            str+="<tr><td>"+(i+1)+"</td>\n" +
                                "<td>"+$scope.indstnam[i]+"</td>\n" +
                                "<td>"+$scope.nearawkrisefalAll[i]+"</td>\n" +
                                "<td>"+$scope.nearamthrisefalAll[i]+"</td>\n" +
                                "<td>"+$scope.nearthrmthrisefalAll[i]+"</td>\n" +
                                "<td>"+$scope.ydtrisefalAll[i]+"</td>\n" +
                                "<td>"+$scope.nearayearrisefalAll[i]+"</td></tr>\n";

                        }
                        break;
                    case '沪深A股':
                        for(var i=0;i<$scope.indstnam.length;i++){
                            str+="<tr><td>"+(i+1)+"</td>\n" +
                                "<td>"+$scope.indstnam[i]+"</td>\n" +
                                "<td>"+$scope.nearawkrisefalSS[i]+"</td>\n" +
                                "<td>"+$scope.nearamthrisefalSS[i]+"</td>\n" +
                                "<td>"+$scope.nearthrmthrisefalSS[i]+"</td>\n" +
                                "<td>"+$scope.ydtrisefalSS[i]+"</td>\n" +
                                "<td>"+$scope.nearayearrisefalSS[i]+"</td></tr>\n"

                        }
                        break;
                    case '新三板做市':
                        for(var i=0;i<$scope.indstnam.length;i++){
                            str+="<tr><td>"+(i+1)+"</td>\n" +
                                "<td>"+$scope.indstnam[i]+"</td>\n" +
                                "<td>"+$scope.nearawkrisefalNTB[i]+"</td>\n" +
                                "<td>"+$scope.nearamthrisefalNTB[i]+"</td>\n" +
                                "<td>"+$scope.nearthrmthrisefalNTB[i]+"</td>\n" +
                                "<td>"+$scope.ydtrisefalNTB[i]+"</td>\n" +
                                "<td>"+$scope.nearayearrisefalNTB[i]+"</td></tr>\n";

                        }
                        break;
                }
                document.getElementById('table').innerHTML=str;

            };
    });