'use strict';

let urlHead = "http://localhost:8080/";

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ui.router',
    'angular-loading-bar',
    'ngAnimate',
    'myApp.version',

    'myApp.login',
    'myApp.home',
    'myApp.personal',
    'myApp.microIndustryChain',
    'myApp.macroIndustryList',
    'myApp.macroIndustryDisplay'
])

.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.when('', '/login');

    $stateProvider
        .state('login',{
            url:'/login',
            templateUrl: 'view/login/login.html',
            controller: 'LoginCtrl'
        })
        .state('home',{
            url:'/home',
            templateUrl: 'view/home/home.html',
            controller: 'HomeCtrl'
        })
        .state('personal',{
            url:'/personal',
            templateUrl: 'view/personal/personal.html',
            controller: 'PersonalCtrl'
        })
        .state('microIndustryChain',{
            url:'/microIndustryChain',
            templateUrl: 'view/microIndustryChain/microIndustryChain.html',
            controller: 'MicroIndustryChainCtrl'
        })
        .state('macroIndustryDisplay',{
            url:'/macroIndustryDisplay',
            templateUrl: 'view/macroIndustryDisplay/macroIndustryDisplay.html',
            controller: 'MacroIndustryDisplayCtrl'
        })
        .state('macroIndustryList',{
            url:'/macroIndustryList',
            templateUrl: 'view/macroIndustryDisplay/macroIndustryList.html',
            controller: 'MacroIndustryListCtrl'
        })
    })


.controller('MainCtrl', function($scope, $http, $state, $window){


})


    .directive("davidNav", function() {
        return {
            template : "<nav class=\"david-navbar\" role=\"navigation\">\n" +
                "    <div>\n" +
                "        <div>\n" +
                "            <a ui-sref=\"home\" class=\"navbar-brand\"><img class=\"nav-icon\" src=\"citi-icon/citi-white.svg\" alt=\"花旗\"></a>\n" +
                "        </div>\n" +
                "        <div>\n" +
                "            <ul class=\"david-navbar-right\">\n" +
                "                <li ui-sref=\"personal\" ng-show=\"haslogined\"><a>个人中心</a></li>\n" +
                "                <li ui-sref=\"login\" ng-hide=\"haslogined\"><a>登录</a></li>\n" +
                "            </ul>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</nav>"
        };
    });


