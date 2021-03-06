angular.module('myApp.macroIndustryDisplay.gzbx', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('gzbxCtrl',function($scope, $route, $http) {
        //设置标题栏响应nav为active
        $($('.header_macro .module_nav .nav.active')).removeClass('active');
        $($('.header_macro .module_nav .nav')[5]).addClass('active');

        $scope.toShow=false;
        $scope.toShowPane=false;
        $scope.str="最高值,平均值";
        $scope.firstStr="最高值"
        $scope.isFirst=false;
        $scope.chosenIndexs=[2,3,4,5,8,9,10];
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
            url: urlHead+'majorListedCompanies/ComparisonOfValuationPerformance'
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
            var max=0;
            for(var i=0;i<array.length;i++){
                if(Number(array[i])>max) max=array[i];
            }
            if(max=='0')return '--';
            else return Number(max).toFixed(2);
        };

        $scope.calMin=function (array) {
            var min=Number.POSITIVE_INFINITY;
            for(var i=0;i<array.length;i++){
                if(Number(array[i])<min) min=array[i];
            }

            if(min==Number.POSITIVE_INFINITY)return '--';
            else return Number(min).toFixed(2);
        };

        $scope.calAvg=function (array) {
            var vag=0,sum=0;
            for(var i=0;i<array.length;i++){
                if(array[i]!='--') sum+=Number(array[i]);
            }

            vag=(sum/(array.length)).toFixed(2);

            if(Number.isNaN(sum)) return'--';
            else return vag;

        };

        $scope.sortNumber=function(a,b){
            return a-b;
        };

        $scope.calMid=function (array) {
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

        $scope.changeMarket=function(){
            $scope.drawTable();
        };



        $scope.drawTable=function () {
            var str="";
            var INDEXS=['','最新收盘日','总市值','流通市值','市盈率PE(TTM)','市净率PB(MRQ)','市现率PCF(TTM)','市销率PS(TTM)','企业价值','企业价值/收入(倍)','企业价值/EBITDA(倍)','总负债','总负债同比增长率(%)','股东权益','股东权益同比增长率(%)','现金净流量','经营活动净现金流','投资活动净现金流','筹资活动净现金流']
            var indexs=['','latstclosday','tomaktval','marktvalofcircul','pettm','pbmrq','pcfttm','psttm','entpmarktval','emvincrat','emvebitdarat','toliablt','toliabltyoygrowrate','sharehldrigint','sharehldrigintyoygrowrate','netcshflow','netcshfloperact','netcshflinvact','netcshflfinact']


            var stat=$scope.str.split(',');
            str+="        <tr>\n" +
                "            <th>排名</th>\n" +
                "            <th>代码</th>\n" +
                "            <th>证券简称</th>\n" ;
            for(var i=0;i<$scope.chosenIndexs.length;i++){
                str+="<th>"+INDEXS[$scope.chosenIndexs[i]]+"</th>";
            }
            str+="</tr>";

            for(var i=0;i<stat.length;i++){
                switch (stat[i]){
                    case '最高值':
                        str+="<tr><td></td><td></td><td>最高值</td>";
                        for(var j=0;j<$scope.chosenIndexs.length;j++){
                            str+= "<td>"+$scope.calMax($scope.Data[indexs[$scope.chosenIndexs[j]]])+"</td>";
                        }
                        str+="</tr>";
                        break;
                    case '最低值':
                        str+="<tr><td></td><td></td><td>最低值</td>";
                        for(var j=0;j<$scope.chosenIndexs.length;j++){
                            str+= "<td>"+$scope.calMin($scope.Data[indexs[$scope.chosenIndexs[j]]])+"</td>";
                        }
                        str+="</tr>";
                        break;
                    case '中位值':
                        str+="<tr><td></td><td></td><td>中位值</td>";
                        for(var j=0;j<$scope.chosenIndexs.length;j++){
                            str+="<td>"+$scope.calMid($scope.Data[indexs[$scope.chosenIndexs[j]]])+"</td>";
                        }
                        str+="</tr>";
                        break;
                    case '平均值':
                        str+="<tr><td></td><td></td><td>平均值</td>";
                        for(var j=0;j<$scope.chosenIndexs.length;j++){
                            str+= "<td>"+$scope.calAvg($scope.Data[indexs[$scope.chosenIndexs[j]]])+"</td>";
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
                            str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][i]+"</td>";

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
                            str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][i]+"</td>";
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
                            str+="<td>"+$scope.Data[indexs[$scope.chosenIndexs[j]]][i]+"</td>";
                        }

                        str+="</tr>";

                    }
                    break;
            }
            document.getElementById('table').innerHTML=str;

        };

    });