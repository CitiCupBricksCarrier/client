angular.module('myApp.microIndustryChain.industryFactorAnalyze', [
])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('IndustryFactorAnalyzeCtrl',function($scope, $route, $http, $state) {

        //指标部分
        $scope.index_recommend = ['xxx1', 'xxx2', 'xxx3'];
        $scope.index_selectable = ['xxx1','xxx2','xxx3'];
        $scope.index_unselectable = ['zzz1','zzz2', 'zzz3'];

        $scope.description_toShow = '点击查看指标详细信息';
        $scope.numIsShow = false;
        $scope.num_toShow = 0;

        $scope.index_selected = '';
        var index_selected_list = [];

        //方法部分
        $scope.method_list = [
            {name: 'IC-mean', description: '衡量您所选择的因子的选股能力，越大，则说明您选择的因子在您选择股票时越有效'},
            {name: 'IC-IR', description: '衡量您所选的因子的选股能力和稳定性，越大，则说明您选择的因子选股能力越强、越稳定'},
            {name: '一元线性回归', description: '经典方法，为您计算因子之间的函数关系'},
            {name: 'IC-T', description: '衡量您所选的因子对收益率是否有影响，越接近于0，则影响越弱'},
            {name: '多空收益', description: '探究您选择的因子对整个行业收益率的影响'},
            {name: '复合因子IC', description: '当您想要研究复合因子的选股能力、稳定性时的最佳选择'}
        ];
        $scope.method_selected = '';

        console.log($scope.method_list)
        /**
         * ----------------------------------------
         * ----------------------------------------
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
        /**
         * 页面加载完毕时
         */
        $().ready(function () {
            // console.log($('.list_container li'))
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
                var liList = $('.part .section .list_container li');
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
                            index_selected_list.push(a_child.text());
                        }
                    }
                }
                // console.log(index_selected_list)
                $scope.index_selected = index_selected_list.toString();

                //如果选择多个，就只能选择复合因子,并自动选中
                if(index_selected_list.length > 1){
                    $('.part .method_container .section .list_container .checkBox').attr('disabled', true);
                    $('.part .method_container .section .list_container .checkBox:last').attr('disabled', false);
                    $('.part .method_container .section .list_container .checkBox:checked').prop('checked', false);
                    $('.part .method_container .section .list_container .checkBox:last').prop('checked', true);
                    $scope.method_selected = '复合因子IC';
                }
                else{
                    $('.part .method_container .section .list_container .checkBox').attr('disabled', false);
                }

                //分析按钮的可用设置
                if(index_selected_list.length > 0){
                    $('.btn_analyze').attr('disabled', false);
                }
                else{
                    $('.btn_analyze').attr('disabled', true);
                }

                $scope.$apply();        //应用更改

            })

            /**
             * 监听复选框(方法)
             */
            $('.part .method_container .section .list_container .checkBox').on('change', function () {
                $('.part .method_container .section .list_container .checkBox:checked').prop('checked', false);
                $(this).prop('checked', true);

                $scope.method_selected = $(this).parent().text();

                $scope.$apply();        //应用更改
            })

        })

        /**
         * ----------------------------------------
         * ----------------------------------------
         * 属性处理
         */
        var indexList = ['xxx1', 'xxx2', 'xxx3'];
        var descriptionList = [
            'xxx1 description',
            'xxx2 description',
            'xxx3 description'
        ];
        var numList = [1,2,3];

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
    });