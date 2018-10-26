angular.module('myApp.microIndustryChain.peAnalysis', [])
    .controller('PeAnalysisCtrl', function ($scope, items,$uibModalInstance) {

        $scope.id = items.id;
        $scope.name = items.name;
        $scope.data = items.data;
        $scope.render = false;
        $scope.historyList = [{}, {}, {}];
        $scope.lineChart;

        console.log("id: " + $scope.id);

        items.scope.modalInstance.rendered.then(function () {


            $.get(urlHead + 'PEValuation/demo', {
                stkcd: $scope.id
            }, res => {
                $scope.render = true;
                $scope.data = JSON.parse(res);
                let now = new Date();
                $scope.data.date = now.getMonth() + 1 + "-" + now.getDate();
                document.getElementById("spinner").click();
            });
            $.get(urlHead + 'PEValuation/getHistoryPE', {
                stkcd: $scope.id,
                timeInterval: '两年',
            }, res => {
                $scope.historyList[0] = JSON.parse(res);
                document.getElementById('defaultYear').click();
            });
            $.get(urlHead + 'PEValuation/getHistoryPE', {
                stkcd: $scope.id,
                timeInterval: '一年',
            }, res => {
                $scope.historyList[1] = JSON.parse(res);
            });
            $.get(urlHead + 'PEValuation/getHistoryPE', {
                stkcd: $scope.id,
                timeInterval: '半年',
            }, res => {
                $scope.historyList[2] = JSON.parse(res);
            })
        });

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.getHistory = function (index) {
            console.log('get History');
            console.log($scope.historyList);
            $scope.lineChart = echarts.init(document.getElementById('lineChart'))
            initLineChart($scope.lineChart)
            refreshLinchartData($scope.lineChart, $scope.historyList[index]);
        }


    })

function initLineChart(linechart) {
    let option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'center',
            text: '大数据量面积图',
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ''
        },
        yAxis: {
            type: 'value',
            boundaryGap: false
        },
        series: [
            {
                name: 'pe',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },

                data: ''
            }
        ]
    };
    linechart.setOption(option);
}

function refreshLinchartData(chart, data) {
    let option = chart.getOption();
    option.series[0].data = Object.values(data);
    option.xAxis[0].data = Object.keys(data);
    console.log('hererer');
    console.log(option);
    chart.setOption(option);
}