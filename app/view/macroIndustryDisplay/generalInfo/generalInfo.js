angular.module('myApp.macroIndustryDisplay.generalInfo', [

])

    .config(function($stateProvider, $urlRouterProvider){
    })

    .controller('GeneralInfoCtrl',function($scope, $route, $http, $state) {
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

        $scope.list_luntai = ['xxx1','xxx2','xxx3'];

        $('.nameAndList .name_part').click(function (e) {
            // console.log(this.parentNode)
            console.log($(this.parentNode).children('.list_part'))
            var listNode = $(this.parentNode).children('.list_part');
            if(listNode.is(':hidden')){
                listNode.show('fast');
            }
            else{
                listNode.hide('fast');
            }
        })

        $scope.goToCompanyDetails = function (item) {
            // console.log('1')
            $state.go('macroIndustryDisplay.companyDetails', {companyName: item})
        }
    });