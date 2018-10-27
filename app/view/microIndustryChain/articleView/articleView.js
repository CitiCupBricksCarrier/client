angular.module('myApp.microIndustryChain.articleView', [
])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('ArticleViewCtrl',function($scope, $route, $http, $stateParams, $state) {

        $scope.addNewArticle = function () {
            $state.go('microIndustryChain.writeArticle')
        }
    });
