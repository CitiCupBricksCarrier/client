angular.module('myApp.macroIndustryDisplay.scbx', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('scbxCtrl',function($scope, $route, $http) {
        //设置标题栏响应nav为active
        $($('.header_macro .module_nav .nav.active')).removeClass('active');
        $($('.header_macro .module_nav .nav')[5]).addClass('active');

        $scope.toShow=false;
        $scope.toShowPane=false;
        $scope.str="最高值,平均值";
        $scope.firstStr="最高值"
        $scope.isFirst=false;
        $scope.chosenIndexs=[2,3,4,5,6,7,8,9];
        $scope.chosenNum=8;
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
            $scope.chosenNum=8;
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
            url: urlHead+'majorListedCompanies/ContrastOfMarketPerformance'
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
            var array2=[];
            for(var i=0;i<array.length;i++){
                if(array[i]!=null&&array[i]!='--'){
                    array2.push(array[i]);
                }
            }
            var max=Number.NEGATIVE_INFINITY;
            for(var i=0;i<array2.length;i++){
                if(Number(array2[i])>max) max=array2[i];
            }
            if(max=='0')return '--';
            else return Number(max).toFixed(2);
        };

        $scope.calMin=function (array) {
            var array2=[];
            for(var i=0;i<array.length;i++){
                if(array[i]!=null&&array[i]!='--'){
                    array2.push(array[i]);
                }
            }
            var min=Number.POSITIVE_INFINITY;
            for(var i=0;i<array2.length;i++){
                if(Number(array2[i])<min) min=array2[i];
            }

            if(min==Number.POSITIVE_INFINITY)return '--';
            else return Number(min).toFixed(2);
        };

        $scope.calAvg=function (array) {
            var array2=[];
            for(var i=0;i<array.length;i++){
                if(array[i]!=null&&array[i]!='--'){
                    array2.push(array[i]);
                }
            }
            var vag=0,sum=0;
            for(var i=0;i<array2.length;i++){
              sum+=Number(array2[i]);
            }

            vag=(sum/(array2.length)).toFixed(2);

            if(Number.isNaN(sum)) return'--';
            else return vag;

        };

        $scope.sortNumber=function(a,b){
            return a-b;
        };

        $scope.calMid=function (array) {
            var array2=[];
            for(var i=0;i<array.length;i++){
                if(array[i]!=null&&array[i]!='--'){
                    array2.push(array[i]);
                }
            }

            var result=array2.sort($scope.sortNumber);

            if(result.length%2==1){
               return result[Math.round(result.length/2)-1];
            }
            else{
                return ((Number(result[Math.round(result.length/2)-1])+Number(result[Math.round(result.length/2)]))/2).toFixed(2);
            }


        };

        $scope.changeMarket=function(){
            $scope.drawTable();
        };



        $scope.drawTable=function () {
            var str="";
            var INDEXS=['','最新收盘日','最新收盘价(原始币种)','涨跌幅(%)','52周最高(前复权)','52周最低(前复权)','52周最高/现价(倍)','现价/52周最低(倍)','近一月日均成交额','近一月日均换手率','企业价值/EBITDA(倍)','总负债','总负债同比增长率(%)','股东权益','股东权益同比增长率(%)','现金净流量','经营活动净现金流','投资活动净现金流','筹资活动净现金流']
            var indexs=['','latstclosday','latstclosprice','riseFal','highstinfiftwowk','lowstinfiftwowk','hifwprepricrat','prepriclifwrat','namthdailyaveturnov','namthdailyexchrat','emvebitdarat','toliablt','toliabltyoygrowrate','sharehldrigint','sharehldrigintyoygrowrate','netcshflow','netcshfloperact','netcshflinvact','netcshflfinact']

            var haveRiseFall=false;
            var stat = $scope.str.split(',');

            for(var i=0;i<$scope.chosenIndexs.length;i++){
                if($scope.chosenIndexs[i]==3){
                    haveRiseFall=true;
                    break;
                }
            }
            if(!haveRiseFall) {
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
                                str += "<td>" + $scope.calMax($scope.Data[indexs[$scope.chosenIndexs[j]]]) + "</td>";
                            }
                            str += "</tr>";
                            break;
                        case '最低值':
                            str += "<tr><td></td><td></td><td>最低值</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                str += "<td>" + $scope.calMin($scope.Data[indexs[$scope.chosenIndexs[j]]]) + "</td>";
                            }
                            str += "</tr>";
                            break;
                        case '中位值':
                            str += "<tr><td></td><td></td><td>中位值</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                str += "<td>" + $scope.calMid($scope.Data[indexs[$scope.chosenIndexs[j]]]) + "</td>";
                            }
                            str += "</tr>";
                            break;
                        case '平均值':
                            str += "<tr><td></td><td></td><td>平均值</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                str += "<td>" + $scope.calAvg($scope.Data[indexs[$scope.chosenIndexs[j]]]) + "</td>";
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
                var riseFallIndex=0;

                str += "        <tr>\n" +
                    "            <th rowspan='2'>排名</th>\n" +
                    "            <th rowspan='2'>代码</th>\n" +
                    "            <th rowspan='2'>证券简称</th>\n";
                for (var i = 0; i < $scope.chosenIndexs.length; i++) {
                    if($scope.chosenIndexs[i]!=3){
                        riseFallIndex++;
                        str += "<th rowspan='2'>" + INDEXS[$scope.chosenIndexs[i]] + "</th>";}
                    else
                        str += "<th colspan='8'>" + INDEXS[$scope.chosenIndexs[i]] + "</th>";
                }
                str += "</tr><tr><th>最新</th><th>本周</th><th>本月</th><th>本年</th><th>近一月</th><th>近三月</th><th>近六月</th><th>近一年</th></tr>";

                for (var i = 0; i < stat.length; i++) {
                    switch (stat[i]) {
                        case '最高值':
                            str += "<tr><td></td><td></td><td>最高值</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                if($scope.chosenIndexs[j]!=3){
                                    switch ($scope.market){
                                        case '全部':
                                            str += "<td>" + $scope.calMax($scope.Data[indexs[$scope.chosenIndexs[j]]]) + "</td>";

                                            break;
                                        case '沪深A股':
                                            var tempArray=$scope.Data[indexs[$scope.chosenIndexs[j]]].slice(0,23)
                                            str += "<td>" + $scope.calMax(tempArray) + "</td>";

                                            break;
                                        case '新三板做市':
                                            var tempArray=$scope.Data[indexs[$scope.chosenIndexs[j]]].slice(23,38)
                                            str += "<td>" + $scope.calMax(tempArray) + "</td>";

                                            break;
                                    }
                                }
                                    else {
                                    switch ($scope.market){
                                        case '全部':
                                            str += "<td>" + $scope.calMax($scope.Data.fucknew) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.thwk) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.thmth) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.thyear) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.nearamth) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.nearthrmth) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.nearsixmth) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.nearayear) + "</td>";
                                            break;
                                        case '沪深A股':
                                            str += "<td>" + $scope.calMax($scope.Data.fucknew.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.thwk.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.thmth.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.thyear.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.nearamth.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.nearthrmth.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.nearsixmth.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.nearayear.slice(0,23)) + "</td>";

                                            break;
                                        case '新三板做市':
                                            str += "<td>" + $scope.calMax($scope.Data.fucknew.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.thwk.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.thmth.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.thyear.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.nearamth.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.nearthrmth.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.nearsixmth.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMax($scope.Data.nearayear.slice(23,38)) + "</td>";

                                            break;
                                    }

                                }

                            }
                            str += "</tr>";
                            break;
                        case '最低值':
                            str += "<tr><td></td><td></td><td>最低值</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                if ($scope.chosenIndexs[j] != 3){
                                    switch ($scope.market){
                                        case '全部':
                                            str += "<td>" + $scope.calMin($scope.Data[indexs[$scope.chosenIndexs[j]]]) + "</td>";

                                            break;
                                        case '沪深A股':
                                            var tempArray=$scope.Data[indexs[$scope.chosenIndexs[j]]].slice(0,23)
                                            str += "<td>" + $scope.calMin(tempArray) + "</td>";

                                            break;
                                        case '新三板做市':
                                            var tempArray=$scope.Data[indexs[$scope.chosenIndexs[j]]].slice(23,38)
                                            str += "<td>" + $scope.calMin(tempArray) + "</td>";

                                            break;
                                    }
                                }
                                else {
                                    switch ($scope.market){
                                        case '全部':
                                            str += "<td>" + $scope.calMin($scope.Data.fucknew) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.thwk) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.thmth) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.thyear) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.nearamth) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.nearthrmth) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.nearsixmth) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.nearayear) + "</td>";
                                            break;
                                        case '沪深A股':
                                            str += "<td>" + $scope.calMin($scope.Data.fucknew.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.thwk.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.thmth.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.thyear.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.nearamth.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.nearthrmth.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.nearsixmth.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.nearayear.slice(0,23)) + "</td>";

                                            break;
                                        case '新三板做市':
                                            str += "<td>" + $scope.calMin($scope.Data.fucknew.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.thwk.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.thmth.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.thyear.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.nearamth.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.nearthrmth.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.nearsixmth.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMin($scope.Data.nearayear.slice(23,38)) + "</td>";

                                            break;
                                    }

                                }
                            }
                            str += "</tr>";
                            break;
                        case '中位值':
                            str += "<tr><td></td><td></td><td>中位值</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                if ($scope.chosenIndexs[j] != 3){
                                    switch ($scope.market){
                                        case '全部':
                                            str += "<td>" + $scope.calMid($scope.Data[indexs[$scope.chosenIndexs[j]]]) + "</td>";

                                            break;
                                        case '沪深A股':
                                            var tempArray=$scope.Data[indexs[$scope.chosenIndexs[j]]].slice(0,23)
                                            str += "<td>" + $scope.calMid(tempArray) + "</td>";

                                            break;
                                        case '新三板做市':
                                            var tempArray=$scope.Data[indexs[$scope.chosenIndexs[j]]].slice(23,38)
                                            str += "<td>" + $scope.calMid(tempArray) + "</td>";

                                            break;
                                    }
                                }
                                else {
                                    switch ($scope.market){
                                        case '全部':
                                            str += "<td>" + $scope.calMid($scope.Data.fucknew) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.thwk) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.thmth) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.thyear) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.nearamth) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.nearthrmth) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.nearsixmth) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.nearayear) + "</td>";
                                            break;
                                        case '沪深A股':
                                            str += "<td>" + $scope.calMid($scope.Data.fucknew.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.thwk.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.thmth.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.thyear.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.nearamth.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.nearthrmth.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.nearsixmth.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.nearayear.slice(0,23)) + "</td>";

                                            break;
                                        case '新三板做市':
                                            str += "<td>" + $scope.calMid($scope.Data.fucknew.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.thwk.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.thmth.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.thyear.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.nearamth.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.nearthrmth.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.nearsixmth.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calMid($scope.Data.nearayear.slice(23,38)) + "</td>";

                                            break;
                                    }

                                }
                            }
                            str += "</tr>";
                            break;
                        case '平均值':
                            str += "<tr><td></td><td></td><td>平均值</td>";
                            for (var j = 0; j < $scope.chosenIndexs.length; j++) {
                                if ($scope.chosenIndexs[j] != 3){
                                    switch ($scope.market){
                                        case '全部':
                                            str += "<td>" + $scope.calAvg($scope.Data[indexs[$scope.chosenIndexs[j]]]) + "</td>";

                                            break;
                                        case '沪深A股':
                                            var tempArray=$scope.Data[indexs[$scope.chosenIndexs[j]]].slice(0,23)
                                            str += "<td>" + $scope.calAvg(tempArray) + "</td>";

                                            break;
                                        case '新三板做市':
                                            var tempArray=$scope.Data[indexs[$scope.chosenIndexs[j]]].slice(23,38)
                                            str += "<td>" + $scope.calAvg(tempArray) + "</td>";

                                            break;
                                    }
                                }
                                else {
                                    switch ($scope.market){
                                        case '全部':
                                            str += "<td>" + $scope.calAvg($scope.Data.fucknew) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.thwk) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.thmth) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.thyear) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.nearamth) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.nearthrmth) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.nearsixmth) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.nearayear) + "</td>";
                                            break;
                                        case '沪深A股':
                                            str += "<td>" + $scope.calAvg($scope.Data.fucknew.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.thwk.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.thmth.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.thyear.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.nearamth.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.nearthrmth.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.nearsixmth.slice(0,23)) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.nearayear.slice(0,23)) + "</td>";

                                            break;
                                        case '新三板做市':
                                            str += "<td>" + $scope.calAvg($scope.Data.fucknew.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.thwk.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.thmth.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.thyear.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.nearamth.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.nearthrmth.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.nearsixmth.slice(23,38)) + "</td>";
                                            str += "<td>" + $scope.calAvg($scope.Data.nearayear.slice(23,38)) + "</td>";

                                            break;
                                    }

                                }
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
                                if ($scope.chosenIndexs[j] != 3)
                                    str += "<td>" + $scope.Data[indexs[$scope.chosenIndexs[j]]][i] + "</td>";
                                else {
                                    if($scope.Data.fucknew[i]!=null)
                                    str += "<td>" + $scope.Data.fucknew[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.thwk[i]!=null)
                                        str += "<td>" + $scope.Data.thwk[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.thmth[i]!=null)
                                        str += "<td>" + $scope.Data.thmth[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.thyear[i]!=null)
                                        str += "<td>" + $scope.Data.thyear[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.nearamth[i]!=null)
                                        str += "<td>" + $scope.Data.nearamth[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.nearthrmth[i]!=null)
                                        str += "<td>" + $scope.Data.nearthrmth[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.nearsixmth[i]!=null)
                                        str += "<td>" + $scope.Data.nearsixmth[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.nearayear[i]!=null)
                                        str += "<td>" + $scope.Data.nearayear[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }

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
                                if ($scope.chosenIndexs[j] != 3)
                                    str += "<td>" + $scope.Data[indexs[$scope.chosenIndexs[j]]][i] + "</td>";
                                else {
                                    if($scope.Data.fucknew[i]!=null)
                                        str += "<td>" + $scope.Data.fucknew[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.thwk[i]!=null)
                                        str += "<td>" + $scope.Data.thwk[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.thmth[i]!=null)
                                        str += "<td>" + $scope.Data.thmth[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.thyear[i]!=null)
                                        str += "<td>" + $scope.Data.thyear[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.nearamth[i]!=null)
                                        str += "<td>" + $scope.Data.nearamth[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.nearthrmth[i]!=null)
                                        str += "<td>" + $scope.Data.nearthrmth[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.nearsixmth[i]!=null)
                                        str += "<td>" + $scope.Data.nearsixmth[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.nearayear[i]!=null)
                                        str += "<td>" + $scope.Data.nearayear[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                }
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
                                if ($scope.chosenIndexs[j] != 3)
                                    str += "<td>" + $scope.Data[indexs[$scope.chosenIndexs[j]]][i] + "</td>";
                                else {
                                    if($scope.Data.fucknew[i]!=null)
                                        str += "<td>" + $scope.Data.fucknew[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.thwk[i]!=null)
                                        str += "<td>" + $scope.Data.thwk[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.thmth[i]!=null)
                                        str += "<td>" + $scope.Data.thmth[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.thyear[i]!=null)
                                        str += "<td>" + $scope.Data.thyear[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.nearamth[i]!=null)
                                        str += "<td>" + $scope.Data.nearamth[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.nearthrmth[i]!=null)
                                        str += "<td>" + $scope.Data.nearthrmth[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.nearsixmth[i]!=null)
                                        str += "<td>" + $scope.Data.nearsixmth[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                    if($scope.Data.nearayear[i]!=null)
                                        str += "<td>" + $scope.Data.nearayear[i] + "</td>";
                                    else{
                                        str += "<td>" + "--"+ "</td>";
                                    }
                                }
                            }
                            str += "</tr>";

                        }
                        break;
                }
                document.getElementById('table').innerHTML = str;
            }
        };

    });