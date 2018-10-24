
angular.module('myApp.macroIndustryDisplay.hylsbj', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('hylsbjCtrl',function($scope, $route, $http) {
        //设置标题栏响应nav为active
        $($('.header_macro .module_nav .nav.active')).removeClass('active');
        $($('.header_macro .module_nav .nav')[4]).addClass('active');

        $scope.market="全部";
        $scope.index="市盈率";
        $scope.difference="无";



        $http({
            method: 'POST',
            url: urlHead+'ComparisonOfIndustryHistory/ComparisonOfIndustryHistory_allAShares'
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
                url: urlHead+'ComparisonOfIndustryHistory/ComparisonOfIndustryHistory_all'
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
                $scope.drawChart1();
                $scope.drawTable();

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
            url: urlHead+'ComparisonOfIndustryHistory/ComparisonOfIndustryHistory_shanghaiAndShenzhenAShares'
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
            url: urlHead+'ComparisonOfIndustryHistory/ComparisonOfIndustryHistory_newThirdBoard'
        }).then(function successCallback(response) {
            var Data=response.data;
            console.log(Data)
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
                    $scope.title="市盈率行业历史比较"
                    switch ($scope.market){
                        case '全部':
                            $scope.data1=$scope.peAll;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }
                            }
                            break;
                        case '沪深A股':
                            $scope.data1=$scope.peSS;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }

                            }                            break;
                        case '新三板做市':
                            $scope.data1=$scope.peNTB;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }

                            }                            break;
                    }
                    break;
                case '市净率':
                    $scope.data2=$scope.pb;
                    $scope.title="市净率行业历史比较"

                    switch ($scope.market){
                        case '全部':
                            $scope.data1=$scope.pbAll;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }

                            }                            break;
                        case '沪深A股':
                            $scope.data1=$scope.pbSS;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }

                            }                            break;
                        case '新三板做市':
                            $scope.data1=$scope.pbNTB;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }

                            }                            break;
                    }
                    break;
                case '市销率':
                    $scope.data2=$scope.ps;
                    $scope.title="市销率行业历史比较"
                    switch ($scope.market){
                        case '全部':
                            $scope.data1=$scope.psAll;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }

                            }                            break;
                        case '沪深A股':
                            $scope.data1=$scope.psSS;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }

                            }                            break;
                        case '新三板做市':
                            $scope.data1=$scope.psNTB;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }
                            }                            break;
                    }
                    break;
                case '单季度营收同比':
                    $scope.data2=$scope.sinquarrevenpro;
                    $scope.title="单季度营收同比行业历史比较"
                    switch ($scope.market){
                        case '全部':
                            $scope.data1=$scope.sinquarrevenproAll;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }

                            }                            break;
                        case '沪深A股':
                            $scope.data1=$scope.sinquarrevenproSS;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }
                            }                            break;
                        case '新三板做市':
                            $scope.data1=$scope.sinquarrevenproNTB;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }
                            }                            break;
                    }
                    break;
                case '单季度净利同比':
                    $scope.data2=$scope.sinquarnetpro;
                    $scope.title="单季度净利同比行业历史比较"
                    switch ($scope.market){
                        case '全部':
                            $scope.data1=$scope.sinquarnetproAll;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }

                            }                            break;
                        case '沪深A股':
                            $scope.data1=$scope.sinquarnetproSS;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }

                            }                            break;
                        case '新三板做市':
                            $scope.data1=$scope.sinquarnetproNTB;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }
                            }                            break;
                    }

                    break;
                case '单季度净利率':
                    $scope.data2=$scope.sinquarnetinrate;
                    $scope.title="单季度净利率行业历史比较"
                    switch ($scope.market){
                        case '全部':
                            $scope.data1=$scope.sinquarnetinrateAll;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }

                            }                            break;
                        case '沪深A股':
                            $scope.data1=$scope.sinquarnetinrateSS;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }

                            }                            break;
                        case '新三板做市':
                            $scope.data1=$scope.sinquarnetinrateNTB;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }
                            }                            break;
                    }

                    break;
                case '单季度ROE':
                    $scope.data2=$scope.sinquarroe;
                    $scope.title="单季度ROE行业历史比较"
                    switch ($scope.market){
                        case '全部':
                            $scope.data1=$scope.sinquarroeAll;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }

                            }                            break;
                        case '沪深A股':
                            $scope.data1=$scope.sinquarroeSS;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }

                            }                            break;
                        case '新三板做市':
                            $scope.data1=$scope.sinquarroeNTB;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }

                            }                            break;
                    }
                    break;
                case '单季度ROA':
                    $scope.data2=$scope.sinquarroa;
                    $scope.title="单季度ROA行业历史比较"
                    switch ($scope.market){
                        case '全部':
                            $scope.data1=$scope.sinquarroaAll;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }

                            }                            break;
                        case '沪深A股':
                            $scope.data1=$scope.sinquarroaSS;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }

                            }                            break;
                        case '新三板做市':
                            $scope.data1=$scope.sinquarroaNTB;
                            $scope.data3=[];
                            $scope.data4=[];
                            for(var i=0;i<$scope.data1.length;i++){
                                if($scope.data1[i]!='--') {
                                    $scope.data3[i] = ($scope.data1[i] - $scope.data2[i]).toFixed(2);
                                    $scope.data4[i] = ($scope.data1[i] / $scope.data2[i]).toFixed(2);
                                }
                                else{
                                    $scope.data3[i]='--';
                                    $scope.data4[i]='--';

                                }
                            }                            break;
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
                    left:'center',
                    textStyle: {
                        color: '#d6d6d6'
                    }
                    },
                legend: {
                    data:['汽车','全部A股'],
                    y:"bottom",
                    textStyle: {
                        color: '#d6d6d6'
                    }
                },

                xAxis : [
                    {
                        data : $scope.timeSim,
                        axisLabel:{
                            interval:4,
                            show: true,
                            textStyle: {
                                color: '#d6d6d6'
                            }
                        }

                    }
                ],
                yAxis :{
                    axisLabel:{
                        show: true,
                        textStyle: {
                            color: '#d6d6d6'
                        }
                    }
                },
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
            var myChart = echarts.init(document.getElementById('test'));

            var option = {
                color:['#344996','#88A500','rgb(204,206,205)'],
                title : {
                    text: $scope.title,
                    left:'center',
                    textStyle: {
                        color: '#d6d6d6'
                    }
                },
                legend: {
                    data:['汽车','全部A股','绝对差额'],
                    y:"bottom",
                    textStyle: {
                        color: '#d6d6d6'
                    }
                    },

                xAxis : [
                    {
                        data : $scope.timeSim,
                        axisLabel:{
                            interval:4,
                            show: true,
                            textStyle: {
                                color: '#d6d6d6'
                            }
                        }
                    }
                ],
                yAxis :[{
                        name:$scope.title.substr(0,$scope.title.length-6),
                        nameTextStyle:{
                            color:"#d6d6d6"
                        },
                        type:'value',
                        axisLabel:{
                            show: true,
                            textStyle: {
                                color: '#d6d6d6'
                            }
                        },
                },
                    {
                        name:'绝对差额',
                        nameTextStyle:{
                            color:"#d6d6d6"
                        },
                        type:'value',
                        axisLabel:{
                            show: true,
                            textStyle: {
                                color: '#d6d6d6'
                            }
                        }
                    }
                ],
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
                        type:'line',
                        itemStyle: {normal: {areaStyle: {}}},
                        data:$scope.data3,
                        yAxisIndex:1

                    }
                ]
            };


            myChart.setOption(option);

        }
        /**
         * 画差异值为比值的图表
         */
        $scope.drawChart3=function () {
            var myChart = echarts.init(document.getElementById('test'));

            var option = {
                color:['#344996','#88A500','rgb(204,206,205)'],
                title : {
                    text: $scope.title,
                    left:'center',
                    textStyle: {
                        color: '#d6d6d6'
                    }
                },
                legend: {
                    data:['汽车','全部A股','比值'],
                    y:"bottom",
                    textStyle: {
                        color: '#d6d6d6'
                    }
                },

                xAxis : [
                    {
                        data : $scope.timeSim,
                        axisLabel:{
                            interval:4,
                            color:"#d6d6d6"
                        }
                    }
                ],
                yAxis :[{
                    name:$scope.title.substr(0,$scope.title.length-6),
                    nameTextStyle:{
                        color:"#d6d6d6"
                    },
                    type:'value',
                    axisLabel:{
                        color:"#d6d6d6"
                    }
                },
                    {
                        name:'比值',
                        nameTextStyle:{
                            color:"#d6d6d6"
                        },
                        type:'value',
                        axisLabel:{
                            color:"#d6d6d6"
                        }
                    }
                ],
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
                        name:'比值',
                        type:'bar',
                        data:$scope.data4,
                        yAxisIndex:1
                    }
                ]
            };


            myChart.setOption(option);
        };

        $scope.changeMarket=function () {
            $scope.createData();
            $scope.drawTable();
            switch ($scope.difference){
                case '无':
                    $scope.drawChart1();
                    break;
                case '绝对差额':
                    $scope.drawChart2();
                    break;
                case '比值':
                    $scope.drawChart3();
                    break;
            }
        };

        $scope.changeIndex=function () {
            $scope.createData();
            $scope.drawTable();
            switch ($scope.difference){
                case '无':
                    $scope.drawChart1();
                    break;
                case '绝对差额':
                    $scope.drawChart2();
                    break;
                case '比值':
                    $scope.drawChart3();
                    break;
            }
        };

        $scope.changeDifference=function () {
            var myChart = echarts.init(document.getElementById('test'));
            $scope.createData();
            $scope.drawTable();
            switch ($scope.difference){
                case '无':
                    myChart.clear();
                    $scope.drawChart1();
                    break;
                case '绝对差额':
                    myChart.clear();
                    $scope.drawChart2();
                    break;
                case '比值':
                    myChart.clear();
                    $scope.drawChart3();
                    break;
            }
        };

        $scope.drawTable=function () {
          var str="";
          str+="<tr>\n" +
              "  <th>时间</th>\n" +
              "  <th>汽车</th>\n" +
              "  <th>全部A股</th>\n" +
              "  <th>绝对差额</th>\n" +
              "  <th>比值</th>\n" +
              "\n" +
              "</tr>";

          for(var i=0;i<$scope.time.length;i++){
              str+="<tr><td>"+$scope.time[i]+"</td>\n" +
                  "<td>"+$scope.data1[i]+"</td>\n" +
                  "<td>"+$scope.data2[i]+"</td>\n" +
                  "<td>"+$scope.data3[i]+"</td>\n" +
                  "<td>"+$scope.data4[i]+"</td></tr>";
          }

          document.getElementById('table').innerHTML=str;

        };
    });