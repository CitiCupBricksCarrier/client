angular.module('myApp.macroIndustryDisplay.generalInfo', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('GeneralInfoCtrl',function($scope, $route, $http) {
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
        //右侧导航条
        $(window).scroll(function (e) {
            var parts = $('.part');
            for(var i = 0; i < parts.length; i++){
                var part = $(parts[i]);
                if(part.offset().top >= $(window).scrollTop()){
                    // console.log(part.offset().top + "  " + $(window).scrollTop())
                    var targetNav = $(".navBar a[href='#" + part.attr('id') + "']");
                    $('.nav_item.active').removeClass('active')
                    targetNav.addClass('active');
                    break;
                }
            }
        })

    });