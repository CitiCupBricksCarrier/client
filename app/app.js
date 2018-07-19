'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ui.router',
    'myApp.version',

    'myApp.microIndustryChain'
])

.config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('microIndustryChain',{
                url:'/microIndustryChain',
                templateUrl: 'view/microIndustryChain/microIndustryChain.html',
                controller: 'MicroIndustryChainCtrl'
            })
    })


.controller('MainCtrl', function($scope, $http, $state, $window){


});
