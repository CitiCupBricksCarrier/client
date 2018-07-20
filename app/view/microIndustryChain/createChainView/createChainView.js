angular.module('myApp.microIndustryChain.createChainView', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('CreateChainViewCtrl',function($scope, $route, $http) {

        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");
        let topElement = document.getElementById("topElement");
        let nodeDiv = document.getElementById("nodeDiv");
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;
        let nextNodePositionX = 100;
        let nextNodePositionY = 50;
        let nodePositionList = [];
        let connectionList = [];
        let nextNodeID = 1;

        let mouseDownNodeID = "";//当前鼠标点击的node
        let mouseDownAnchorID = "";


        $scope.addNewNode = function () {
            let node = document.createElement("node");
            let nodeText = document.createTextNode("新节点");
            let nodeAnchorTop = document.createElement("nodeAnchorTop");
            let nodeAnchorRight = document.createElement("nodeAnchorRight");
            let nodeAnchorBottom = document.createElement("nodeAnchorBottom");
            let nodeAnchorLeft = document.createElement("nodeAnchorLeft");

            node.className = "node";
            node.id = "N" + nextNodeID;
            node.style.left = nextNodePositionX + "px";
            node.style.top = nextNodePositionY + "px";
            node.style.width = 80 + "px";
            node.style.height = 40 + "px";
            nodePositionList[node.id] = {x:nextNodePositionX, y:nextNodePositionY}
            nodeAnchorTop.className = "node-anchor-top";
            nodeAnchorTop.id = "A" + nextNodeID + "1";
            nodeAnchorRight.className = "node-anchor-right";
            nodeAnchorRight.id = "A" + nextNodeID + "2";
            nodeAnchorBottom.className = "node-anchor-bottom";
            nodeAnchorBottom.id = "A" + nextNodeID + "3";
            nodeAnchorLeft.className = "node-anchor-left";
            nodeAnchorLeft.id = "A" + nextNodeID + "4";
            node.appendChild(nodeText);
            node.appendChild(nodeAnchorTop);
            node.appendChild(nodeAnchorRight);
            node.appendChild(nodeAnchorBottom);
            node.appendChild(nodeAnchorLeft);
            node.ondblclick = function () {
            };

            nodeDiv.appendChild(node);

            nextNodeID += 1;
            nextNodePositionX += 20;
            nextNodePositionY += 20;

        };


        /**
         * 节点拖动的实现
         */
        let storageWindowPosition;
        let storageClickPosition;
        let windowEndX;
        let windowEndY;
        let canDragNode = false;
        let canDragAnchor = false;
        let anchorBeginPositionCacheX = 0;
        let anchorBeginPositionCacheY = 0;
        let connectionBeginNodeCache = "";
        let connectionEndNodeCache = "";
        let saveStoragePositionWithScroll = function (ele) {//absolute型拖动
            storageWindowPosition = {"x":parseInt(ele.style.left),"y":parseInt(ele.style.top)};
            storageClickPosition = {"x":window.event.clientX + document.documentElement.scrollLeft,"y":window.event.clientY + document.documentElement.scrollTop};
        };
        let calculateOffsetWithScroll = function () {
            windowEndX = storageWindowPosition.x + window.event.clientX + document.documentElement.scrollLeft - storageClickPosition.x;
            windowEndY = storageWindowPosition.y + window.event.clientY + document.documentElement.scrollTop - storageClickPosition.y;
        };

        let saveStoragePosition = function (ele) {//fix型拖动
            storageWindowPosition = {"x":parseInt(ele.style.left),"y":parseInt(ele.style.top)};
            storageClickPosition = {"x":window.event.clientX ,"y":window.event.clientY};
        };
        let calculateOffset = function () {
            windowEndX = storageWindowPosition.x + window.event.clientX - storageClickPosition.x;
            windowEndY = storageWindowPosition.y + window.event.clientY - storageClickPosition.y;
        };
        topElement.onmousedown = function (e) {
            /**
             * 如果鼠标的对象id以n开头，代表为node
             */
            if($(e.target).attr("id")[0] == 'N') {
                mouseDownNodeID = $(e.target).attr("id");
                saveStoragePositionWithScroll(document.getElementById(mouseDownNodeID));
                canDragNode = true;
            }
            else if($(e.target).attr("id")[0] == 'A') {
                mouseDownAnchorID = $(e.target).attr("id");
                anchorBeginPositionCacheX = window.event.clientX - canvas.offsetLeft + document.documentElement.scrollLeft;
                anchorBeginPositionCacheY = window.event.clientY - canvas.offsetTop + document.documentElement.scrollTop;
                connectionBeginNodeCache = $(e.target).parent().attr("id");
                canDragAnchor = true;
                }
        };
        topElement.onmousemove = function (e) {
            if(canDragNode) {
                calculateOffsetWithScroll();
                let node = document.getElementById(mouseDownNodeID);
                node.style.left = windowEndX + "px";
                node.style.top = windowEndY + "px";
                connectionBackgroundRefresh();
            }
            else if(canDragAnchor) {
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                context.beginPath();
                context.moveTo(
                    anchorBeginPositionCacheX,
                    anchorBeginPositionCacheY
                );
                context.lineTo(
                    window.event.clientX - canvas.offsetLeft + document.documentElement.scrollLeft,
                    window.event.clientY - canvas.offsetTop + document.documentElement.scrollTop
                );
                context.stroke();
            }
        };
        topElement.onmouseup = function (e) {
            if(canDragAnchor){
                canDragAnchor = false;
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                if($(e.target).attr("id")[0] == 'A'){
                    connectionEndNodeCache = $(e.target).parent().attr("id");
                    connectionList.push
                        ({
                            type:"normal",
                            begin:connectionBeginNodeCache,
                            end:connectionEndNodeCache
                        });
                    connectionBackgroundRefresh();
                }
            }
            else {
                canDragNode = false;
            }
        };



        /**
         *根据数据生成连线背景的实现
         */
        let connectionLineWidth = 5;
        let connectionLineColor = "rgba(0,0,0,0.5)";

        let connectionBackground = document.getElementById("connectionBackground");
        let connectionContext = connectionBackground.getContext("2d");
        connectionBackground.width = canvasWidth;//初始化背景大小
        connectionBackground.height = canvasHeight;
        connectionContext.lineWidth = connectionLineWidth;

        let connectionBackgroundRefresh = function () {
            connectionContext.clearRect(0, 0, canvasWidth, canvasHeight);
            connectionContext.beginPath();
            for(let i=0; i<connectionList.length; i++){
                let beginNode = document.getElementById(connectionList[i].begin);
                let endNode = document.getElementById(connectionList[i].end);
                connectionContext.moveTo(
                    parseInt(beginNode.style.left) + parseInt(beginNode.style.width)/2 - canvas.offsetLeft + document.documentElement.scrollLeft,
                    parseInt(beginNode.style.top) + parseInt(beginNode.style.height)/2 - canvas.offsetTop + document.documentElement.scrollTop
                );
                connectionContext.lineTo(
                    parseInt(endNode.style.left) + parseInt(endNode.style.width)/2 - canvas.offsetLeft + document.documentElement.scrollLeft,
                    parseInt(endNode.style.top) + parseInt(endNode.style.height)/2 - canvas.offsetTop + document.documentElement.scrollTop
                );
            }
            connectionContext.strokeStyle = connectionLineColor;
            connectionContext.stroke();
        };

        /**
         *网格背景的实现
         */
        let step = 15;//网络间隔
        let netColor = "rgba(0,0,0,0.1)";//网络颜色

        let netBackground = document.getElementById("netBackground");
        let netContext = netBackground.getContext("2d");

        netBackground.width = canvasWidth;//初始化背景大小
        netBackground.height = canvasHeight;

        netContext.beginPath();
        for (let i = step; i < netBackground.width; i += step){
            netContext.moveTo(i, 0);
            netContext.lineTo(i, netBackground.height);
        }
        for (let j = step; j < netBackground.height; j += step){
            netContext.moveTo(0, j);
            netContext.lineTo(netBackground.width, j);
        }
        netContext.strokeStyle = netColor;
        netContext.stroke();
    });
