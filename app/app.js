'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ui.router',
    'angular-loading-bar',
    'ngAnimate',
    'myApp.version',

    'myApp.microIndustryChain',
    'myApp.macroIndustryDisplay',
    'myApp.login'
])

.config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('microIndustryChain',{
                url:'/microIndustryChain',
                templateUrl: 'view/microIndustryChain/microIndustryChain.html',
                controller: 'MicroIndustryChainCtrl'
            })
        $stateProvider
            .state('macroIndustryDisplay',{
                url:'/macroIndustryDisplay',
                templateUrl: 'view/macroIndustryDisplay/macroIndustryDisplay.html',
                controller: 'MacroIndustryDisplayCtrl'
            })
        $stateProvider
            .state('login',{
                url:'/login',
                templateUrl: 'view/login/login.html',
                controller: 'LoginCtrl'
            })
    })


.controller('MainCtrl', function($scope, $http, $state, $window){

});
