angular.module('myApp.personalMain', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('PersonalMainCtrl',function($scope, $route, $http, $state) {

        $(document).ready(function(){

            $("#modify").click(function(){
                $(".info-detail").addClass("info-modify");
                $(".info-textArea").addClass("info-textArea-modify");
                $(".info-input,.info-textArea").removeAttr("readonly");
            });

            $("#save").click(function(){
                $(".info-detail").removeClass("info-modify");
                $(".info-textArea").removeClass("info-textArea-modify");
                $(".info-input,.info-textArea").attr("readonly",'readonly');
            });
        });

    });