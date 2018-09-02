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

                    if($('.nav_item.active').attr('href') == targetNav.attr('href')){           //如果未改变
                        // console.log('same')
                        break;
                    }
                    $('.nav_item.active').parent().removeClass('active');
                    $('.nav_item.active').parent().children('.icon_active').hide();      //隐藏汽车icon
                    $('.nav_item.active').removeClass('active');
                    targetNav.addClass('active');
                    targetNav.parent().addClass('active');
                    targetNav.parent().children('.icon_active').show();             //显示汽车icon
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
        //点击对应部件
        $('.part_toTouch').click(function (e) {
            $scope.category_toShow = $(this).attr('name');
            // console.log(dataArr[propArr.indexOf($scope.category_toShow)]);
            // $scope.list_toShow = dataArr[propArr.indexOf($scope.category_toShow)];
            var categories_selected = $scope.category_toShow.split('+');
            console.log(categories_selected)
            var list_toShow = [];
            for(var tempI in categories_selected){
                console.log(categories_selected[tempI])
                console.log(propArr.indexOf(categories_selected[tempI]))
                console.log(dataArr[propArr.indexOf(categories_selected[tempI])])
                list_toShow = list_toShow.concat(dataArr[propArr.indexOf(categories_selected[tempI])]);
            }
            console.log(list_toShow)
            $scope.list_toShow = list_toShow;

            var listNode = $('.companyList');
            $scope.$apply();        //应用更改

            //部件高亮
            var oldToShow = $('.wholePic .wholeView'+'.isShow');
            var newToShow = $('.wholePic .wholeView'+'.'+this.classList[1]);

            if(oldToShow.attr('class') == newToShow.attr('class')){
                oldToShow.css('opacity', 0);      //取消之前高亮
                oldToShow.removeClass('isShow');

                //右移全景图
                $('.wholePic .wholeView').removeClass('active');
                $('.wholePic .part_toTouch').removeClass('active');
                //点击提示文字显示
                $('.wholePic .touchDescription').css('opacity', 1);
            }
            else{
                oldToShow.css('opacity', 0);      //取消之前高亮
                oldToShow.removeClass('isShow');
                newToShow.addClass('isShow');         //记录被点击后在显示高亮的
                newToShow.css('opacity', 1);      //新的部件高亮

                //左移全景图
                $('.wholePic .wholeView').addClass('active');
                $('.wholePic .part_toTouch').addClass('active');
                //点击提示文字消失
                $('.wholePic .touchDescription').css('opacity', 0);
            }

            //显示公司列表
            if(listNode.is(':hidden')){
                listNode.show('fast');
            }
            else if(oldToShow.attr('class') == newToShow.attr('class')){          //只有点击正在显示的部件才隐藏
                listNode.hide('fast');
            }
        })
        //鼠标移到部件上,模糊，高亮等
        $('.part_toTouch').mouseenter(function (e) {
            // console.log($($('.wholePic .wholeView')[0]))
            $($('.wholePic .wholeView')[0]).css('opacity', 0);
            $($('.wholePic .wholeView.cover')[0]).css('opacity', 1);
            // $($('.wholePic .wholeView.cover')[1]).css('opacity', 1);
            // console.log($('.wholePic .wholeView.cover'+'.'+$(this).attr('id')))
            // $('.wholePic .wholeView.cover'+'.'+$(this).attr('id')).css('opacity', 1);
            // console.log(this.classList[1])
            // console.log($('.wholePic .wholeView.cover'+'.'+this.classList[1]))
            $('.wholePic .wholeView.cover'+'.'+this.classList[1]).css('opacity', 1);
        })
        //鼠标移出部件，恢复
        $('.part_toTouch').mouseleave(function (e) {
            // console.log($($('.wholePic .wholeView')[0]))
            if(!$('.wholePic .wholeView').hasClass('active')){          //只有未点击部件的时候才恢复
                $($('.wholePic .wholeView')[0]).css('opacity', 1);
                $($('.wholePic .wholeView.cover')[0]).css('opacity', 0);
                // $($('.wholePic .wholeView.cover')[1]).css('opacity', 0);
                // $('.wholePic .wholeView.cover'+'.'+$(this).attr('id')).css('opacity', 0);
                $('.wholePic .wholeView.cover'+'.'+this.classList[1]).css('opacity', 0);
            }
            if(!$('.wholePic .wholeView.cover'+'.'+this.classList[1]).hasClass('isShow')){      //如果点击部件后，恢复未点击的高亮部件
                $('.wholePic .wholeView.cover'+'.'+this.classList[1]).css('opacity', 0);
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
        $().ready(function () {
            resizeWholePic();

            //处理全景图上的公司列表
            loadCompanyList();
        })

        /**
         * -------------------------------------------------
         * -------------------------------------------------
         * 自适应
         */
        // window.onload = function () {
        //     resizeWholePic();
        // }
        $(window).resize(function () {
            resizeWholePic();
        })
        function resizeWholePic() {
            console.log($(window).height())
            var windowHeight = $(window).height();
            var windowWidth = $(window).width();
            var scale = (windowHeight-50) / $('.wholePic .wholeView').height();            //缩放倍率
            console.log(scale);
            $('.wholePic .wholeView').css('height', windowHeight-50);

            // $('.wholePic .part_toTouch').css('left', $('.wholePic .part_toTouch').css('left') * scale);

            //每个定位组件的移动
            var partList = $('.wholePic .part_toTouch');
            for(var i = 0; i < partList.length; i++){
                var part = partList[i];
                // console.log(part);
                // console.log($(part).position().left);
                // console.log($(part).position().left * scale)
                $(part).css('left', $(part).position().left * scale);
                // console.log($(part).position().left);        //生效，但输出时未改变
                $(part).css('top', $(part).position().top * scale);
                $(part).css('width', $(part).width() * scale);
                $(part).css('height', $(part).height() * scale);
            }
        }
    });
