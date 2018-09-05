
angular.module('myApp.macroIndustryDisplay.hylsbj', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('hylsbjCtrl',function($scope, $route, $http) {

        $scope.market="全部";
        $scope.index="市盈率";
        $scope.difference="无";



        $http({
            method: 'POST',
            url: 'http://localhost:8080/ComparisonOfIndustryHistory/ComparisonOfIndustryHistory_allAShares'
        }).then(function successCallback(response) {
            var Data=response.data;
            $scope.time=Data[0].time;
            $scope.timeSim=[];
            for(var i=0;i<$scope.time.length;i++){
                $scope.timeSim[i]=($scope.time[i].substr(0,4));
            }
            $scope.pe=Data[1].pe;
            $scope.pb=Data[2].pb;
            $scope.ps=Data[3].ps;
            $scope.sinquarrevenpro=Data[4].sinquarrevenpro;
            $scope.sinquarnetpro=Data[5].sinquarnetpro;
            $scope.sinquarnetinrate=Data[6].sinquarnetinrate;
            $scope.sinquarroe=Data[7].sinquarroe;
            $scope.sinquarroa=Data[8].sinquarroa;

            $http({
                method: 'POST',
                url: 'http://localhost:8080/ComparisonOfIndustryHistory/ComparisonOfIndustryHistory_all'
            }).then(function successCallback(response) {
                var Data=response.data;
                $scope.peAll=Data[1].pe;
                $scope.pbAll=Data[2].pb;
                $scope.psAll=Data[3].ps;
                $scope.sinquarrevenproAll=Data[4].sinquarrevenpro;
                $scope.sinquarnetproAll=Data[5].sinquarnetpro;
                $scope.sinquarnetinrateAll=Data[6].sinquarnetinrate;
                $scope.sinquarroeAll=Data[7].sinquarroe;
                $scope.sinquarroaAll=Data[8].sinquarroa;
                $scope.createData();
                $scope.drawChart2();

            }, function errorCallback(response) {
                alert("error");
                // 请求失败执行代码
            });


        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });



        $http({
            method: 'POST',
            url: 'http://localhost:8080/ComparisonOfIndustryHistory/ComparisonOfIndustryHistory_shanghaiAndShenzhenAShares'
        }).then(function successCallback(response) {
            var Data=response.data;
            $scope.peSS=Data[1].pe;
            $scope.pbSS=Data[2].pb;
            $scope.psSS=Data[3].ps;
            $scope.sinquarrevenproSS=Data[4].sinquarrevenpro;
            $scope.sinquarnetproSS=Data[5].sinquarnetpro;
            $scope.sinquarnetinrateSS=Data[6].sinquarnetinrate;
            $scope.sinquarroeSS=Data[7].sinquarroe;
            $scope.sinquarroaSS=Data[8].sinquarroa;

        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

        $http({
            method: 'POST',
            url: 'http://localhost:8080/ComparisonOfIndustryHistory/ComparisonOfIndustryHistory_newThirdBoard'
        }).then(function successCallback(response) {
            var Data=response.data;
            $scope.peNTB=Data[1].pe;
            $scope.pbNTB=Data[2].pb;
            $scope.psNTB=Data[3].ps;
            $scope.sinquarrevenproNTB=Data[4].sinquarrevenpro;
            $scope.sinquarnetproNTB=Data[5].sinquarnetpro;
            $scope.sinquarnetinrateNTB=Data[6].sinquarnetinrate;
            $scope.sinquarroeNTB=Data[7].sinquarroe;
            $scope.sinquarroaNTB=Data[8].sinquarroa;

        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });
        
        $scope.createData=function () {
            switch ($scope.index){
                case '市盈率':
                    $scope.data2=$scope.pe;
                    $scope.title="市盈率同比行业历史比较"
                    switch ($scope.market){
                        case '全部':
                            $scope.data1=$scope.peAll;
                            alert($scope.data1[0])
                            $scope.data3=[];
                            for(var i=0;i<$scope.data1.lengh;i++){
                                $scope.data3[i]=$scope.data1[i]-$scope.data2[i];

                            }
                            alert(JSON.stringify($scope.data3))
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                        case '沪深A股':
                            $scope.data1=$scope.peSS;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                        case '新三板做市':
                            $scope.data1=$scope.peNTB;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                    }
                    break;
                case '市净率':
                    $scope.data2=$scope.pb;
                    $scope.title="市净率同比行业历史比较"

                    switch ($scope.market){
                        case '全部':
                            $scope.data1=$scope.pbAll;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                        case '沪深A股':
                            $scope.data1=$scope.pbSS;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                        case '新三板做市':
                            $scope.data1=$scope.pbNTB;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                    }
                    break;
                case '市销率':
                    $scope.data2=$scope.ps;
                    $scope.title="市销率同比行业历史比较"
                    switch ($scope.market){
                        case '全部':
                            $scope.data1=$scope.psAll;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                        case '沪深A股':
                            $scope.data1=$scope.psSS;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                        case '新三板做市':
                            $scope.data1=$scope.psNTB;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                    }
                    break;
                case '单季度营收同比':
                    $scope.data2=$scope.sinquarrevenpro;
                    $scope.title="单季度营收同比同比行业历史比较"
                    switch ($scope.market){
                        case '全部':
                            $scope.data1=$scope.sinquarrevenproAll;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                        case '沪深A股':
                            $scope.data1=$scope.sinquarrevenproSS;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                        case '新三板做市':
                            $scope.data1=$scope.sinquarrevenproNTB;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                    }
                    break;
                case '单季度净利同比':
                    $scope.data2=$scope.sinquarnetpro;
                    $scope.title="单季度净利同比同比行业历史比较"
                    switch ($scope.market){
                        case '全部':
                            $scope.data1=$scope.sinquarnetproAll;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                        case '沪深A股':
                            $scope.data1=$scope.sinquarnetproSS;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                        case '新三板做市':
                            $scope.data1=$scope.sinquarnetproNTB;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                    }

                    break;
                case '单季度净利率':
                    $scope.data2=$scope.sinquarnetinrate;
                    $scope.title="单季度净利率同比行业历史比较"
                    switch ($scope.market){
                        case '全部':
                            $scope.data1=$scope.sinquarnetinrateAll;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                        case '沪深A股':
                            $scope.data1=$scope.sinquarnetinrateSS;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                        case '新三板做市':
                            $scope.data1=$scope.sinquarnetinrateNTB;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                    }

                    break;
                case '单季度ROE':
                    $scope.data2=$scope.sinquarroe;
                    $scope.title="单季度ROE同比行业历史比较"
                    switch ($scope.market){
                        case '全部':
                            $scope.data1=$scope.sinquarroeAll;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                        case '沪深A股':
                            $scope.data1=$scope.sinquarroeSS;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                        case '新三板做市':
                            $scope.data1=$scope.sinquarroeNTB;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                    }
                    break;
                case '单季度ROA':
                    $scope.data2=$scope.sinquarroa;
                    $scope.title="单季度ROA同比行业历史比较"
                    switch ($scope.market){
                        case '全部':
                            $scope.data1=$scope.sinquarroaAll;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                        case '沪深A股':
                            $scope.data1=$scope.sinquarroaSS;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                        case '新三板做市':
                            $scope.data1=$scope.sinquarroaNTB;
                            $scope.data3=$scope.data1-$scope.data2;
                            $scope.data4=($scope.data1/$scope.data2).toFixed(2);
                            break;
                    }
                    break;
            }
        };
        /**
         * 画差异值为无的图表
         */
        $scope.drawChart1=function () {
            var myChart = echarts.init(document.getElementById('test'));

            var option = {
                color:['#344996','#88A500'],
                title : {
                    text: $scope.title,
                    left:'center'
                },
                legend: {
                    data:['汽车','全部A股'],
                    y:"bottom"
                },

                xAxis : [
                    {
                        data : $scope.timeSim,
                        axisLabel:{
                            interval:4,
                        }
                    }
                ],
                yAxis :{},
                series : [
                    {
                        name:'汽车',
                        type:'line',
                        data:$scope.data1
                    },
                    {
                        name:'全部A股',
                        type:'line',
                        data:$scope.data2
                    }
                ]
            };


            myChart.setOption(option);

        };

        /**
         * 画差异值为绝对差额的图表
         */
        $scope.drawChart2=function () {
            alert($scope.data3)
            var myChart = echarts.init(document.getElementById('test'));

            var option = {
                color:['#344996','#88A500','rgb(204,206,205)'],
                title : {
                    text: $scope.title,
                    left:'center'
                },
                legend: {
                    data:['汽车','全部A股','绝对差额'],
                    y:"bottom"
                },

                xAxis : [
                    {
                        data : $scope.timeSim,
                        axisLabel:{
                            interval:4,
                        }
                    }
                ],
                yAxis :{},
                series : [
                    {
                        name:'汽车',
                        type:'line',
                        data:$scope.data1
                    },
                    {
                        name:'全部A股',
                        type:'line',
                        data:$scope.data2
                    },
                    {
                        name:'绝对差额',
                        type:'bar',
                        data:$scope.data3
                    }
                ]
            };


            myChart.setOption(option);

        }
        /**
         * 画差异值为比值的图表
         */
        $scope.drawChart3=function () {

        };


    });