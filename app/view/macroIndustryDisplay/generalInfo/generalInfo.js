angular.module('myApp.macroIndustryDisplay.generalInfo', [

])

    .config(function($stateProvider, $urlRouterProvider){
    })

    .controller('GeneralInfoCtrl',function($scope, $route, $http, $state) {
        /**
         * -------------------------------------------------
         * -------------------------------------------------
         * 监听、设置等
         */

        //设置标题栏响应nav为active,应付刷新等情况
        $($('.header_macro .module_nav .nav')[0]).addClass('active')

        //点击定位到页面位置
        $('.nav_item').click(function (e) {
            e.preventDefault();
            // console.log(e.target);
            // console.log($($(e.target).attr('href')))
            var link = this;
            $.smoothScroll({
                scrollTarget: link.hash
            });
        })
        $('.part h3 a').click(function (e) {
            e.preventDefault();
            var link = this;
            $.smoothScroll({
                scrollTarget: link.hash
            });
        })
        //导航条
        $(window).scroll(function (e) {
            var parts = $('.part');
            for(var i = 0; i < parts.length; i++){
                var part = $(parts[i]);
                if(part.offset().top >= $(window).scrollTop()){
                    // console.log(part.offset().top + "  " + $(window).scrollTop())
                    var targetNav = $(".navBar a[href='#" + part.attr('id') + "']");

                    if($('.nav_item.active').attr('href') == targetNav.attr('href')){
                        // console.log('same')
                        break;
                    }
                    $('.nav_item.active').parent().removeClass('active');
                    $('.nav_item.active').removeClass('active');
                    targetNav.addClass('active');
                    targetNav.parent().addClass('active');
                    break;
                }
            }
        })

        $scope.list_luntai = ['xxx1','xxx2','xxx3'];

        //加载得到的公司列表
        $scope.category_toShow = null;
        $scope.list_toShow = [];
        var dataArr = [];
        var propArr = [];

        //公司列表的显示和隐藏
        // $('.nameAndList .name_part').click(function (e) {
        //     // console.log(this.parentNode)
        //     // console.log($(this.parentNode).children('.list_part'))
        //     var listNode = $(this.parentNode).children('.list_part');
        //     if(listNode.is(':hidden')){
        //         listNode.show('fast');
        //     }
        //     else{
        //         listNode.hide('fast');
        //     }
        // })
        $('.nameAndList .name_part').click(function (e) {
            // console.log(this.parentNode)
            // console.log($(this.parentNode).children('.list_part'))
            var listNode = $(this.parentNode).children('.list_part');
            if(listNode.is(':hidden')){
                listNode.show('fast');
            }
            else{
                listNode.hide('fast');
            }
        })
        $('.part_toTouch').click(function (e) {
            $scope.category_toShow = $(this).attr('name');
            console.log(dataArr[propArr.indexOf($scope.category_toShow)]);
            $scope.list_toShow = dataArr[propArr.indexOf($scope.category_toShow)];

            var listNode = $('.companyList');
            $scope.$apply();        //应用更改

            if(listNode.is(':hidden')){
                listNode.show('fast');
            }
            else{
                listNode.hide('fast');
            }
        })
        //点击后跳转到对应公司的信息界面
        $scope.goToCompanyDetails = function (item) {
            // console.log('1')
            var stkcd_toShow = item.stkcd;
            $state.go('macroIndustryDisplay.companyDetails', {stkcd_toShow: stkcd_toShow})
        }

        /**
         * -------------------------------------------------
         * -------------------------------------------------
         * http
          */

        // $scope.test_ajax = function () {
        //     $.ajax({
        //         url: 'http://localhost:8080/industryData/sellNum/cycxl/cycfppxl',
        //         data: {},
        //         type: 'post',
        //         success: function (data) {
        //             console.log(data)
        //             console.log("1")
        //         },
        //         fail: function (data) {
        //             console.log(fail)
        //         }
        //     })
        // }
        /**
         * 得到全景图上的公司列表
         */
        function loadCompanyList() {
            $http({
                method: 'post',
                url: 'http://localhost:8080/generalInfo/companyList'
            }).then(function successCallBack(response) {
                // console.log(response);
                // return response.data;

                var initialData = response.data;
                propArr = ['保险', '玻璃', '车身及外观设备', '传动设备', '电气仪器仪表', '电子元件', '发动机设备',
                    '纺织品', '行车软件', '行驶底盘设备', '合成材料', '机械',
                    '轮胎', '汽车及零配件销售', '汽车零售', '石油', '橡胶', '整车制造', '制动设备', '专用设备', '转向设备'];
                dataArr = [];
                // console.log(initialData)
                for(var i in initialData){
                    // console.log(initialData[item])
                    var item = initialData[i];
                    if(dataArr[propArr.indexOf(item.category)] == undefined){
                        dataArr[propArr.indexOf(item.category)] = [];
                    }
                    dataArr[propArr.indexOf(item.category)].push(item)
                }
                // console.log(dataArr)
            },function errorCallBack(response) {
                console.log(response);
            });
        }

        /**
         * -------------------------------------------------
         * -------------------------------------------------
         * 方法调用
         */
        //处理全景图上的公司列表
        loadCompanyList();

    });
