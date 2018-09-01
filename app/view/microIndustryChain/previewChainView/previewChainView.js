angular.module('myApp.microIndustryChain.previewChainView', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('PreviewChainViewCtrl',function($scope, $route, $http, $stateParams) {
        //DOM对象化
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");
        let topElement = document.getElementById("topElement");
        let nodeDiv = document.getElementById("nodeDiv");
        let connectionBackground = document.getElementById("connectionBackground");
        let connectionContext = connectionBackground.getContext("2d");
        let netBackground = document.getElementById("netBackground");
        let netContext = netBackground.getContext("2d");
        let animeBackground = document.getElementById("animeBackground");
        let animeContext = animeBackground.getContext("2d");

        //可调DOM参数
        let canvasWidth = 1000;//三层的 宽和高
        let canvasHeight = 600;
        let canvasLeft = 50;
        let canvasTop = 50;
        let connectionLineWidth = 5;//连线层 连线宽度
        let connectionLineColor = "rgba(0,0,0,0.5)";//连线层 连线颜色
        let connectionLineAnimeWidth = 6;
        let connectionLineAnimeColor = "rgba(255,215,0,1)";//连线层 动画颜色
        let step = 15;//网格背景 网络间隔
        let netColor = "rgba(0,0,0,0.1)";//网格背景 网络颜色

        //DOM参数初始化
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.left = canvasLeft + "px";//三层的 页面边距
        canvas.style.top = canvasTop + "px";
        connectionBackground.width = canvas.width;//初始化 连线背景大小
        connectionBackground.height = canvas.height;
        connectionBackground.style.left = canvas.style.left;
        connectionBackground.style.top = canvas.style.top;
        connectionContext.lineWidth = connectionLineWidth;
        netBackground.width = canvas.width;//初始化 网格背景大小
        netBackground.height = canvas.height;
        netBackground.style.left = canvas.style.left;
        netBackground.style.top = canvas.style.top;
        animeBackground.width = canvas.width;//初始化 动画背景大小
        animeBackground.height = canvas.height;
        animeBackground.style.left = canvas.style.left;
        animeBackground.style.top = canvas.style.top;
        animeContext.lineWidth = connectionLineAnimeWidth;
        animeContext.strokeStyle = connectionLineAnimeColor;


        $scope.nodeIDList = $stateParams.nodeIDList;
        $scope.nodeList = $stateParams.nodeList;
        $scope.nodeDisplayList = $stateParams.nodeDisplayList;
        $scope.connectionList = $stateParams.connectionList;


        /**
         *网格背景的实现
         */
        (function initializeNetBackground() {
            netContext.beginPath();
            for (let i = step; i < netBackground.width; i += step) {
                netContext.moveTo(i, 0);
                netContext.lineTo(i, netBackground.height);
            }
            for (let j = step; j < netBackground.height; j += step) {
                netContext.moveTo(0, j);
                netContext.lineTo(netBackground.width, j);
            }
            netContext.strokeStyle = netColor;
            netContext.stroke();
        })();


        (function initializeNodeDisplay() {
            for(let i=0, length = $scope.nodeIDList.length; i<length; i++) {
                let nodeIDCache = $scope.nodeIDList[i];

                let node = document.createElement("node");
                let nodeName = document.createElement("p");

                node.className = "node";
                node.id = nodeIDCache;
                node.setAttribute("data-toggle","context");
                node.setAttribute("data-target","#node-menu");
                node.style.left = (canvas.offsetLeft + $scope.nodeDisplayList[nodeIDCache].x) + "px";
                node.style.top = (canvas.offsetTop + $scope.nodeDisplayList[nodeIDCache].y) + "px";
                node.style.width = 100 + "px";
                node.style.height = 50 + "px";
                nodeName.id = "nodeName";
                nodeName.innerText = $scope.nodeList[nodeIDCache].nodeName;
                nodeName.style.color = $scope.nodeList[nodeIDCache].nodeColor;
                node.appendChild(nodeName);

                nodeDiv.appendChild(node);
            }
        })();


        (function refreshConnectionBackground() {
            connectionContext.clearRect(0, 0, canvasWidth, canvasHeight);
            connectionContext.beginPath();
            for(let i=0, length=$scope.connectionList.length; i<length; i++){
                let beginNode = document.getElementById($scope.connectionList[i].begin);
                let endNode = document.getElementById($scope.connectionList[i].end);
                connectionContext.moveTo(
                    parseFloat(beginNode.style.left) + parseFloat(beginNode.style.width)/2 - canvas.offsetLeft,
                    parseFloat(beginNode.style.top) + parseFloat(beginNode.style.height)/2 - canvas.offsetTop
                );
                connectionContext.lineTo(
                    parseFloat(endNode.style.left) + parseFloat(endNode.style.width)/2 - canvas.offsetLeft,
                    parseFloat(endNode.style.top) + parseFloat(endNode.style.height)/2 - canvas.offsetTop
                );
            }
            connectionContext.strokeStyle = connectionLineColor;
            connectionContext.stroke();
        })();

        /**
         *资金流动 动画实现
         */
        let animeI = 4.0;
        let animeTime = 40.0;
        let animeTimeoutID;
        function startAnimeBackground ()
        {
            animeI = animeI + 1.0;
            if(animeI > animeTime){animeI = 4.0;}
            animeContext.clearRect(0, 0, canvasWidth, canvasHeight);
            animeContext.beginPath();
            for(let i=0; i<$scope.connectionList.length; i++){
                let beginNode = document.getElementById($scope.connectionList[i].begin);
                let endNode = document.getElementById($scope.connectionList[i].end);
                let beginX = parseFloat(beginNode.style.left) + parseFloat(beginNode.style.width)/2 - canvas.offsetLeft;
                let beginY = parseFloat(beginNode.style.top) + parseFloat(beginNode.style.height)/2 - canvas.offsetTop;
                let endX = parseFloat(endNode.style.left) + parseFloat(endNode.style.width)/2 - canvas.offsetLeft;
                let endY = parseFloat(endNode.style.top) + parseFloat(endNode.style.height)/2 - canvas.offsetTop;
                animeContext.moveTo(
                    beginX + ((animeI-4.0)/animeTime)*(endX - beginX),
                    beginY + ((animeI-4.0)/animeTime)*(endY - beginY)
                );
                animeContext.lineTo(
                    beginX + (animeI/animeTime)*(endX - beginX),
                    beginY + (animeI/animeTime)*(endY - beginY)
                );
            }
            animeContext.stroke();
            animeTimeoutID = setTimeout(startAnimeBackground, 50);
        }
        startAnimeBackground();

        let stopAnimeBackground = function () {
            clearTimeout(animeTimeoutID);
            animeContext.clearRect(0, 0, canvasWidth, canvasHeight);
        };

        /*
         * 评论区
         */

        function AnalyticEmotion(s) {
            if(typeof (s) != "undefined") {
                var sArr = s.match(/\[.*?\]/g);
                if(null!=sArr && '' != sArr){
                    for(var i = 0; i < sArr.length; i++){
                        if(uSinaEmotionsHt.containsKey(sArr[i])) {
                            var reStr = "<img src=\"" + uSinaEmotionsHt.get(sArr[i]) + "\" height=\"22\" width=\"22\" />";
                            s = s.replace(sArr[i], reStr);
                        }
                    }
                }

            }
            return s;
        }

        console.log("asdsa")
        var sub = document.getElementById("subm");
        sub.onclick = function submit() {
            console.log("ss");
            var inputText = $('.text').val();
            // $('#info-show ul').append(reply(AnalyticEmotion(inputText)));
            // console.log(inputText);
            $http({
                url:urlHead + 'addComment',
                method: 'post',
                // contentType: "application/json",
                params: {
                    graphid:1,
                    comment:inputText
                }
            }).then(function successCallBack(response) {
                console.log(response.data)
                var data = response.data;
                console.log(data);
            },function errorCallBack(response) {
                console.log("erreor");
            });
        }



        var html;
        function reply(content){
            html  = '<li>';
            html += '<div class="head-face">';
            html += '<img src="view/microIndustryChain/previewChainView/images/头像.jpg" / >';
            html += '</div>';
            html += '<div class="reply-cont">';
            html += '<p class="username">小小红色飞机</p>';
            html += '<p class="comment-body">'+content+'</p>';
            html += '<p class="comment-footer">2016年10月5日　回复　点赞54　转发12</p>';
            html += '</div>';
            html += '</li>';
            return html;
        }

        var data = {};
        data.graphid = 1;
        data.comment = inputText;
        data = JSON.stringify(data);

        $http({
            url:urlHead + 'addComment',
            method: 'post',
            // contentType: "application/json",
            // headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            withCredentials: true,
            params:{
                "data":data
            }
        }).then(function successCallBack(response) {
            console.log(response.data)
            var data = response.data;
            console.log(data);
        },function errorCallBack(response) {
            console.log("erreor");
        });

    });