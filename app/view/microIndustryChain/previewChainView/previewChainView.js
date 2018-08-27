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

    });