angular.module('myApp.macroIndustryDisplay.hyssdw', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('hyssdwCtrl',function($scope, $route, $http) {
        $scope.market="全部";
        $scope.Y="PE-TTM";
        $scope.X="ROE-TTM";
        $scope.area="总市值";
        $scope.str="";

        $scope.colors=['#344996','#88A500','#FF7800','#E52600','#7B4DD0','#1A96B1','#953c7e','#0a20f5','#4dcc01','#c66700','#df4cdd','#ebc306','#039765','#c52687','#5fa5e9']
        $http({
            method: 'POST',
            url: urlHead+'StatusOfIndustryListing/StatusOfIndustryListing_all'
        }).then(function successCallback(response) {
            var Data=response.data;
            console.log(Data)
            $scope.indstnamAll=Data[0].indstnam;
            $scope.pettmAll=Data[1].pettm;
            $scope.peyearfcastAll=Data[2].peyearfcast;
            $scope.pblfAll=Data[3].pblf;
            $scope.psttmAll=Data[4].psttm;
            $scope.roettmAll=Data[4].roettm;
            $scope.roattmAll=Data[6].roattm;
            $scope.netproAll=Data[7].netpro;
            $scope.revenproAll=Data[8].revenpro;
            $scope.tomaktvalAll=Data[9].tomaktval;
            $scope.businsincAll=Data[10].businsinc;
            $scope.toassetsAll=Data[11].toassets;


            for(var i=0;i<$scope.indstnamAll.length;i++){
                $scope.str+=' <tr>\n' +
                    '            <td>'+(i+1)+'</td>\n' +
                    '            <td>'+$scope.indstnamAll[i]+'</td>\n' ;
                if($scope.indstnamAll[i]!="能源设备"&&$scope.indstnamAll[i]!="(子)汽车综合"&&$scope.indstnamAll[i]!="烟草"&&$scope.indstnamAll[i]!="REITS"){
                    $scope.str+='            <td><div class="circle" style="background-color:'+$scope.colors[i%15]+'"></div></td>';}
                else{
                    $scope.str+='            <td></td>';}


                $scope.str+='            <td>'+$scope.pettmAll[i]+'</td>'+
                    '            <td>'+$scope.roettmAll[i]+'</td>'+
                    '            <td>'+$scope.tomaktvalAll[i]+'</td>'+
                    '        </tr>';

            }
            document.getElementById('table').innerHTML=$scope.str;
            $scope.data1 = [
                [$scope.roettmAll[0],$scope.pettmAll[0],$scope.tomaktvalAll[0],$scope.indstnamAll[0]],
                [$scope.roettmAll[15],$scope.pettmAll[15],$scope.tomaktvalAll[15],$scope.indstnamAll[15]],
                [$scope.roettmAll[30],$scope.pettmAll[30],$scope.tomaktvalAll[30],$scope.indstnamAll[30]],
                [$scope.roettmAll[45],$scope.pettmAll[45],$scope.tomaktvalAll[45],$scope.indstnamAll[45]],
                [$scope.roettmAll[60],$scope.pettmAll[60],$scope.tomaktvalAll[60],$scope.indstnamAll[60]],
            ];

            $scope.data2 = [
                [$scope.roettmAll[1],$scope.pettmAll[1],$scope.tomaktvalAll[1],$scope.indstnamAll[1]],
                [$scope.roettmAll[16],$scope.pettmAll[16],$scope.tomaktvalAll[16],$scope.indstnamAll[16]],
                [$scope.roettmAll[31],$scope.pettmAll[31],$scope.tomaktvalAll[31],$scope.indstnamAll[31]],
                [$scope.roettmAll[46],$scope.pettmAll[46],$scope.tomaktvalAll[46],$scope.indstnamAll[46]],
                [$scope.roettmAll[61],$scope.pettmAll[61],$scope.tomaktvalAll[61],$scope.indstnamAll[61]],
            ];

            $scope.data3 = [
                [$scope.roettmAll[2],$scope.pettmAll[2],$scope.tomaktvalAll[2],$scope.indstnamAll[2]],
                [$scope.roettmAll[17],$scope.pettmAll[17],$scope.tomaktvalAll[17],$scope.indstnamAll[17]],
                [$scope.roettmAll[32],$scope.pettmAll[32],$scope.tomaktvalAll[32],$scope.indstnamAll[32]],
                [$scope.roettmAll[47],$scope.pettmAll[47],$scope.tomaktvalAll[47],$scope.indstnamAll[47]],
                [$scope.roettmAll[62],$scope.pettmAll[62],$scope.tomaktvalAll[62],$scope.indstnamAll[62]],
            ];

            $scope.data4 = [
                [$scope.roettmAll[3],$scope.pettmAll[3],$scope.tomaktvalAll[3],$scope.indstnamAll[3]],
                [$scope.roettmAll[18],$scope.pettmAll[18],$scope.tomaktvalAll[18],$scope.indstnamAll[18]],
                [$scope.roettmAll[33],$scope.pettmAll[33],$scope.tomaktvalAll[33],$scope.indstnamAll[33]],
                [$scope.roettmAll[48],$scope.pettmAll[48],$scope.tomaktvalAll[48],$scope.indstnamAll[48]],
                [$scope.roettmAll[63],$scope.pettmAll[63],$scope.tomaktvalAll[63],$scope.indstnamAll[63]],
            ];

            $scope.data5 = [
                [$scope.roettmAll[4],$scope.pettmAll[4],$scope.tomaktvalAll[4],$scope.indstnamAll[4]],
                [$scope.roettmAll[19],$scope.pettmAll[19],$scope.tomaktvalAll[19],$scope.indstnamAll[19]],
                [$scope.roettmAll[34],$scope.pettmAll[34],$scope.tomaktvalAll[34],$scope.indstnamAll[34]],
                [$scope.roettmAll[49],$scope.pettmAll[49],$scope.tomaktvalAll[49],$scope.indstnamAll[49]],
                [$scope.roettmAll[64],$scope.pettmAll[64],$scope.tomaktvalAll[64],$scope.indstnamAll[64]],
            ];

            $scope.data6 = [
                [$scope.roettmAll[5],$scope.pettmAll[5],$scope.tomaktvalAll[5],$scope.indstnamAll[5]],
                [$scope.roettmAll[20],$scope.pettmAll[20],$scope.tomaktvalAll[20],$scope.indstnamAll[20]],
                [$scope.roettmAll[35],$scope.pettmAll[35],$scope.tomaktvalAll[35],$scope.indstnamAll[35]],
                [$scope.roettmAll[50],$scope.pettmAll[52],$scope.tomaktvalAll[50],$scope.indstnamAll[50]],
                [$scope.roettmAll[65],$scope.pettmAll[65],$scope.tomaktvalAll[65],$scope.indstnamAll[65]],
            ];

            $scope.data7 = [
                [$scope.roettmAll[6],$scope.pettmAll[6],$scope.tomaktvalAll[6],$scope.indstnamAll[6]],
                [$scope.roettmAll[21],$scope.pettmAll[21],$scope.tomaktvalAll[21],$scope.indstnamAll[21]],
                [$scope.roettmAll[36],$scope.pettmAll[36],$scope.tomaktvalAll[36],$scope.indstnamAll[36]],
                [$scope.roettmAll[51],$scope.pettmAll[51],$scope.tomaktvalAll[51],$scope.indstnamAll[51]],
                [$scope.roettmAll[66],$scope.pettmAll[66],$scope.tomaktvalAll[66],$scope.indstnamAll[66]],
            ];

            $scope.data8 = [
                [$scope.roettmAll[7],$scope.pettmAll[7],$scope.tomaktvalAll[7],$scope.indstnamAll[7]],
                [$scope.roettmAll[22],$scope.pettmAll[22],$scope.tomaktvalAll[22],$scope.indstnamAll[22]],
                [$scope.roettmAll[37],$scope.pettmAll[37],$scope.tomaktvalAll[37],$scope.indstnamAll[37]],
                [$scope.roettmAll[52],$scope.pettmAll[52],$scope.tomaktvalAll[52],$scope.indstnamAll[52]],
                [$scope.roettmAll[67],$scope.pettmAll[67],$scope.tomaktvalAll[67],$scope.indstnamAll[67]],
            ];

            $scope.data9 = [
                [$scope.roettmAll[8],$scope.pettmAll[8],$scope.tomaktvalAll[8],$scope.indstnamAll[8]],
                [$scope.roettmAll[23],$scope.pettmAll[23],$scope.tomaktvalAll[23],$scope.indstnamAll[23]],
                [$scope.roettmAll[38],$scope.pettmAll[38],$scope.tomaktvalAll[38],$scope.indstnamAll[38]],
                [$scope.roettmAll[53],$scope.pettmAll[53],$scope.tomaktvalAll[53],$scope.indstnamAll[53]],
                [$scope.roettmAll[68],$scope.pettmAll[68],$scope.tomaktvalAll[68],$scope.indstnamAll[68]],
            ];

            $scope.data10 = [
                [$scope.roettmAll[9],$scope.pettmAll[9],$scope.tomaktvalAll[9],$scope.indstnamAll[9]],
                [$scope.roettmAll[24],$scope.pettmAll[24],$scope.tomaktvalAll[24],$scope.indstnamAll[24]],
                [$scope.roettmAll[39],$scope.pettmAll[39],$scope.tomaktvalAll[39],$scope.indstnamAll[39]],
                [$scope.roettmAll[54],$scope.pettmAll[54],$scope.tomaktvalAll[54],$scope.indstnamAll[54]],
                [$scope.roettmAll[69],$scope.pettmAll[68],$scope.tomaktvalAll[68],$scope.indstnamAll[68]],
            ];

            $scope.data11 = [
                [$scope.roettmAll[10],$scope.pettmAll[10],$scope.tomaktvalAll[10],$scope.indstnamAll[10]],
                [$scope.roettmAll[25],$scope.pettmAll[25],$scope.tomaktvalAll[25],$scope.indstnamAll[25]],
                [$scope.roettmAll[40],$scope.pettmAll[40],$scope.tomaktvalAll[40],$scope.indstnamAll[40]],
                [0,0,0,'null'],
                [$scope.roettmAll[70],$scope.pettmAll[70],$scope.tomaktvalAll[70],$scope.indstnamAll[70]],
            ];

            $scope.data12 = [
                [$scope.roettmAll[11],$scope.pettmAll[11],$scope.tomaktvalAll[11],$scope.indstnamAll[11]],
                [$scope.roettmAll[26],$scope.pettmAll[26],$scope.tomaktvalAll[26],$scope.indstnamAll[26]],
                [$scope.roettmAll[41],$scope.pettmAll[41],$scope.tomaktvalAll[41],$scope.indstnamAll[41]],
                [$scope.roettmAll[56],$scope.pettmAll[56],$scope.tomaktvalAll[56],$scope.indstnamAll[56]],
                [$scope.roettmAll[71],$scope.pettmAll[71],$scope.tomaktvalAll[71],$scope.indstnamAll[71]],
            ];

            $scope.data13 = [
                [$scope.roettmAll[12],$scope.pettmAll[12],$scope.tomaktvalAll[12],$scope.indstnamAll[12]],
                [$scope.roettmAll[27],$scope.pettmAll[27],$scope.tomaktvalAll[27],$scope.indstnamAll[27]],
                [$scope.roettmAll[42],$scope.pettmAll[42],$scope.tomaktvalAll[42],$scope.indstnamAll[42]],
                [$scope.roettmAll[57],$scope.pettmAll[57],$scope.tomaktvalAll[57],$scope.indstnamAll[57]],
            ];

            $scope.data14 = [
                [$scope.roettmAll[13],$scope.pettmAll[13],$scope.tomaktvalAll[13],$scope.indstnamAll[13]],
                [$scope.roettmAll[28],$scope.pettmAll[28],$scope.tomaktvalAll[28],$scope.indstnamAll[28]],
                [$scope.roettmAll[43],$scope.pettmAll[43],$scope.tomaktvalAll[43],$scope.indstnamAll[43]],
                [$scope.roettmAll[58],$scope.pettmAll[58],$scope.tomaktvalAll[58],$scope.indstnamAll[58]],
            ];

            $scope.data15 = [
                [$scope.roettmAll[14],$scope.pettmAll[14],$scope.tomaktvalAll[14],$scope.indstnamAll[14]],
                [$scope.roettmAll[29],$scope.pettmAll[29],$scope.tomaktvalAll[29],$scope.indstnamAll[29]],
                [$scope.roettmAll[44],$scope.pettmAll[44],$scope.tomaktvalAll[44],$scope.indstnamAll[44]],
                [$scope.roettmAll[59],$scope.pettmAll[59],$scope.tomaktvalAll[59],$scope.indstnamAll[59]],
            ];

            var myChart = echarts.init(document.getElementById('test'));

            var option = {
                color:['#344996','#88A500','#FF7800','#E52600','#7B4DD0','#1A96B1','#953c7e','#0a20f5','#4dcc01','#c66700','#df4cdd','#ebc306','#039765','#c52687','#5fa5e9'],
                tooltip : {
                    textStyle: {
                        color: 'rgba(255,255,255,255)'
                    },
                    formatter: function (params) {
                        return params.data[3]+':'+params.data[2];

                    }
                },
                legend: {
                },
                toolbox: {
                },
                xAxis : [
                    {
                        type : 'value',
                        splitNumber: 4,
                        scale: true,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#d6d6d6'
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        splitNumber: 4,
                        scale: true,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#d6d6d6'
                            }
                        }
                    }
                ],

                series : [
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: $scope.data1,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: $scope.data2,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: $scope.data3,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: $scope.data4,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: $scope.data5,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: $scope.data6,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: $scope.data7,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: $scope.data8,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: $scope.data9,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: $scope.data10,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: $scope.data11,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: $scope.data12,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: $scope.data13,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: $scope.data14,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: $scope.data15,
                    }

                ]
            };

            myChart.setOption(option);


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });
        $http({
            method: 'POST',
            url: urlHead+'StatusOfIndustryListing/StatusOfIndustryListing_all'
        }).then(function successCallback(response) {
            var Data=response.data;
            $scope.indstnamAll=Data[0].indstnam;
            $scope.pettmAll=Data[1].pettm;
            $scope.peyearfcastAll=Data[2].peyearfcast;
            $scope.pblfAll=Data[3].pblf;
            $scope.psttmAll=Data[4].psttm;
            $scope.roettmAll=Data[4].roettm;
            $scope.roattmAll=Data[6].roattm;
            $scope.netproAll=Data[7].netpro;
            $scope.revenproAll=Data[8].revenpro;
            $scope.tomaktvalAll=Data[9].tomaktval;
            $scope.businsincAll=Data[10].businsinc;
            $scope.toassetsAll=Data[11].toassets;


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: urlHead+'StatusOfIndustryListing/StatusOfIndustryListing_shanghaiAndShenzhenAShares'
        }).then(function successCallback(response) {
            var Data=response.data;
            $scope.indstnamSS=Data[0].indstnam;
            $scope.pettmSS=Data[1].pettm;
            $scope.peyearfcastSS=Data[2].peyearfcast;
            $scope.pblfSS=Data[3].pblf;
            $scope.psttmSS=Data[4].psttm;
            $scope.roettmSS=Data[4].roettm;
            $scope.roattmSS=Data[6].roattm;
            $scope.netproSS=Data[7].netpro;
            $scope.revenproSS=Data[8].revenpro;
            $scope.tomaktvalSS=Data[9].tomaktval;
            $scope.businsincSS=Data[10].businsinc;
            $scope.toassetsSS=Data[11].toassets;
        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: urlHead+'StatusOfIndustryListing/StatusOfIndustryListing_newThirdBoard'
        }).then(function successCallback(response) {
            var Data=response.data;
            $scope.indstnamNTB=Data[0].indstnam;
            $scope.pettmNTB=Data[1].pettm;
            $scope.peyearfcastNTB=Data[2].peyearfcast;
            $scope.pblfNTB=Data[3].pblf;
            $scope.psttmNTB=Data[4].psttm;
            $scope.roettmNTB=Data[4].roettm;
            $scope.roattmNTB=Data[6].roattm;
            $scope.netproNTB=Data[7].netpro;
            $scope.revenproNTB=Data[8].revenpro;
            $scope.tomaktvalNTB=Data[9].tomaktval;
            $scope.businsincNTB=Data[10].businsinc;
            $scope.toassetsNTB=Data[11].toassets;
        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });
        $scope.str="";
        $scope.str+=' <tr>\n' +
            '            <th>序号</th>\n' +
            '            <th>行业名称</th>\n' +
            '            <th>图例</th>\n' +
            '            <th>'+$scope.Y+'</th>'+
            '            <th>'+$scope.X+'</th>'+
            '            <th>'+$scope.area+'</th>'+
            '        </tr>';




        $scope.changeMarket=function () {
            $scope.str="";
            $scope.str+=' <tr>\n' +
                '            <th>序号</th>\n' +
                '            <th>行业名称</th>\n' +
                '            <th>图例</th>\n' +
                '            <th>'+$scope.Y+'</th>'+
                '            <th>'+$scope.X+'</th>'+
                '            <th>'+$scope.area+'</th>'+
                '        </tr>';
            switch ($scope.market){
                case '全部':
                    for(var i=0;i<$scope.indstnamAll.length;i++){
                        $scope.str+=' <tr>\n' +
                            '            <td>'+(i+1)+'</td>\n' +
                            '            <td>'+$scope.indstnamAll[i]+'</td>\n' ;
                        if($scope.indstnamAll[i]!="能源设备"&&$scope.indstnamAll[i]!="(子)汽车综合"&&$scope.indstnamAll[i]!="烟草"&&$scope.indstnamAll[i]!="REITS"){
                            $scope.str+='            <td><div class="circle" style="background-color:'+$scope.colors[i%15]+'"></div></td>';}
                        else{
                            $scope.str+='            <td></td>';}

                        switch ($scope.Y){
                            case 'PE-TTM':
                                $scope.str+='            <td>'+$scope.pettmAll[i]+'</td>';


                                break;
                            case 'PE-本年预测':
                                $scope.str+='            <td>'+$scope.peyearfcastAll[i]+'</td>';
                                break;
                            case 'PB-LF':
                                $scope.str+='            <td>'+$scope.pblfAll[i]+'</td>';
                                break;
                            case 'PS-TTM':
                                $scope.str+='            <td>'+$scope.psttmAll[i]+'</td>';
                                break;
                        }
                        switch ($scope.X){
                            case 'ROE-TTM':
                                $scope.str+='            <td>'+$scope.roettmAll[i]+'</td>'
                                break;
                            case 'ROA-TTM':
                                $scope.str+='            <td>'+$scope.roattmAll[i]+'</td>';
                                break;
                            case '净利同比':
                                $scope.str+='            <td>'+$scope.netproAll[i]+'</td>';
                                break;
                            case '营收同比':
                                $scope.str+='            <td>'+$scope.revenproAll[i]+'</td>';
                                break;
                        }
                        switch ($scope.area){
                            case '总市值':
                                $scope.str+='            <td>'+$scope.tomaktvalAll[i]+'</td>'
                                break;
                            case '营业收入':
                                $scope.str+='            <td>'+$scope.businsincAll[i]+'</td>';
                                break;
                            case '资产总计':
                                $scope.str+='            <td>'+$scope.toassetsAll[i]+'</td>';
                                break;

                        }
                        $scope.str+='        </tr>';

                    }
                    document.getElementById('table').innerHTML=$scope.str;

                    switch ($scope.Y){
                        case 'PE-TTM':

                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.pettmAll[i*15]>0){$scope.data1[i][1]=$scope.pettmAll[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.pettmAll[i*15+1]>0){$scope.data2[i][1]=$scope.pettmAll[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.pettmAll[i*15+2]>0){$scope.data3[i][1]=$scope.pettmAll[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.pettmAll[i*15+3]>0){$scope.data4[i][1]=$scope.pettmAll[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.pettmAll[i*15+4]>0){$scope.data5[i][1]=$scope.pettmAll[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.pettmAll[i*15+5]>0){$scope.data6[i][1]=$scope.pettmAll[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.pettmAll[i*15+6]>0){$scope.data7[i][1]=$scope.pettmAll[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.pettmAll[i*15+7]>0){$scope.data8[i][1]=$scope.pettmAll[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.pettmAll[i*15+8]>0){$scope.data9[i][1]=$scope.pettmAll[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.pettmAll[i*15+9]>0){$scope.data10[i][1]=$scope.pettmAll[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.pettmAll[i*15+10]>0){$scope.data11[i][1]=$scope.pettmAll[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.pettmAll[i*15+11]>0){$scope.data12[i][1]=$scope.pettmAll[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.pettmAll[i*15+12]>0){$scope.data13[i][1]=$scope.pettmAll[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.pettmAll[i*15+13]>0){$scope.data14[i][1]=$scope.pettmAll[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.pettmAll[i*15+14]>0){$scope.data15[i][1]=$scope.pettmAll[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }
                                break;
                        case 'PE-本年预测':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.peyearfcastAll[i*15]>0){$scope.data1[i][1]=$scope.peyearfcastAll[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.peyearfcastAll[i*15+1]>0){$scope.data2[i][1]=$scope.peyearfcastAll[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.peyearfcastAll[i*15+2]>0){$scope.data3[i][1]=$scope.peyearfcastAll[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.peyearfcastAll[i*15+3]>0){$scope.data4[i][1]=$scope.peyearfcastAll[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.peyearfcastAll[i*15+4]>0){$scope.data5[i][1]=$scope.peyearfcastAll[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.peyearfcastAll[i*15+5]>0){$scope.data6[i][1]=$scope.peyearfcastAll[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.peyearfcastAll[i*15+6]>0){$scope.data7[i][1]=$scope.peyearfcastAll[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.peyearfcastAll[i*15+7]>0){$scope.data8[i][1]=$scope.peyearfcastAll[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.peyearfcastAll[i*15+8]>0){$scope.data9[i][1]=$scope.peyearfcastAll[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.peyearfcastAll[i*15+9]>0){$scope.data10[i][1]=$scope.peyearfcastAll[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.peyearfcastAll[i*15+10]>0){$scope.data11[i][1]=$scope.peyearfcastAll[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.peyearfcastAll[i*15+11]>0){$scope.data12[i][1]=$scope.peyearfcastAll[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.peyearfcastAll[i*15+12]>0){$scope.data13[i][1]=$scope.peyearfcastAll[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.peyearfcastAll[i*15+13]>0){$scope.data14[i][1]=$scope.peyearfcastAll[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.peyearfcastAll[i*15+14]>0){$scope.data15[i][1]=$scope.peyearfcastAll[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }

                            break;
                        case 'PB-LF':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.pblfAll[i*15]>0){$scope.data1[i][1]=$scope.pblfAll[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.pblfAll[i*15+1]>0){$scope.data2[i][1]=$scope.pblfAll[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.pblfAll[i*15+2]>0){$scope.data3[i][1]=$scope.pblfAll[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.pblfAll[i*15+3]>0){$scope.data4[i][1]=$scope.pblfAll[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.pblfAll[i*15+4]>0){$scope.data5[i][1]=$scope.pblfAll[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.pblfAll[i*15+5]>0){$scope.data6[i][1]=$scope.pblfAll[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.pblfAll[i*15+6]>0){$scope.data7[i][1]=$scope.pblfAll[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.pblfAll[i*15+7]>0){$scope.data8[i][1]=$scope.pblfAll[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.pblfAll[i*15+8]>0){$scope.data9[i][1]=$scope.pblfAll[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.pblfAll[i*15+9]>0){$scope.data10[i][1]=$scope.pblfAll[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.pblfAll[i*15+10]>0){$scope.data11[i][1]=$scope.pblfAll[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.pblfAll[i*15+11]>0){$scope.data12[i][1]=$scope.pblfAll[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.pblfAll[i*15+12]>0){$scope.data13[i][1]=$scope.pblfAll[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.pblfAll[i*15+13]>0){$scope.data14[i][1]=$scope.pblfAll[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.pblfAll[i*15+14]>0){$scope.data15[i][1]=$scope.pblfAll[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }

                            break;
                        case 'PS-TTM':

                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.psttmAll[i*15]>0){$scope.data1[i][1]=$scope.psttmAll[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.psttmAll[i*15+1]>0){$scope.data2[i][1]=$scope.psttmAll[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.psttmAll[i*15+2]>0){$scope.data3[i][1]=$scope.psttmAll[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.psttmAll[i*15+3]>0){$scope.data4[i][1]=$scope.psttmAll[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.psttmAll[i*15+4]>0){$scope.data5[i][1]=$scope.psttmAll[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.psttmAll[i*15+5]>0){$scope.data6[i][1]=$scope.psttmAll[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.psttmAll[i*15+6]>0){$scope.data7[i][1]=$scope.psttmAll[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.psttmAll[i*15+7]>0){$scope.data8[i][1]=$scope.psttmAll[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.psttmAll[i*15+8]>0){$scope.data9[i][1]=$scope.psttmAll[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.psttmAll[i*15+9]>0){$scope.data10[i][1]=$scope.psttmAll[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.psttmAll[i*15+10]>0){$scope.data11[i][1]=$scope.psttmAll[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.psttmAll[i*15+11]>0){$scope.data12[i][1]=$scope.psttmAll[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.psttmAll[i*15+12]>0){$scope.data13[i][1]=$scope.psttmAll[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.psttmAll[i*15+13]>0){$scope.data14[i][1]=$scope.psttmAll[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.psttmAll[i*15+14]>0){$scope.data15[i][1]=$scope.psttmAll[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }
                            break;
                    }
                    switch ($scope.X){
                        case 'ROE-TTM':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.roettmAll[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.roettmAll[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.roettmAll[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.roettmAll[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.roettmAll[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.roettmAll[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.roettmAll[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.roettmAll[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.roettmAll[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.roettmAll[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.roettmAll[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.roettmAll[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.roettmAll[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.roettmAll[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.roettmAll[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.roettmAll[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.roettmAll[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.roettmAll[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.roettmAll[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.roettmAll[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.roettmAll[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.roettmAll[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.roettmAll[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.roettmAll[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.roettmAll[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.roettmAll[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.roettmAll[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.roettmAll[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.roettmAll[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.roettmAll[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }
                            break;
                        case 'ROA-TTM':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.roattmAll[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.roattmAll[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.roattmAll[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.roattmAll[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.roattmAll[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.roattmAll[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.roattmAll[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.roattmAll[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.roattmAll[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.roattmAll[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.roattmAll[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.roattmAll[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.roattmAll[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.roattmAll[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.roattmAll[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.roattmAll[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.roattmAll[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.roattmAll[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.roattmAll[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.roattmAll[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.roattmAll[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.roattmAll[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.roattmAll[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.roattmAll[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.roattmAll[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.roattmAll[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.roattmAll[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.roattmAll[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.roattmAll[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.roattmAll[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;
                        case '净利同比':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.netproAll[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.netproAll[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.netproAll[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.netproAll[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.netproAll[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.netproAll[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.netproAll[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.netproAll[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.netproAll[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.netproAll[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.netproAll[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.netproAll[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.netproAll[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.netproAll[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.netproAll[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.netproAll[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.netproAll[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.netproAll[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.netproAll[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.netproAll[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.netproAll[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.netproAll[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.netproAll[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.netproAll[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.netproAll[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.netproAll[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.netproAll[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.netproAll[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.netproAll[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.netproAll[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;
                        case '营收同比':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.revenproAll[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.revenproAll[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.revenproAll[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.revenproAll[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.revenproAll[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.revenproAll[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.revenproAll[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.revenproAll[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.revenproAll[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.revenproAll[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.revenproAll[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.revenproAll[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.revenproAll[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.revenproAll[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.revenproAll[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.revenproAll[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.revenproAll[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.revenproAll[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.revenproAll[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.revenproAll[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.revenproAll[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.revenproAll[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.revenproAll[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.revenproAll[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.revenproAll[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.revenproAll[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.revenproAll[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.revenproAll[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.revenproAll[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.revenproAll[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;
                    }
                    switch ($scope.area){
                        case '总市值':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.tomaktvalAll[i*15]>0&&$scope.data1[i][1]>0&&$scope.data1[i][0]>0) {$scope.data1[i][2]=$scope.tomaktvalAll[i*15];}
                                else $scope.data1[i][2]=0;

                                if($scope.tomaktvalAll[i*15+1]>0&&$scope.data2[i][1]>0&&$scope.data2[i][0]>0) {$scope.data2[i][2]=$scope.tomaktvalAll[i*15+1];}
                                else $scope.data2[i][2]=0;

                                if($scope.tomaktvalAll[i*15+2]>0&&$scope.data3[i][1]>0&&$scope.data3[i][0]>0) {$scope.data3[i][2]=$scope.tomaktvalAll[i*15+2];}
                                else $scope.data3[i][2]=0;

                                if($scope.tomaktvalAll[i*15+3]>0&&$scope.data4[i][1]>0&&$scope.data4[i][0]>0) {$scope.data4[i][2]=$scope.tomaktvalAll[i*15+3];}
                                else $scope.data4[i][2]=0;

                                if($scope.tomaktvalAll[i*15+4]>0&&$scope.data5[i][1]>0&&$scope.data5[i][0]>0) {$scope.data5[i][2]=$scope.tomaktvalAll[i*15+4];}
                                else $scope.data5[i][2]=0;

                                if($scope.tomaktvalAll[i*15+5]>0&&$scope.data6[i][1]>0&&$scope.data6[i][0]>0) {$scope.data6[i][2]=$scope.tomaktvalAll[i*15+5];}
                                else $scope.data6[i][2]=0;

                                if($scope.tomaktvalAll[i*15+6]>0&&$scope.data7[i][1]>0&&$scope.data7[i][0]>0) {$scope.data7[i][2]=$scope.tomaktvalAll[i*15+6];}
                                else $scope.data7[i][2]=0;

                                if($scope.tomaktvalAll[i*15+7]>0&&$scope.data8[i][1]>0&&$scope.data8[i][0]>0) {$scope.data8[i][2]=$scope.tomaktvalAll[i*15+7];}
                                else $scope.data8[i][2]=0;

                                if($scope.tomaktvalAll[i*15+8]>0&&$scope.data9[i][1]>0&&$scope.data9[i][0]>0) {$scope.data9[i][2]=$scope.tomaktvalAll[i*15+8];}
                                else $scope.data9[i][2]=0;

                                if($scope.tomaktvalAll[i*15+9]>0&&$scope.data10[i][1]>0&&$scope.data10[i][0]>0) {$scope.data10[i][2]=$scope.tomaktvalAll[i*15+9];}
                                else $scope.data10[i][2]=0;

                                if($scope.tomaktvalAll[i*15+10]>0&&$scope.data11[i][1]>0&&$scope.data11[i][0]>0) {$scope.data11[i][2]=$scope.tomaktvalAll[i*15+10];}
                                else $scope.data11[i][2]=0;

                                if($scope.tomaktvalAll[i*15+11]>0&&$scope.data12[i][1]>0&&$scope.data12[i][0]>0) {$scope.data12[i][2]=$scope.tomaktvalAll[i*15+11];}
                                else $scope.data12[i][2]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.tomaktvalAll[i*15+12]>0&&$scope.data13[i][1]>0&&$scope.data13[i][0]>0) {$scope.data13[i][2]=$scope.tomaktvalAll[i*15+12];}
                                else $scope.data13[i][2]=0;

                                if($scope.tomaktvalAll[i*15+13]>0&&$scope.data14[i][1]>0&&$scope.data14[i][0]>0) {$scope.data14[i][2]=$scope.tomaktvalAll[i*15+13];}
                                else $scope.data14[i][2]=0;

                                if($scope.tomaktvalAll[i*15+14]>0&&$scope.data15[i][1]>0&&$scope.data15[i][0]>0) {$scope.data15[i][2]=$scope.tomaktvalAll[i*15+14];}
                                else $scope.data15[i][2]=0;
                            }
                            break;
                        case '营业收入':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.businsincAll[i*15]>0&&$scope.data1[i][1]>0&&$scope.data1[i][0]>0) {$scope.data1[i][2]=$scope.businsincAll[i*15];}
                                else $scope.data1[i][2]=0;

                                if($scope.businsincAll[i*15+1]>0&&$scope.data2[i][1]>0&&$scope.data2[i][0]>0) {$scope.data2[i][2]=$scope.businsincAll[i*15+1];}
                                else $scope.data2[i][2]=0;

                                if($scope.businsincAll[i*15+2]>0&&$scope.data3[i][1]>0&&$scope.data3[i][0]>0) {$scope.data3[i][2]=$scope.businsincAll[i*15+2];}
                                else $scope.data3[i][2]=0;

                                if($scope.businsincAll[i*15+3]>0&&$scope.data4[i][1]>0&&$scope.data4[i][0]>0) {$scope.data4[i][2]=$scope.businsincAll[i*15+3];}
                                else $scope.data4[i][2]=0;

                                if($scope.businsincAll[i*15+4]>0&&$scope.data5[i][1]>0&&$scope.data5[i][0]>0) {$scope.data5[i][2]=$scope.businsincAll[i*15+4];}
                                else $scope.data5[i][2]=0;

                                if($scope.businsincAll[i*15+5]>0&&$scope.data6[i][1]>0&&$scope.data6[i][0]>0) {$scope.data6[i][2]=$scope.businsincAll[i*15+5];}
                                else $scope.data6[i][2]=0;

                                if($scope.businsincAll[i*15+6]>0&&$scope.data7[i][1]>0&&$scope.data7[i][0]>0) {$scope.data7[i][2]=$scope.businsincAll[i*15+6];}
                                else $scope.data7[i][2]=0;

                                if($scope.businsincAll[i*15+7]>0&&$scope.data8[i][1]>0&&$scope.data8[i][0]>0) {$scope.data8[i][2]=$scope.businsincAll[i*15+7];}
                                else $scope.data8[i][2]=0;

                                if($scope.businsincAll[i*15+8]>0&&$scope.data9[i][1]>0&&$scope.data9[i][0]>0) {$scope.data9[i][2]=$scope.businsincAll[i*15+8];}
                                else $scope.data9[i][2]=0;

                                if($scope.businsincAll[i*15+9]>0&&$scope.data10[i][1]>0&&$scope.data10[i][0]>0) {$scope.data10[i][2]=$scope.businsincAll[i*15+9];}
                                else $scope.data10[i][2]=0;

                                if($scope.businsincAll[i*15+10]>0&&$scope.data11[i][1]>0&&$scope.data11[i][0]>0) {$scope.data11[i][2]=$scope.businsincAll[i*15+10];}
                                else $scope.data11[i][2]=0;

                                if($scope.businsincAll[i*15+11]>0&&$scope.data12[i][1]>0&&$scope.data12[i][0]>0) {$scope.data12[i][2]=$scope.businsincAll[i*15+11];}
                                else $scope.data12[i][2]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.businsincAll[i*15+12]>0&&$scope.data13[i][1]>0&&$scope.data13[i][0]>0) {$scope.data13[i][2]=$scope.businsincAll[i*15+12];}
                                else $scope.data13[i][2]=0;

                                if($scope.businsincAll[i*15+13]>0&&$scope.data14[i][1]>0&&$scope.data14[i][0]>0) {$scope.data14[i][2]=$scope.businsincAll[i*15+13];}
                                else $scope.data14[i][2]=0;

                                if($scope.businsincAll[i*15+14]>0&&$scope.data15[i][1]>0&&$scope.data15[i][0]>0) {$scope.data15[i][2]=$scope.businsincAll[i*15+14];}
                                else $scope.data15[i][2]=0;
                            }
                            break;
                        case '资产总计':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.toassetsAll[i*15]>0&&$scope.data1[i][1]>0&&$scope.data1[i][0]>0) {$scope.data1[i][2]=$scope.toassetsAll[i*15];}
                                else $scope.data1[i][2]=0;

                                if($scope.toassetsAll[i*15+1]>0&&$scope.data2[i][1]>0&&$scope.data2[i][0]>0) {$scope.data2[i][2]=$scope.toassetsAll[i*15+1];}
                                else $scope.data2[i][2]=0;

                                if($scope.toassetsAll[i*15+2]>0&&$scope.data3[i][1]>0&&$scope.data3[i][0]>0) {$scope.data3[i][2]=$scope.toassetsAll[i*15+2];}
                                else $scope.data3[i][2]=0;

                                if($scope.toassetsAll[i*15+3]>0&&$scope.data4[i][1]>0&&$scope.data4[i][0]>0) {$scope.data4[i][2]=$scope.toassetsAll[i*15+3];}
                                else $scope.data4[i][2]=0;

                                if($scope.toassetsAll[i*15+4]>0&&$scope.data5[i][1]>0&&$scope.data5[i][0]>0) {$scope.data5[i][2]=$scope.toassetsAll[i*15+4];}
                                else $scope.data5[i][2]=0;

                                if($scope.toassetsAll[i*15+5]>0&&$scope.data6[i][1]>0&&$scope.data6[i][0]>0) {$scope.data6[i][2]=$scope.toassetsAll[i*15+5];}
                                else $scope.data6[i][2]=0;

                                if($scope.toassetsAll[i*15+6]>0&&$scope.data7[i][1]>0&&$scope.data7[i][0]>0) {$scope.data7[i][2]=$scope.toassetsAll[i*15+6];}
                                else $scope.data7[i][2]=0;

                                if($scope.toassetsAll[i*15+7]>0&&$scope.data8[i][1]>0&&$scope.data8[i][0]>0) {$scope.data8[i][2]=$scope.toassetsAll[i*15+7];}
                                else $scope.data8[i][2]=0;

                                if($scope.toassetsAll[i*15+8]>0&&$scope.data9[i][1]>0&&$scope.data9[i][0]>0) {$scope.data9[i][2]=$scope.toassetsAll[i*15+8];}
                                else $scope.data9[i][2]=0;

                                if($scope.toassetsAll[i*15+9]>0&&$scope.data10[i][1]>0&&$scope.data10[i][0]>0) {$scope.data10[i][2]=$scope.toassetsAll[i*15+9];}
                                else $scope.data10[i][2]=0;

                                if($scope.toassetsAll[i*15+10]>0&&$scope.data11[i][1]>0&&$scope.data11[i][0]>0) {$scope.data11[i][2]=$scope.toassetsAll[i*15+10];}
                                else $scope.data11[i][2]=0;

                                if($scope.toassetsAll[i*15+11]>0&&$scope.data12[i][1]>0&&$scope.data12[i][0]>0) {$scope.data12[i][2]=$scope.toassetsAll[i*15+11];}
                                else $scope.data12[i][2]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.toassetsAll[i*15+12]>0&&$scope.data13[i][1]>0&&$scope.data13[i][0]>0) {$scope.data13[i][2]=$scope.toassetsAll[i*15+12];}
                                else $scope.data13[i][2]=0;

                                if($scope.toassetsAll[i*15+13]>0&&$scope.data14[i][1]>0&&$scope.data14[i][0]>0) {$scope.data14[i][2]=$scope.toassetsAll[i*15+13];}
                                else $scope.data14[i][2]=0;

                                if($scope.toassetsAll[i*15+14]>0&&$scope.data15[i][1]>0&&$scope.data15[i][0]>0) {$scope.data15[i][2]=$scope.toassetsAll[i*15+14];}
                                else $scope.data15[i][2]=0;
                            }
                            break;

                    }

                    $scope.drawChart($scope.data1,$scope.data2,$scope.data3,$scope.data4,$scope.data5,$scope.data6,$scope.data7,$scope.data8,$scope.data9,$scope.data10,$scope.data11,$scope.data12,$scope.data13,$scope.data14,$scope.data15)
                    break;

                case '沪深A股':
                    for(var i=0;i<$scope.indstnamSS.length;i++){
                        $scope.str+=' <tr>\n' +
                            '            <td>'+(i+1)+'</td>\n' +
                            '            <td>'+$scope.indstnamSS[i]+'</td>\n' ;
                        if($scope.indstnamSS[i]!="能源设备"&&$scope.indstnamSS[i]!="(子)汽车综合"&&$scope.indstnamSS[i]!="烟草"&&$scope.indstnamSS[i]!="REITS"){
                            $scope.str+='            <td><div class="circle" style="background-color:'+$scope.colors[i%15]+'"></div></td>';}
                        else{
                            $scope.str+='            <td></td>';}

                        switch ($scope.Y){
                            case 'PE-TTM':
                                $scope.str+='            <td>'+$scope.pettmSS[i]+'</td>'
                                break;
                            case 'PE-本年预测':
                                $scope.str+='            <td>'+$scope.peyearfcastSS[i]+'</td>';
                                break;
                            case 'PB-LF':
                                $scope.str+='            <td>'+$scope.pblfSS[i]+'</td>';
                                break;
                            case 'PS-TTM':
                                $scope.str+='            <td>'+$scope.psttmSS[i]+'</td>';
                                break;
                        }
                        switch ($scope.X){
                            case 'ROE-TTM':
                                $scope.str+='            <td>'+$scope.roettmSS[i]+'</td>'
                                break;
                            case 'ROA-TTM':
                                $scope.str+='            <td>'+$scope.roattmSS[i]+'</td>';
                                break;
                            case '净利同比':
                                $scope.str+='            <td>'+$scope.netproSS[i]+'</td>';
                                break;
                            case '营收同比':
                                $scope.str+='            <td>'+$scope.revenproSS[i]+'</td>';
                                break;
                        }
                        switch ($scope.area){
                            case '总市值':
                                $scope.str+='            <td>'+$scope.tomaktvalSS[i]+'</td>'
                                break;
                            case '营业收入':
                                $scope.str+='            <td>'+$scope.businsincSS[i]+'</td>';
                                break;
                            case '资产总计':
                                $scope.str+='            <td>'+$scope.toassetsSS[i]+'</td>';
                                break;

                        }
                        $scope.str+='        </tr>';

                    }
                    document.getElementById('table').innerHTML=$scope.str;
                    switch ($scope.Y){
                        case 'PE-TTM':

                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.pettmSS[i*15]>0){$scope.data1[i][1]=$scope.pettmSS[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.pettmSS[i*15+1]>0){$scope.data2[i][1]=$scope.pettmSS[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.pettmSS[i*15+2]>0){$scope.data3[i][1]=$scope.pettmSS[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.pettmSS[i*15+3]>0){$scope.data4[i][1]=$scope.pettmSS[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.pettmSS[i*15+4]>0){$scope.data5[i][1]=$scope.pettmSS[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.pettmSS[i*15+5]>0){$scope.data6[i][1]=$scope.pettmSS[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.pettmSS[i*15+6]>0){$scope.data7[i][1]=$scope.pettmSS[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.pettmSS[i*15+7]>0){$scope.data8[i][1]=$scope.pettmSS[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.pettmSS[i*15+8]>0){$scope.data9[i][1]=$scope.pettmSS[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.pettmSS[i*15+9]>0){$scope.data10[i][1]=$scope.pettmSS[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.pettmSS[i*15+10]>0){$scope.data11[i][1]=$scope.pettmSS[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.pettmSS[i*15+11]>0){$scope.data12[i][1]=$scope.pettmSS[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.pettmSS[i*15+12]>0){$scope.data13[i][1]=$scope.pettmSS[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.pettmSS[i*15+13]>0){$scope.data14[i][1]=$scope.pettmSS[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.pettmSS[i*15+14]>0){$scope.data15[i][1]=$scope.pettmSS[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }
                            break;
                        case 'PE-本年预测':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.peyearfcastSS[i*15]>0){$scope.data1[i][1]=$scope.peyearfcastSS[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.peyearfcastSS[i*15+1]>0){$scope.data2[i][1]=$scope.peyearfcastSS[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.peyearfcastSS[i*15+2]>0){$scope.data3[i][1]=$scope.peyearfcastSS[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.peyearfcastSS[i*15+3]>0){$scope.data4[i][1]=$scope.peyearfcastSS[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.peyearfcastSS[i*15+4]>0){$scope.data5[i][1]=$scope.peyearfcastSS[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.peyearfcastSS[i*15+5]>0){$scope.data6[i][1]=$scope.peyearfcastSS[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.peyearfcastSS[i*15+6]>0){$scope.data7[i][1]=$scope.peyearfcastSS[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.peyearfcastSS[i*15+7]>0){$scope.data8[i][1]=$scope.peyearfcastSS[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.peyearfcastSS[i*15+8]>0){$scope.data9[i][1]=$scope.peyearfcastSS[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.peyearfcastSS[i*15+9]>0){$scope.data10[i][1]=$scope.peyearfcastSS[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.peyearfcastSS[i*15+10]>0){$scope.data11[i][1]=$scope.peyearfcastSS[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.peyearfcastSS[i*15+11]>0){$scope.data12[i][1]=$scope.peyearfcastSS[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.peyearfcastSS[i*15+12]>0){$scope.data13[i][1]=$scope.peyearfcastSS[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.peyearfcastSS[i*15+13]>0){$scope.data14[i][1]=$scope.peyearfcastSS[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.peyearfcastSS[i*15+14]>0){$scope.data15[i][1]=$scope.peyearfcastSS[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }

                            break;
                        case 'PB-LF':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.pblfSS[i*15]>0){$scope.data1[i][1]=$scope.pblfSS[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.pblfSS[i*15+1]>0){$scope.data2[i][1]=$scope.pblfSS[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.pblfSS[i*15+2]>0){$scope.data3[i][1]=$scope.pblfSS[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.pblfSS[i*15+3]>0){$scope.data4[i][1]=$scope.pblfSS[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.pblfSS[i*15+4]>0){$scope.data5[i][1]=$scope.pblfSS[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.pblfSS[i*15+5]>0){$scope.data6[i][1]=$scope.pblfSS[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.pblfSS[i*15+6]>0){$scope.data7[i][1]=$scope.pblfSS[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.pblfSS[i*15+7]>0){$scope.data8[i][1]=$scope.pblfSS[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.pblfSS[i*15+8]>0){$scope.data9[i][1]=$scope.pblfSS[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.pblfSS[i*15+9]>0){$scope.data10[i][1]=$scope.pblfSS[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.pblfSS[i*15+10]>0){$scope.data11[i][1]=$scope.pblfSS[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.pblfSS[i*15+11]>0){$scope.data12[i][1]=$scope.pblfSS[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.pblfSS[i*15+12]>0){$scope.data13[i][1]=$scope.pblfSS[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.pblfSS[i*15+13]>0){$scope.data14[i][1]=$scope.pblfSS[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.pblfSS[i*15+14]>0){$scope.data15[i][1]=$scope.pblfSS[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }

                            break;
                        case 'PS-TTM':

                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.psttmSS[i*15]>0){$scope.data1[i][1]=$scope.psttmSS[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.psttmSS[i*15+1]>0){$scope.data2[i][1]=$scope.psttmSS[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.psttmSS[i*15+2]>0){$scope.data3[i][1]=$scope.psttmSS[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.psttmSS[i*15+3]>0){$scope.data4[i][1]=$scope.psttmSS[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.psttmSS[i*15+4]>0){$scope.data5[i][1]=$scope.psttmSS[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.psttmSS[i*15+5]>0){$scope.data6[i][1]=$scope.psttmSS[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.psttmSS[i*15+6]>0){$scope.data7[i][1]=$scope.psttmSS[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.psttmSS[i*15+7]>0){$scope.data8[i][1]=$scope.psttmSS[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.psttmSS[i*15+8]>0){$scope.data9[i][1]=$scope.psttmSS[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.psttmSS[i*15+9]>0){$scope.data10[i][1]=$scope.psttmSS[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.psttmSS[i*15+10]>0){$scope.data11[i][1]=$scope.psttmSS[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.psttmSS[i*15+11]>0){$scope.data12[i][1]=$scope.psttmSS[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.psttmSS[i*15+12]>0){$scope.data13[i][1]=$scope.psttmSS[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.psttmSS[i*15+13]>0){$scope.data14[i][1]=$scope.psttmSS[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.psttmSS[i*15+14]>0){$scope.data15[i][1]=$scope.psttmSS[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }
                            break;
                    }
                    switch ($scope.X){
                        case 'ROE-TTM':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.roettmSS[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.roettmSS[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.roettmSS[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.roettmSS[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.roettmSS[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.roettmSS[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.roettmSS[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.roettmSS[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.roettmSS[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.roettmSS[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.roettmSS[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.roettmSS[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.roettmSS[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.roettmSS[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.roettmSS[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.roettmSS[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.roettmSS[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.roettmSS[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.roettmSS[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.roettmSS[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.roettmSS[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.roettmSS[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.roettmSS[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.roettmSS[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.roettmSS[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.roettmSS[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.roettmSS[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.roettmSS[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.roettmSS[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.roettmSS[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }
                            break;
                        case 'ROA-TTM':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.roattmSS[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.roattmSS[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.roattmSS[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.roattmSS[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.roattmSS[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.roattmSS[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.roattmSS[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.roattmSS[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.roattmSS[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.roattmSS[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.roattmSS[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.roattmSS[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.roattmSS[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.roattmSS[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.roattmSS[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.roattmSS[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.roattmSS[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.roattmSS[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.roattmSS[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.roattmSS[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.roattmSS[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.roattmSS[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.roattmSS[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.roattmSS[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.roattmSS[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.roattmSS[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.roattmSS[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.roattmSS[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.roattmSS[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.roattmSS[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;
                        case '净利同比':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.netproSS[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.netproSS[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.netproSS[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.netproSS[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.netproSS[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.netproSS[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.netproSS[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.netproSS[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.netproSS[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.netproSS[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.netproSS[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.netproSS[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.netproSS[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.netproSS[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.netproSS[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.netproSS[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.netproSS[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.netproSS[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.netproSS[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.netproSS[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.netproSS[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.netproSS[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.netproSS[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.netproSS[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.netproSS[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.netproSS[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.netproSS[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.netproSS[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.netproSS[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.netproSS[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;
                        case '营收同比':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.revenproSS[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.revenproSS[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.revenproSS[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.revenproSS[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.revenproSS[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.revenproSS[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.revenproSS[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.revenproSS[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.revenproSS[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.revenproSS[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.revenproSS[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.revenproSS[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.revenproSS[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.revenproSS[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.revenproSS[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.revenproSS[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.revenproSS[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.revenproSS[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.revenproSS[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.revenproSS[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.revenproSS[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.revenproSS[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.revenproSS[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.revenproSS[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.revenproSS[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.revenproSS[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.revenproSS[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.revenproSS[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.revenproSS[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.revenproSS[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;
                    }
                    switch ($scope.area){
                        case '总市值':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.tomaktvalSS[i*15]>0&&$scope.data1[i][1]>0&&$scope.data1[i][0]>0) {$scope.data1[i][2]=$scope.tomaktvalSS[i*15];}
                                else $scope.data1[i][2]=0;

                                if($scope.tomaktvalSS[i*15+1]>0&&$scope.data2[i][1]>0&&$scope.data2[i][0]>0) {$scope.data2[i][2]=$scope.tomaktvalSS[i*15+1];}
                                else $scope.data2[i][2]=0;

                                if($scope.tomaktvalSS[i*15+2]>0&&$scope.data3[i][1]>0&&$scope.data3[i][0]>0) {$scope.data3[i][2]=$scope.tomaktvalSS[i*15+2];}
                                else $scope.data3[i][2]=0;

                                if($scope.tomaktvalSS[i*15+3]>0&&$scope.data4[i][1]>0&&$scope.data4[i][0]>0) {$scope.data4[i][2]=$scope.tomaktvalSS[i*15+3];}
                                else $scope.data4[i][2]=0;

                                if($scope.tomaktvalSS[i*15+4]>0&&$scope.data5[i][1]>0&&$scope.data5[i][0]>0) {$scope.data5[i][2]=$scope.tomaktvalSS[i*15+4];}
                                else $scope.data5[i][2]=0;

                                if($scope.tomaktvalSS[i*15+5]>0&&$scope.data6[i][1]>0&&$scope.data6[i][0]>0) {$scope.data6[i][2]=$scope.tomaktvalSS[i*15+5];}
                                else $scope.data6[i][2]=0;

                                if($scope.tomaktvalSS[i*15+6]>0&&$scope.data7[i][1]>0&&$scope.data7[i][0]>0) {$scope.data7[i][2]=$scope.tomaktvalSS[i*15+6];}
                                else $scope.data7[i][2]=0;

                                if($scope.tomaktvalSS[i*15+7]>0&&$scope.data8[i][1]>0&&$scope.data8[i][0]>0) {$scope.data8[i][2]=$scope.tomaktvalSS[i*15+7];}
                                else $scope.data8[i][2]=0;

                                if($scope.tomaktvalSS[i*15+8]>0&&$scope.data9[i][1]>0&&$scope.data9[i][0]>0) {$scope.data9[i][2]=$scope.tomaktvalSS[i*15+8];}
                                else $scope.data9[i][2]=0;

                                if($scope.tomaktvalSS[i*15+9]>0&&$scope.data10[i][1]>0&&$scope.data10[i][0]>0) {$scope.data10[i][2]=$scope.tomaktvalSS[i*15+9];}
                                else $scope.data10[i][2]=0;

                                if($scope.tomaktvalSS[i*15+10]>0&&$scope.data11[i][1]>0&&$scope.data11[i][0]>0) {$scope.data11[i][2]=$scope.tomaktvalSS[i*15+10];}
                                else $scope.data11[i][2]=0;

                                if($scope.tomaktvalSS[i*15+11]>0&&$scope.data12[i][1]>0&&$scope.data12[i][0]>0) {$scope.data12[i][2]=$scope.tomaktvalSS[i*15+11];}
                                else $scope.data12[i][2]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.tomaktvalSS[i*15+12]>0&&$scope.data13[i][1]>0&&$scope.data13[i][0]>0) {$scope.data13[i][2]=$scope.tomaktvalSS[i*15+12];}
                                else $scope.data13[i][2]=0;

                                if($scope.tomaktvalSS[i*15+13]>0&&$scope.data14[i][1]>0&&$scope.data14[i][0]>0) {$scope.data14[i][2]=$scope.tomaktvalSS[i*15+13];}
                                else $scope.data14[i][2]=0;

                                if($scope.tomaktvalSS[i*15+14]>0&&$scope.data15[i][1]>0&&$scope.data15[i][0]>0) {$scope.data15[i][2]=$scope.tomaktvalSS[i*15+14];}
                                else $scope.data15[i][2]=0;
                            }
                            break;
                        case '营业收入':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.businsincSS[i*15]>0&&$scope.data1[i][1]>0&&$scope.data1[i][0]>0) {$scope.data1[i][2]=$scope.businsincSS[i*15];}
                                else $scope.data1[i][2]=0;

                                if($scope.businsincSS[i*15+1]>0&&$scope.data2[i][1]>0&&$scope.data2[i][0]>0) {$scope.data2[i][2]=$scope.businsincSS[i*15+1];}
                                else $scope.data2[i][2]=0;

                                if($scope.businsincSS[i*15+2]>0&&$scope.data3[i][1]>0&&$scope.data3[i][0]>0) {$scope.data3[i][2]=$scope.businsincSS[i*15+2];}
                                else $scope.data3[i][2]=0;

                                if($scope.businsincSS[i*15+3]>0&&$scope.data4[i][1]>0&&$scope.data4[i][0]>0) {$scope.data4[i][2]=$scope.businsincSS[i*15+3];}
                                else $scope.data4[i][2]=0;

                                if($scope.businsincSS[i*15+4]>0&&$scope.data5[i][1]>0&&$scope.data5[i][0]>0) {$scope.data5[i][2]=$scope.businsincSS[i*15+4];}
                                else $scope.data5[i][2]=0;

                                if($scope.businsincSS[i*15+5]>0&&$scope.data6[i][1]>0&&$scope.data6[i][0]>0) {$scope.data6[i][2]=$scope.businsincSS[i*15+5];}
                                else $scope.data6[i][2]=0;

                                if($scope.businsincSS[i*15+6]>0&&$scope.data7[i][1]>0&&$scope.data7[i][0]>0) {$scope.data7[i][2]=$scope.businsincSS[i*15+6];}
                                else $scope.data7[i][2]=0;

                                if($scope.businsincSS[i*15+7]>0&&$scope.data8[i][1]>0&&$scope.data8[i][0]>0) {$scope.data8[i][2]=$scope.businsincSS[i*15+7];}
                                else $scope.data8[i][2]=0;

                                if($scope.businsincSS[i*15+8]>0&&$scope.data9[i][1]>0&&$scope.data9[i][0]>0) {$scope.data9[i][2]=$scope.businsincSS[i*15+8];}
                                else $scope.data9[i][2]=0;

                                if($scope.businsincSS[i*15+9]>0&&$scope.data10[i][1]>0&&$scope.data10[i][0]>0) {$scope.data10[i][2]=$scope.businsincSS[i*15+9];}
                                else $scope.data10[i][2]=0;

                                if($scope.businsincSS[i*15+10]>0&&$scope.data11[i][1]>0&&$scope.data11[i][0]>0) {$scope.data11[i][2]=$scope.businsincSS[i*15+10];}
                                else $scope.data11[i][2]=0;

                                if($scope.businsincSS[i*15+11]>0&&$scope.data12[i][1]>0&&$scope.data12[i][0]>0) {$scope.data12[i][2]=$scope.businsincSS[i*15+11];}
                                else $scope.data12[i][2]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.businsincSS[i*15+12]>0&&$scope.data13[i][1]>0&&$scope.data13[i][0]>0) {$scope.data13[i][2]=$scope.businsincSS[i*15+12];}
                                else $scope.data13[i][2]=0;

                                if($scope.businsincSS[i*15+13]>0&&$scope.data14[i][1]>0&&$scope.data14[i][0]>0) {$scope.data14[i][2]=$scope.businsincSS[i*15+13];}
                                else $scope.data14[i][2]=0;

                                if($scope.businsincSS[i*15+14]>0&&$scope.data15[i][1]>0&&$scope.data15[i][0]>0) {$scope.data15[i][2]=$scope.businsincSS[i*15+14];}
                                else $scope.data15[i][2]=0;
                            }
                            break;
                        case '资产总计':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.toassetsSS[i*15]>0&&$scope.data1[i][1]>0&&$scope.data1[i][0]>0) {$scope.data1[i][2]=$scope.toassetsSS[i*15];}
                                else $scope.data1[i][2]=0;

                                if($scope.toassetsSS[i*15+1]>0&&$scope.data2[i][1]>0&&$scope.data2[i][0]>0) {$scope.data2[i][2]=$scope.toassetsSS[i*15+1];}
                                else $scope.data2[i][2]=0;

                                if($scope.toassetsSS[i*15+2]>0&&$scope.data3[i][1]>0&&$scope.data3[i][0]>0) {$scope.data3[i][2]=$scope.toassetsSS[i*15+2];}
                                else $scope.data3[i][2]=0;

                                if($scope.toassetsSS[i*15+3]>0&&$scope.data4[i][1]>0&&$scope.data4[i][0]>0) {$scope.data4[i][2]=$scope.toassetsSS[i*15+3];}
                                else $scope.data4[i][2]=0;

                                if($scope.toassetsSS[i*15+4]>0&&$scope.data5[i][1]>0&&$scope.data5[i][0]>0) {$scope.data5[i][2]=$scope.toassetsSS[i*15+4];}
                                else $scope.data5[i][2]=0;

                                if($scope.toassetsSS[i*15+5]>0&&$scope.data6[i][1]>0&&$scope.data6[i][0]>0) {$scope.data6[i][2]=$scope.toassetsSS[i*15+5];}
                                else $scope.data6[i][2]=0;

                                if($scope.toassetsSS[i*15+6]>0&&$scope.data7[i][1]>0&&$scope.data7[i][0]>0) {$scope.data7[i][2]=$scope.toassetsSS[i*15+6];}
                                else $scope.data7[i][2]=0;

                                if($scope.toassetsSS[i*15+7]>0&&$scope.data8[i][1]>0&&$scope.data8[i][0]>0) {$scope.data8[i][2]=$scope.toassetsSS[i*15+7];}
                                else $scope.data8[i][2]=0;

                                if($scope.toassetsSS[i*15+8]>0&&$scope.data9[i][1]>0&&$scope.data9[i][0]>0) {$scope.data9[i][2]=$scope.toassetsSS[i*15+8];}
                                else $scope.data9[i][2]=0;

                                if($scope.toassetsSS[i*15+9]>0&&$scope.data10[i][1]>0&&$scope.data10[i][0]>0) {$scope.data10[i][2]=$scope.toassetsSS[i*15+9];}
                                else $scope.data10[i][2]=0;

                                if($scope.toassetsSS[i*15+10]>0&&$scope.data11[i][1]>0&&$scope.data11[i][0]>0) {$scope.data11[i][2]=$scope.toassetsSS[i*15+10];}
                                else $scope.data11[i][2]=0;

                                if($scope.toassetsSS[i*15+11]>0&&$scope.data12[i][1]>0&&$scope.data12[i][0]>0) {$scope.data12[i][2]=$scope.toassetsSS[i*15+11];}
                                else $scope.data12[i][2]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.toassetsSS[i*15+12]>0&&$scope.data13[i][1]>0&&$scope.data13[i][0]>0) {$scope.data13[i][2]=$scope.toassetsSS[i*15+12];}
                                else $scope.data13[i][2]=0;

                                if($scope.toassetsSS[i*15+13]>0&&$scope.data14[i][1]>0&&$scope.data14[i][0]>0) {$scope.data14[i][2]=$scope.toassetsSS[i*15+13];}
                                else $scope.data14[i][2]=0;

                                if($scope.toassetsSS[i*15+14]>0&&$scope.data15[i][1]>0&&$scope.data15[i][0]>0) {$scope.data15[i][2]=$scope.toassetsSS[i*15+14];}
                                else $scope.data15[i][2]=0;
                            }
                            break;

                    }

                    $scope.drawChart($scope.data1,$scope.data2,$scope.data3,$scope.data4,$scope.data5,$scope.data6,$scope.data7,$scope.data8,$scope.data9,$scope.data10,$scope.data11,$scope.data12,$scope.data13,$scope.data14,$scope.data15)
                    break;

                case '新三板做市':
                    for(var i=0;i<$scope.indstnamNTB.length;i++){
                        $scope.str+=' <tr>\n' +
                            '            <td>'+(i+1)+'</td>\n' +
                            '            <td>'+$scope.indstnamNTB[i]+'</td>\n' ;
                        if($scope.indstnamNTB[i]!="能源设备"&&$scope.indstnamNTB[i]!="(子)汽车综合"&&$scope.indstnamNTB[i]!="烟草"&&$scope.indstnamNTB[i]!="REITS"){
                            $scope.str+='            <td><div class="circle" style="background-color:'+$scope.colors[i%15]+'"></div></td>';}
                        else{
                            $scope.str+='            <td></td>';}

                        switch ($scope.Y){
                            case 'PE-TTM':
                                $scope.str+='            <td>'+$scope.pettmNTB[i]+'</td>'
                                break;
                            case 'PE-本年预测':
                                $scope.str+='            <td>'+$scope.peyearfcastNTB[i]+'</td>';
                                break;
                            case 'PB-LF':
                                $scope.str+='            <td>'+$scope.pblfNTB[i]+'</td>';
                                break;
                            case 'PS-TTM':
                                $scope.str+='            <td>'+$scope.psttmNTB[i]+'</td>';
                                break;
                        }
                        switch ($scope.X){
                            case 'ROE-TTM':
                                $scope.str+='            <td>'+$scope.roettmNTB[i]+'</td>'
                                break;
                            case 'ROA-TTM':
                                $scope.str+='            <td>'+$scope.roattmNTB[i]+'</td>';
                                break;
                            case '净利同比':
                                $scope.str+='            <td>'+$scope.netproNTB[i]+'</td>';
                                break;
                            case '营收同比':
                                $scope.str+='            <td>'+$scope.revenproNTB[i]+'</td>';
                                break;
                        }
                        switch ($scope.area){
                            case '总市值':
                                $scope.str+='            <td>'+$scope.tomaktvalNTB[i]+'</td>'
                                break;
                            case '营业收入':
                                $scope.str+='            <td>'+$scope.businsincNTB[i]+'</td>';
                                break;
                            case '资产总计':
                                $scope.str+='            <td>'+$scope.toassetsNTB[i]+'</td>';
                                break;

                        }
                        $scope.str+='        </tr>';

                    }
                    document.getElementById('table').innerHTML=$scope.str;
                    switch ($scope.Y){
                        case 'PE-TTM':

                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.pettmNTB[i*15]>0){$scope.data1[i][1]=$scope.pettmNTB[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.pettmNTB[i*15+1]>0){$scope.data2[i][1]=$scope.pettmNTB[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.pettmNTB[i*15+2]>0){$scope.data3[i][1]=$scope.pettmNTB[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.pettmNTB[i*15+3]>0){$scope.data4[i][1]=$scope.pettmNTB[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.pettmNTB[i*15+4]>0){$scope.data5[i][1]=$scope.pettmNTB[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.pettmNTB[i*15+5]>0){$scope.data6[i][1]=$scope.pettmNTB[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.pettmNTB[i*15+6]>0){$scope.data7[i][1]=$scope.pettmNTB[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.pettmNTB[i*15+7]>0){$scope.data8[i][1]=$scope.pettmNTB[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.pettmNTB[i*15+8]>0){$scope.data9[i][1]=$scope.pettmNTB[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.pettmNTB[i*15+9]>0){$scope.data10[i][1]=$scope.pettmNTB[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.pettmNTB[i*15+10]>0){$scope.data11[i][1]=$scope.pettmNTB[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.pettmNTB[i*15+11]>0){$scope.data12[i][1]=$scope.pettmNTB[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.pettmNTB[i*15+12]>0){$scope.data13[i][1]=$scope.pettmNTB[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.pettmNTB[i*15+13]>0){$scope.data14[i][1]=$scope.pettmNTB[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.pettmNTB[i*15+14]>0){$scope.data15[i][1]=$scope.pettmNTB[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }
                            break;
                        case 'PE-本年预测':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.peyearfcastNTB[i*15]>0){$scope.data1[i][1]=$scope.peyearfcastNTB[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+1]>0){$scope.data2[i][1]=$scope.peyearfcastNTB[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+2]>0){$scope.data3[i][1]=$scope.peyearfcastNTB[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+3]>0){$scope.data4[i][1]=$scope.peyearfcastNTB[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+4]>0){$scope.data5[i][1]=$scope.peyearfcastNTB[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+5]>0){$scope.data6[i][1]=$scope.peyearfcastNTB[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+6]>0){$scope.data7[i][1]=$scope.peyearfcastNTB[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+7]>0){$scope.data8[i][1]=$scope.peyearfcastNTB[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+8]>0){$scope.data9[i][1]=$scope.peyearfcastNTB[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+9]>0){$scope.data10[i][1]=$scope.peyearfcastNTB[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+10]>0){$scope.data11[i][1]=$scope.peyearfcastNTB[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+11]>0){$scope.data12[i][1]=$scope.peyearfcastNTB[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.peyearfcastNTB[i*15+12]>0){$scope.data13[i][1]=$scope.peyearfcastNTB[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+13]>0){$scope.data14[i][1]=$scope.peyearfcastNTB[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+14]>0){$scope.data15[i][1]=$scope.peyearfcastNTB[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }

                            break;
                        case 'PB-LF':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.pblfNTB[i*15]>0){$scope.data1[i][1]=$scope.pblfNTB[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.pblfNTB[i*15+1]>0){$scope.data2[i][1]=$scope.pblfNTB[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.pblfNTB[i*15+2]>0){$scope.data3[i][1]=$scope.pblfNTB[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.pblfNTB[i*15+3]>0){$scope.data4[i][1]=$scope.pblfNTB[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.pblfNTB[i*15+4]>0){$scope.data5[i][1]=$scope.pblfNTB[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.pblfNTB[i*15+5]>0){$scope.data6[i][1]=$scope.pblfNTB[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.pblfNTB[i*15+6]>0){$scope.data7[i][1]=$scope.pblfNTB[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.pblfNTB[i*15+7]>0){$scope.data8[i][1]=$scope.pblfNTB[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.pblfNTB[i*15+8]>0){$scope.data9[i][1]=$scope.pblfNTB[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.pblfNTB[i*15+9]>0){$scope.data10[i][1]=$scope.pblfNTB[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.pblfNTB[i*15+10]>0){$scope.data11[i][1]=$scope.pblfNTB[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.pblfNTB[i*15+11]>0){$scope.data12[i][1]=$scope.pblfNTB[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.pblfNTB[i*15+12]>0){$scope.data13[i][1]=$scope.pblfNTB[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.pblfNTB[i*15+13]>0){$scope.data14[i][1]=$scope.pblfNTB[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.pblfNTB[i*15+14]>0){$scope.data15[i][1]=$scope.pblfNTB[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }

                            break;
                        case 'PS-TTM':

                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.psttmNTB[i*15]>0){$scope.data1[i][1]=$scope.psttmNTB[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.psttmNTB[i*15+1]>0){$scope.data2[i][1]=$scope.psttmNTB[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.psttmNTB[i*15+2]>0){$scope.data3[i][1]=$scope.psttmNTB[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.psttmNTB[i*15+3]>0){$scope.data4[i][1]=$scope.psttmNTB[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.psttmNTB[i*15+4]>0){$scope.data5[i][1]=$scope.psttmNTB[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.psttmNTB[i*15+5]>0){$scope.data6[i][1]=$scope.psttmNTB[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.psttmNTB[i*15+6]>0){$scope.data7[i][1]=$scope.psttmNTB[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.psttmNTB[i*15+7]>0){$scope.data8[i][1]=$scope.psttmNTB[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.psttmNTB[i*15+8]>0){$scope.data9[i][1]=$scope.psttmNTB[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.psttmNTB[i*15+9]>0){$scope.data10[i][1]=$scope.psttmNTB[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.psttmNTB[i*15+10]>0){$scope.data11[i][1]=$scope.psttmNTB[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.psttmNTB[i*15+11]>0){$scope.data12[i][1]=$scope.psttmNTB[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.psttmNTB[i*15+12]>0){$scope.data13[i][1]=$scope.psttmNTB[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.psttmNTB[i*15+13]>0){$scope.data14[i][1]=$scope.psttmNTB[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.psttmNTB[i*15+14]>0){$scope.data15[i][1]=$scope.psttmNTB[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }
                            break;
                    }
                    switch ($scope.X){
                        case 'ROE-TTM':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.roettmNTB[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.roettmNTB[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.roettmNTB[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.roettmNTB[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.roettmNTB[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.roettmNTB[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.roettmNTB[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.roettmNTB[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.roettmNTB[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.roettmNTB[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.roettmNTB[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.roettmNTB[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.roettmNTB[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.roettmNTB[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.roettmNTB[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.roettmNTB[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.roettmNTB[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.roettmNTB[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.roettmNTB[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.roettmNTB[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.roettmNTB[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.roettmNTB[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.roettmNTB[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.roettmNTB[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.roettmNTB[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.roettmNTB[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.roettmNTB[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.roettmNTB[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.roettmNTB[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.roettmNTB[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }
                            break;
                        case 'ROA-TTM':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.roattmNTB[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.roattmNTB[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.roattmNTB[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.roattmNTB[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.roattmNTB[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.roattmNTB[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.roattmNTB[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.roattmNTB[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.roattmNTB[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.roattmNTB[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.roattmNTB[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.roattmNTB[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.roattmNTB[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.roattmNTB[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.roattmNTB[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.roattmNTB[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.roattmNTB[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.roattmNTB[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.roattmNTB[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.roattmNTB[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.roattmNTB[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.roattmNTB[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.roattmNTB[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.roattmNTB[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.roattmNTB[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.roattmNTB[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.roattmNTB[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.roattmNTB[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.roattmNTB[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.roattmNTB[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;
                        case '净利同比':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.netproNTB[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.netproNTB[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.netproNTB[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.netproNTB[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.netproNTB[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.netproNTB[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.netproNTB[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.netproNTB[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.netproNTB[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.netproNTB[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.netproNTB[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.netproNTB[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.netproNTB[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.netproNTB[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.netproNTB[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.netproNTB[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.netproNTB[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.netproNTB[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.netproNTB[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.netproNTB[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.netproNTB[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.netproNTB[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.netproNTB[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.netproNTB[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.netproNTB[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.netproNTB[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.netproNTB[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.netproNTB[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.netproNTB[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.netproNTB[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;
                        case '营收同比':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.revenproNTB[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.revenproNTB[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.revenproNTB[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.revenproNTB[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.revenproNTB[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.revenproNTB[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.revenproNTB[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.revenproNTB[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.revenproNTB[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.revenproNTB[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.revenproNTB[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.revenproNTB[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.revenproNTB[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.revenproNTB[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.revenproNTB[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.revenproNTB[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.revenproNTB[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.revenproNTB[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.revenproNTB[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.revenproNTB[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.revenproNTB[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.revenproNTB[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.revenproNTB[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.revenproNTB[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.revenproNTB[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.revenproNTB[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.revenproNTB[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.revenproNTB[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.revenproNTB[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.revenproNTB[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;
                    }
                    switch ($scope.area){
                        case '总市值':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.tomaktvalNTB[i*15]>0&&$scope.data1[i][1]>0&&$scope.data1[i][0]>0) {$scope.data1[i][2]=$scope.tomaktvalNTB[i*15];}
                                else $scope.data1[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+1]>0&&$scope.data2[i][1]>0&&$scope.data2[i][0]>0) {$scope.data2[i][2]=$scope.tomaktvalNTB[i*15+1];}
                                else $scope.data2[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+2]>0&&$scope.data3[i][1]>0&&$scope.data3[i][0]>0) {$scope.data3[i][2]=$scope.tomaktvalNTB[i*15+2];}
                                else $scope.data3[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+3]>0&&$scope.data4[i][1]>0&&$scope.data4[i][0]>0) {$scope.data4[i][2]=$scope.tomaktvalNTB[i*15+3];}
                                else $scope.data4[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+4]>0&&$scope.data5[i][1]>0&&$scope.data5[i][0]>0) {$scope.data5[i][2]=$scope.tomaktvalNTB[i*15+4];}
                                else $scope.data5[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+5]>0&&$scope.data6[i][1]>0&&$scope.data6[i][0]>0) {$scope.data6[i][2]=$scope.tomaktvalNTB[i*15+5];}
                                else $scope.data6[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+6]>0&&$scope.data7[i][1]>0&&$scope.data7[i][0]>0) {$scope.data7[i][2]=$scope.tomaktvalNTB[i*15+6];}
                                else $scope.data7[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+7]>0&&$scope.data8[i][1]>0&&$scope.data8[i][0]>0) {$scope.data8[i][2]=$scope.tomaktvalNTB[i*15+7];}
                                else $scope.data8[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+8]>0&&$scope.data9[i][1]>0&&$scope.data9[i][0]>0) {$scope.data9[i][2]=$scope.tomaktvalNTB[i*15+8];}
                                else $scope.data9[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+9]>0&&$scope.data10[i][1]>0&&$scope.data10[i][0]>0) {$scope.data10[i][2]=$scope.tomaktvalNTB[i*15+9];}
                                else $scope.data10[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+10]>0&&$scope.data11[i][1]>0&&$scope.data11[i][0]>0) {$scope.data11[i][2]=$scope.tomaktvalNTB[i*15+10];}
                                else $scope.data11[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+11]>0&&$scope.data12[i][1]>0&&$scope.data12[i][0]>0) {$scope.data12[i][2]=$scope.tomaktvalNTB[i*15+11];}
                                else $scope.data12[i][2]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.tomaktvalNTB[i*15+12]>0&&$scope.data13[i][1]>0&&$scope.data13[i][0]>0) {$scope.data13[i][2]=$scope.tomaktvalNTB[i*15+12];}
                                else $scope.data13[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+13]>0&&$scope.data14[i][1]>0&&$scope.data14[i][0]>0) {$scope.data14[i][2]=$scope.tomaktvalNTB[i*15+13];}
                                else $scope.data14[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+14]>0&&$scope.data15[i][1]>0&&$scope.data15[i][0]>0) {$scope.data15[i][2]=$scope.tomaktvalNTB[i*15+14];}
                                else $scope.data15[i][2]=0;
                            }
                            break;
                        case '营业收入':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.businsincNTB[i*15]>0&&$scope.data1[i][1]>0&&$scope.data1[i][0]>0) {$scope.data1[i][2]=$scope.businsincNTB[i*15];}
                                else $scope.data1[i][2]=0;

                                if($scope.businsincNTB[i*15+1]>0&&$scope.data2[i][1]>0&&$scope.data2[i][0]>0) {$scope.data2[i][2]=$scope.businsincNTB[i*15+1];}
                                else $scope.data2[i][2]=0;

                                if($scope.businsincNTB[i*15+2]>0&&$scope.data3[i][1]>0&&$scope.data3[i][0]>0) {$scope.data3[i][2]=$scope.businsincNTB[i*15+2];}
                                else $scope.data3[i][2]=0;

                                if($scope.businsincNTB[i*15+3]>0&&$scope.data4[i][1]>0&&$scope.data4[i][0]>0) {$scope.data4[i][2]=$scope.businsincNTB[i*15+3];}
                                else $scope.data4[i][2]=0;

                                if($scope.businsincNTB[i*15+4]>0&&$scope.data5[i][1]>0&&$scope.data5[i][0]>0) {$scope.data5[i][2]=$scope.businsincNTB[i*15+4];}
                                else $scope.data5[i][2]=0;

                                if($scope.businsincNTB[i*15+5]>0&&$scope.data6[i][1]>0&&$scope.data6[i][0]>0) {$scope.data6[i][2]=$scope.businsincNTB[i*15+5];}
                                else $scope.data6[i][2]=0;

                                if($scope.businsincNTB[i*15+6]>0&&$scope.data7[i][1]>0&&$scope.data7[i][0]>0) {$scope.data7[i][2]=$scope.businsincNTB[i*15+6];}
                                else $scope.data7[i][2]=0;

                                if($scope.businsincNTB[i*15+7]>0&&$scope.data8[i][1]>0&&$scope.data8[i][0]>0) {$scope.data8[i][2]=$scope.businsincNTB[i*15+7];}
                                else $scope.data8[i][2]=0;

                                if($scope.businsincNTB[i*15+8]>0&&$scope.data9[i][1]>0&&$scope.data9[i][0]>0) {$scope.data9[i][2]=$scope.businsincNTB[i*15+8];}
                                else $scope.data9[i][2]=0;

                                if($scope.businsincNTB[i*15+9]>0&&$scope.data10[i][1]>0&&$scope.data10[i][0]>0) {$scope.data10[i][2]=$scope.businsincNTB[i*15+9];}
                                else $scope.data10[i][2]=0;

                                if($scope.businsincNTB[i*15+10]>0&&$scope.data11[i][1]>0&&$scope.data11[i][0]>0) {$scope.data11[i][2]=$scope.businsincNTB[i*15+10];}
                                else $scope.data11[i][2]=0;

                                if($scope.businsincNTB[i*15+11]>0&&$scope.data12[i][1]>0&&$scope.data12[i][0]>0) {$scope.data12[i][2]=$scope.businsincNTB[i*15+11];}
                                else $scope.data12[i][2]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.businsincNTB[i*15+12]>0&&$scope.data13[i][1]>0&&$scope.data13[i][0]>0) {$scope.data13[i][2]=$scope.businsincNTB[i*15+12];}
                                else $scope.data13[i][2]=0;

                                if($scope.businsincNTB[i*15+13]>0&&$scope.data14[i][1]>0&&$scope.data14[i][0]>0) {$scope.data14[i][2]=$scope.businsincNTB[i*15+13];}
                                else $scope.data14[i][2]=0;

                                if($scope.businsincNTB[i*15+14]>0&&$scope.data15[i][1]>0&&$scope.data15[i][0]>0) {$scope.data15[i][2]=$scope.businsincNTB[i*15+14];}
                                else $scope.data15[i][2]=0;
                            }
                            break;
                        case '资产总计':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.toassetsNTB[i*15]>0&&$scope.data1[i][1]>0&&$scope.data1[i][0]>0) {$scope.data1[i][2]=$scope.toassetsNTB[i*15];}
                                else $scope.data1[i][2]=0;

                                if($scope.toassetsNTB[i*15+1]>0&&$scope.data2[i][1]>0&&$scope.data2[i][0]>0) {$scope.data2[i][2]=$scope.toassetsNTB[i*15+1];}
                                else $scope.data2[i][2]=0;

                                if($scope.toassetsNTB[i*15+2]>0&&$scope.data3[i][1]>0&&$scope.data3[i][0]>0) {$scope.data3[i][2]=$scope.toassetsNTB[i*15+2];}
                                else $scope.data3[i][2]=0;

                                if($scope.toassetsNTB[i*15+3]>0&&$scope.data4[i][1]>0&&$scope.data4[i][0]>0) {$scope.data4[i][2]=$scope.toassetsNTB[i*15+3];}
                                else $scope.data4[i][2]=0;

                                if($scope.toassetsNTB[i*15+4]>0&&$scope.data5[i][1]>0&&$scope.data5[i][0]>0) {$scope.data5[i][2]=$scope.toassetsNTB[i*15+4];}
                                else $scope.data5[i][2]=0;

                                if($scope.toassetsNTB[i*15+5]>0&&$scope.data6[i][1]>0&&$scope.data6[i][0]>0) {$scope.data6[i][2]=$scope.toassetsNTB[i*15+5];}
                                else $scope.data6[i][2]=0;

                                if($scope.toassetsNTB[i*15+6]>0&&$scope.data7[i][1]>0&&$scope.data7[i][0]>0) {$scope.data7[i][2]=$scope.toassetsNTB[i*15+6];}
                                else $scope.data7[i][2]=0;

                                if($scope.toassetsNTB[i*15+7]>0&&$scope.data8[i][1]>0&&$scope.data8[i][0]>0) {$scope.data8[i][2]=$scope.toassetsNTB[i*15+7];}
                                else $scope.data8[i][2]=0;

                                if($scope.toassetsNTB[i*15+8]>0&&$scope.data9[i][1]>0&&$scope.data9[i][0]>0) {$scope.data9[i][2]=$scope.toassetsNTB[i*15+8];}
                                else $scope.data9[i][2]=0;

                                if($scope.toassetsNTB[i*15+9]>0&&$scope.data10[i][1]>0&&$scope.data10[i][0]>0) {$scope.data10[i][2]=$scope.toassetsNTB[i*15+9];}
                                else $scope.data10[i][2]=0;

                                if($scope.toassetsNTB[i*15+10]>0&&$scope.data11[i][1]>0&&$scope.data11[i][0]>0) {$scope.data11[i][2]=$scope.toassetsNTB[i*15+10];}
                                else $scope.data11[i][2]=0;

                                if($scope.toassetsNTB[i*15+11]>0&&$scope.data12[i][1]>0&&$scope.data12[i][0]>0) {$scope.data12[i][2]=$scope.toassetsNTB[i*15+11];}
                                else $scope.data12[i][2]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.toassetsNTB[i*15+12]>0&&$scope.data13[i][1]>0&&$scope.data13[i][0]>0) {$scope.data13[i][2]=$scope.toassetsNTB[i*15+12];}
                                else $scope.data13[i][2]=0;

                                if($scope.toassetsNTB[i*15+13]>0&&$scope.data14[i][1]>0&&$scope.data14[i][0]>0) {$scope.data14[i][2]=$scope.toassetsNTB[i*15+13];}
                                else $scope.data14[i][2]=0;

                                if($scope.toassetsNTB[i*15+14]>0&&$scope.data15[i][1]>0&&$scope.data15[i][0]>0) {$scope.data15[i][2]=$scope.toassetsNTB[i*15+14];}
                                else $scope.data15[i][2]=0;
                            }
                            break;

                    }

                    $scope.drawNTBChart($scope.data1,$scope.data2,$scope.data3,$scope.data4,$scope.data5,$scope.data6,$scope.data7,$scope.data8,$scope.data9,$scope.data10,$scope.data11,$scope.data12,$scope.data13,$scope.data14,$scope.data15)
                    break;
            }

        };
        $scope.changeX=function () {
            $scope.str="";
            $scope.str+=' <tr>\n' +
                '            <th>序号</th>\n' +
                '            <th>行业名称</th>\n' +
                '            <th>图例</th>\n' +
                '            <th>'+$scope.Y+'</th>'+
                '            <th>'+$scope.X+'</th>'+
                '            <th>'+$scope.area+'</th>'+
                '        </tr>';
            switch ($scope.market){
                case '全部':
                    for(var i=0;i<$scope.indstnamAll.length;i++){
                        $scope.str+=' <tr>\n' +
                            '            <td>'+(i+1)+'</td>\n' +
                            '            <td>'+$scope.indstnamAll[i]+'</td>\n' ;
                        if($scope.indstnamAll[i]!="能源设备"&&$scope.indstnamAll[i]!="(子)汽车综合"&&$scope.indstnamAll[i]!="烟草"&&$scope.indstnamAll[i]!="REITS"){
                            $scope.str+='            <td><div class="circle" style="background-color:'+$scope.colors[i%15]+'"></div></td>';}
                        else{
                            $scope.str+='            <td></td>';}

                        switch ($scope.Y){
                            case 'PE-TTM':
                                $scope.str+='            <td>'+$scope.pettmAll[i]+'</td>'
                                break;
                            case 'PE-本年预测':
                                $scope.str+='            <td>'+$scope.peyearfcastAll[i]+'</td>';
                                break;
                            case 'PB-LF':
                                $scope.str+='            <td>'+$scope.pblfAll[i]+'</td>';
                                break;
                            case 'PS-TTM':
                                $scope.str+='            <td>'+$scope.psttmAll[i]+'</td>';
                                break;
                        }
                        switch ($scope.X){
                            case 'ROE-TTM':
                                $scope.str+='            <td>'+$scope.roettmAll[i]+'</td>'
                                break;
                            case 'ROA-TTM':
                                $scope.str+='            <td>'+$scope.roattmAll[i]+'</td>';
                                break;
                            case '净利同比':
                                $scope.str+='            <td>'+$scope.netproAll[i]+'</td>';
                                break;
                            case '营收同比':
                                $scope.str+='            <td>'+$scope.revenproAll[i]+'</td>';
                                break;
                        }
                        switch ($scope.area){
                            case '总市值':
                                $scope.str+='            <td>'+$scope.tomaktvalAll[i]+'</td>'
                                break;
                            case '营业收入':
                                $scope.str+='            <td>'+$scope.businsincAll[i]+'</td>';
                                break;
                            case '资产总计':
                                $scope.str+='            <td>'+$scope.toassetsAll[i]+'</td>';
                                break;

                        }
                        $scope.str+='        </tr>';

                    }
                    document.getElementById('table').innerHTML=$scope.str;

                    switch ($scope.X){
                        case 'ROE-TTM':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.roettmAll[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.roettmAll[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.roettmAll[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.roettmAll[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.roettmAll[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.roettmAll[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.roettmAll[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.roettmAll[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.roettmAll[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.roettmAll[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.roettmAll[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.roettmAll[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.roettmAll[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.roettmAll[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.roettmAll[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.roettmAll[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.roettmAll[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.roettmAll[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.roettmAll[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.roettmAll[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.roettmAll[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.roettmAll[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.roettmAll[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.roettmAll[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.roettmAll[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.roettmAll[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.roettmAll[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.roettmAll[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.roettmAll[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.roettmAll[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }
                            break;
                        case 'ROA-TTM':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.roattmAll[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.roattmAll[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.roattmAll[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.roattmAll[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.roattmAll[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.roattmAll[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.roattmAll[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.roattmAll[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.roattmAll[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.roattmAll[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.roattmAll[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.roattmAll[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.roattmAll[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.roattmAll[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.roattmAll[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.roattmAll[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.roattmAll[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.roattmAll[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.roattmAll[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.roattmAll[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.roattmAll[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.roattmAll[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.roattmAll[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.roattmAll[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.roattmAll[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.roattmAll[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.roattmAll[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.roattmAll[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.roattmAll[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.roattmAll[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;
                        case '净利同比':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.netproAll[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.netproAll[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.netproAll[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.netproAll[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.netproAll[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.netproAll[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.netproAll[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.netproAll[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.netproAll[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.netproAll[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.netproAll[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.netproAll[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.netproAll[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.netproAll[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.netproAll[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.netproAll[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.netproAll[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.netproAll[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.netproAll[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.netproAll[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.netproAll[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.netproAll[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.netproAll[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.netproAll[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.netproAll[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.netproAll[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.netproAll[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.netproAll[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.netproAll[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.netproAll[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;
                        case '营收同比':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.revenproAll[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.revenproAll[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.revenproAll[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.revenproAll[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.revenproAll[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.revenproAll[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.revenproAll[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.revenproAll[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.revenproAll[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.revenproAll[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.revenproAll[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.revenproAll[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.revenproAll[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.revenproAll[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.revenproAll[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.revenproAll[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.revenproAll[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.revenproAll[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.revenproAll[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.revenproAll[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.revenproAll[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.revenproAll[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.revenproAll[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.revenproAll[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.revenproAll[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.revenproAll[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.revenproAll[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.revenproAll[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.revenproAll[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.revenproAll[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;

                    }
                    $scope.drawChart($scope.data1,$scope.data2,$scope.data3,$scope.data4,$scope.data5,$scope.data6,$scope.data7,$scope.data8,$scope.data9,$scope.data10,$scope.data11,$scope.data12,$scope.data13,$scope.data14,$scope.data15)

                    break;

                case '沪深A股':
                    for(var i=0;i<$scope.indstnamSS.length;i++){
                        $scope.str+=' <tr>\n' +
                            '            <td>'+(i+1)+'</td>\n' +
                            '            <td>'+$scope.indstnamSS[i]+'</td>\n' ;
                        if($scope.indstnamSS[i]!="能源设备"&&$scope.indstnamSS[i]!="(子)汽车综合"&&$scope.indstnamSS[i]!="烟草"&&$scope.indstnamSS[i]!="REITS"){
                            $scope.str+='            <td><div class="circle" style="background-color:'+$scope.colors[i%15]+'"></div></td>';}
                        else{
                            $scope.str+='            <td></td>';}

                        switch ($scope.Y){
                            case 'PE-TTM':
                                $scope.str+='            <td>'+$scope.pettmSS[i]+'</td>'
                                break;
                            case 'PE-本年预测':
                                $scope.str+='            <td>'+$scope.peyearfcastSS[i]+'</td>';
                                break;
                            case 'PB-LF':
                                $scope.str+='            <td>'+$scope.pblfSS[i]+'</td>';
                                break;
                            case 'PS-TTM':
                                $scope.str+='            <td>'+$scope.psttmSS[i]+'</td>';
                                break;
                        }
                        switch ($scope.X){
                            case 'ROE-TTM':
                                $scope.str+='            <td>'+$scope.roettmSS[i]+'</td>'
                                break;
                            case 'ROA-TTM':
                                $scope.str+='            <td>'+$scope.roattmSS[i]+'</td>';
                                break;
                            case '净利同比':
                                $scope.str+='            <td>'+$scope.netproSS[i]+'</td>';
                                break;
                            case '营收同比':
                                $scope.str+='            <td>'+$scope.revenproSS[i]+'</td>';
                                break;
                        }
                        switch ($scope.area){
                            case '总市值':
                                $scope.str+='            <td>'+$scope.tomaktvalSS[i]+'</td>'
                                break;
                            case '营业收入':
                                $scope.str+='            <td>'+$scope.businsincSS[i]+'</td>';
                                break;
                            case '资产总计':
                                $scope.str+='            <td>'+$scope.toassetsSS[i]+'</td>';
                                break;

                        }
                        $scope.str+='        </tr>';

                    }
                    document.getElementById('table').innerHTML=$scope.str;
                    switch ($scope.X){
                        case 'ROE-TTM':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.roettmSS[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.roettmSS[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.roettmSS[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.roettmSS[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.roettmSS[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.roettmSS[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.roettmSS[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.roettmSS[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.roettmSS[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.roettmSS[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.roettmSS[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.roettmSS[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.roettmSS[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.roettmSS[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.roettmSS[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.roettmSS[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.roettmSS[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.roettmSS[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.roettmSS[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.roettmSS[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.roettmSS[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.roettmSS[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.roettmSS[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.roettmSS[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.roettmSS[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.roettmSS[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.roettmSS[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.roettmSS[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.roettmSS[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.roettmSS[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }
                            break;
                        case 'ROA-TTM':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.roattmSS[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.roattmSS[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.roattmSS[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.roattmSS[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.roattmSS[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.roattmSS[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.roattmSS[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.roattmSS[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.roattmSS[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.roattmSS[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.roattmSS[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.roattmSS[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.roattmSS[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.roattmSS[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.roattmSS[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.roattmSS[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.roattmSS[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.roattmSS[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.roattmSS[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.roattmSS[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.roattmSS[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.roattmSS[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.roattmSS[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.roattmSS[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.roattmSS[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.roattmSS[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.roattmSS[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.roattmSS[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.roattmSS[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.roattmSS[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;
                        case '净利同比':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.netproSS[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.netproSS[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.netproSS[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.netproSS[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.netproSS[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.netproSS[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.netproSS[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.netproSS[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.netproSS[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.netproSS[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.netproSS[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.netproSS[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.netproSS[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.netproSS[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.netproSS[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.netproSS[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.netproSS[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.netproSS[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.netproSS[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.netproSS[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.netproSS[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.netproSS[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.netproSS[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.netproSS[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.netproSS[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.netproSS[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.netproSS[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.netproSS[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.netproSS[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.netproSS[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;
                        case '营收同比':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.revenproSS[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.revenproSS[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.revenproSS[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.revenproSS[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.revenproSS[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.revenproSS[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.revenproSS[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.revenproSS[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.revenproSS[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.revenproSS[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.revenproSS[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.revenproSS[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.revenproSS[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.revenproSS[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.revenproSS[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.revenproSS[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.revenproSS[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.revenproSS[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.revenproSS[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.revenproSS[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.revenproSS[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.revenproSS[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.revenproSS[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.revenproSS[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.revenproSS[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.revenproSS[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.revenproSS[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.revenproSS[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.revenproSS[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.revenproSS[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;
                    }
                    $scope.drawChart($scope.data1,$scope.data2,$scope.data3,$scope.data4,$scope.data5,$scope.data6,$scope.data7,$scope.data8,$scope.data9,$scope.data10,$scope.data11,$scope.data12,$scope.data13,$scope.data14,$scope.data15)

                    break;

                case '新三板做市':
                    for(var i=0;i<$scope.indstnamNTB.length;i++){
                        $scope.str+=' <tr>\n' +
                            '            <td>'+(i+1)+'</td>\n' +
                            '            <td>'+$scope.indstnamNTB[i]+'</td>\n' ;
                        if($scope.indstnamNTB[i]!="能源设备"&&$scope.indstnamNTB[i]!="(子)汽车综合"&&$scope.indstnamNTB[i]!="烟草"&&$scope.indstnamNTB[i]!="REITS"){
                            $scope.str+='            <td><div class="circle" style="background-color:'+$scope.colors[i%15]+'"></div></td>';}
                        else{
                            $scope.str+='            <td></td>';}

                        switch ($scope.Y){
                            case 'PE-TTM':
                                $scope.str+='            <td>'+$scope.pettmNTB[i]+'</td>'
                                break;
                            case 'PE-本年预测':
                                $scope.str+='            <td>'+$scope.peyearfcastNTB[i]+'</td>';
                                break;
                            case 'PB-LF':
                                $scope.str+='            <td>'+$scope.pblfNTB[i]+'</td>';
                                break;
                            case 'PS-TTM':
                                $scope.str+='            <td>'+$scope.psttmNTB[i]+'</td>';
                                break;
                        }
                        switch ($scope.X){
                            case 'ROE-TTM':
                                $scope.str+='            <td>'+$scope.roettmNTB[i]+'</td>'
                                break;
                            case 'ROA-TTM':
                                $scope.str+='            <td>'+$scope.roattmNTB[i]+'</td>';
                                break;
                            case '净利同比':
                                $scope.str+='            <td>'+$scope.netproNTB[i]+'</td>';
                                break;
                            case '营收同比':
                                $scope.str+='            <td>'+$scope.revenproNTB[i]+'</td>';
                                break;
                        }
                        switch ($scope.area){
                            case '总市值':
                                $scope.str+='            <td>'+$scope.tomaktvalNTB[i]+'</td>'
                                break;
                            case '营业收入':
                                $scope.str+='            <td>'+$scope.businsincNTB[i]+'</td>';
                                break;
                            case '资产总计':
                                $scope.str+='            <td>'+$scope.toassetsNTB[i]+'</td>';
                                break;

                        }
                        $scope.str+='        </tr>';

                    }
                    document.getElementById('table').innerHTML=$scope.str;
                    switch ($scope.X){
                        case 'ROE-TTM':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.roettmNTB[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.roettmNTB[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.roettmNTB[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.roettmNTB[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.roettmNTB[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.roettmNTB[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.roettmNTB[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.roettmNTB[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.roettmNTB[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.roettmNTB[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.roettmNTB[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.roettmNTB[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.roettmNTB[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.roettmNTB[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.roettmNTB[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.roettmNTB[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.roettmNTB[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.roettmNTB[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.roettmNTB[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.roettmNTB[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.roettmNTB[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.roettmNTB[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.roettmNTB[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.roettmNTB[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.roettmNTB[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.roettmNTB[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.roettmNTB[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.roettmNTB[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.roettmNTB[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.roettmNTB[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }
                            break;
                        case 'ROA-TTM':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.roattmNTB[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.roattmNTB[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.roattmNTB[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.roattmNTB[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.roattmNTB[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.roattmNTB[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.roattmNTB[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.roattmNTB[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.roattmNTB[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.roattmNTB[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.roattmNTB[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.roattmNTB[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.roattmNTB[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.roattmNTB[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.roattmNTB[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.roattmNTB[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.roattmNTB[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.roattmNTB[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.roattmNTB[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.roattmNTB[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.roattmNTB[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.roattmNTB[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.roattmNTB[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.roattmNTB[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.roattmNTB[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.roattmNTB[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.roattmNTB[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.roattmNTB[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.roattmNTB[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.roattmNTB[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;
                        case '净利同比':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.netproNTB[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.netproNTB[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.netproNTB[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.netproNTB[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.netproNTB[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.netproNTB[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.netproNTB[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.netproNTB[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.netproNTB[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.netproNTB[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.netproNTB[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.netproNTB[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.netproNTB[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.netproNTB[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.netproNTB[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.netproNTB[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.netproNTB[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.netproNTB[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.netproNTB[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.netproNTB[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.netproNTB[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.netproNTB[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.netproNTB[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.netproNTB[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.netproNTB[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.netproNTB[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.netproNTB[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.netproNTB[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.netproNTB[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.netproNTB[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;
                        case '营收同比':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.revenproNTB[i*15]>0&&$scope.data1[i][1]>0) {$scope.data1[i][0]=$scope.revenproNTB[i*15];}
                                else $scope.data1[i][0]=0;

                                if($scope.revenproNTB[i*15+1]>0&&$scope.data2[i][1]>0) {$scope.data2[i][0]=$scope.revenproNTB[i*15+1];}
                                else $scope.data2[i][0]=0;

                                if($scope.revenproNTB[i*15+2]>0&&$scope.data3[i][1]>0) {$scope.data3[i][0]=$scope.revenproNTB[i*15+2];}
                                else $scope.data3[i][0]=0;

                                if($scope.revenproNTB[i*15+3]>0&&$scope.data4[i][1]>0) {$scope.data4[i][0]=$scope.revenproNTB[i*15+3];}
                                else $scope.data4[i][0]=0;

                                if($scope.revenproNTB[i*15+4]>0&&$scope.data5[i][1]>0) {$scope.data5[i][0]=$scope.revenproNTB[i*15+4];}
                                else $scope.data5[i][0]=0;

                                if($scope.revenproNTB[i*15+5]>0&&$scope.data6[i][1]>0) {$scope.data6[i][0]=$scope.revenproNTB[i*15+5];}
                                else $scope.data6[i][0]=0;

                                if($scope.revenproNTB[i*15+6]>0&&$scope.data7[i][1]>0) {$scope.data7[i][0]=$scope.revenproNTB[i*15+6];}
                                else $scope.data7[i][0]=0;

                                if($scope.revenproNTB[i*15+7]>0&&$scope.data8[i][1]>0) {$scope.data8[i][0]=$scope.revenproNTB[i*15+7];}
                                else $scope.data8[i][0]=0;

                                if($scope.revenproNTB[i*15+8]>0&&$scope.data9[i][1]>0) {$scope.data9[i][0]=$scope.revenproNTB[i*15+8];}
                                else $scope.data9[i][0]=0;

                                if($scope.revenproNTB[i*15+9]>0&&$scope.data10[i][1]>0) {$scope.data10[i][0]=$scope.revenproNTB[i*15+9];}
                                else $scope.data10[i][0]=0;

                                if($scope.revenproNTB[i*15+10]>0&&$scope.data11[i][1]>0) {$scope.data11[i][0]=$scope.revenproNTB[i*15+10];}
                                else $scope.data11[i][0]=0;

                                if($scope.revenproNTB[i*15+11]>0&&$scope.data12[i][1]>0) {$scope.data12[i][0]=$scope.revenproNTB[i*15+11];}
                                else $scope.data12[i][0]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.revenproNTB[i*15+12]>0&&$scope.data13[i][1]>0) {$scope.data13[i][0]=$scope.revenproNTB[i*15+12];}
                                else $scope.data13[i][0]=0;

                                if($scope.revenproNTB[i*15+13]>0&&$scope.data14[i][1]>0) {$scope.data14[i][0]=$scope.revenproNTB[i*15+13];}
                                else $scope.data14[i][0]=0;

                                if($scope.revenproNTB[i*15+14]>0&&$scope.data15[i][1]>0) {$scope.data15[i][0]=$scope.revenproNTB[i*15+14];}
                                else $scope.data15[i][0]=0;
                            }

                            break;
                    }
                    $scope.drawNTBChart($scope.data1,$scope.data2,$scope.data3,$scope.data4,$scope.data5,$scope.data6,$scope.data7,$scope.data8,$scope.data9,$scope.data10,$scope.data11,$scope.data12,$scope.data13,$scope.data14,$scope.data15)

                    break;
            }
        };
        $scope.changeY=function () {
            $scope.str="";
            $scope.str+=' <tr>\n' +
                '            <th>序号</th>\n' +
                '            <th>行业名称</th>\n' +
                '            <th>图例</th>\n' +
                '            <th>'+$scope.Y+'</th>'+
                '            <th>'+$scope.X+'</th>'+
                '            <th>'+$scope.area+'</th>'+
                '        </tr>';
            switch ($scope.market){
                case '全部':
                    for(var i=0;i<$scope.indstnamAll.length;i++){
                        $scope.str+=' <tr>\n' +
                            '            <td>'+(i+1)+'</td>\n' +
                            '            <td>'+$scope.indstnamAll[i]+'</td>\n' ;
                        if($scope.indstnamAll[i]!="能源设备"&&$scope.indstnamAll[i]!="(子)汽车综合"&&$scope.indstnamAll[i]!="烟草"&&$scope.indstnamAll[i]!="REITS"){
                            $scope.str+='            <td><div class="circle" style="background-color:'+$scope.colors[i%15]+'"></div></td>';}
                        else{
                            $scope.str+='            <td></td>';}

                        switch ($scope.Y){
                            case 'PE-TTM':
                                $scope.str+='            <td>'+$scope.pettmAll[i]+'</td>'
                                break;
                            case 'PE-本年预测':
                                $scope.str+='            <td>'+$scope.peyearfcastAll[i]+'</td>';
                                break;
                            case 'PB-LF':
                                $scope.str+='            <td>'+$scope.pblfAll[i]+'</td>';
                                break;
                            case 'PS-TTM':
                                $scope.str+='            <td>'+$scope.psttmAll[i]+'</td>';
                                break;
                        }
                        switch ($scope.X){
                            case 'ROE-TTM':
                                $scope.str+='            <td>'+$scope.roettmAll[i]+'</td>'
                                break;
                            case 'ROA-TTM':
                                $scope.str+='            <td>'+$scope.roattmAll[i]+'</td>';
                                break;
                            case '净利同比':
                                $scope.str+='            <td>'+$scope.netproAll[i]+'</td>';
                                break;
                            case '营收同比':
                                $scope.str+='            <td>'+$scope.revenproAll[i]+'</td>';
                                break;
                        }
                        switch ($scope.area){
                            case '总市值':
                                $scope.str+='            <td>'+$scope.tomaktvalAll[i]+'</td>'
                                break;
                            case '营业收入':
                                $scope.str+='            <td>'+$scope.businsincAll[i]+'</td>';
                                break;
                            case '资产总计':
                                $scope.str+='            <td>'+$scope.toassetsAll[i]+'</td>';
                                break;

                        }
                        $scope.str+='        </tr>';

                    }
                    document.getElementById('table').innerHTML=$scope.str;

                    switch ($scope.Y){
                        case 'PE-TTM':

                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.pettmAll[i*15]>0&&$scope.data1[i][0]>0){$scope.data1[i][1]=$scope.pettmAll[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.pettmAll[i*15+1]>0&&$scope.data2[i][0]>0){$scope.data2[i][1]=$scope.pettmAll[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.pettmAll[i*15+2]>0&&$scope.data3[i][0]>0){$scope.data3[i][1]=$scope.pettmAll[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.pettmAll[i*15+3]>0&&$scope.data4[i][0]>0){$scope.data4[i][1]=$scope.pettmAll[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.pettmAll[i*15+4]>0&&$scope.data5[i][0]>0){$scope.data5[i][1]=$scope.pettmAll[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.pettmAll[i*15+5]>0&&$scope.data6[i][0]>0){$scope.data6[i][1]=$scope.pettmAll[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.pettmAll[i*15+6]>0&&$scope.data7[i][0]>0){$scope.data7[i][1]=$scope.pettmAll[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.pettmAll[i*15+7]>0&&$scope.data8[i][0]>0){$scope.data8[i][1]=$scope.pettmAll[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.pettmAll[i*15+8]>0&&$scope.data9[i][0]>0){$scope.data9[i][1]=$scope.pettmAll[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.pettmAll[i*15+9]>0&&$scope.data10[i][0]>0){$scope.data10[i][1]=$scope.pettmAll[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.pettmAll[i*15+10]>0&&$scope.data11[i][0]>0){$scope.data11[i][1]=$scope.pettmAll[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.pettmAll[i*15+11]>0&&$scope.data12[i][0]>0){$scope.data12[i][1]=$scope.pettmAll[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.pettmAll[i*15+12]>0&&$scope.data13[i][0]>0){$scope.data13[i][1]=$scope.pettmAll[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.pettmAll[i*15+13]>0&&$scope.data14[i][0]>0){$scope.data14[i][1]=$scope.pettmAll[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.pettmAll[i*15+14]>0&&$scope.data15[i][0]>0){$scope.data15[i][1]=$scope.pettmAll[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }
                            break;
                        case 'PE-本年预测':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.peyearfcastAll[i*15]>0&&$scope.data1[i][0]>0){$scope.data1[i][1]=$scope.peyearfcastAll[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.peyearfcastAll[i*15+1]>0&&$scope.data2[i][0]>0){$scope.data2[i][1]=$scope.peyearfcastAll[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.peyearfcastAll[i*15+2]>0&&$scope.data3[i][0]>0){$scope.data3[i][1]=$scope.peyearfcastAll[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.peyearfcastAll[i*15+3]>0&&$scope.data4[i][0]>0){$scope.data4[i][1]=$scope.peyearfcastAll[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.peyearfcastAll[i*15+4]>0&&$scope.data5[i][0]>0){$scope.data5[i][1]=$scope.peyearfcastAll[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.peyearfcastAll[i*15+5]>0&&$scope.data6[i][0]>0){$scope.data6[i][1]=$scope.peyearfcastAll[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.peyearfcastAll[i*15+6]>0&&$scope.data7[i][0]>0){$scope.data7[i][1]=$scope.peyearfcastAll[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.peyearfcastAll[i*15+7]>0&&$scope.data8[i][0]>0){$scope.data8[i][1]=$scope.peyearfcastAll[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.peyearfcastAll[i*15+8]>0&&$scope.data9[i][0]>0){$scope.data9[i][1]=$scope.peyearfcastAll[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.peyearfcastAll[i*15+9]>0&&$scope.data10[i][0]>0){$scope.data10[i][1]=$scope.peyearfcastAll[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.peyearfcastAll[i*15+10]>0&&$scope.data11[i][0]>0){$scope.data11[i][1]=$scope.peyearfcastAll[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.peyearfcastAll[i*15+11]>0&&$scope.data12[i][0]>0){$scope.data12[i][1]=$scope.peyearfcastAll[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.peyearfcastAll[i*15+12]>0&&$scope.data13[i][0]>0){$scope.data13[i][1]=$scope.peyearfcastAll[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.peyearfcastAll[i*15+13]>0&&$scope.data14[i][0]>0){$scope.data14[i][1]=$scope.peyearfcastAll[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.peyearfcastAll[i*15+14]>0&&$scope.data15[i][0]>0){$scope.data15[i][1]=$scope.peyearfcastAll[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }

                            break;
                        case 'PB-LF':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.pblfAll[i*15]>0&&$scope.data1[i][0]>0){$scope.data1[i][1]=$scope.pblfAll[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.pblfAll[i*15+1]>0&&$scope.data2[i][0]>0){$scope.data2[i][1]=$scope.pblfAll[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.pblfAll[i*15+2]>0&&$scope.data3[i][0]>0){$scope.data3[i][1]=$scope.pblfAll[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.pblfAll[i*15+3]>0&&$scope.data4[i][0]>0){$scope.data4[i][1]=$scope.pblfAll[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.pblfAll[i*15+4]>0&&$scope.data5[i][0]>0){$scope.data5[i][1]=$scope.pblfAll[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.pblfAll[i*15+5]>0&&$scope.data6[i][0]>0){$scope.data6[i][1]=$scope.pblfAll[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.pblfAll[i*15+6]>0&&$scope.data7[i][0]>0){$scope.data7[i][1]=$scope.pblfAll[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.pblfAll[i*15+7]>0&&$scope.data8[i][0]>0){$scope.data8[i][1]=$scope.pblfAll[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.pblfAll[i*15+8]>0&&$scope.data9[i][0]>0){$scope.data9[i][1]=$scope.pblfAll[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.pblfAll[i*15+9]>0&&$scope.data10[i][0]>0){$scope.data10[i][1]=$scope.pblfAll[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.pblfAll[i*15+10]>0&&$scope.data11[i][0]>0){$scope.data11[i][1]=$scope.pblfAll[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.pblfAll[i*15+11]>0&&$scope.data12[i][0]>0){$scope.data12[i][1]=$scope.pblfAll[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.pblfAll[i*15+12]>0&&$scope.data13[i][0]>0){$scope.data13[i][1]=$scope.pblfAll[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.pblfAll[i*15+13]>0&&$scope.data14[i][0]>0){$scope.data14[i][1]=$scope.pblfAll[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.pblfAll[i*15+14]>0&&$scope.data15[i][0]>0){$scope.data15[i][1]=$scope.pblfAll[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }

                            break;
                        case 'PS-TTM':

                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.psttmAll[i*15]>0&&$scope.data1[i][0]>0){$scope.data1[i][1]=$scope.psttmAll[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.psttmAll[i*15+1]>0&&$scope.data2[i][0]>0){$scope.data2[i][1]=$scope.psttmAll[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.psttmAll[i*15+2]>0&&$scope.data3[i][0]>0){$scope.data3[i][1]=$scope.psttmAll[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.psttmAll[i*15+3]>0&&$scope.data4[i][0]>0){$scope.data4[i][1]=$scope.psttmAll[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.psttmAll[i*15+4]>0&&$scope.data5[i][0]>0){$scope.data5[i][1]=$scope.psttmAll[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.psttmAll[i*15+5]>0&&$scope.data6[i][0]>0){$scope.data6[i][1]=$scope.psttmAll[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.psttmAll[i*15+6]>0&&$scope.data7[i][0]>0){$scope.data7[i][1]=$scope.psttmAll[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.psttmAll[i*15+7]>0&&$scope.data8[i][0]>0){$scope.data8[i][1]=$scope.psttmAll[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.psttmAll[i*15+8]>0&&$scope.data9[i][0]>0){$scope.data9[i][1]=$scope.psttmAll[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.psttmAll[i*15+9]>0&&$scope.data10[i][0]>0){$scope.data10[i][1]=$scope.psttmAll[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.psttmAll[i*15+10]>0&&$scope.data11[i][0]>0){$scope.data11[i][1]=$scope.psttmAll[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.psttmAll[i*15+11]>0&&$scope.data12[i][0]>0){$scope.data12[i][1]=$scope.psttmAll[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.psttmAll[i*15+12]>0&&$scope.data13[i][0]>0){$scope.data13[i][1]=$scope.psttmAll[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.psttmAll[i*15+13]>0&&$scope.data14[i][0]>0){$scope.data14[i][1]=$scope.psttmAll[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.psttmAll[i*15+14]>0&&$scope.data15[i][0]>0){$scope.data15[i][1]=$scope.psttmAll[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }
                            break;
                    }
                    $scope.drawChart($scope.data1,$scope.data2,$scope.data3,$scope.data4,$scope.data5,$scope.data6,$scope.data7,$scope.data8,$scope.data9,$scope.data10,$scope.data11,$scope.data12,$scope.data13,$scope.data14,$scope.data15)

                    break;

                case '沪深A股':
                    for(var i=0;i<$scope.indstnamSS.length;i++){
                        $scope.str+=' <tr>\n' +
                            '            <td>'+(i+1)+'</td>\n' +
                            '            <td>'+$scope.indstnamSS[i]+'</td>\n' ;
                        if($scope.indstnamSS[i]!="能源设备"&&$scope.indstnamSS[i]!="(子)汽车综合"&&$scope.indstnamSS[i]!="烟草"&&$scope.indstnamSS[i]!="REITS"){
                            $scope.str+='            <td><div class="circle" style="background-color:'+$scope.colors[i%15]+'"></div></td>';}
                        else{
                            $scope.str+='            <td></td>';}

                        switch ($scope.Y){
                            case 'PE-TTM':
                                $scope.str+='            <td>'+$scope.pettmSS[i]+'</td>'
                                break;
                            case 'PE-本年预测':
                                $scope.str+='            <td>'+$scope.peyearfcastSS[i]+'</td>';
                                break;
                            case 'PB-LF':
                                $scope.str+='            <td>'+$scope.pblfSS[i]+'</td>';
                                break;
                            case 'PS-TTM':
                                $scope.str+='            <td>'+$scope.psttmSS[i]+'</td>';
                                break;
                        }
                        switch ($scope.X){
                            case 'ROE-TTM':
                                $scope.str+='            <td>'+$scope.roettmSS[i]+'</td>'
                                break;
                            case 'ROA-TTM':
                                $scope.str+='            <td>'+$scope.roattmSS[i]+'</td>';
                                break;
                            case '净利同比':
                                $scope.str+='            <td>'+$scope.netproSS[i]+'</td>';
                                break;
                            case '营收同比':
                                $scope.str+='            <td>'+$scope.revenproSS[i]+'</td>';
                                break;
                        }
                        switch ($scope.area){
                            case '总市值':
                                $scope.str+='            <td>'+$scope.tomaktvalSS[i]+'</td>'
                                break;
                            case '营业收入':
                                $scope.str+='            <td>'+$scope.businsincSS[i]+'</td>';
                                break;
                            case '资产总计':
                                $scope.str+='            <td>'+$scope.toassetsSS[i]+'</td>';
                                break;

                        }
                        $scope.str+='        </tr>';

                    }
                    document.getElementById('table').innerHTML=$scope.str;

                    switch ($scope.Y){
                        case 'PE-TTM':

                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.pettmSS[i*15]>0&&$scope.data1[i][0]>0){$scope.data1[i][1]=$scope.pettmSS[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.pettmSS[i*15+1]>0&&$scope.data2[i][0]>0){$scope.data2[i][1]=$scope.pettmSS[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.pettmSS[i*15+2]>0&&$scope.data3[i][0]>0){$scope.data3[i][1]=$scope.pettmSS[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.pettmSS[i*15+3]>0&&$scope.data4[i][0]>0){$scope.data4[i][1]=$scope.pettmSS[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.pettmSS[i*15+4]>0&&$scope.data5[i][0]>0){$scope.data5[i][1]=$scope.pettmSS[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.pettmSS[i*15+5]>0&&$scope.data6[i][0]>0){$scope.data6[i][1]=$scope.pettmSS[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.pettmSS[i*15+6]>0&&$scope.data7[i][0]>0){$scope.data7[i][1]=$scope.pettmSS[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.pettmSS[i*15+7]>0&&$scope.data8[i][0]>0){$scope.data8[i][1]=$scope.pettmSS[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.pettmSS[i*15+8]>0&&$scope.data9[i][0]>0){$scope.data9[i][1]=$scope.pettmSS[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.pettmSS[i*15+9]>0&&$scope.data10[i][0]>0){$scope.data10[i][1]=$scope.pettmSS[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.pettmSS[i*15+10]>0&&$scope.data11[i][0]>0){$scope.data11[i][1]=$scope.pettmSS[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.pettmSS[i*15+11]>0&&$scope.data12[i][0]>0){$scope.data12[i][1]=$scope.pettmSS[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.pettmSS[i*15+12]>0&&$scope.data13[i][0]>0){$scope.data13[i][1]=$scope.pettmSS[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.pettmSS[i*15+13]>0&&$scope.data14[i][0]>0){$scope.data14[i][1]=$scope.pettmSS[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.pettmSS[i*15+14]>0&&$scope.data15[i][0]>0){$scope.data15[i][1]=$scope.pettmSS[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }
                            break;
                        case 'PE-本年预测':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.peyearfcastSS[i*15]>0&&$scope.data1[i][0]>0){$scope.data1[i][1]=$scope.peyearfcastSS[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.peyearfcastSS[i*15+1]>0&&$scope.data2[i][0]>0){$scope.data2[i][1]=$scope.peyearfcastSS[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.peyearfcastSS[i*15+2]>0&&$scope.data3[i][0]>0){$scope.data3[i][1]=$scope.peyearfcastSS[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.peyearfcastSS[i*15+3]>0&&$scope.data4[i][0]>0){$scope.data4[i][1]=$scope.peyearfcastSS[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.peyearfcastSS[i*15+4]>0&&$scope.data5[i][0]>0){$scope.data5[i][1]=$scope.peyearfcastSS[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.peyearfcastSS[i*15+5]>0&&$scope.data6[i][0]>0){$scope.data6[i][1]=$scope.peyearfcastSS[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.peyearfcastSS[i*15+6]>0&&$scope.data7[i][0]>0){$scope.data7[i][1]=$scope.peyearfcastSS[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.peyearfcastSS[i*15+7]>0&&$scope.data8[i][0]>0){$scope.data8[i][1]=$scope.peyearfcastSS[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.peyearfcastSS[i*15+8]>0&&$scope.data9[i][0]>0){$scope.data9[i][1]=$scope.peyearfcastSS[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.peyearfcastSS[i*15+9]>0&&$scope.data10[i][0]>0){$scope.data10[i][1]=$scope.peyearfcastSS[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.peyearfcastSS[i*15+10]>0&&$scope.data11[i][0]>0){$scope.data11[i][1]=$scope.peyearfcastSS[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.peyearfcastSS[i*15+11]>0&&$scope.data12[i][0]>0){$scope.data12[i][1]=$scope.peyearfcastSS[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.peyearfcastSS[i*15+12]>0&&$scope.data13[i][0]>0){$scope.data13[i][1]=$scope.peyearfcastSS[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.peyearfcastSS[i*15+13]>0&&$scope.data14[i][0]>0){$scope.data14[i][1]=$scope.peyearfcastSS[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.peyearfcastSS[i*15+14]>0&&$scope.data15[i][0]>0){$scope.data15[i][1]=$scope.peyearfcastSS[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }

                            break;
                        case 'PB-LF':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.pblfSS[i*15]>0&&$scope.data1[i][0]>0){$scope.data1[i][1]=$scope.pblfSS[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.pblfSS[i*15+1]>0&&$scope.data2[i][0]>0){$scope.data2[i][1]=$scope.pblfSS[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.pblfSS[i*15+2]>0&&$scope.data3[i][0]>0){$scope.data3[i][1]=$scope.pblfSS[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.pblfSS[i*15+3]>0&&$scope.data4[i][0]>0){$scope.data4[i][1]=$scope.pblfSS[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.pblfSS[i*15+4]>0&&$scope.data5[i][0]>0){$scope.data5[i][1]=$scope.pblfSS[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.pblfSS[i*15+5]>0&&$scope.data6[i][0]>0){$scope.data6[i][1]=$scope.pblfSS[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.pblfSS[i*15+6]>0&&$scope.data7[i][0]>0){$scope.data7[i][1]=$scope.pblfSS[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.pblfSS[i*15+7]>0&&$scope.data8[i][0]>0){$scope.data8[i][1]=$scope.pblfSS[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.pblfSS[i*15+8]>0&&$scope.data9[i][0]>0){$scope.data9[i][1]=$scope.pblfSS[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.pblfSS[i*15+9]>0&&$scope.data10[i][0]>0){$scope.data10[i][1]=$scope.pblfSS[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.pblfSS[i*15+10]>0&&$scope.data11[i][0]>0){$scope.data11[i][1]=$scope.pblfSS[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.pblfSS[i*15+11]>0&&$scope.data12[i][0]>0){$scope.data12[i][1]=$scope.pblfSS[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.pblfSS[i*15+12]>0&&$scope.data13[i][0]>0){$scope.data13[i][1]=$scope.pblfSS[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.pblfSS[i*15+13]>0&&$scope.data14[i][0]>0){$scope.data14[i][1]=$scope.pblfSS[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.pblfSS[i*15+14]>0&&$scope.data15[i][0]>0){$scope.data15[i][1]=$scope.pblfSS[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }

                            break;
                        case 'PS-TTM':

                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.psttmSS[i*15]>0&&$scope.data1[i][0]>0){$scope.data1[i][1]=$scope.psttmSS[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.psttmSS[i*15+1]>0&&$scope.data2[i][0]>0){$scope.data2[i][1]=$scope.psttmSS[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.psttmSS[i*15+2]>0&&$scope.data3[i][0]>0){$scope.data3[i][1]=$scope.psttmSS[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.psttmSS[i*15+3]>0&&$scope.data4[i][0]>0){$scope.data4[i][1]=$scope.psttmSS[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.psttmSS[i*15+4]>0&&$scope.data5[i][0]>0){$scope.data5[i][1]=$scope.psttmSS[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.psttmSS[i*15+5]>0&&$scope.data6[i][0]>0){$scope.data6[i][1]=$scope.psttmSS[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.psttmSS[i*15+6]>0&&$scope.data7[i][0]>0){$scope.data7[i][1]=$scope.psttmSS[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.psttmSS[i*15+7]>0&&$scope.data8[i][0]>0){$scope.data8[i][1]=$scope.psttmSS[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.psttmSS[i*15+8]>0&&$scope.data9[i][0]>0){$scope.data9[i][1]=$scope.psttmSS[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.psttmSS[i*15+9]>0&&$scope.data10[i][0]>0){$scope.data10[i][1]=$scope.psttmSS[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.psttmSS[i*15+10]>0&&$scope.data11[i][0]>0){$scope.data11[i][1]=$scope.psttmSS[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.psttmSS[i*15+11]>0&&$scope.data12[i][0]>0){$scope.data12[i][1]=$scope.psttmSS[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.psttmSS[i*15+12]>0&&$scope.data13[i][0]>0){$scope.data13[i][1]=$scope.psttmSS[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.psttmSS[i*15+13]>0&&$scope.data14[i][0]>0){$scope.data14[i][1]=$scope.psttmSS[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.psttmSS[i*15+14]>0&&$scope.data15[i][0]>0){$scope.data15[i][1]=$scope.psttmSS[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }
                            break;
                    }
                    $scope.drawChart($scope.data1,$scope.data2,$scope.data3,$scope.data4,$scope.data5,$scope.data6,$scope.data7,$scope.data8,$scope.data9,$scope.data10,$scope.data11,$scope.data12,$scope.data13,$scope.data14,$scope.data15)

                    break;

                case '新三板做市':
                    for(var i=0;i<$scope.indstnamNTB.length;i++){
                        $scope.str+=' <tr>\n' +
                            '            <td>'+(i+1)+'</td>\n' +
                            '            <td>'+$scope.indstnamNTB[i]+'</td>\n' ;
                        if($scope.indstnamNTB[i]!="能源设备"&&$scope.indstnamNTB[i]!="(子)汽车综合"&&$scope.indstnamNTB[i]!="烟草"&&$scope.indstnamNTB[i]!="REITS"){
                            $scope.str+='            <td><div class="circle" style="background-color:'+$scope.colors[i%15]+'"></div></td>';}
                        else{
                            $scope.str+='            <td></td>';}

                        switch ($scope.Y){
                            case 'PE-TTM':
                                $scope.str+='            <td>'+$scope.pettmNTB[i]+'</td>'
                                break;
                            case 'PE-本年预测':
                                $scope.str+='            <td>'+$scope.peyearfcastNTB[i]+'</td>';
                                break;
                            case 'PB-LF':
                                $scope.str+='            <td>'+$scope.pblfNTB[i]+'</td>';
                                break;
                            case 'PS-TTM':
                                $scope.str+='            <td>'+$scope.psttmNTB[i]+'</td>';
                                break;
                        }
                        switch ($scope.X){
                            case 'ROE-TTM':
                                $scope.str+='            <td>'+$scope.roettmNTB[i]+'</td>'
                                break;
                            case 'ROA-TTM':
                                $scope.str+='            <td>'+$scope.roattmNTB[i]+'</td>';
                                break;
                            case '净利同比':
                                $scope.str+='            <td>'+$scope.netproNTB[i]+'</td>';
                                break;
                            case '营收同比':
                                $scope.str+='            <td>'+$scope.revenproNTB[i]+'</td>';
                                break;
                        }
                        switch ($scope.area){
                            case '总市值':
                                $scope.str+='            <td>'+$scope.tomaktvalNTB[i]+'</td>'
                                break;
                            case '营业收入':
                                $scope.str+='            <td>'+$scope.businsincNTB[i]+'</td>';
                                break;
                            case '资产总计':
                                $scope.str+='            <td>'+$scope.toassetsNTB[i]+'</td>';
                                break;

                        }
                        $scope.str+='        </tr>';

                    }
                    document.getElementById('table').innerHTML=$scope.str;
                    switch ($scope.Y){
                        case 'PE-TTM':

                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.pettmNTB[i*15]>0&&$scope.data1[i][0]>0){$scope.data1[i][1]=$scope.pettmNTB[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.pettmNTB[i*15+1]>0&&$scope.data2[i][0]>0){$scope.data2[i][1]=$scope.pettmNTB[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.pettmNTB[i*15+2]>0&&$scope.data3[i][0]>0){$scope.data3[i][1]=$scope.pettmNTB[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.pettmNTB[i*15+3]>0&&$scope.data4[i][0]>0){$scope.data4[i][1]=$scope.pettmNTB[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.pettmNTB[i*15+4]>0&&$scope.data5[i][0]>0){$scope.data5[i][1]=$scope.pettmNTB[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.pettmNTB[i*15+5]>0&&$scope.data6[i][0]>0){$scope.data6[i][1]=$scope.pettmNTB[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.pettmNTB[i*15+6]>0&&$scope.data7[i][0]>0){$scope.data7[i][1]=$scope.pettmNTB[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.pettmNTB[i*15+7]>0&&$scope.data8[i][0]>0){$scope.data8[i][1]=$scope.pettmNTB[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.pettmNTB[i*15+8]>0&&$scope.data9[i][0]>0){$scope.data9[i][1]=$scope.pettmNTB[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.pettmNTB[i*15+9]>0&&$scope.data10[i][0]>0){$scope.data10[i][1]=$scope.pettmNTB[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.pettmNTB[i*15+10]>0&&$scope.data11[i][0]>0){$scope.data11[i][1]=$scope.pettmNTB[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.pettmNTB[i*15+11]>0&&$scope.data12[i][0]>0){$scope.data12[i][1]=$scope.pettmNTB[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.pettmNTB[i*15+12]>0&&$scope.data13[i][0]>0){$scope.data13[i][1]=$scope.pettmNTB[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.pettmNTB[i*15+13]>0&&$scope.data14[i][0]>0){$scope.data14[i][1]=$scope.pettmNTB[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.pettmNTB[i*15+14]>0&&$scope.data15[i][0]>0){$scope.data15[i][1]=$scope.pettmNTB[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }
                            break;
                        case 'PE-本年预测':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.peyearfcastNTB[i*15]>0&&$scope.data1[i][0]>0){$scope.data1[i][1]=$scope.peyearfcastNTB[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+1]>0&&$scope.data2[i][0]>0){$scope.data2[i][1]=$scope.peyearfcastNTB[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+2]>0&&$scope.data3[i][0]>0){$scope.data3[i][1]=$scope.peyearfcastNTB[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+3]>0&&$scope.data4[i][0]>0){$scope.data4[i][1]=$scope.peyearfcastNTB[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+4]>0&&$scope.data5[i][0]>0){$scope.data5[i][1]=$scope.peyearfcastNTB[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+5]>0&&$scope.data6[i][0]>0){$scope.data6[i][1]=$scope.peyearfcastNTB[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+6]>0&&$scope.data7[i][0]>0){$scope.data7[i][1]=$scope.peyearfcastNTB[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+7]>0&&$scope.data8[i][0]>0){$scope.data8[i][1]=$scope.peyearfcastNTB[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+8]>0&&$scope.data9[i][0]>0){$scope.data9[i][1]=$scope.peyearfcastNTB[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+9]>0&&$scope.data10[i][0]>0){$scope.data10[i][1]=$scope.peyearfcastNTB[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+10]>0&&$scope.data11[i][0]>0){$scope.data11[i][1]=$scope.peyearfcastNTB[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+11]>0&&$scope.data12[i][0]>0){$scope.data12[i][1]=$scope.peyearfcastNTB[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.peyearfcastNTB[i*15+12]>0&&$scope.data13[i][0]>0){$scope.data13[i][1]=$scope.peyearfcastNTB[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+13]>0&&$scope.data14[i][0]>0){$scope.data14[i][1]=$scope.peyearfcastNTB[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.peyearfcastNTB[i*15+14]>0&&$scope.data15[i][0]>0){$scope.data15[i][1]=$scope.peyearfcastNTB[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }

                            break;
                        case 'PB-LF':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.pblfNTB[i*15]>0&&$scope.data1[i][0]>0){$scope.data1[i][1]=$scope.pblfNTB[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.pblfNTB[i*15+1]>0&&$scope.data2[i][0]>0){$scope.data2[i][1]=$scope.pblfNTB[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.pblfNTB[i*15+2]>0&&$scope.data3[i][0]>0){$scope.data3[i][1]=$scope.pblfNTB[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.pblfNTB[i*15+3]>0&&$scope.data4[i][0]>0){$scope.data4[i][1]=$scope.pblfNTB[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.pblfNTB[i*15+4]>0&&$scope.data5[i][0]>0){$scope.data5[i][1]=$scope.pblfNTB[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.pblfNTB[i*15+5]>0&&$scope.data6[i][0]>0){$scope.data6[i][1]=$scope.pblfNTB[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.pblfNTB[i*15+6]>0&&$scope.data7[i][0]>0){$scope.data7[i][1]=$scope.pblfNTB[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.pblfNTB[i*15+7]>0&&$scope.data8[i][0]>0){$scope.data8[i][1]=$scope.pblfNTB[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.pblfNTB[i*15+8]>0&&$scope.data9[i][0]>0){$scope.data9[i][1]=$scope.pblfNTB[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.pblfNTB[i*15+9]>0&&$scope.data10[i][0]>0){$scope.data10[i][1]=$scope.pblfNTB[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.pblfNTB[i*15+10]>0&&$scope.data11[i][0]>0){$scope.data11[i][1]=$scope.pblfNTB[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.pblfNTB[i*15+11]>0&&$scope.data12[i][0]>0){$scope.data12[i][1]=$scope.pblfNTB[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.pblfNTB[i*15+12]>0&&$scope.data13[i][0]>0){$scope.data13[i][1]=$scope.pblfNTB[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.pblfNTB[i*15+13]>0&&$scope.data14[i][0]>0){$scope.data14[i][1]=$scope.pblfNTB[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.pblfNTB[i*15+14]>0&&$scope.data15[i][0]>0){$scope.data15[i][1]=$scope.pblfNTB[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }

                            break;
                        case 'PS-TTM':

                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.psttmNTB[i*15]>0&&$scope.data1[i][0]>0){$scope.data1[i][1]=$scope.psttmNTB[i*15];}
                                else $scope.data1[i][1]=0;

                                if($scope.psttmNTB[i*15+1]>0&&$scope.data2[i][0]>0){$scope.data2[i][1]=$scope.psttmNTB[i*15+1];}
                                else $scope.data2[i][1]=0;

                                if($scope.psttmNTB[i*15+2]>0&&$scope.data3[i][0]>0){$scope.data3[i][1]=$scope.psttmNTB[i*15+2];}
                                else $scope.data3[i][1]=0;

                                if($scope.psttmNTB[i*15+3]>0&&$scope.data4[i][0]>0){$scope.data4[i][1]=$scope.psttmNTB[i*15+3];}
                                else $scope.data4[i][1]=0;

                                if($scope.psttmNTB[i*15+4]>0&&$scope.data5[i][0]>0){$scope.data5[i][1]=$scope.psttmNTB[i*15+4];}
                                else $scope.data5[i][1]=0;

                                if($scope.psttmNTB[i*15+5]>0&&$scope.data6[i][0]>0){$scope.data6[i][1]=$scope.psttmNTB[i*15+5];}
                                else $scope.data6[i][1]=0;

                                if($scope.psttmNTB[i*15+6]>0&&$scope.data7[i][0]>0){$scope.data7[i][1]=$scope.psttmNTB[i*15+6];}
                                else $scope.data7[i][1]=0;

                                if($scope.psttmNTB[i*15+7]>0&&$scope.data8[i][0]>0){$scope.data8[i][1]=$scope.psttmNTB[i*15+7];}
                                else $scope.data8[i][1]=0;

                                if($scope.psttmNTB[i*15+8]>0&&$scope.data9[i][0]>0){$scope.data9[i][1]=$scope.psttmNTB[i*15+8];}
                                else $scope.data9[i][1]=0;

                                if($scope.psttmNTB[i*15+9]>0&&$scope.data10[i][0]>0){$scope.data10[i][1]=$scope.psttmNTB[i*15+9];}
                                else $scope.data10[i][1]=0;

                                if($scope.psttmNTB[i*15+10]>0&&$scope.data11[i][0]>0){$scope.data11[i][1]=$scope.psttmNTB[i*15+10];}
                                else $scope.data11[i][1]=0;

                                if($scope.psttmNTB[i*15+11]>0&&$scope.data12[i][0]>0){$scope.data12[i][1]=$scope.psttmNTB[i*15+11];}
                                else $scope.data12[i][1]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.psttmNTB[i*15+12]>0&&$scope.data13[i][0]>0){$scope.data13[i][1]=$scope.psttmNTB[i*15+12];}
                                else $scope.data13[i][1]=0;

                                if($scope.psttmNTB[i*15+13]>0&&$scope.data14[i][0]>0){$scope.data14[i][1]=$scope.psttmNTB[i*15+13];}
                                else $scope.data14[i][1]=0;

                                if($scope.psttmNTB[i*15+14]>0&&$scope.data15[i][0]>0){$scope.data15[i][1]=$scope.psttmNTB[i*15+14];}
                                else $scope.data15[i][1]=0;
                            }
                            break;
                    }
                    $scope.drawNTBChart($scope.data1,$scope.data2,$scope.data3,$scope.data4,$scope.data5,$scope.data6,$scope.data7,$scope.data8,$scope.data9,$scope.data10,$scope.data11,$scope.data12,$scope.data13,$scope.data14,$scope.data15)

                    break;
            }
        };
        $scope.changeArea=function () {
            $scope.str="";
            $scope.str+=' <tr>\n' +
                '            <th>序号</th>\n' +
                '            <th>行业名称</th>\n' +
                '            <th>图例</th>\n' +
                '            <th>'+$scope.Y+'</th>'+
                '            <th>'+$scope.X+'</th>'+
                '            <th>'+$scope.area+'</th>'+
                '        </tr>';
            switch ($scope.market){
                case '全部':
                    for(var i=0;i<$scope.indstnamAll.length;i++){
                        $scope.str+=' <tr>\n' +
                            '            <td>'+(i+1)+'</td>\n' +
                            '            <td>'+$scope.indstnamAll[i]+'</td>\n' ;
                        if($scope.indstnamAll[i]!="能源设备"&&$scope.indstnamAll[i]!="(子)汽车综合"&&$scope.indstnamAll[i]!="烟草"&&$scope.indstnamAll[i]!="REITS"){
                            $scope.str+='            <td><div class="circle" style="background-color:'+$scope.colors[i%15]+'"></div></td>';}
                        else{
                            $scope.str+='            <td></td>';}

                        switch ($scope.Y){
                            case 'PE-TTM':
                                $scope.str+='            <td>'+$scope.pettmAll[i]+'</td>'
                                break;
                            case 'PE-本年预测':
                                $scope.str+='            <td>'+$scope.peyearfcastAll[i]+'</td>';
                                break;
                            case 'PB-LF':
                                $scope.str+='            <td>'+$scope.pblfAll[i]+'</td>';
                                break;
                            case 'PS-TTM':
                                $scope.str+='            <td>'+$scope.psttmAll[i]+'</td>';
                                break;
                        }
                        switch ($scope.X){
                            case 'ROE-TTM':
                                $scope.str+='            <td>'+$scope.roettmAll[i]+'</td>'
                                break;
                            case 'ROA-TTM':
                                $scope.str+='            <td>'+$scope.roattmAll[i]+'</td>';
                                break;
                            case '净利同比':
                                $scope.str+='            <td>'+$scope.netproAll[i]+'</td>';
                                break;
                            case '营收同比':
                                $scope.str+='            <td>'+$scope.revenproAll[i]+'</td>';
                                break;
                        }
                        switch ($scope.area){
                            case '总市值':
                                $scope.str+='            <td>'+$scope.tomaktvalAll[i]+'</td>'
                                break;
                            case '营业收入':
                                $scope.str+='            <td>'+$scope.businsincAll[i]+'</td>';
                                break;
                            case '资产总计':
                                $scope.str+='            <td>'+$scope.toassetsAll[i]+'</td>';
                                break;

                        }
                        $scope.str+='        </tr>';

                    }
                    document.getElementById('table').innerHTML=$scope.str;
                    switch ($scope.area) {
                        case '总市值':
                            for (var i = 0; i < $scope.data1.length; i++) {
                                if ($scope.tomaktvalAll[i * 15] > 0 && $scope.data1[i][1] > 0 && $scope.data1[i][0] > 0) {
                                    $scope.data1[i][2] = $scope.tomaktvalAll[i * 15];
                                }
                                else $scope.data1[i][2] = 0;

                                if ($scope.tomaktvalAll[i * 15 + 1] > 0 && $scope.data2[i][1] > 0 && $scope.data2[i][0] > 0) {
                                    $scope.data2[i][2] = $scope.tomaktvalAll[i * 15 + 1];
                                }
                                else $scope.data2[i][2] = 0;

                                if ($scope.tomaktvalAll[i * 15 + 2] > 0 && $scope.data3[i][1] > 0 && $scope.data3[i][0] > 0) {
                                    $scope.data3[i][2] = $scope.tomaktvalAll[i * 15 + 2];
                                }
                                else $scope.data3[i][2] = 0;

                                if ($scope.tomaktvalAll[i * 15 + 3] > 0 && $scope.data4[i][1] > 0 && $scope.data4[i][0] > 0) {
                                    $scope.data4[i][2] = $scope.tomaktvalAll[i * 15 + 3];
                                }
                                else $scope.data4[i][2] = 0;

                                if ($scope.tomaktvalAll[i * 15 + 4] > 0 && $scope.data5[i][1] > 0 && $scope.data5[i][0] > 0) {
                                    $scope.data5[i][2] = $scope.tomaktvalAll[i * 15 + 4];
                                }
                                else $scope.data5[i][2] = 0;

                                if ($scope.tomaktvalAll[i * 15 + 5] > 0 && $scope.data6[i][1] > 0 && $scope.data6[i][0] > 0) {
                                    $scope.data6[i][2] = $scope.tomaktvalAll[i * 15 + 5];
                                }
                                else $scope.data6[i][2] = 0;

                                if ($scope.tomaktvalAll[i * 15 + 6] > 0 && $scope.data7[i][1] > 0 && $scope.data7[i][0] > 0) {
                                    $scope.data7[i][2] = $scope.tomaktvalAll[i * 15 + 6];
                                }
                                else $scope.data7[i][2] = 0;

                                if ($scope.tomaktvalAll[i * 15 + 7] > 0 && $scope.data8[i][1] > 0 && $scope.data8[i][0] > 0) {
                                    $scope.data8[i][2] = $scope.tomaktvalAll[i * 15 + 7];
                                }
                                else $scope.data8[i][2] = 0;

                                if ($scope.tomaktvalAll[i * 15 + 8] > 0 && $scope.data9[i][1] > 0 && $scope.data9[i][0] > 0) {
                                    $scope.data9[i][2] = $scope.tomaktvalAll[i * 15 + 8];
                                }
                                else $scope.data9[i][2] = 0;

                                if ($scope.tomaktvalAll[i * 15 + 9] > 0 && $scope.data10[i][1] > 0 && $scope.data10[i][0] > 0) {
                                    $scope.data10[i][2] = $scope.tomaktvalAll[i * 15 + 9];
                                }
                                else $scope.data10[i][2] = 0;

                                if ($scope.tomaktvalAll[i * 15 + 10] > 0 && $scope.data11[i][1] > 0 && $scope.data11[i][0] > 0) {
                                    $scope.data11[i][2] = $scope.tomaktvalAll[i * 15 + 10];
                                }
                                else $scope.data11[i][2] = 0;

                                if ($scope.tomaktvalAll[i * 15 + 11] > 0 && $scope.data12[i][1] > 0 && $scope.data12[i][0] > 0) {
                                    $scope.data12[i][2] = $scope.tomaktvalAll[i * 15 + 11];
                                }
                                else $scope.data12[i][2] = 0;

                            }

                            for (var i = 0; i < $scope.data13.length; i++) {
                                if ($scope.tomaktvalAll[i * 15 + 12] > 0 && $scope.data13[i][1] > 0 && $scope.data13[i][0] > 0) {
                                    $scope.data13[i][2] = $scope.tomaktvalAll[i * 15 + 12];
                                }
                                else $scope.data13[i][2] = 0;

                                if ($scope.tomaktvalAll[i * 15 + 13] > 0 && $scope.data14[i][1] > 0 && $scope.data14[i][0] > 0) {
                                    $scope.data14[i][2] = $scope.tomaktvalAll[i * 15 + 13];
                                }
                                else $scope.data14[i][2] = 0;

                                if ($scope.tomaktvalAll[i * 15 + 14] > 0 && $scope.data15[i][1] > 0 && $scope.data15[i][0] > 0) {
                                    $scope.data15[i][2] = $scope.tomaktvalAll[i * 15 + 14];
                                }
                                else $scope.data15[i][2] = 0;
                            }
                            break;
                        case '营业收入':
                            for (var i = 0; i < $scope.data1.length; i++) {
                                if ($scope.businsincAll[i * 15] > 0 && $scope.data1[i][1] > 0 && $scope.data1[i][0] > 0) {
                                    $scope.data1[i][2] = $scope.businsincAll[i * 15];
                                }
                                else $scope.data1[i][2] = 0;

                                if ($scope.businsincAll[i * 15 + 1] > 0 && $scope.data2[i][1] > 0 && $scope.data2[i][0] > 0) {
                                    $scope.data2[i][2] = $scope.businsincAll[i * 15 + 1];
                                }
                                else $scope.data2[i][2] = 0;

                                if ($scope.businsincAll[i * 15 + 2] > 0 && $scope.data3[i][1] > 0 && $scope.data3[i][0] > 0) {
                                    $scope.data3[i][2] = $scope.businsincAll[i * 15 + 2];
                                }
                                else $scope.data3[i][2] = 0;

                                if ($scope.businsincAll[i * 15 + 3] > 0 && $scope.data4[i][1] > 0 && $scope.data4[i][0] > 0) {
                                    $scope.data4[i][2] = $scope.businsincAll[i * 15 + 3];
                                }
                                else $scope.data4[i][2] = 0;

                                if ($scope.businsincAll[i * 15 + 4] > 0 && $scope.data5[i][1] > 0 && $scope.data5[i][0] > 0) {
                                    $scope.data5[i][2] = $scope.businsincAll[i * 15 + 4];
                                }
                                else $scope.data5[i][2] = 0;

                                if ($scope.businsincAll[i * 15 + 5] > 0 && $scope.data6[i][1] > 0 && $scope.data6[i][0] > 0) {
                                    $scope.data6[i][2] = $scope.businsincAll[i * 15 + 5];
                                }
                                else $scope.data6[i][2] = 0;

                                if ($scope.businsincAll[i * 15 + 6] > 0 && $scope.data7[i][1] > 0 && $scope.data7[i][0] > 0) {
                                    $scope.data7[i][2] = $scope.businsincAll[i * 15 + 6];
                                }
                                else $scope.data7[i][2] = 0;

                                if ($scope.businsincAll[i * 15 + 7] > 0 && $scope.data8[i][1] > 0 && $scope.data8[i][0] > 0) {
                                    $scope.data8[i][2] = $scope.businsincAll[i * 15 + 7];
                                }
                                else $scope.data8[i][2] = 0;

                                if ($scope.businsincAll[i * 15 + 8] > 0 && $scope.data9[i][1] > 0 && $scope.data9[i][0] > 0) {
                                    $scope.data9[i][2] = $scope.businsincAll[i * 15 + 8];
                                }
                                else $scope.data9[i][2] = 0;

                                if ($scope.businsincAll[i * 15 + 9] > 0 && $scope.data10[i][1] > 0 && $scope.data10[i][0] > 0) {
                                    $scope.data10[i][2] = $scope.businsincAll[i * 15 + 9];
                                }
                                else $scope.data10[i][2] = 0;

                                if ($scope.businsincAll[i * 15 + 10] > 0 && $scope.data11[i][1] > 0 && $scope.data11[i][0] > 0) {
                                    $scope.data11[i][2] = $scope.businsincAll[i * 15 + 10];
                                }
                                else $scope.data11[i][2] = 0;

                                if ($scope.businsincAll[i * 15 + 11] > 0 && $scope.data12[i][1] > 0 && $scope.data12[i][0] > 0) {
                                    $scope.data12[i][2] = $scope.businsincAll[i * 15 + 11];
                                }
                                else $scope.data12[i][2] = 0;

                            }

                            for (var i = 0; i < $scope.data13.length; i++) {
                                if ($scope.businsincAll[i * 15 + 12] > 0 && $scope.data13[i][1] > 0 && $scope.data13[i][0] > 0) {
                                    $scope.data13[i][2] = $scope.businsincAll[i * 15 + 12];
                                }
                                else $scope.data13[i][2] = 0;

                                if ($scope.businsincAll[i * 15 + 13] > 0 && $scope.data14[i][1] > 0 && $scope.data14[i][0] > 0) {
                                    $scope.data14[i][2] = $scope.businsincAll[i * 15 + 13];
                                }
                                else $scope.data14[i][2] = 0;

                                if ($scope.businsincAll[i * 15 + 14] > 0 && $scope.data15[i][1] > 0 && $scope.data15[i][0] > 0) {
                                    $scope.data15[i][2] = $scope.businsincAll[i * 15 + 14];
                                }
                                else $scope.data15[i][2] = 0;
                            }
                            break;
                        case '资产总计':
                            for (var i = 0; i < $scope.data1.length; i++) {
                                if ($scope.toassetsAll[i * 15] > 0 && $scope.data1[i][1] > 0 && $scope.data1[i][0] > 0) {
                                    $scope.data1[i][2] = $scope.toassetsAll[i * 15];
                                }
                                else $scope.data1[i][2] = 0;

                                if ($scope.toassetsAll[i * 15 + 1] > 0 && $scope.data2[i][1] > 0 && $scope.data2[i][0] > 0) {
                                    $scope.data2[i][2] = $scope.toassetsAll[i * 15 + 1];
                                }
                                else $scope.data2[i][2] = 0;

                                if ($scope.toassetsAll[i * 15 + 2] > 0 && $scope.data3[i][1] > 0 && $scope.data3[i][0] > 0) {
                                    $scope.data3[i][2] = $scope.toassetsAll[i * 15 + 2];
                                }
                                else $scope.data3[i][2] = 0;

                                if ($scope.toassetsAll[i * 15 + 3] > 0 && $scope.data4[i][1] > 0 && $scope.data4[i][0] > 0) {
                                    $scope.data4[i][2] = $scope.toassetsAll[i * 15 + 3];
                                }
                                else $scope.data4[i][2] = 0;

                                if ($scope.toassetsAll[i * 15 + 4] > 0 && $scope.data5[i][1] > 0 && $scope.data5[i][0] > 0) {
                                    $scope.data5[i][2] = $scope.toassetsAll[i * 15 + 4];
                                }
                                else $scope.data5[i][2] = 0;

                                if ($scope.toassetsAll[i * 15 + 5] > 0 && $scope.data6[i][1] > 0 && $scope.data6[i][0] > 0) {
                                    $scope.data6[i][2] = $scope.toassetsAll[i * 15 + 5];
                                }
                                else $scope.data6[i][2] = 0;

                                if ($scope.toassetsAll[i * 15 + 6] > 0 && $scope.data7[i][1] > 0 && $scope.data7[i][0] > 0) {
                                    $scope.data7[i][2] = $scope.toassetsAll[i * 15 + 6];
                                }
                                else $scope.data7[i][2] = 0;

                                if ($scope.toassetsAll[i * 15 + 7] > 0 && $scope.data8[i][1] > 0 && $scope.data8[i][0] > 0) {
                                    $scope.data8[i][2] = $scope.toassetsAll[i * 15 + 7];
                                }
                                else $scope.data8[i][2] = 0;

                                if ($scope.toassetsAll[i * 15 + 8] > 0 && $scope.data9[i][1] > 0 && $scope.data9[i][0] > 0) {
                                    $scope.data9[i][2] = $scope.toassetsAll[i * 15 + 8];
                                }
                                else $scope.data9[i][2] = 0;

                                if ($scope.toassetsAll[i * 15 + 9] > 0 && $scope.data10[i][1] > 0 && $scope.data10[i][0] > 0) {
                                    $scope.data10[i][2] = $scope.toassetsAll[i * 15 + 9];
                                }
                                else $scope.data10[i][2] = 0;

                                if ($scope.toassetsAll[i * 15 + 10] > 0 && $scope.data11[i][1] > 0 && $scope.data11[i][0] > 0) {
                                    $scope.data11[i][2] = $scope.toassetsAll[i * 15 + 10];
                                }
                                else $scope.data11[i][2] = 0;

                                if ($scope.toassetsAll[i * 15 + 11] > 0 && $scope.data12[i][1] > 0 && $scope.data12[i][0] > 0) {
                                    $scope.data12[i][2] = $scope.toassetsAll[i * 15 + 11];
                                }
                                else $scope.data12[i][2] = 0;

                            }

                            for (var i = 0; i < $scope.data13.length; i++) {
                                if ($scope.toassetsAll[i * 15 + 12] > 0 && $scope.data13[i][1] > 0 && $scope.data13[i][0] > 0) {
                                    $scope.data13[i][2] = $scope.toassetsAll[i * 15 + 12];
                                }
                                else $scope.data13[i][2] = 0;

                                if ($scope.toassetsAll[i * 15 + 13] > 0 && $scope.data14[i][1] > 0 && $scope.data14[i][0] > 0) {
                                    $scope.data14[i][2] = $scope.toassetsAll[i * 15 + 13];
                                }
                                else $scope.data14[i][2] = 0;

                                if ($scope.toassetsAll[i * 15 + 14] > 0 && $scope.data15[i][1] > 0 && $scope.data15[i][0] > 0) {
                                    $scope.data15[i][2] = $scope.toassetsAll[i * 15 + 14];
                                }
                                else $scope.data15[i][2] = 0;
                            }
                            break;
                    }
                    $scope.drawChart($scope.data1,$scope.data2,$scope.data3,$scope.data4,$scope.data5,$scope.data6,$scope.data7,$scope.data8,$scope.data9,$scope.data10,$scope.data11,$scope.data12,$scope.data13,$scope.data14,$scope.data15)

                    break;

                case '沪深A股':
                    for(var i=0;i<$scope.indstnamSS.length;i++){
                        $scope.str+=' <tr>\n' +
                            '            <td>'+(i+1)+'</td>\n' +
                            '            <td>'+$scope.indstnamSS[i]+'</td>\n' ;
                        if($scope.indstnamSS[i]!="能源设备"&&$scope.indstnamSS[i]!="(子)汽车综合"&&$scope.indstnamSS[i]!="烟草"&&$scope.indstnamSS[i]!="REITS"){
                            $scope.str+='            <td><div class="circle" style="background-color:'+$scope.colors[i%15]+'"></div></td>';}
                        else{
                            $scope.str+='            <td></td>';}

                        switch ($scope.Y){
                            case 'PE-TTM':
                                $scope.str+='            <td>'+$scope.pettmSS[i]+'</td>'
                                break;
                            case 'PE-本年预测':
                                $scope.str+='            <td>'+$scope.peyearfcastSS[i]+'</td>';
                                break;
                            case 'PB-LF':
                                $scope.str+='            <td>'+$scope.pblfSS[i]+'</td>';
                                break;
                            case 'PS-TTM':
                                $scope.str+='            <td>'+$scope.psttmSS[i]+'</td>';
                                break;
                        }
                        switch ($scope.X){
                            case 'ROE-TTM':
                                $scope.str+='            <td>'+$scope.roettmSS[i]+'</td>'
                                break;
                            case 'ROA-TTM':
                                $scope.str+='            <td>'+$scope.roattmSS[i]+'</td>';
                                break;
                            case '净利同比':
                                $scope.str+='            <td>'+$scope.netproSS[i]+'</td>';
                                break;
                            case '营收同比':
                                $scope.str+='            <td>'+$scope.revenproSS[i]+'</td>';
                                break;
                        }
                        switch ($scope.area){
                            case '总市值':
                                $scope.str+='            <td>'+$scope.tomaktvalSS[i]+'</td>'
                                break;
                            case '营业收入':
                                $scope.str+='            <td>'+$scope.businsincSS[i]+'</td>';
                                break;
                            case '资产总计':
                                $scope.str+='            <td>'+$scope.toassetsSS[i]+'</td>';
                                break;

                        }
                        $scope.str+='        </tr>';

                    }
                    document.getElementById('table').innerHTML=$scope.str;
                    switch ($scope.area){
                        case '总市值':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.tomaktvalSS[i*15]>0&&$scope.data1[i][1]>0&&$scope.data1[i][0]>0) {$scope.data1[i][2]=$scope.tomaktvalSS[i*15];}
                                else $scope.data1[i][2]=0;

                                if($scope.tomaktvalSS[i*15+1]>0&&$scope.data2[i][1]>0&&$scope.data2[i][0]>0) {$scope.data2[i][2]=$scope.tomaktvalSS[i*15+1];}
                                else $scope.data2[i][2]=0;

                                if($scope.tomaktvalSS[i*15+2]>0&&$scope.data3[i][1]>0&&$scope.data3[i][0]>0) {$scope.data3[i][2]=$scope.tomaktvalSS[i*15+2];}
                                else $scope.data3[i][2]=0;

                                if($scope.tomaktvalSS[i*15+3]>0&&$scope.data4[i][1]>0&&$scope.data4[i][0]>0) {$scope.data4[i][2]=$scope.tomaktvalSS[i*15+3];}
                                else $scope.data4[i][2]=0;

                                if($scope.tomaktvalSS[i*15+4]>0&&$scope.data5[i][1]>0&&$scope.data5[i][0]>0) {$scope.data5[i][2]=$scope.tomaktvalSS[i*15+4];}
                                else $scope.data5[i][2]=0;

                                if($scope.tomaktvalSS[i*15+5]>0&&$scope.data6[i][1]>0&&$scope.data6[i][0]>0) {$scope.data6[i][2]=$scope.tomaktvalSS[i*15+5];}
                                else $scope.data6[i][2]=0;

                                if($scope.tomaktvalSS[i*15+6]>0&&$scope.data7[i][1]>0&&$scope.data7[i][0]>0) {$scope.data7[i][2]=$scope.tomaktvalSS[i*15+6];}
                                else $scope.data7[i][2]=0;

                                if($scope.tomaktvalSS[i*15+7]>0&&$scope.data8[i][1]>0&&$scope.data8[i][0]>0) {$scope.data8[i][2]=$scope.tomaktvalSS[i*15+7];}
                                else $scope.data8[i][2]=0;

                                if($scope.tomaktvalSS[i*15+8]>0&&$scope.data9[i][1]>0&&$scope.data9[i][0]>0) {$scope.data9[i][2]=$scope.tomaktvalSS[i*15+8];}
                                else $scope.data9[i][2]=0;

                                if($scope.tomaktvalSS[i*15+9]>0&&$scope.data10[i][1]>0&&$scope.data10[i][0]>0) {$scope.data10[i][2]=$scope.tomaktvalSS[i*15+9];}
                                else $scope.data10[i][2]=0;

                                if($scope.tomaktvalSS[i*15+10]>0&&$scope.data11[i][1]>0&&$scope.data11[i][0]>0) {$scope.data11[i][2]=$scope.tomaktvalSS[i*15+10];}
                                else $scope.data11[i][2]=0;

                                if($scope.tomaktvalSS[i*15+11]>0&&$scope.data12[i][1]>0&&$scope.data12[i][0]>0) {$scope.data12[i][2]=$scope.tomaktvalSS[i*15+11];}
                                else $scope.data12[i][2]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.tomaktvalSS[i*15+12]>0&&$scope.data13[i][1]>0&&$scope.data13[i][0]>0) {$scope.data13[i][2]=$scope.tomaktvalSS[i*15+12];}
                                else $scope.data13[i][2]=0;

                                if($scope.tomaktvalSS[i*15+13]>0&&$scope.data14[i][1]>0&&$scope.data14[i][0]>0) {$scope.data14[i][2]=$scope.tomaktvalSS[i*15+13];}
                                else $scope.data14[i][2]=0;

                                if($scope.tomaktvalSS[i*15+14]>0&&$scope.data15[i][1]>0&&$scope.data15[i][0]>0) {$scope.data15[i][2]=$scope.tomaktvalSS[i*15+14];}
                                else $scope.data15[i][2]=0;
                            }
                            break;
                        case '营业收入':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.businsincSS[i*15]>0&&$scope.data1[i][1]>0&&$scope.data1[i][0]>0) {$scope.data1[i][2]=$scope.businsincSS[i*15];}
                                else $scope.data1[i][2]=0;

                                if($scope.businsincSS[i*15+1]>0&&$scope.data2[i][1]>0&&$scope.data2[i][0]>0) {$scope.data2[i][2]=$scope.businsincSS[i*15+1];}
                                else $scope.data2[i][2]=0;

                                if($scope.businsincSS[i*15+2]>0&&$scope.data3[i][1]>0&&$scope.data3[i][0]>0) {$scope.data3[i][2]=$scope.businsincSS[i*15+2];}
                                else $scope.data3[i][2]=0;

                                if($scope.businsincSS[i*15+3]>0&&$scope.data4[i][1]>0&&$scope.data4[i][0]>0) {$scope.data4[i][2]=$scope.businsincSS[i*15+3];}
                                else $scope.data4[i][2]=0;

                                if($scope.businsincSS[i*15+4]>0&&$scope.data5[i][1]>0&&$scope.data5[i][0]>0) {$scope.data5[i][2]=$scope.businsincSS[i*15+4];}
                                else $scope.data5[i][2]=0;

                                if($scope.businsincSS[i*15+5]>0&&$scope.data6[i][1]>0&&$scope.data6[i][0]>0) {$scope.data6[i][2]=$scope.businsincSS[i*15+5];}
                                else $scope.data6[i][2]=0;

                                if($scope.businsincSS[i*15+6]>0&&$scope.data7[i][1]>0&&$scope.data7[i][0]>0) {$scope.data7[i][2]=$scope.businsincSS[i*15+6];}
                                else $scope.data7[i][2]=0;

                                if($scope.businsincSS[i*15+7]>0&&$scope.data8[i][1]>0&&$scope.data8[i][0]>0) {$scope.data8[i][2]=$scope.businsincSS[i*15+7];}
                                else $scope.data8[i][2]=0;

                                if($scope.businsincSS[i*15+8]>0&&$scope.data9[i][1]>0&&$scope.data9[i][0]>0) {$scope.data9[i][2]=$scope.businsincSS[i*15+8];}
                                else $scope.data9[i][2]=0;

                                if($scope.businsincSS[i*15+9]>0&&$scope.data10[i][1]>0&&$scope.data10[i][0]>0) {$scope.data10[i][2]=$scope.businsincSS[i*15+9];}
                                else $scope.data10[i][2]=0;

                                if($scope.businsincSS[i*15+10]>0&&$scope.data11[i][1]>0&&$scope.data11[i][0]>0) {$scope.data11[i][2]=$scope.businsincSS[i*15+10];}
                                else $scope.data11[i][2]=0;

                                if($scope.businsincSS[i*15+11]>0&&$scope.data12[i][1]>0&&$scope.data12[i][0]>0) {$scope.data12[i][2]=$scope.businsincSS[i*15+11];}
                                else $scope.data12[i][2]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.businsincSS[i*15+12]>0&&$scope.data13[i][1]>0&&$scope.data13[i][0]>0) {$scope.data13[i][2]=$scope.businsincSS[i*15+12];}
                                else $scope.data13[i][2]=0;

                                if($scope.businsincSS[i*15+13]>0&&$scope.data14[i][1]>0&&$scope.data14[i][0]>0) {$scope.data14[i][2]=$scope.businsincSS[i*15+13];}
                                else $scope.data14[i][2]=0;

                                if($scope.businsincSS[i*15+14]>0&&$scope.data15[i][1]>0&&$scope.data15[i][0]>0) {$scope.data15[i][2]=$scope.businsincSS[i*15+14];}
                                else $scope.data15[i][2]=0;
                            }
                            break;
                        case '资产总计':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.toassetsSS[i*15]>0&&$scope.data1[i][1]>0&&$scope.data1[i][0]>0) {$scope.data1[i][2]=$scope.toassetsSS[i*15];}
                                else $scope.data1[i][2]=0;

                                if($scope.toassetsSS[i*15+1]>0&&$scope.data2[i][1]>0&&$scope.data2[i][0]>0) {$scope.data2[i][2]=$scope.toassetsSS[i*15+1];}
                                else $scope.data2[i][2]=0;

                                if($scope.toassetsSS[i*15+2]>0&&$scope.data3[i][1]>0&&$scope.data3[i][0]>0) {$scope.data3[i][2]=$scope.toassetsSS[i*15+2];}
                                else $scope.data3[i][2]=0;

                                if($scope.toassetsSS[i*15+3]>0&&$scope.data4[i][1]>0&&$scope.data4[i][0]>0) {$scope.data4[i][2]=$scope.toassetsSS[i*15+3];}
                                else $scope.data4[i][2]=0;

                                if($scope.toassetsSS[i*15+4]>0&&$scope.data5[i][1]>0&&$scope.data5[i][0]>0) {$scope.data5[i][2]=$scope.toassetsSS[i*15+4];}
                                else $scope.data5[i][2]=0;

                                if($scope.toassetsSS[i*15+5]>0&&$scope.data6[i][1]>0&&$scope.data6[i][0]>0) {$scope.data6[i][2]=$scope.toassetsSS[i*15+5];}
                                else $scope.data6[i][2]=0;

                                if($scope.toassetsSS[i*15+6]>0&&$scope.data7[i][1]>0&&$scope.data7[i][0]>0) {$scope.data7[i][2]=$scope.toassetsSS[i*15+6];}
                                else $scope.data7[i][2]=0;

                                if($scope.toassetsSS[i*15+7]>0&&$scope.data8[i][1]>0&&$scope.data8[i][0]>0) {$scope.data8[i][2]=$scope.toassetsSS[i*15+7];}
                                else $scope.data8[i][2]=0;

                                if($scope.toassetsSS[i*15+8]>0&&$scope.data9[i][1]>0&&$scope.data9[i][0]>0) {$scope.data9[i][2]=$scope.toassetsSS[i*15+8];}
                                else $scope.data9[i][2]=0;

                                if($scope.toassetsSS[i*15+9]>0&&$scope.data10[i][1]>0&&$scope.data10[i][0]>0) {$scope.data10[i][2]=$scope.toassetsSS[i*15+9];}
                                else $scope.data10[i][2]=0;

                                if($scope.toassetsSS[i*15+10]>0&&$scope.data11[i][1]>0&&$scope.data11[i][0]>0) {$scope.data11[i][2]=$scope.toassetsSS[i*15+10];}
                                else $scope.data11[i][2]=0;

                                if($scope.toassetsSS[i*15+11]>0&&$scope.data12[i][1]>0&&$scope.data12[i][0]>0) {$scope.data12[i][2]=$scope.toassetsSS[i*15+11];}
                                else $scope.data12[i][2]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.toassetsSS[i*15+12]>0&&$scope.data13[i][1]>0&&$scope.data13[i][0]>0) {$scope.data13[i][2]=$scope.toassetsSS[i*15+12];}
                                else $scope.data13[i][2]=0;

                                if($scope.toassetsSS[i*15+13]>0&&$scope.data14[i][1]>0&&$scope.data14[i][0]>0) {$scope.data14[i][2]=$scope.toassetsSS[i*15+13];}
                                else $scope.data14[i][2]=0;

                                if($scope.toassetsSS[i*15+14]>0&&$scope.data15[i][1]>0&&$scope.data15[i][0]>0) {$scope.data15[i][2]=$scope.toassetsSS[i*15+14];}
                                else $scope.data15[i][2]=0;
                            }
                            break;

                    }
                    $scope.drawChart($scope.data1,$scope.data2,$scope.data3,$scope.data4,$scope.data5,$scope.data6,$scope.data7,$scope.data8,$scope.data9,$scope.data10,$scope.data11,$scope.data12,$scope.data13,$scope.data14,$scope.data15)

                    break;

                case '新三板做市':
                    for(var i=0;i<$scope.indstnamNTB.length;i++){
                        $scope.str+=' <tr>\n' +
                            '            <td>'+(i+1)+'</td>\n' +
                            '            <td>'+$scope.indstnamNTB[i]+'</td>\n' ;
                        if($scope.indstnamNTB[i]!="能源设备"&&$scope.indstnamNTB[i]!="(子)汽车综合"&&$scope.indstnamNTB[i]!="烟草"&&$scope.indstnamNTB[i]!="REITS"){
                            $scope.str+='            <td><div class="circle" style="background-color:'+$scope.colors[i%15]+'"></div></td>';}
                        else{
                            $scope.str+='            <td></td>';}

                        switch ($scope.Y){
                            case 'PE-TTM':
                                $scope.str+='            <td>'+$scope.pettmNTB[i]+'</td>'
                                break;
                            case 'PE-本年预测':
                                $scope.str+='            <td>'+$scope.peyearfcastNTB[i]+'</td>';
                                break;
                            case 'PB-LF':
                                $scope.str+='            <td>'+$scope.pblfNTB[i]+'</td>';
                                break;
                            case 'PS-TTM':
                                $scope.str+='            <td>'+$scope.psttmNTB[i]+'</td>';
                                break;
                        }
                        switch ($scope.X){
                            case 'ROE-TTM':
                                $scope.str+='            <td>'+$scope.roettmNTB[i]+'</td>'
                                break;
                            case 'ROA-TTM':
                                $scope.str+='            <td>'+$scope.roattmNTB[i]+'</td>';
                                break;
                            case '净利同比':
                                $scope.str+='            <td>'+$scope.netproNTB[i]+'</td>';
                                break;
                            case '营收同比':
                                $scope.str+='            <td>'+$scope.revenproNTB[i]+'</td>';
                                break;
                        }
                        switch ($scope.area){
                            case '总市值':
                                $scope.str+='            <td>'+$scope.tomaktvalNTB[i]+'</td>'
                                break;
                            case '营业收入':
                                $scope.str+='            <td>'+$scope.businsincNTB[i]+'</td>';
                                break;
                            case '资产总计':
                                $scope.str+='            <td>'+$scope.toassetsNTB[i]+'</td>';
                                break;

                        }
                        $scope.str+='        </tr>';

                    }
                    document.getElementById('table').innerHTML=$scope.str;
                    switch ($scope.area){
                        case '总市值':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.tomaktvalNTB[i*15]>0&&$scope.data1[i][1]>0&&$scope.data1[i][0]>0) {$scope.data1[i][2]=$scope.tomaktvalNTB[i*15];}
                                else $scope.data1[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+1]>0&&$scope.data2[i][1]>0&&$scope.data2[i][0]>0) {$scope.data2[i][2]=$scope.tomaktvalNTB[i*15+1];}
                                else $scope.data2[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+2]>0&&$scope.data3[i][1]>0&&$scope.data3[i][0]>0) {$scope.data3[i][2]=$scope.tomaktvalNTB[i*15+2];}
                                else $scope.data3[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+3]>0&&$scope.data4[i][1]>0&&$scope.data4[i][0]>0) {$scope.data4[i][2]=$scope.tomaktvalNTB[i*15+3];}
                                else $scope.data4[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+4]>0&&$scope.data5[i][1]>0&&$scope.data5[i][0]>0) {$scope.data5[i][2]=$scope.tomaktvalNTB[i*15+4];}
                                else $scope.data5[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+5]>0&&$scope.data6[i][1]>0&&$scope.data6[i][0]>0) {$scope.data6[i][2]=$scope.tomaktvalNTB[i*15+5];}
                                else $scope.data6[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+6]>0&&$scope.data7[i][1]>0&&$scope.data7[i][0]>0) {$scope.data7[i][2]=$scope.tomaktvalNTB[i*15+6];}
                                else $scope.data7[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+7]>0&&$scope.data8[i][1]>0&&$scope.data8[i][0]>0) {$scope.data8[i][2]=$scope.tomaktvalNTB[i*15+7];}
                                else $scope.data8[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+8]>0&&$scope.data9[i][1]>0&&$scope.data9[i][0]>0) {$scope.data9[i][2]=$scope.tomaktvalNTB[i*15+8];}
                                else $scope.data9[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+9]>0&&$scope.data10[i][1]>0&&$scope.data10[i][0]>0) {$scope.data10[i][2]=$scope.tomaktvalNTB[i*15+9];}
                                else $scope.data10[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+10]>0&&$scope.data11[i][1]>0&&$scope.data11[i][0]>0) {$scope.data11[i][2]=$scope.tomaktvalNTB[i*15+10];}
                                else $scope.data11[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+11]>0&&$scope.data12[i][1]>0&&$scope.data12[i][0]>0) {$scope.data12[i][2]=$scope.tomaktvalNTB[i*15+11];}
                                else $scope.data12[i][2]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.tomaktvalNTB[i*15+12]>0&&$scope.data13[i][1]>0&&$scope.data13[i][0]>0) {$scope.data13[i][2]=$scope.tomaktvalNTB[i*15+12];}
                                else $scope.data13[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+13]>0&&$scope.data14[i][1]>0&&$scope.data14[i][0]>0) {$scope.data14[i][2]=$scope.tomaktvalNTB[i*15+13];}
                                else $scope.data14[i][2]=0;

                                if($scope.tomaktvalNTB[i*15+14]>0&&$scope.data15[i][1]>0&&$scope.data15[i][0]>0) {$scope.data15[i][2]=$scope.tomaktvalNTB[i*15+14];}
                                else $scope.data15[i][2]=0;
                            }
                            break;
                        case '营业收入':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.businsincNTB[i*15]>0&&$scope.data1[i][1]>0&&$scope.data1[i][0]>0) {$scope.data1[i][2]=$scope.businsincNTB[i*15];}
                                else $scope.data1[i][2]=0;

                                if($scope.businsincNTB[i*15+1]>0&&$scope.data2[i][1]>0&&$scope.data2[i][0]>0) {$scope.data2[i][2]=$scope.businsincNTB[i*15+1];}
                                else $scope.data2[i][2]=0;

                                if($scope.businsincNTB[i*15+2]>0&&$scope.data3[i][1]>0&&$scope.data3[i][0]>0) {$scope.data3[i][2]=$scope.businsincNTB[i*15+2];}
                                else $scope.data3[i][2]=0;

                                if($scope.businsincNTB[i*15+3]>0&&$scope.data4[i][1]>0&&$scope.data4[i][0]>0) {$scope.data4[i][2]=$scope.businsincNTB[i*15+3];}
                                else $scope.data4[i][2]=0;

                                if($scope.businsincNTB[i*15+4]>0&&$scope.data5[i][1]>0&&$scope.data5[i][0]>0) {$scope.data5[i][2]=$scope.businsincNTB[i*15+4];}
                                else $scope.data5[i][2]=0;

                                if($scope.businsincNTB[i*15+5]>0&&$scope.data6[i][1]>0&&$scope.data6[i][0]>0) {$scope.data6[i][2]=$scope.businsincNTB[i*15+5];}
                                else $scope.data6[i][2]=0;

                                if($scope.businsincNTB[i*15+6]>0&&$scope.data7[i][1]>0&&$scope.data7[i][0]>0) {$scope.data7[i][2]=$scope.businsincNTB[i*15+6];}
                                else $scope.data7[i][2]=0;

                                if($scope.businsincNTB[i*15+7]>0&&$scope.data8[i][1]>0&&$scope.data8[i][0]>0) {$scope.data8[i][2]=$scope.businsincNTB[i*15+7];}
                                else $scope.data8[i][2]=0;

                                if($scope.businsincNTB[i*15+8]>0&&$scope.data9[i][1]>0&&$scope.data9[i][0]>0) {$scope.data9[i][2]=$scope.businsincNTB[i*15+8];}
                                else $scope.data9[i][2]=0;

                                if($scope.businsincNTB[i*15+9]>0&&$scope.data10[i][1]>0&&$scope.data10[i][0]>0) {$scope.data10[i][2]=$scope.businsincNTB[i*15+9];}
                                else $scope.data10[i][2]=0;

                                if($scope.businsincNTB[i*15+10]>0&&$scope.data11[i][1]>0&&$scope.data11[i][0]>0) {$scope.data11[i][2]=$scope.businsincNTB[i*15+10];}
                                else $scope.data11[i][2]=0;

                                if($scope.businsincNTB[i*15+11]>0&&$scope.data12[i][1]>0&&$scope.data12[i][0]>0) {$scope.data12[i][2]=$scope.businsincNTB[i*15+11];}
                                else $scope.data12[i][2]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.businsincNTB[i*15+12]>0&&$scope.data13[i][1]>0&&$scope.data13[i][0]>0) {$scope.data13[i][2]=$scope.businsincNTB[i*15+12];}
                                else $scope.data13[i][2]=0;

                                if($scope.businsincNTB[i*15+13]>0&&$scope.data14[i][1]>0&&$scope.data14[i][0]>0) {$scope.data14[i][2]=$scope.businsincNTB[i*15+13];}
                                else $scope.data14[i][2]=0;

                                if($scope.businsincNTB[i*15+14]>0&&$scope.data15[i][1]>0&&$scope.data15[i][0]>0) {$scope.data15[i][2]=$scope.businsincNTB[i*15+14];}
                                else $scope.data15[i][2]=0;
                            }
                            break;
                        case '资产总计':
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.toassetsNTB[i*15]>0&&$scope.data1[i][1]>0&&$scope.data1[i][0]>0) {$scope.data1[i][2]=$scope.toassetsNTB[i*15];}
                                else $scope.data1[i][2]=0;

                                if($scope.toassetsNTB[i*15+1]>0&&$scope.data2[i][1]>0&&$scope.data2[i][0]>0) {$scope.data2[i][2]=$scope.toassetsNTB[i*15+1];}
                                else $scope.data2[i][2]=0;

                                if($scope.toassetsNTB[i*15+2]>0&&$scope.data3[i][1]>0&&$scope.data3[i][0]>0) {$scope.data3[i][2]=$scope.toassetsNTB[i*15+2];}
                                else $scope.data3[i][2]=0;

                                if($scope.toassetsNTB[i*15+3]>0&&$scope.data4[i][1]>0&&$scope.data4[i][0]>0) {$scope.data4[i][2]=$scope.toassetsNTB[i*15+3];}
                                else $scope.data4[i][2]=0;

                                if($scope.toassetsNTB[i*15+4]>0&&$scope.data5[i][1]>0&&$scope.data5[i][0]>0) {$scope.data5[i][2]=$scope.toassetsNTB[i*15+4];}
                                else $scope.data5[i][2]=0;

                                if($scope.toassetsNTB[i*15+5]>0&&$scope.data6[i][1]>0&&$scope.data6[i][0]>0) {$scope.data6[i][2]=$scope.toassetsNTB[i*15+5];}
                                else $scope.data6[i][2]=0;

                                if($scope.toassetsNTB[i*15+6]>0&&$scope.data7[i][1]>0&&$scope.data7[i][0]>0) {$scope.data7[i][2]=$scope.toassetsNTB[i*15+6];}
                                else $scope.data7[i][2]=0;

                                if($scope.toassetsNTB[i*15+7]>0&&$scope.data8[i][1]>0&&$scope.data8[i][0]>0) {$scope.data8[i][2]=$scope.toassetsNTB[i*15+7];}
                                else $scope.data8[i][2]=0;

                                if($scope.toassetsNTB[i*15+8]>0&&$scope.data9[i][1]>0&&$scope.data9[i][0]>0) {$scope.data9[i][2]=$scope.toassetsNTB[i*15+8];}
                                else $scope.data9[i][2]=0;

                                if($scope.toassetsNTB[i*15+9]>0&&$scope.data10[i][1]>0&&$scope.data10[i][0]>0) {$scope.data10[i][2]=$scope.toassetsNTB[i*15+9];}
                                else $scope.data10[i][2]=0;

                                if($scope.toassetsNTB[i*15+10]>0&&$scope.data11[i][1]>0&&$scope.data11[i][0]>0) {$scope.data11[i][2]=$scope.toassetsNTB[i*15+10];}
                                else $scope.data11[i][2]=0;

                                if($scope.toassetsNTB[i*15+11]>0&&$scope.data12[i][1]>0&&$scope.data12[i][0]>0) {$scope.data12[i][2]=$scope.toassetsNTB[i*15+11];}
                                else $scope.data12[i][2]=0;

                            }

                            for(var i=0;i<$scope.data13.length;i++) {
                                if($scope.toassetsNTB[i*15+12]>0&&$scope.data13[i][1]>0&&$scope.data13[i][0]>0) {$scope.data13[i][2]=$scope.toassetsNTB[i*15+12];}
                                else $scope.data13[i][2]=0;

                                if($scope.toassetsNTB[i*15+13]>0&&$scope.data14[i][1]>0&&$scope.data14[i][0]>0) {$scope.data14[i][2]=$scope.toassetsNTB[i*15+13];}
                                else $scope.data14[i][2]=0;

                                if($scope.toassetsNTB[i*15+14]>0&&$scope.data15[i][1]>0&&$scope.data15[i][0]>0) {$scope.data15[i][2]=$scope.toassetsNTB[i*15+14];}
                                else $scope.data15[i][2]=0;
                            }
                            break;

                    }

                    $scope.drawNTBChart($scope.data1,$scope.data2,$scope.data3,$scope.data4,$scope.data5,$scope.data6,$scope.data7,$scope.data8,$scope.data9,$scope.data10,$scope.data11,$scope.data12,$scope.data13,$scope.data14,$scope.data15)
                    break;
            }
        };

        $scope.drawChart=function (data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11,data12,data13,data14,data15) {

            var myChart = echarts.init(document.getElementById('test'));

            var option = {
                color:['#344996','#88A500','#FF7800','#E52600','#7B4DD0','#1A96B1','#953c7e','#0a20f5','#4dcc01','#c66700','#df4cdd','#ebc306','#039765','#c52687','#5fa5e9'],
                tooltip : {
                    textStyle: {
                        color: 'rgba(255,255,255,255)'
                    },
                    formatter: function (params) {
                        return params.data[3]+':'+params.data[2];

                    }
                },
                legend: {
                },
                toolbox: {
                },
                xAxis : [
                    {
                        type : 'value',
                        splitNumber: 4,
                        scale: true,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#d6d6d6'
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        splitNumber: 4,
                        scale: true,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#d6d6d6'
                            }
                        }
                    }
                ],

                series : [
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: data1,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: data2,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: data3,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: data4,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: data5,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: data6,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: data7,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: data8,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: data9,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: data10,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: data11,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: data12,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: data13,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: data14,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: data15,
                    }

                ]
            };

            myChart.setOption(option);
        }

        $scope.drawNTBChart=function (data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11,data12,data13,data14,data15) {

            var myChart = echarts.init(document.getElementById('test'));

            var option = {
                color:['#344996','#88A500','#FF7800','#E52600','#7B4DD0','#1A96B1','#953c7e','#0a20f5','#4dcc01','#c66700','#df4cdd','#ebc306','#039765','#c52687','#5fa5e9'],
                tooltip : {
                    textStyle: {
                        color: 'rgba(255,255,255,255)'
                    },
                    formatter: function (params) {
                        return params.data[3]+':'+params.data[2];

                    }
                },
                legend: {
                },
                toolbox: {
                },
                xAxis : [
                    {
                        type : 'value',
                        splitNumber: 4,
                        scale: true,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#d6d6d6'
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        splitNumber: 4,
                        scale: true,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#d6d6d6'
                            }
                        }
                    }
                ],

                series : [
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2])/5;
                        },
                        data: data1,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2]);
                        },
                        data: data2,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2]);
                        },
                        data: data3,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2]);
                        },
                        data: data4,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2]);
                        },
                        data: data5,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2]);
                        },
                        data: data6,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2]);
                        },
                        data: data7,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2]);
                        },
                        data: data8,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2]);
                        },
                        data: data9,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2]);
                        },
                        data: data10,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2]);
                        },
                        data: data11,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2]);
                        },
                        data: data12,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2]);
                        },
                        data: data13,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2]);
                        },
                        data: data14,
                    },
                    {
                        type:'scatter',
                        symbolSize: function (value){
                            return Math.sqrt(value[2]);
                        },
                        data: data15,
                    }

                ]
            };

            myChart.setOption(option);
        }
    });