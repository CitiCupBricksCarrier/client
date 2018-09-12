angular.module('myApp.macroIndustryDisplay.cwbl', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('cwblCtrl',function($scope, $route, $http) {
        $scope.toShow=false;
        $scope.toShowPane=true;
        $scope.str="";
        $scope.firstStr=""
        $scope.isFirst=false;
        $scope.check=function (value){

           if(document.getElementById(value).checked==true){
               if($scope.str==""){
                   $scope.firstStr=value;
                   $scope.isFirst=true;
                   $scope.str+=value;
               }
               else{
                   $scope.isFirst=false;
                   $scope.str+=','+value;
                   if($scope.str.split(',').length>=3){
                       document.getElementById('input').style.height='42px';
                   }
               }
                document.getElementById('input').innerHTML=$scope.str+'<img src="view/macroIndustryDisplay/mainQuotedCompany/pic/arrow.png" style="width: 6px;height: 5px;float: right;margin-top: 7px;margin-right: 5px">';
           }
           else{
               if($scope.isFirst){
                       $scope.str=$scope.str.replace(value,"");
               }
               else{
                   if(value==$scope.firstStr){
                       $scope.str=$scope.str.replace(value+',',"");
                        $scope.firstStr=$scope.str.split(',')[0];
                        if($scope.str.indexOf(',')==-1) $scope.isFirst=true;
                       if($scope.str.split(',').length<=2) document.getElementById('input').style.height='21px';

                   }
                   else {
                       $scope.str=$scope.str.replace(','+value,"");
                       if($scope.str.indexOf(',')==-1){ $scope.isFirst=true;
                       }
                       if($scope.str.split(',').length<=2) document.getElementById('input').style.height='21px';

                   }
               }

               document.getElementById('input').innerHTML=$scope.str+'<img src="view/macroIndustryDisplay/mainQuotedCompany/pic/arrow.png" style="width: 6px;height: 5px;float: right;margin-top: 7px;margin-right: 5px">';

           }
        };
    });