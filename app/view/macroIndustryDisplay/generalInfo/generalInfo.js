angular.module('myApp.macroIndustryDisplay.generalInfo', [

])

    .config(function($stateProvider, $urlRouterProvider){
    })

    .controller('GeneralInfoCtrl',function($scope, $route, $http, $state) {
        $scope.list_luntai = ['xxx1','xxx2','xxx3'];

        //加载得到的公司列表
        $scope.category_toShow = null;
        // $scope.list_toShow = [];
        $scope.list_toShow = [[1111],[2222],[3333],[4444],[5555]];
        var dataArr = [];
        var propArr = [];

        //点击后跳转到对应公司的信息界面
        $scope.goToCompanyDetails = function (item) {
            // console.log('1')
            var stkcd_toShow = item.stkcd;
            $state.go('macroIndustryDisplay.companyDetails', {stkcd_toShow: stkcd_toShow})
        }

        //点击空白部分关闭列表
        $scope.clickFreeSpace = function () {
            var picOnShowing = $('.wholePic .wholeView'+'.isShow');
            // console.log(picOnShowing);
            if(picOnShowing.length == 0){       //没有处于显示状态
                return;
            }
            picOnShowing.css('opacity', 0);      //取消之前高亮
            picOnShowing.removeClass('isShow');

            //右移全景图
            $('.wholePic .wholeView').removeClass('active');
            $('.wholePic .part_toTouch').removeClass('active');
            //点击提示文字显示
            $('.wholePic .touchDescription').css('opacity', 1);

            //隐藏引导线
            $('.wholePic .line_container.active').css('width', 0);      //引导线容器的大小调整
            $('.wholePic .line_container.active').removeClass('active');
            //右移并隐藏展开内容
            $('.wholePic .briefAndList_container').removeClass('active');

        }

        /**
         * -------------------------------------------------
         * -------------------------------------------------
         * http
          */

        // $scope.test_ajax = function () {
        //     $.ajax({
        //         url: urlHead+'industryData/sellNum/cycxl/cycfppxl',
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
                url: urlHead+'generalInfo/companyList'
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

        $().ready(function () {
            $().delay(100)

            /**
             * -------------------------------------------------
             * -------------------------------------------------
             * 监听、设置等
             */

            //设置标题栏响应nav为active,应付刷新等情况
            $($('.header_macro .module_nav .nav')[1]).addClass('active')

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
            //处理导航条
            var curNavIndex = 0;        //记录当前nav的index，可以由此判断往上还是往下的变化
            $(window).scroll(function (e) {
                //导航条
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
                        //判断往上还是往下，并修改对应的动画效果
                        if(curNavIndex > i){        //往下
                            $('.navBar li').css('transition', 'margin-bottom ease 1s');
                        }
                        else{                       //往上
                            $('.navBar li').css('transition', 'margin-top ease 1s');
                        }
                        curNavIndex = i;        //更新记录的当前navIndex

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

            //整屏滚动
            document.onmousewheel = function(event){
                if(event.wheelDelta < 0){
                    toScrollPart(true);
                }else if(event.wheelDelta > 0){
                    toScrollPart(false);
                }
            }
            document.onkeydown = function(event){
                // console.log(event.code)
                if(event.code == 'ArrowDown' || event.code == 'PageDown'){
                    toScrollPart(true);
                }
                else if(event.code == 'ArrowUp' || event.code == 'PageUp'){
                    toScrollPart(false);
                }
            }

            //翻页函数
            function toScrollPart(isDown) {
                var curPart = $('.navBar li.active');
                var toPart;
                if(isDown){
                    toPart = $(curPart).next().children('.nav_item');
                }
                else{
                    toPart = $(curPart).prev().children('.nav_item');
                }
                if(toPart.length == 0){
                    return;
                }
                $.smoothScroll({
                    // scrollTarget: toPart
                    scrollTarget: $($(toPart).attr('href'))
                });
            }

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
                if($(this).attr('name') == '空白部分'){     //点击空白部分，取消响应
                    var picOnShowing = $('.wholePic .wholeView'+'.isShow');
                    // console.log(picOnShowing);
                    if(picOnShowing.length == 0){       //没有处于显示状态
                        return;
                    }
                    picOnShowing.css('opacity', 0);      //取消之前高亮
                    picOnShowing.removeClass('isShow');

                    //右移全景图
                    $('.wholePic .wholeView').removeClass('active');
                    $('.wholePic .part_toTouch').removeClass('active');
                    //点击提示文字显示
                    $('.wholePic .touchDescription').css('opacity', 1);

                    //隐藏引导线
                    $('.wholePic .line_container.active').css('width', 0);      //引导线容器的大小调整
                    $('.wholePic .line_container.active').removeClass('active');
                    //右移并隐藏展开内容
                    $('.wholePic .briefAndList_container').removeClass('active');

                    //恢复全景图本体，隐藏变暗的本体
                    $($('.wholePic .wholeView')[0]).css('opacity', 1);
                    $($('.wholePic .wholeView.cover')[0]).css('opacity', 0);

                    return;
                }
                $scope.category_toShow = $(this).attr('name');
                // console.log(dataArr[propArr.indexOf($scope.category_toShow)]);
                // $scope.list_toShow = dataArr[propArr.indexOf($scope.category_toShow)];
                var categories_selected = $scope.category_toShow.split('+');
                console.log(categories_selected)
                var list_toShow = [[],[]];
                for(var tempI in categories_selected){
                    console.log(categories_selected[tempI])
                    console.log(propArr.indexOf(categories_selected[tempI]))
                    console.log(dataArr[propArr.indexOf(categories_selected[tempI])])
                    var tempList = dataArr[propArr.indexOf(categories_selected[tempI])];
                    for(var i = 0;tempList != undefined && i < tempList.length; i+=5){
                        var perRow = [];
                        for(var j = 0; j < 5 && i+j < tempList.length; j++){
                            perRow.push(tempList[i+j]);
                        }
                        list_toShow[tempI].push(perRow);
                    }
                }
                // var list_toShow = [];
                // for(var tempI in categories_selected){
                //     console.log(categories_selected[tempI])
                //     console.log(propArr.indexOf(categories_selected[tempI]))
                //     console.log(dataArr[propArr.indexOf(categories_selected[tempI])])
                //     list_toShow = list_toShow.concat(dataArr[propArr.indexOf(categories_selected[tempI])]);
                // }
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

                    //隐藏引导线
                    $('.wholePic .line_container.active').css('width', 0);      //引导线容器的大小调整
                    $('.wholePic .line_container.active').removeClass('active');
                    //右移并隐藏展开内容
                    $('.wholePic .briefAndList_container').removeClass('active');
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

                    //显示新的引导线
                    $('.wholePic .line_container.active').css('width', 0);          //先将当前的宽度设为0
                    $('.wholePic .line_container.active').removeClass('active');
                    $('.wholePic .line_container'+'.'+this.classList[1]).addClass('active');
                    $('.wholePic .line_container.active').css('width', $('.wholePic .wholeView').width()*1.15);      //引导线容器的大小调整
                    //显示展开内容
                    $('.wholePic .briefAndList_container.active').removeClass('active');
                    $('.wholePic .briefAndList_container'+'.'+this.classList[1]).addClass('active');
                    // $('.wholePic .briefAndList_container'+'.'+this.classList[1]).delay('0.3s').animate({height: '600px'}, 'slow');
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
                if($(this).attr('name') == '空白部分') {     //空白部分，不做响应
                    return;
                }
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
                if($(this).attr('name') == '空白部分') {     //空白部分，不做响应
                    return;
                }

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

            resizeWholePic();
        })

        /**
         * -------------------------------------------------
         * -------------------------------------------------
         * 自适应
         */
        $(window).resize(function () {
            resizeWholePic();
        })
        function resizeWholePic() {
            if($('.wholePic .active').length != 0){        //当全景图内有控件处于active时，不触发，会导致重复translate
                // console.log('1')
                // console.log($('.wholePic .active'))
                return;
            }
            var translateX = 210;
            console.log($(window).height())
            console.log(window.devicePixelRatio);       //可以获取屏幕缩放比例
            var devicePixelRatio = window.devicePixelRatio; //可以获取屏幕缩放比例

            var windowHeight = $(window).height();
            var windowWidth = $(window).width();

            //偶尔会出现$().ready函数触发该方法，但是获取不到dom对象，使用此循环解决？
            while($('.wholePic .wholeView').length == 0 || $('.wholePic .wholeView').height() == 0 || $('.wholePic .wholeView').width() == 0){
                $('.wholePic .wholeView').delay(500).height();
            }
            var scale = (windowHeight-50) / $('.wholePic .wholeView').height();            //缩放倍率
            console.log(scale);
            $('.wholePic .wholeView').css('height', windowHeight-50);
            $('.wholePic .line_container').css('height', windowHeight-50);      //引导线容器的大小调整

            $('.wholePic .line_container.active').css('width', $('.wholePic .wholeView').width()*1.15);      //引导线容器的大小调整
            // console.log($('.wholePic .line_container.active').width())           //最大化时不会触发？？未知

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

            //右侧展开栏的移动和调整
            var briefAndList_container_list = $('.wholePic .briefAndList_container');
            for(var i = 0; i < briefAndList_container_list.length; i++){
                //容器
                var container = briefAndList_container_list[i];
                $(container).css('width', $(container).width()*scale);
                $(container).css('left', $(container).position().left * scale);
                $(container).css('top', $(container).position().top * scale);
            }
            //容器内其他的大小
            var brief = $('.wholePic .briefAndList_container .brief');
            var font_size = $(brief).css('font-size');
            // console.log(font_size.substring(0, font_size.indexOf('px')))
            font_size = parseInt(font_size.substring(0, font_size.indexOf('px')));
            $(brief).css('font-size', font_size * scale + 'px');
            var img_xgqy = $('.wholePic .briefAndList_container .img_xgqy');
            $(img_xgqy).css('height', $(img_xgqy).height() * scale);
            var companyTable = $('.wholePic .briefAndList_container .companyTable');
            font_size = $(companyTable).css('font-size');
            font_size = parseInt(font_size.substring(0, font_size.indexOf('px')));
            $(companyTable).css('font-size', font_size * scale + 'px');
            $('.wholePic .briefAndList_container .companyTable td').css('width', $(companyTable).width()/5);

            var touchDescription = $('.wholePic .touchDescription');
            $(touchDescription).css('height', $(touchDescription).height() * scale);
            $(touchDescription).css('left', $(touchDescription).position().left * scale);
            $(touchDescription).css('top', $(touchDescription).position().top * scale);
            // console.log($('.wholePic .briefAndList_container').position().left * scale)
            // $('.wholePic .briefAndList_container').css('width', $('.wholePic .briefAndList_container').width()*scale);
            // // $('.wholePic .briefAndList_container').css('left', $('.wholePic .briefAndList_container').position().left * scale);
            // $('.wholePic .briefAndList_container').css('height', $('.wholePic .briefAndList_container').position().top * scale);


            //其他图的调整
            $('.part .other').css('height', windowHeight-50);
        }

    });
