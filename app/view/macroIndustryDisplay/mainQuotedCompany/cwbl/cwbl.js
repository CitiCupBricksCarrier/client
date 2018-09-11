angular.module('myApp.macroIndustryDisplay.cwbl', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('cwblCtrl',function($scope, $route, $http) {
        $scope.toShow=false;
        $scope.str="";
        $scope.check=function (value){

           if(document.getElementById(value).checked==true){
               $scope.str+=value;
                document.getElementById('input').innerHTML=$scope.str+'<img src="view/macroIndustryDisplay/mainQuotedCompany/pic/arrow.png" style="width: 6px;height: 5px;float: right;margin-top: 7px;margin-right: 5px">';
           }
           else{
                $scope.str.replace(value,"");
               document.getElementById('input').innerHTML=$scope.str+'<img src="view/macroIndustryDisplay/mainQuotedCompany/pic/arrow.png" style="width: 6px;height: 5px;float: right;margin-top: 7px;margin-right: 5px">';

           }
        };
    });