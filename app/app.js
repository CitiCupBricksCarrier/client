'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ui.router',
    'angular-loading-bar',
    'ngAnimate',
    'myApp.version',

    'myApp.login',
    'myApp.home',
    'myApp.microIndustryChain',
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
    })


.controller('MainCtrl', function($scope, $http, $state, $window){

});
