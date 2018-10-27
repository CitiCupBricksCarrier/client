angular.module('myApp.microIndustryChain.financialContrast', [
    'ui.bootstrap'
])
    .controller('FinancialContrastCtrl', function ($scope, items, $uibModal, $uibModalInstance) {

        $scope.id = items.id;
        $scope.name = items.name;
        $scope.company = null;

        $scope.datas = []; //下拉框选项
        $scope.hidden = true;//选择框是否隐藏
        $scope.searchField = '';//文本框数据
        $scope.stkidB = ''
        $scope.nameB = ''
        $scope.time = '';


        //将下拉选的数据值赋值给文本框
        $scope.change = function (x) {
            $scope.searchField = x;
            $scope.stkidB = x.substring(x.length - 7, x.length - 1);
            ;
            $scope.nameB = x.substring(0, x.length - 8);
            $scope.hidden = true;
        }


        //获取的数据值与下拉选逐个比较，如果包含则放在临时变量副本，并用临时变量副本替换下拉选原先的数值，如果数据为空或找不到，就用初始下拉选项副本替换
        $scope.changeKeyValue = function (v) {
            let a = /[a-z]/i;
            if (!a.test(v) && v !== "") {
                $.get(urlHead + 'generalInfo/searchByKeyword?keyword=' + $scope.searchField, res => {
                    $scope.datas = JSON.parse(res);
                })
            }
            if (v === "") {
                $scope.datas = [];
            }

        }


        $.get(urlHead + 'competitorAnalysisTimeList', res => {
            console.log('time list: ');
            console.log(res);
            $scope.timeList = JSON.parse(res).timeList;
            $scope.time = $scope.timeList[$scope.timeList.length - 1];
        });

        $scope.confirm = function () {
            if ($scope.stkidB !== '' && $scope.time !== '') {
                $uibModalInstance.close();
                // $.get(urlHead + 'competitorAnalysis', {
                //         stkidA: $scope.id,
                //         stkidB: $scope.stkidB,
                //         time: $scope.time,
                //     },
                //     (res,status )=> {
                //         $uibModalInstance.close();
                //         open(JSON.parse(res));
                //     }
                // )
                open();
            } else {
                alert("请正确填写竞争公司和时间");
            }
        }

        open = function () {
            // for (let key in data.stkidA) {
            //     data.stkidA[key] = {
            //         value: data.stkidA[key],
            //         translate: translate[Object.keys(data.stkidA).indexOf(key)]
            //     }
            // }
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,//打开时的动画开关
                templateUrl: '/view/microIndustryChain/microChainAnalysis//financialContrast/contrastTable.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
                controller: 'FinancialModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
                // windowTopClass: 'topWindow',
                resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                    items: function () {//items是一个回调函数
                        return {
                            title: '“' + $scope.name + '” 与 “' + $scope.nameB + '” 财务对比分析',
                            // data: data,
                            nameA: $scope.name,
                            nameB: $scope.nameB,
                            stkidA: $scope.id,
                            stkidB: $scope.stkidB,
                            time: $scope.time,
                        }//这个值会被模态框的控制器获取到
                    },

                }
            });
            modalInstance.rendered.then(function () {
            });
            modalInstance.result.then(function () {
            });
        }

    })
    .controller('FinancialModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

        let translate = [
            '利息保障倍数',
            '净利润增长率',
            '应收账款周转率',
            '存货周转率',
            '利润总额与息税前利润相比',
            '成本费用利润率',
            '净利润与利润总额比',
            '流动比率',
            '经营产生的现金流量与流动负债比',
            '速动比率',
            '资产负债率',
            '存货周转天数',
            '营运资金与借款比',
            '营业成本率',
            '应收账款周转天数',
            '利润总额增长率',
            '总资产增长率',
            '股东权益周转率',
            '营业收入增长率',
            '成本费用利润率',
            '流动资产周转率',
            '营业总成本增长率',
            '所有者权益增长率',
            '营业利润增长率'
        ]
        $scope.render = false;

        $.get(urlHead + 'competitorAnalysis', {
                stkidA: items.stkidA,
                stkidB: items.stkidB,
                time: items.time,
            },
            (res, status) => {

                let data = JSON.parse(res);
                for (let key in data.stkidA) {
                    data.stkidA[key] = {
                        value: data.stkidA[key],
                        translate: translate[Object.keys(data.stkidA).indexOf(key)]
                    }
                }
                $scope.data = data;
                $scope.render = true;
                document.getElementById("spinner").click();
            }
        )


        $scope.title = items.title;
        // $scope.data = items.data;
        $scope.nameA = items.nameA;
        $scope.nameB = items.nameB;

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })