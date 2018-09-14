angular.module('myApp.macroIndustryDisplay.cwbl', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('cwblCtrl',function($scope, $route, $http) {
        $scope.toShow=false;
        $scope.toShowPane=false;
        $scope.str="最高值,平均值";
        $scope.firstStr="最高值"
        $scope.isFirst=false;
        $scope.chosenIndexs=[];
        $scope.chosenNum=6;
        $scope.market='全部';


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
                       document.getElementById('myInput').style.height='39.2px';
                       document.getElementById('mySelect').style.marginTop='0px';
                       document.getElementById('TITLE').style.height='60px';

                   }
               }
                document.getElementById('myInput').innerHTML=$scope.str+'<img src="view/macroIndustryDisplay/mainQuotedCompany/pic/arrow.png" style="width: 6px;height: 5px;float: right;margin-top: 7px;margin-right: 5px">';
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
                       if($scope.str.split(',').length<=2) {
                           document.getElementById('myInput').style.height = '19.6px';
                           document.getElementById('mySelect').style.marginTop = '-5px';
                           document.getElementById('TITLE').style.height='40px';
                       }

                   }
                   else {
                       $scope.str=$scope.str.replace(','+value,"");
                       if($scope.str.indexOf(',')==-1){ $scope.isFirst=true;
                       }
                       if($scope.str.split(',').length<=2) {
                           document.getElementById('myInput').style.height = '19.6px';
                           document.getElementById('mySelect').style.marginTop = '-5px'
                           document.getElementById('TITLE').style.height='40px';

                       }

                   }
               }

               document.getElementById('myInput').innerHTML=$scope.str+'<img src="view/macroIndustryDisplay/mainQuotedCompany/pic/arrow.png" style="width: 6px;height: 5px;float: right;margin-top: 7px;margin-right: 5px">';

           }
        };

        $scope.check2=function(value){
            if(document.getElementById(value).checked==true){
              $scope.chosenNum++;
              if($scope.chosenNum==10){
                  var inputs=document.getElementsByTagName('input');
                  for(var i=0;i<inputs.length;i++){
                      if(!isNaN(parseInt(inputs[i].id))&&inputs[i].checked==false){
                          inputs[i].disabled=true;
                      }

                  }
              }
            }
            else {
                $scope.chosenNum--;
                if($scope.chosenNum==9){
                    var inputs=document.getElementsByTagName('input');
                    for(var i=0;i<inputs.length;i++){
                        if(!isNaN(parseInt(inputs[i].id))&&inputs[i].checked==false){
                            inputs[i].disabled=false;
                        }

                    }
                }
            }
            document.getElementById('span').innerText=$scope.chosenNum;

        };

        $scope.close=function () {
            $scope.toShowPane=false;
        };

        $scope.returnToDefault=function () {
            var inputs=document.getElementsByName('input');
            var defaults=document.getElementsByName('default');
            for(var i=0;i<inputs.length;i++){
                inputs[i].checked=false;
            }
            for(var i=0;i<defaults.length;i++){
                defaults[i].checked=true;
            }
            $scope.chosenNum=6;
            document.getElementById('span').innerText=$scope.chosenNum;
            var inputs=document.getElementsByTagName('input');
            for(var i=0;i<inputs.length;i++){
                if(!isNaN(parseInt(inputs[i].id))&&inputs[i].checked==false){
                    inputs[i].disabled=false;
                }

            }

        };

        $scope.choose=function () {
            $scope.chosenIndexs=[];
            var inputs=document.getElementsByTagName('input');
            for(var i=0;i<inputs.length;i++){
                if(!isNaN(parseInt(inputs[i].id))&&inputs[i].checked==true){
                    $scope.chosenIndexs.push(inputs[i]);
                }

            }
            $scope.toShowPane=false;
        };

        $http({
            method: 'POST',
            url: 'http://localhost:8080/majorListedCompanies/ComparisonOfFinancialRatio'
        }).then(function successCallback(response) {
            var Data=response.data;
            console.log(Data);
            var str="        <tr id=\"th\">\n" +
                "            <th>排名</th>\n" +
                "            <th>代码</th>\n" +
                "            <th>证券简称</th>\n" +
                "            <th>ROE(%)</th>\n" +
                "            <th>ROA(%)</th>\n" +
                "            <th>销售毛利率(%)</th>\n" +
                "            <th>营业利润率(%)</th>\n" +
                "            <th>资产负债率(%)</th>\n" +
                "            <th>总资产周转率(次)</th>\n" +
                "        </tr>"
            for(var i=0;i<Data.securname.length;i++){
                str+="<tr style='border: 1px solid #E4E5E6'><td style='border: 0px solid rgb(0,0,0)'>"+i+"</td>"+
                    "<td style='border: 0px solid rgb(0,0,0)'>"+Data.securcode[i]+"</td>"+
                    "<td style='border: 0px solid rgb(0,0,0)'>"+Data.securname[i]+"</td>"+
                    "<td>"+Data.roe[i]+"</td>"+
                    "<td>"+Data.roa[i]+"</td>"+
                    "<td>"+Data.grossmargsal[i]+"</td>"+
                    "<td>"+Data.operatpromarg[i]+"</td>"+
                    "<td>"+Data.assliablrat[i]+"</td>"+
                    "<td>"+Data.toassturnov[i]+"</td></tr>";
            }

            document.getElementById('table').innerHTML=str;
        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });
    });