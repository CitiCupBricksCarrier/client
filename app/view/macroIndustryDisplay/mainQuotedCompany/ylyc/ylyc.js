angular.module('myApp.macroIndustryDisplay.ylyc', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('ylycCtrl',function($scope, $route, $http) {
        //设置标题栏响应nav为active
        $($('.header_macro .module_nav .nav.active')).removeClass('active');
        $($('.header_macro .module_nav .nav')[5]).addClass('active');

        $scope.toShow=false;
        $scope.toShowPane=false;
        $scope.str="最高值,平均值";
        $scope.firstStr="最高值"
        $scope.isFirst=false;
        $scope.chosenIndexs=[2,3,5,6,7,8,9];
        $scope.chosenNum=7;
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
            $scope.chosenNum=7;
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
            switch ($scope.chosenNum){

            }
            $scope.drawTable();

        };

        $http({
            method: 'POST',
            url: urlHead+'majorListedCompanies/ComparisonOfEarningsForecast'
        }).then(function successCallback(response) {
            $scope.Data=response.data;
            var Data=$scope.Data;
            console.log(Data);


            $scope.drawTable();
        }, function errorCallback(response) {
            alert("error");
            // 请求失败执行代码
        });

        $scope.calMaxSingle=function (array) {
            var max=Number.NEGATIVE_INFINITY;
            for(var i=0;i<array.length;i++){
                if(Number(array[i])>max) max=array[i];
            }
            if(max=='0'||max==Number.NEGATIVE_INFINITY) return '--';
            else return Number(max).toFixed(2);
        };

        $scope.calMaxMany=function (array) {

            var max17=Number.NEGATIVE_INFINITY,max18=Number.NEGATIVE_INFINITY,max19=Number.NEGATIVE_INFINITY;
            for(var i=0;i<array.length/3;i++){
                if(array[(i+1)*3-3]!='/'&&Number(array[(i+1)*3-3])>max17) max17=array[(i+1)*3-3];
                if(array[(i+1)*3-2]!='/'&&Number(array[(i+1)*3-2])>max18) max18=array[(i+1)*3-2];
                if(array[(i+1)*3-1]!='/'&&Number(array[(i+1)*3-1])>max19) max19=array[(i+1)*3-1];

            }
            return [Number(max17).toFixed(2),Number(max18).toFixed(2),max19==Number.NEGATIVE_INFINITY?'--':Number(max19).toFixed(2)];
        };

        $scope.calMinSingle=function (array) {
            var min=Number.POSITIVE_INFINITY;
            for(var i=0;i<array.length;i++){
                if(Number(array[i])<min) min=array[i];
            }

            if(min==Number.POSITIVE_INFINITY)return '--';
            else return Number(min).toFixed(2);
        };

        $scope.calMinMany=function (array) {
            var min17=Number.POSITIVE_INFINITY,min18=Number.POSITIVE_INFINITY,min19=Number.POSITIVE_INFINITY;
            for(var i=0;i<array.length/3;i++){
                if(Number(array[(i+1)*3-3])<min17) min17=array[(i+1)*3-3];
                if(Number(array[(i+1)*3-2])<min18) min18=array[(i+1)*3-2];
                if(Number(array[(i+1)*3-1])<min19) min19=array[(i+1)*3-1];

            }

            return [Number(min17).toFixed(2),Number(min18).toFixed(2),min19==Number.POSITIVE_INFINITY?'--':Number(min19).toFixed(2)];

        };

        $scope.calAvgSingle=function (array) {
            var vag=0,sum=0;
            for(var i=0;i<array.length;i++){
                if(array[i]!='--') sum+=Number(array[i]);
            }

            vag=(sum/(array.length)).toFixed(2);

            if(Number.isNaN(sum)) return'--';
            else return vag;

        };

        $scope.calAvgMany=function (array) {
            var vag17=0,vag18=0,vag19=0,sum17=0,sum18=0,sum19=0;
            for(var i=0;i<array.length/3;i++){
                if(array[(i+1)*3-3]!='/'&&array[(i+1)*3-3]!='--') sum17+=Number(array[(i+1)*3-3]);
                if(array[(i+1)*3-2]!='/'&&array[(i+1)*3-2]!='--') sum18+=Number(array[(i+1)*3-2]);
                if(array[(i+1)*3-1]!='/'&&array[(i+1)*3-1]!='--') sum19+=Number(array[(i+1)*3-1]);

            }

            vag17=(sum17/(array.length/3)).toFixed(2);
            vag18=(sum18/(array.length/3)).toFixed(2);
            vag19=(sum19/(array.length/3)).toFixed(2);

            return[vag17,vag18,vag19];

        };

        $scope.sortNumber=function(a,b){
            return a-b;
        };

        $scope.calMidSingle=function (array) {
            var result=array.sort($scope.sortNumber);

            if(result[result.length/2-1]=='--'){
                if(Number.isNaN(result[result.length/2])) return'--';
                return result[result.length/2];
            }
            else if(result[result.length/2=='--']){
                if(Number.isNaN(result[result.length/2-1])) return'--';
                return result[result.length/2-1];
            }
            else{
                if(Number.isNaN(((Number(result[result.length/2-1])+Number(result[result.length/2]))/2))) return'--';
                else return ((Number(result[result.length/2-1])+Number(result[result.length/2]))/2).toFixed(2);
            }

        };

        $scope.calMidMany=function(array){
            var array17=[],array18=[],array19=[];
            for(var i=0;i<array.length/3;i++){
                array19.push(array[(i+1)*4-1]);
                array18.push(array[(i+1)*4-2]);
                array17.push(array[(i+1)*4-3]);

            }
            array17=array17.sort($scope.sortNumber);
            array18=array18.sort($scope.sortNumber);
            array19=array19.sort($scope.sortNumber);

            var result17,result18,result19=0;
            if(array17[(array.length/3/2)-1]=='--'){
                result17=array17[array.length/3/2];
            }
            else if(array17[(array.length/3/2)]=='--'){
                result17=array17[array.length/3/2-1];
            }
            else{
                result17=((Number(array17[(array.length/3/2)-1])+Number(array17[array.length/3/2]))/2).toFixed(2);

            }

            if(array18[(array.length/3/2)-1]=='--'){
                result18=array18[array.length/3/2];
            }
            else if(array18[(array.length/3/2)]=='--'){
                result18=array18[array.length/3/2-1];
            }
            else{
                result18=((Number(array18[(array.length/3/2)-1])+Number(array18[array.length/3/2]))/2).toFixed(2);

            }

            if(array19[(array.length/3/2)-1]=='--'){
                result19=array19[array.length/3/2];
            }
            else if(array19[(array.length/3/2)]=='--'){
                result19=array19[array.length/3/2-1];
            }
            else{
                result19=((Number(array19[(array.length/3/2)-1])+Number(array19[array.length/3/2]))/2).toFixed(2);

            }
                return[result17,result18,result19];
        };

        $scope.changeMarket=function(){
            $scope.drawTable();
        };



        $scope.drawTable=function () {
            var str="";
            var INDEXS=['','最新收盘日','最新收盘价(原始币种)','一致评级','每股收益','总收入','总收入同比增长率(%)','净利润','净利润同比增长率(%)','市盈率PE(TTM)','预测机构数','总负债','总负债同比增长率(%)','股东权益','股东权益同比增长率(%)','现金净流量','经营活动净现金流','投资活动净现金流','筹资活动净现金流']
            var indexs=['','latstclosday','latstclosprice','unanmsevalu','earnpershare','toinc','toincyoygrowrate','netpro','netproyoygrowrate','pettm','premechnum','toliablt','toliabltyoygrowrate','sharehldrigint','sharehldrigintyoygrowrate','netcshflow','netcshfloperact','netcshflinvact','netcshflfinact']
            var haveManyIndexs=false;
            var stat=$scope.str.split(',');


            for(var i=0;i<$scope.chosenIndexs.length;i++){
                if($scope.chosenIndexs[i]!=1||$scope.chosenIndexs[i]!=2||$scope.chosenIndexs[i]!=3){
                    haveManyIndexs=true;
                    break;
                }
            }

            if(!haveManyIndexs) {
                str += "        <tr>\n" +
                    "            <th>排名</th>\n" +
                    "            <th>代码</th>\n" +
                    "            <th>证券简称</th>\n";
                for (var i = 0; i < $scope.chosenIndexs.length; i++) {
                    str += "<th>" + INDEXS[$scope.chosenIndexs[i]] + "</th>";
                }
                str += "</tr>";

                for (var i = 0; i < stat.length; i++) {
                    switch (stat[i]) {
                        case '最高值':
                            str += "<tr><td></td><td></td><td>最高值</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                str += "<td>" + $scope.calMaxSingle($scope.Data[indexs[$scope.chosenIndexs[j]]]) + "</td>";
                            }
                            str += "</tr>";
                            break;
                        case '最低值':
                            str += "<tr><td></td><td></td><td>最低值</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                str += "<td>" + $scope.calMinSingle($scope.Data[indexs[$scope.chosenIndexs[j]]]) + "</td>";
                            }
                            str += "</tr>";
                            break;
                        case '中位值':
                            str += "<tr><td></td><td></td><td>中位值</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                str += "<td>" + $scope.calMidSingle($scope.Data[indexs[$scope.chosenIndexs[j]]]) + "</td>";
                            }
                            str += "</tr>";
                            break;
                        case '平均值':
                            str += "<tr><td></td><td></td><td>平均值</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                str += "<td>" + $scope.calAvgSingle($scope.Data[indexs[$scope.chosenIndexs[j]]]) + "</td>";
                            }
                            str += "</tr>";
                            break;
                    }
                }
                switch ($scope.market) {
                    case '全部':
                        for (var i = 0; i < 38; i++) {
                            str += "<tr><td>" + (i + 1) + "</td>" +
                                "<td>" + $scope.Data.securcode[i] + "</td>" +
                                "<td>" + $scope.Data.securname[i] + "</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                str += "<td>" + $scope.Data[indexs[$scope.chosenIndexs[j]]][i] + "</td>";

                            }

                            str += "</tr>";

                        }
                        break;
                    case '沪深A股':
                        for (var i = 0; i < 23; i++) {
                            str += "<tr><td>" + (i + 1) + "</td>" +
                                "<td>" + $scope.Data.securcode[i] + "</td>" +
                                "<td>" + $scope.Data.securname[i] + "</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                str += "<td>" + $scope.Data[indexs[$scope.chosenIndexs[j]]][i] + "</td>";
                            }

                            str += "</tr>";

                        }
                        break;
                    case '新三板做市':
                        for (var i = 23; i < 38; i++) {
                            str += "<tr><td>" + (i + 1) + "</td>" +
                                "<td>" + $scope.Data.securcode[i] + "</td>" +
                                "<td>" + $scope.Data.securname[i] + "</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                str += "<td>" + $scope.Data[indexs[$scope.chosenIndexs[j]]][i] + "</td>";
                            }

                            str += "</tr>";

                        }
                        break;
                }
                document.getElementById('table').innerHTML = str;
            }
            else{

                var manyNums=0;
                str += "        <tr>\n" +
                    "            <th rowspan='2'>排名</th>\n" +
                    "            <th rowspan='2'>代码</th>\n" +
                    "            <th rowspan='2'>证券简称</th>\n";
                for (var i = 0; i < $scope.chosenIndexs.length; i++) {
                    if($scope.chosenIndexs[i]==1||$scope.chosenIndexs[i]==2||$scope.chosenIndexs[i]==3) {
                        str += "<th rowspan='2'>" + INDEXS[$scope.chosenIndexs[i]] + "</th>";
                    }
                    else {
                        str += "<th colspan='3'>" + INDEXS[$scope.chosenIndexs[i]] + "</th>";
                        manyNums++;
                    }
                }
                str += "</tr><tr>";

                for(var i=0;i<manyNums;i++){
                    str+="<th>17A</th><th>18E</th><th>19E</th>";
                }
                    str+="</tr>";

                for (var i = 0; i < stat.length; i++) {
                    switch (stat[i]) {
                        case '最高值':
                            str += "<tr><td></td><td></td><td>最高值</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                if($scope.chosenIndexs[j]==1||$scope.chosenIndexs[j]==2||$scope.chosenIndexs[j]==3) {
                                    str += "<td>" + $scope.calMaxSingle($scope.Data[indexs[$scope.chosenIndexs[j]]]) + "</td>";
                                }
                                else {
                                    str+="<td>"+$scope.calMaxMany($scope.Data[indexs[$scope.chosenIndexs[j]]])[0]+"</td>";
                                    str+="<td>"+$scope.calMaxMany($scope.Data[indexs[$scope.chosenIndexs[j]]])[1]+"</td>";
                                    str+="<td>"+$scope.calMaxMany($scope.Data[indexs[$scope.chosenIndexs[j]]])[2]+"</td>";

                                }
                            }
                            str += "</tr>";
                            break;
                        case '最低值':
                            str += "<tr><td></td><td></td><td>最低值</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                if($scope.chosenIndexs[j]==1||$scope.chosenIndexs[j]==2||$scope.chosenIndexs[j]==3) {
                                    str += "<td>" + $scope.calMinSingle($scope.Data[indexs[$scope.chosenIndexs[j]]]) + "</td>";
                                }
                                else {
                                    str+="<td>"+$scope.calMinMany($scope.Data[indexs[$scope.chosenIndexs[j]]])[0]+"</td>";
                                    str+="<td>"+$scope.calMinMany($scope.Data[indexs[$scope.chosenIndexs[j]]])[1]+"</td>";
                                    str+="<td>"+$scope.calMinMany($scope.Data[indexs[$scope.chosenIndexs[j]]])[2]+"</td>";

                                }                            }
                            str += "</tr>";
                            break;
                        case '中位值':
                            str += "<tr><td></td><td></td><td>中位值</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                if($scope.chosenIndexs[j]==1||$scope.chosenIndexs[j]==2||$scope.chosenIndexs[j]==3) {
                                    str += "<td>" + $scope.calMidSingle($scope.Data[indexs[$scope.chosenIndexs[j]]]) + "</td>";
                                }
                                else {
                                    str+="<td>"+$scope.calMidMany($scope.Data[indexs[$scope.chosenIndexs[j]]])[0]+"</td>";
                                    str+="<td>"+$scope.calMidMany($scope.Data[indexs[$scope.chosenIndexs[j]]])[1]+"</td>";
                                    str+="<td>"+$scope.calMidMany($scope.Data[indexs[$scope.chosenIndexs[j]]])[2]+"</td>";

                                }                            }
                            str += "</tr>";
                            break;
                        case '平均值':
                            str += "<tr><td></td><td></td><td>平均值</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                if($scope.chosenIndexs[j]==1||$scope.chosenIndexs[j]==2||$scope.chosenIndexs[j]==3) {
                                    str += "<td>" + $scope.calAvgSingle($scope.Data[indexs[$scope.chosenIndexs[j]]]) + "</td>";
                                }
                                else {
                                    str+="<td>"+$scope.calAvgMany($scope.Data[indexs[$scope.chosenIndexs[j]]])[0]+"</td>";
                                    str+="<td>"+$scope.calAvgMany($scope.Data[indexs[$scope.chosenIndexs[j]]])[1]+"</td>";
                                    str+="<td>"+$scope.calAvgMany($scope.Data[indexs[$scope.chosenIndexs[j]]])[2]+"</td>";

                                }                            }
                            str += "</tr>";
                            break;
                    }
                }
                switch ($scope.market) {
                    case '全部':
                        for (var i = 0; i < 38; i++) {
                            str += "<tr><td>" + (i + 1) + "</td>" +
                                "<td>" + $scope.Data.securcode[i] + "</td>" +
                                "<td>" + $scope.Data.securname[i] + "</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                if($scope.chosenIndexs[j]==1||$scope.chosenIndexs[j]==2||$scope.chosenIndexs[j]==3) {
                                    str += "<td>" + $scope.Data[indexs[$scope.chosenIndexs[j]]][i] + "</td>";
                                }
                                else {
                                    str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*3-3]+"</td>";
                                    str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*3-2]+"</td>";
                                    str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*3-1]+"</td>";

                                }

                            }

                            str += "</tr>";

                        }
                        break;
                    case '沪深A股':
                        for (var i = 0; i < 23; i++) {
                            str += "<tr><td>" + (i + 1) + "</td>" +
                                "<td>" + $scope.Data.securcode[i] + "</td>" +
                                "<td>" + $scope.Data.securname[i] + "</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                if($scope.chosenIndexs[j]==1||$scope.chosenIndexs[j]==2||$scope.chosenIndexs[j]==3) {
                                    str += "<td>" + $scope.Data[indexs[$scope.chosenIndexs[j]]][i] + "</td>";
                                }
                                else {
                                    str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*3-3]+"</td>";
                                    str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*3-2]+"</td>";
                                    str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*3-1]+"</td>";

                                }                            }

                            str += "</tr>";

                        }
                        break;
                    case '新三板做市':
                        for (var i = 23; i < 38; i++) {
                            str += "<tr><td>" + (i + 1) + "</td>" +
                                "<td>" + $scope.Data.securcode[i] + "</td>" +
                                "<td>" + $scope.Data.securname[i] + "</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                if($scope.chosenIndexs[j]==1||$scope.chosenIndexs[j]==2||$scope.chosenIndexs[j]==3) {
                                    str += "<td>" + $scope.Data[indexs[$scope.chosenIndexs[j]]][i] + "</td>";
                                }
                                else {
                                    str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*3-3]+"</td>";
                                    str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*3-2]+"</td>";
                                    str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][(i+1)*3-1]+"</td>";

                                }                            }

                            str += "</tr>";

                        }
                        break;
                }
                document.getElementById('table').innerHTML = str;
            }

        };

    });