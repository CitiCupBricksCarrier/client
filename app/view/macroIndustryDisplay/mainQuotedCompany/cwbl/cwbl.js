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
        $scope.chosenIndexs=[1,2,3,4,7,9];
        $scope.chosenNum=6;
        $scope.market='全部';

        /**
         * 监听统计数据的选择
         * @param value 统计数据名
         */
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
            $scope.drawTable();

        };

        /**
         * 监听复选框内指标的勾选
         * @param value 勾选的指标名
         */
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
                    $scope.chosenIndexs.push(inputs[i].id);
                }

            }
            $scope.toShowPane=false;

            $scope.drawTable();

        };

        $http({
            method: 'POST',
            url: 'http://localhost:8080/majorListedCompanies/ComparisonOfFinancialRatio'
        }).then(function successCallback(response) {
            $scope.Data=response.data;
            var Data=$scope.Data;
            console.log(Data);


            $scope.drawTable();
        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

        $scope.calMax=function (array) {
            var max14=0,max15=0,max16=0,max17=0;
            for(var i=0;i<array.length/4;i++){
                if(Number(array[(i+1)*4-1])>max17) max17=array[(i+1)*4-1];
                if(Number(array[(i+1)*4-2])>max16) max16=array[(i+1)*4-2];
                if(Number(array[(i+1)*4-3])>max15) max15=array[(i+1)*4-3];
                if(Number(array[(i+1)*4-4])>max14) max14=array[(i+1)*4-4];

            }

            return [max17,max16,max15,max14];
        };

        $scope.calMin=function (array) {
            var min14=Number.POSITIVE_INFINITY,min15=Number.POSITIVE_INFINITY,min16=Number.POSITIVE_INFINITY,min17=Number.POSITIVE_INFINITY;
            for(var i=0;i<array.length/4;i++){
                if(Number(array[(i+1)*4-1])<min17) min17=array[(i+1)*4-1];
                if(Number(array[(i+1)*4-2])<min16) min16=array[(i+1)*4-1];
                if(Number(array[(i+1)*4-3])<min15) min15=array[(i+1)*4-1];
                if(Number(array[(i+1)*4-4])<min14) min14=array[(i+1)*4-1];

            }

            return [min17,min16,min15,min14];
        };

        $scope.calAvg=function (array) {
            var vag17=0,vag16=0,vag15=0,vag14=0,sum17=0,sum16=0,sum15=0,sum14=0;
            for(var i=0;i<array.length/4;i++){
                if(array[(i+1)*4-1]!='--') sum17+=Number(array[(i+1)*4-1]);
                if(array[(i+1)*4-2]!='--') sum16+=Number(array[(i+1)*4-2]);
                if(array[(i+1)*4-3]!='--') sum15+=Number(array[(i+1)*4-3]);
                if(array[(i+1)*4-4]!='--') sum14+=Number(array[(i+1)*4-4]);

            }

            vag17=(sum17/(array.length/4)).toFixed(2);
            vag16=(sum16/(array.length/4)).toFixed(2);
            vag15=(sum15/(array.length/4)).toFixed(2);
            vag14=(sum14/(array.length/4)).toFixed(2);
            return [vag17,vag16,vag15,vag14];

        };

        $scope.sortNumber=function(a,b){
           return a-b;
        };

        $scope.calMid=function (array) {
            var array17=[],array16=[],array15=[],array14=[];
            for(var i=0;i<array.length/4;i++){
                array17.push(array[(i+1)*4-1]);
                array16.push(array[(i+1)*4-2]);
                array15.push(array[(i+1)*4-3]);
                array14.push(array[(i+1)*4-4]);

            }
            array17=array17.sort($scope.sortNumber);
            array16=array16.sort($scope.sortNumber);
            array15=array15.sort($scope.sortNumber);
            array14=array14.sort($scope.sortNumber);



            var result17,result16,result15,result14=0;
            if(array17[(array.length/4/2)-1]=='--'){
                result17=array17[array.length/4/2];
            }
            else if(array17[(array.length/4/2)]=='--'){
                result17=array17[array.length/4/2-1];
            }
            else{
                result17=((Number(array17[(array.length/4/2)-1])+Number(array17[array.length/4/2]))/2).toFixed(2);

            }
            if(array16[(array.length/4/2)-1]=='--'){
                result16=array16[array.length/4/2];
            }
            else if(array16[(array.length/4/2)]=='--'){
                result16=array16[array.length/4/2-1];
            }
            else{
                result16=((Number(array16[(array.length/4/2)-1])+Number(array16[array.length/4/2]))/2).toFixed(2);

            }
            if(array15[(array.length/4/2)-1]=='--'){
                result15=array15[array.length/4/2];
            }
            else if(array15[(array.length/4/2)]=='--'){
                result15=array15[array.length/4/2-1];
            }
            else{
                result15=((Number(array15[(array.length/4/2)-1])+Number(array15[array.length/4/2]))/2).toFixed(2);

            }
            if(array14[(array.length/4/2)-1]=='--'){
                result14=array14[array.length/4/2];
            }
            else if(array14[(array.length/4/2)]=='--'){
                result14=array14[array.length/4/2-1];
            }
            else{
                result14=((Number(array14[(array.length/4/2)-1])+Number(array14[array.length/4/2]))/2).toFixed(2);

            }
            if ((array.length/4)%2==0) {
                return[result17,result16,result15,result14];
            }
            else{
                return [array17[array.length/4/2-0.5],array16[array.length/4/2-0.5],array15[array.length/4/2-0.5],array14[array.length/4/2-0.5]];
            }
        };

        $scope.changeMarket=function(){
            $scope.drawTable();
        };



        $scope.drawTable=function () {
            var str="";
            var INDEXS=['','ROE(%)','ROA(%)','销售毛利率(%)','营业利润率(%)','销售净利率(%)','EBITDA率(%)','资产负债率(%)','产权比率(%)','资产周转率(次)','应收账款周转率(次)','存货周转率(次)','流动比率(倍)','速动比率(倍)','每股收益','每股净资产','每股现金流']
            var indexs=['','roe','roa','grossmargsal','operatpromarg','netsalrat','ebitda','assliablrat','proprigrat','toassturnov','acctrecaivturnovrat','inventturnov','flowrat','spdrat','earnpersh','netassvalpersh','cashflpersh']

            var stat=$scope.str.split(',');
            str+="        <tr>\n" +
                "            <th rowspan='2'>排名</th>\n" +
                "            <th rowspan='2'>代码</th>\n" +
                "            <th rowspan='2'>证券简称</th>\n" ;
            for(var i=0;i<$scope.chosenIndexs.length;i++){
                str+="<th colspan='4'>"+INDEXS[$scope.chosenIndexs[i]]+"</th>";
            }
                str+="</tr><tr>";
            for(var i=0;i<$scope.chosenIndexs.length;i++) {
                str+="<th>2017年报</th><th>2016年报</th><th>2015年报</th><th>2014年报</th>";
            }
                str+="</tr>";

            for(var i=0;i<stat.length;i++){
                switch (stat[i]){
                    case '最高值':
                    str+="<tr><td></td><td></td><td>最高值</td>";
                    for(var j=0;j<$scope.chosenIndexs.length;j++){
                        str+="<td>"+$scope.calMax($scope.Data[indexs[$scope.chosenIndexs[j]]])[0]+"</td>"+
                            "<td>"+$scope.calMax($scope.Data[indexs[$scope.chosenIndexs[j]]])[1]+"</td>"+
                            "<td>"+$scope.calMax($scope.Data[indexs[$scope.chosenIndexs[j]]])[2]+"</td>"+
                            "<td>"+$scope.calMax($scope.Data[indexs[$scope.chosenIndexs[j]]])[3]+"</td>";
                    }
                    str+="</tr>";
                    break;
                    case '最低值':
                        str+="<tr><td></td><td></td><td>最低值</td>";
                        for(var j=0;j<$scope.chosenIndexs.length;j++){
                            str+="<td>"+$scope.calMin($scope.Data[indexs[$scope.chosenIndexs[j]]])[0]+"</td>"+
                                "<td>"+$scope.calMin($scope.Data[indexs[$scope.chosenIndexs[j]]])[1]+"</td>"+
                                "<td>"+$scope.calMin($scope.Data[indexs[$scope.chosenIndexs[j]]])[2]+"</td>"+
                                "<td>"+$scope.calMin($scope.Data[indexs[$scope.chosenIndexs[j]]])[3]+"</td>";
                        }
                        str+="</tr>";
                        break;
                    case '中位值':
                        str+="<tr><td></td><td></td><td>中位值</td>";
                        for(var j=0;j<$scope.chosenIndexs.length;j++){
                            str+="<td>"+$scope.calMid($scope.Data[indexs[$scope.chosenIndexs[j]]])[0]+"</td>"+
                                "<td>"+$scope.calMid($scope.Data[indexs[$scope.chosenIndexs[j]]])[1]+"</td>"+
                                "<td>"+$scope.calMid($scope.Data[indexs[$scope.chosenIndexs[j]]])[2]+"</td>"+
                                "<td>"+$scope.calMid($scope.Data[indexs[$scope.chosenIndexs[j]]])[3]+"</td>";
                        }
                        str+="</tr>";
                        break;
                    case '平均值':
                        str+="<tr><td></td><td></td><td>平均值</td>";
                        for(var j=0;j<$scope.chosenIndexs.length;j++){
                            str+="<td>"+$scope.calAvg($scope.Data[indexs[$scope.chosenIndexs[j]]])[0]+"</td>"+
                                "<td>"+$scope.calAvg($scope.Data[indexs[$scope.chosenIndexs[j]]])[1]+"</td>"+
                                "<td>"+$scope.calAvg($scope.Data[indexs[$scope.chosenIndexs[j]]])[2]+"</td>"+
                                "<td>"+$scope.calAvg($scope.Data[indexs[$scope.chosenIndexs[j]]])[3]+"</td>";
                        }
                        str+="</tr>";
                        break;
                }
            }
                switch ($scope.market){
                    case '全部':
                        for(var i=0;i<38;i++){
                            str+="<tr><td>"+(i+1)+"</td>"+
                                    "<td>"+$scope.Data.securcode[i]+"</td>"+
                                    "<td>"+$scope.Data.securname[i]+"</td>";
                                    for(var j=0;j<$scope.chosenIndexs.length;j++){
                                        str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*4-1]+"</td>";
                                        str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*4-2]+"</td>";
                                        str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*4-3]+"</td>";
                                        str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*4-4]+"</td>";

                                    }

                                    str+="</tr>";

                        }
                        break;
                    case '沪深A股':
                        for(var i=0;i<23;i++){
                            str+="<tr><td>"+(i+1)+"</td>"+
                                "<td>"+$scope.Data.securcode[i]+"</td>"+
                                "<td>"+$scope.Data.securname[i]+"</td>";
                            for(var j=0;j<$scope.chosenIndexs.length;j++){
                                str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*4-1]+"</td>";
                                str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*4-2]+"</td>";
                                str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*4-3]+"</td>";
                                str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*4-4]+"</td>";

                            }

                            str+="</tr>";

                        }
                        break;
                    case '新三板做市':
                        for(var i=23;i<38;i++){
                            str+="<tr><td>"+(i+1)+"</td>"+
                                "<td>"+$scope.Data.securcode[i]+"</td>"+
                                "<td>"+$scope.Data.securname[i]+"</td>";
                            for(var j=0;j<$scope.chosenIndexs.length;j++){
                                str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*4-1]+"</td>";
                                str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*4-2]+"</td>";
                                str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*4-3]+"</td>";
                                str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*4-4]+"</td>";

                            }

                            str+="</tr>";

                        }
                        break;
                }
                        document.getElementById('table').innerHTML=str;

            };

    });