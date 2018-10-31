angular.module('myApp.industryFactorAnalyze', [
])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('IndustryFactorAnalyzeCtrl',function($scope, $route, $http, $state) {
        $scope.toShowResult=false;
        $scope.RESULT='正在分析...';
        //指标部分
        $scope.index_recommend = ['安全性-存货周转率', '成长-ROE变动', '估值类-股息率'];
        $scope.index_selectable = ['安全性-存货周转率','安全性类-速动比率','安全性类-总资产周转率', '成长-ROE变动', '成长类-GPOA变动', '成长类-毛利润增长率',
            '分析师类-一致预期PB', '分析师类-一致预期预测营业收入', '分析师类-最近一个月券商覆盖数量（券商家数）变化', '估值类-股息率', '估值类-市销率的倒数',
            '估值类-市盈率的倒数', '价量-6日成交额标准差', '价量-6日成交额均值（千元）', '价量-20日特雷诺比率', '价量-60日特雷诺比率', '盈利质量-累计成本费用利润率',
            '盈利质量-所得税占盈利总额百分比'];
        var index_selectable_eng = ['InventoryTurnover', 'Quick_Ratio','TurnoverOfTotalAssets','ROE_change','GPOA_change','ProfitGrowthRate',
            'ConsistenceExpectation','ConsistenceExpectationPredictProfit','DealersNumChange_1M','DividendRate','MarketSellingRateRec',
            'PE_RatioRec', 'TurnoverStd_6D', 'TurnoverMean_6D', 'TenoreRatio_20D', 'TenoreRatio_60D', 'CostProfitMarginCumu', 'IncometaxProfitPercent'];

        $scope.index_unselectable = ['zzz1','zzz2', 'zzz3'];

        $scope.description_toShow = 'Tip:点击指标名查看详细信息';
        $scope.numIsShow = false;
        $scope.num_toShow = 0;

        $scope.index_selected = '';
        var index_selected_list = [];
        $scope.index_selected_list = [];

        var index_default = '安全性-存货周转率';

        $scope.toShowRatio = false;         //显示填写比例

        //方法部分
        $scope.method_list = [
            {name: 'IC-mean', description: '衡量您所选择的因子的选股能力，越大，则说明您选择的因子在您选择股票时越有效'},
            {name: 'IC-IR', description: '衡量您所选的因子的选股能力和稳定性，越大，则说明您选择的因子选股能力越强、越稳定'},
            // {name: '一元线性回归', description: '经典方法，为您计算因子之间的函数关系'},
            {name: 'IC-T', description: '衡量您所选的因子对收益率是否有影响，越接近于0，则影响越弱'},
            {name: '多空收益', description: '探究您选择的因子对整个行业收益率的影响'},
            // {name: '复合因子IC', description: '当您想要研究复合因子的选股能力、稳定性时的最佳选择'}
        ];
        $scope.method_selected = '';
        // console.log($scope.method_list)

        var method_default = 'IC-IR';

        //显示方法的公式图片
        $scope.toShowAnalyzeDetail = false;     //显示分析详情
        $scope.detailOfMethodToShow = '';       //要显示的方法

        /**
         * -----------------------------------------------------------------------------
         * -----------------------------------------------------------------------------
         * 监听
         */
        //点击标题
        $('.part .section h4').click(function () {
            $(this).parent().children('.list_container').toggle('fast');
        })

        //点击后显示详细信息
        $scope.clickToShowDescription_index = function (item) {
            var descriptionAndNum = getDescriptionAndNum(item);
            $scope.description_toShow = descriptionAndNum.description;
            $scope.num_toShow = descriptionAndNum.num;
            $scope.numIsShow = true;
        }
        $scope.clickToShowDescription_method = function (item){

        }

        //进行分析按钮的监听
        $scope.clickToAnalyze = function () {
            if(index_selected_list.length == 1){        //普通方法
                analyze_single(index_selected_list[0], $scope.method_selected);
                $scope.RESULT = '正在分析...';
                $scope.toShowAnalyzeDetail = false;
                $scope.toShowResult=true;
            }
            else if(index_selected_list.length > 1){        //复合因子
                //显示填写的列表
                $scope.toShowRatio = true;
            }

            // switch ($scope.method_selected){
            //     case 'IC-mean':
            //         $scope.RESULT='您所选择的指标和行业股票的收益率之间有较强的相关性。';
            //         document.getElementById('resultSpan').innerText=$scope.RESULT;
            //         break;
            //     case 'IC-IR':
            //         $scope.RESULT='您所选择的指标和行业股票的收益率之间有相关性，且相关性较稳定。';
            //         document.getElementById('resultSpan').innerText=$scope.RESULT;
            //         break;
            //     case 'IC-T':
            //         $scope.RESULT='您所选择的指标和行业股票的收益率之间相关性较不显著。';
            //         document.getElementById('resultSpan').innerText=$scope.RESULT;
            //         break;
            //     case '多空收益':
            //         $scope.RESULT='多空收益可用来探究您选择的因子对整个行业股票收益率的影响；你所选择的因子对应的多空收益为：40%。';
            //         document.getElementById('resultSpan').innerText=$scope.RESULT;
            //         break;
            //     default:
            //         $scope.RESULT='';
            //         break;
            // }

        }

        //复合因子确认分析按钮的监听
        $scope.clickSureToAnalyze = function(){
            // console.log($('.ratio_container .input_number'))
            var ratioList = [];
            var total = 0;
            var hasNull = false;
            $('.ratioItem_container .input_number').each(function () {
            // $('.ratio_container .input_number').each(function () {
                // console.log($(this).val())
                if($(this).val() > 0){
                    ratioList.push(parseInt($(this).val()));
                    total += parseInt($(this).val());
                }
                else{
                    hasNull = true;
                    return;
                }
            });
            if(hasNull){
                return;
            }
            console.log(total)
            //处理ratio
            for(var i = 0; i < ratioList.length; i++){
                ratioList[i] = ratioList[i]/total * 100;
            }

            //调用方法
            analyze_multi(index_selected_list,$scope.method_selected , ratioList);

            $scope.RESULT = '正在分析...';
            $scope.toShowAnalyzeDetail = false;
            $scope.toShowResult=true;
        }

        /**
         * 页面加载完毕时
         */
        $().ready(function () {
            // console.log($('.list_container li'))
            /**
             * 各个item的监听
             */
            //推荐指标
            $('.item_recommend').click(function () {
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $('.item_index[name='+$(this).attr('name')+']').removeClass('active');      //同步
                }
                else{
                    $(this).addClass('active');
                    $('.item_index[name='+$(this).attr('name')+']').addClass('active');
                }
                //更新已选列表
                index_selected_list = [];
                var selectedIndexItems = $('.item_index.active');
                for(var i = 0; i < selectedIndexItems.length; i++){
                    var temp = selectedIndexItems[i];
                    index_selected_list.push($(temp).attr('name'));
                }
                // console.log(index_selected_list)
                $scope.index_selected_list = index_selected_list;
                $scope.index_selected = index_selected_list.toString();
                $scope.$apply();

                //分析按钮的可用设置
                if(index_selected_list.length > 0){
                    $('.btn_analyze').attr('disabled', false);
                }
                else{
                    $('.btn_analyze').attr('disabled', true);
                }
            });
            //全部指标
            $scope.clickIndexItem = function ($event) {
                var item_index = $event.target;
                // console.log(item_index)
                if($(item_index).hasClass('active')){
                    $(item_index).removeClass('active');
                    $('.item_recommend[name='+$(item_index).attr('name')+']').removeClass('active');      //同步
                }
                else{
                    $(item_index).addClass('active');
                    $('.item_recommend[name='+$(item_index).attr('name')+']').addClass('active');
                }
                //更新已选列表
                index_selected_list = [];
                var selectedIndexItems = $('.item_index.active');
                for(var i = 0; i < selectedIndexItems.length; i++){
                    var temp = selectedIndexItems[i];
                    index_selected_list.push($(temp).attr('name'));
                }
                // console.log(index_selected_list)
                $scope.index_selected_list = index_selected_list;
                $scope.index_selected = index_selected_list.toString();

                //分析按钮的可用设置
                if(index_selected_list.length > 0){
                    $('.btn_analyze').attr('disabled', false);
                }
                else{
                    $('.btn_analyze').attr('disabled', true);
                }
            };
            //方法
            $('.item_method').click(function () {
                if($(this).hasClass('active')){
                    return;
                }
                else{
                    $('.item_method.active').removeClass('active');
                    $(this).addClass('active');
                }
                //更新已选列表
                $scope.method_selected = $(this).attr('name');
                $scope.$apply();
            });

            /**
             * 监听复选框(指标)
             */
            $('.part .index_container .section .list_container li .checkBox').on('change', function () {
                // console.log($('.part .section .list_container .checkBox:checked'))
                if($(this) == $('.part .section .list_container .checkBox:checked')){
                    console.log('1')
                }

                var item = $(this).parent().children('a').text();
                // console.log(item)
                var liList = $('.part .index_container .section .list_container li');
                // console.log(liList)
                for(var i = 0; i < liList.length; i++){         //推荐指标和全部指标里同一个指标要同步
                    var curLi = liList[i];
                    var a_child = $(curLi).children('a');
                    var checkBox_child = $(curLi).children('.checkBox');
                    if(a_child.text() == item){
                        // console.log('2')
                        // console.log(checkBox_child.prop('checked'))
                        checkBox_child.prop('checked', $(this).prop('checked'))
                    }
                }

                index_selected_list = [];
                for(var i = 0; i < liList.length; i++) {         //更新所选的指标列表
                    var curLi = liList[i];
                    var a_child = $(curLi).children('a');
                    var checkBox_child = $(curLi).children('.checkBox');

                    // console.log(checkBox_child.prop('checked'))
                    if(checkBox_child.prop('checked')){
                        if(index_selected_list.indexOf(a_child.text()) < 0){
                            index_selected_list.push(a_child.text().replace(/^\s+|\s+$/g,""));
                        }
                    }
                }
                // console.log(index_selected_list)
                $scope.index_selected = index_selected_list.toString();
                $scope.index_selected_list = index_selected_list;

                // //如果选择多个，就只能选择复合因子,并自动选中
                // if(index_selected_list.length > 1){
                //     $('.part .method_container .section .list_container .checkBox').attr('disabled', true);
                //     $('.part .method_container .section .list_container .checkBox:last').attr('disabled', false);
                //     $('.part .method_container .section .list_container .checkBox:checked').prop('checked', false);
                //     $('.part .method_container .section .list_container .checkBox:last').prop('checked', true);
                //     $scope.method_selected = '复合因子IC';
                // }
                // else{       //如果只有一个，不能选择复合因子
                //     $('.part .method_container .section .list_container .checkBox').attr('disabled', false);
                //     $('.part .method_container .section .list_container .checkBox:last').prop('checked', false);
                //     $('.part .method_container .section .list_container .checkBox:last').attr('disabled', true);
                //     $($('.part .method_container .section .list_container .checkBox')[1]).prop('checked', true);
                //     $scope.method_selected = 'IC-IR';
                // }

                //分析按钮的可用设置
                if(index_selected_list.length > 0){
                    $('.btn_analyze').attr('disabled', false);
                }
                else{
                    $('.btn_analyze').attr('disabled', true);
                }

                // $scope.$apply();        //应用更改

            })

            /**
             * 监听复选框(方法)
             */
            $('.part .method_container .section .list_container .checkBox').on('change', function () {
                $('.part .method_container .section .list_container .checkBox:checked').prop('checked', false);
                $(this).prop('checked', true);

                $scope.method_selected = $(this).parent().text().replace(/^\s+|\s+$/g,"");
                // console.log($scope.method_selected)
                // $scope.$apply();        //应用更改
            })

            // setDefaultIndexAndMethod();
            setTimeout(setDefaultIndexAndMethod, 200);
            setTimeout(realyReady, 200);

            // $scope.$apply();        //应用更改
        })

        /**
         * 由ready函数延时执行，给时间加载完毕
         */
        function realyReady() {
            $('.item_index').each(function () {
                if($(this)[0].scrollWidth > $(this).width()+28){
                    // console.log($(this).attr('name'));
                    $(this).addClass('long')
                }
            });
        }

        /**
         * 设置默认指标和方法
         */
        function setDefaultIndexAndMethod() {
            $('.item_recommend[name='+index_default+']').addClass('active');
            $('.item_index[name='+index_default+']').addClass('active');
            index_selected_list = [index_default];
            $scope.index_selected_list = [index_default];
            $scope.index_selected = index_selected_list.toString();

            $('.item_method[name='+method_default+']').addClass('active');
            $scope.method_selected = method_default;


            // $('.part .index_container .section .list_container li').each(function () {
            //     // console.log($(this).children('a').text().replace(/^\s+|\s+$/g,""))
            //     if($(this).children('a').text().replace(/^\s+|\s+$/g,"") == index_default){
            //         $(this).children('.checkBox').prop('checked', true);
            //         index_selected_list = [index_default];
            //         $scope.index_selected_list = [index_default];
            //         $scope.index_selected = index_selected_list.toString();
            //     }
            // })
            // $($('.part .method_container .section .list_container .checkBox')[1]).prop('checked', true);
            // $scope.method_selected = method_default;

            // $('.part .method_container .section .list_container .checkBox:last').attr('disabled', true);

            // $scope.$apply();
        }

        /**
         * ----------------------------------------------------------------
         * ----------------------------------------------------------------
         * 属性处理
         */
        var indexList = ['安全性-存货周转率','安全性类-速动比率','安全性类-总资产周转率', '成长-ROE变动', '成长类-GPOA变动', '成长类-毛利润增长率',
            '分析师类-一致预期PB', '分析师类-一致预期预测营业收入', '分析师类-最近一个月券商覆盖数量（券商家数）变化', '估值类-股息率', '估值类-市销率的倒数',
            '估值类-市盈率的倒数', '价量-6日成交额标准差', '价量-6日成交额均值（千元）', '价量-20日特雷诺比率', '价量-60日特雷诺比率', '盈利质量-累计成本费用利润率',
            '盈利质量-所得税占盈利总额百分比'];
        var descriptionList = [
            '对流动资产周转率的补充说明,是衡量企业销售能力及存货管理水平的综合性指标',
            '企业速动资产与流动负债的比率，速动资产是企业的流动资产减去存货和预付费用后的余额，主要包括现金、短期投资、应收票据、应收账款等项目',
            '企业一定时期的销售收入净额与平均资产总额之比,它是衡量资产投资规模与销售水平之间配比情况的指标',
            '股东股权投资的报酬率的变化率',
            'GPOA的变化率',
            '利润总额的增长率',
            '基于各券商分析师的调查(研究报告,电话,Email等等)的上市公司盈利预期数据平均值',
            '基于各券商分析师的调查(研究报告,电话,Email等等)的上市公司营业收入数据平均值',
            '最近一个月券商覆盖数量（券商家数）变化',
            '一年的总派息额与当时市价的比例',
            '总市值除以主营业务收入或者股价除以每股销售额的倒数',
            '每股市價除以每股盈利的倒数',
            '成交额在6天内的波动情况',
            '6天成交额的均值',
            '每单位风险获得的风险溢价，是投资者判断某一基金管理者在管理基金过程中所冒风险是否有利于投资者的判断指标（以20天计）',
            '每单位风险获得的风险溢价，是投资者判断某一基金管理者在管理基金过程中所冒风险是否有利于投资者的判断指标（以60天计）',
            '企业一定期间累计的利润总额与成本、费用总额的比率',
            '企业的所得税占盈利总额百分比'
        ];
        var numList = [19,8,4,6,2,11,5,6,4,6,12,11,2,15,10,2,9,5,10];

        /**
         * 获取指标的详细信息
         * @param index
         * @returns {description:string, num:int}
         */
        function getDescriptionAndNum(index) {
            var result = {description: '当前指标没有详细信息', num: 0};
            var tempI = indexList.indexOf(index);
            if(tempI >= 0){
                result.description = descriptionList[tempI];
                result.num = numList[tempI];
            }
            return result;
        }


        /**
         * ----------------------------------
         * ----------------------------------
         * http请求
         */
        // //获取最近选择人数
        // $http({
        //     method: 'post',
        //     url: urlHead+'CorrelationAnalysis/IndexClicks'
        // }).then(function successCallBack(response) {
        //     console.log(response.data);
        //     var data = response.data;
        //     for(var i = 0; i < index_selectable_eng.length; i++){
        //         // console.log(data[index_selectable_eng[i]])
        //         numList[i] = data[index_selectable_eng[i]];
        //         // console.log(numList[i])
        //     }
        //
        // },function errorCallBack(response) {
        //     console.error('获取最近选择人数失败');
        // });

        //进行分析，单个指标的
        function analyze_single(index, method) {
            $http({
                method: 'post',
                url: urlHead+'CorrelationAnalysis/AnalysisIndustry',
                params: {
                    index: index,
                    analysisMethod: method
                }
            }).then(function successCallBack(response) {
                console.log(response.data);
                $scope.RESULT = response.data;

                $scope.toShowAnalyzeDetail = true;     //显示分析详情
                $scope.detailOfMethodToShow = $scope.method_selected;       //要显示的方法

                $scope.$apply;
            },function errorCallBack(response) {
                console.error('分析失败');
                $scope.RESULT = '分析失败';

                $scope.$apply;

                return '';
            });
        }

        //进行分析，复合因子
        function analyze_multi(index_selected_list, method, ratioList) {
            var form_data = new FormData();
            form_data.append('indexes', index_selected_list);
            form_data.append('analysisMethod', method);
            form_data.append('ratio', ratioList);

            $http({
                method: 'post',
                url: urlHead+'CorrelationAnalysis/Multi_FactorsAnalysis',
                // data: {
                //     indexes: index_selected_list,
                //     analysisMethod: method,
                //     ratio: ratioList
                // },
                data: form_data,
                transformRequest: angular.identity,     //使用angular传参认证
                headers: {
                    'Content-Type': undefined           //设置请求头
                }
            }).then(function successCallBack(response) {
                console.log(response.data);
                $scope.RESULT = response.data;

                $scope.toShowAnalyzeDetail = true;     //显示分析详情
                $scope.detailOfMethodToShow = $scope.method_selected;       //要显示的方法

                $scope.$apply;
            },function errorCallBack(response) {
                console.error('分析失败');
                $scope.RESULT = '分析失败';
                $scope.$apply;

                return '';
            });
        }

        // initICOriginalChart();
        // initICSeriesChart();
        // initICQQCharts();
        // initICHeatMapChart();
        // initICValueChart();
        /**
         * -----------------------------------------------------------------
         * -----------------------------------------------------------------
         * eCharts
         */
        //IC原始数据图
        function initICOriginalChart() {
            var xData = ['xx1','xx2','xx3'];
            var y0Data = [1,2,3];
            var y1Data = [3,2,1];
            var factorName = '指标';

            var dom = document.getElementById("ICOriginalChart");
            var myChart = echarts.init(dom);
            var option;
            option = {
                title:{
                    text: 'IC原始数据',
                    left: 'center'
                },
                legend:{
                    data:[factorName, '股价'],
                    top: 'bottom'
                },
                tooltip:{
                    trigger: 'axis',
                    axisPointer:{
                        show: true,
                        type : 'cross',
                        lineStyle: {
                            type : 'dashed',
                            width : 1
                        }
                    }
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataZoom : {show: true},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                xAxis : [
                    {
                        // name: '公司名称',
                        // nameGap: 30,
                        type : 'category',
                        data: xData
                    }
                ],
                yAxis: [
                    {
                        name: factorName,
                        type: 'value',
                        scale: true,
                        boundaryGap : ['10%', '10%'],
                    },
                    {
                        name: '股价',
                        type: 'value',
                        scale: true,
                        boundaryGap : ['10%', '10%'],
                    }
                ],
                series: [
                    {
                        name: factorName,
                        type: 'scatter',
                        yAxisIndex: 0,
                        data: y0Data
                    },
                    {
                        name: '股价',
                        type: 'scatter',
                        yAxisIndex: 1,
                        data: y1Data
                    }
                ]
            }
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        }
        //IC值序列图
        function initICSeriesChart() {
            var xData = ['2016-10-06','2016-12-08','2017-5-06'];
            var y0Data = [1,2.5,3];
            var y1Data = [3,1.5,1];

            var dom = document.getElementById("ICSeriesChart");
            var myChart = echarts.init(dom);
            var option;
            option = {
                title:{
                    text: 'IC值序列',
                    left: 'center'
                },
                legend:{
                    data:['IC', '1 month moving avg'],
                    top: 'bottom'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer:{
                        show: true,
                        type : 'cross',
                        lineStyle: {
                            type : 'dashed',
                            width : 1
                        }
                    },
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataZoom : {show: true},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                xAxis : [
                    {
                        name: '日期',
                        type : 'category',
                        data: xData,
                        scale: true,
                        boundaryGap: false
                    }
                ],
                yAxis: [
                    {
                        name: 'IC',
                        type: 'value',
                        boundaryGap : ['10%', '10%'],
                    }
                ],
                series: [
                    {
                        name: 'IC',
                        type: 'line',
                        smooth: false,
                        data: y0Data,
                        symbol: 'none'
                    },
                    {
                        name: '1 month moving avg',
                        type: 'line',
                        smooth: false,
                        data: y1Data,
                        symbol: 'none'
                    }
                ]
            }
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        }
        //IC_QQ图
        function initICQQCharts() {
            var data = [[0,0],[1,1],[2,2.5],[3,3],[4,3.5]];
            var myRegression = ecStat.regression('linear', data);

            var dom = document.getElementById("ICQQChart");
            var myChart = echarts.init(dom);
            var option;
            option = {
                title:{
                    text: '1 Period IC Normal Dist. Q-Q',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer:{
                        show: true,
                        type : 'cross',
                        lineStyle: {
                            type : 'dashed',
                            width : 1
                        }
                    },
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataZoom : {show: true},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                xAxis : [
                    {
                        name: 'Normal Distribution Quantile',
                        nameLocation: 'center',
                        nameGap: 30,
                        type : 'value',
                        boundaryGap : ['5%', '5%'],
                        axisLine:{
                            onZero: false,
                        }
                    }
                ],
                yAxis: [
                    {
                        name: 'Observed Quantile',
                        nameLocation: 'center',
                        nameRotate: 90,
                        nameGap: 35,
                        type: 'value',
                        boundaryGap : ['5%', '5%'],
                        axisLine:{
                            onZero: false,
                        }
                    }
                ],
                series: [
                    {
                        type: 'scatter',
                        data: data,
                    },
                    {
                        type: 'line',
                        smooth: true,
                        data: myRegression.points,
                        symbol: 'none',
                        markPoint: {
                            itemStyle: {
                                normal: {
                                    color: 'transparent'
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'left',
                                    formatter: myRegression.expression,
                                    textStyle: {
                                        color: '#333',
                                        fontSize: 14
                                    }
                                }
                            },
                            data: [{
                                coord: myRegression.points[myRegression.points.length - 1]
                            }]
                        }
                    }
                ]
            }
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        }
        //IC热力图
        function initICHeatMapChart() {
            var xData = [1,2,3,4];
            var yData = [2016,2015,2014,2013];
            var data = [[0,0,1],[1,0,1],[2,0,2],[3,0,4],[0,1,2],[1,1,5],[2,1,0],[3,1,3],[0,2,1],[1,2,1],[2,2,2],[3,2,4],[0,3,6],[1,3,4],[2,3,1],[3,3,8]];

            var dom = document.getElementById("ICHeatMapChart");
            var myChart = echarts.init(dom);
            var option;
            option = {
                title: {
                    text: '1 Period IC Normal Dist. Q-Q',
                    left: 'center'
                },
                tooltip: {
                    position: 'top'
                },
                grid: {
                    height: '50%',
                    y: '10%'
                },
                xAxis: {
                    type: 'category',
                    data: xData,
                    splitArea: {
                        show: true
                    }
                },
                yAxis: {
                    type: 'category',
                    data: yData,
                    splitArea: {
                        show: true
                    }
                },
                visualMap: {
                    min: 0,
                    max: 10,
                    calculable: true,
                    orient: 'horizontal',
                    left: 'center',
                },
                series: [{
                    name: 'IC',
                    type: 'heatmap',
                    data: data,
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        }
        //ICValue图
        function initICValueChart() {
            var icName = 'IC-mean';
            var icValue = 0.07;
            var markLineData = [0.02, 0.05, 0.1];

            var dom = document.getElementById("ICValueChart");
            var myChart = echarts.init(dom);
            var option;
            option = {
                title:{
                    text: 'IC 值',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    axisPointer:{
                        show: true,
                        type : 'cross',
                        lineStyle: {
                            type : 'dashed',
                            width : 1
                        }
                    },
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataZoom : {show: true},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                xAxis : [
                    {
                        type : 'category',
                        data : [icName]
                    }
                ],
                yAxis: [
                    {
                        name: '值',
                        type: 'value'
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        data: [icValue],
                        barWidth: 65,
                        markLine:{
                            data: [
                                {
                                    yAxis: 0.02,
                                    color: '#c3c3c3',
                                },
                                {
                                    yAxis: 0.05,
                                    color: '#c3c3c3',
                                },
                                {
                                    yAxis: 0.1
                                }
                            ]
                        },
                        markArea:{
                            label:{
                                normal:{
                                    show: false,
                                }
                            },
                            tooltip:{
                                formatter: '{b}'
                            },
                            itemStyle: {
                                normal:{
                                    color: 'transparent'
                                },
                            },
                            data:[
                                [
                                    {
                                        name: '0.02<x<=0.05: 您所选择的指标和行业股票的收益率之间相关性较弱',
                                        yAxis: 0.02
                                    },
                                    {
                                        yAxis: 0.05
                                    },
                                ]
                            ]
                        }
                    }
                ]
            }
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        }
    });