angular.module('myApp.macroIndustryList', [

])

    .config(function($stateProvider,$urlRouterProvider) {

    })

    .controller('MacroIndustryListCtrl',function($scope, $route, $http) {
        //列表项的动画
        $('.industryListItem').mouseenter(function (e) {
            // console.log($(this))
            $(this).children('.content_industry').addClass('active');
            $(this).children('.content_industry').children('.description_industry').css('opacity', 1);
            $(this).children('.cover_industry').css('opacity', 1);
        })
        $('.industryListItem').mouseleave(function (e) {
            // console.log($(this))
            $(this).children('.content_industry').removeClass('active');
            $(this).children('.content_industry').children('.description_industry').css('opacity', 0);
            $(this).children('.cover_industry').css('opacity', 0);
        })
    })