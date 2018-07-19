angular.module('myApp.microIndustryChain.createChainView', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('CreateChainViewCtrl',function($scope, $route, $http) {

        let canvas = document.getElementById("canvas");
        let topElement = document.getElementById("topElement");
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;

        let nextNodePositionX = 100;
        let nextNodePositionY = 50;
        let nodeID = [];
        let nextNodeID = 1;

        let mouseDownNodeID = "";

        $scope.addNewNode = function () {
            let nodeDiv = document.getElementById("nodeDiv");
            let node = document.createElement("node");
            let nodeText = document.createTextNode("新节点");
            let nodeAnchorRight = document.createElement("nodeAnchorRight");
            let nodeAnchorLeft = document.createElement("nodeAnchorLeft");
            let nodeAnchorTop = document.createElement("nodeAnchorTop");
            let nodeAnchorBottom = document.createElement("nodeAnchorBottom");



            node.className = "node";
            node.id = "n" + nextNodeID;
            node.style.left = nextNodePositionX + "px";
            node.style.top = nextNodePositionY + "px";
            nodeAnchorRight.className = "node-anchor-right";
            nodeAnchorLeft.className = "node-anchor-left";
            nodeAnchorTop.className = "node-anchor-top";
            nodeAnchorBottom.className = "node-anchor-bottom";
            node.appendChild(nodeText);
            node.appendChild(nodeAnchorRight);
            node.appendChild(nodeAnchorLeft);
            node.appendChild(nodeAnchorTop);
            node.appendChild(nodeAnchorBottom);
            node.ondblclick = function () {
            };

            nodeDiv.appendChild(node);

            nextNodeID += 1;
            nextNodePositionX += 20;
            nextNodePositionY += 20;
        };


        let storageWindowPosition;
        let storageClickPosition;
        let windowEndX;
        let windowEndY;
        let canDrag = false;
        let saveStoragePositionWithScroll = function (ele) {
            storageWindowPosition = {"x":parseInt(ele.style.left),"y":parseInt(ele.style.top)};
            storageClickPosition = {"x":window.event.clientX + document.documentElement.scrollLeft,"y":window.event.clientY + document.documentElement.scrollTop};
        };
        let calculateOffsetWithScroll = function () {
            windowEndX = storageWindowPosition.x + window.event.clientX + document.documentElement.scrollLeft - storageClickPosition.x;
            windowEndY = storageWindowPosition.y + window.event.clientY + document.documentElement.scrollTop - storageClickPosition.y;
        };

        let saveStoragePosition = function (ele) {
            storageWindowPosition = {"x":parseInt(ele.style.left),"y":parseInt(ele.style.top)};
            storageClickPosition = {"x":window.event.clientX ,"y":window.event.clientY};
        };
        let calculateOffset = function () {
            windowEndX = storageWindowPosition.x + window.event.clientX - storageClickPosition.x;
            windowEndY = storageWindowPosition.y + window.event.clientY - storageClickPosition.y;
        };

        topElement.onmousedown = function (e) {
            if($(e.target).attr("id")[0] == 'n') {
                mouseDownNodeID = $(e.target).attr("id");
                saveStoragePositionWithScroll(document.getElementById(mouseDownNodeID));
                canDrag = true;
            }
        };
        topElement.onmousemove = function () {
            if(canDrag) {
                calculateOffsetWithScroll();
                let node = document.getElementById(mouseDownNodeID);
                node.style.left = windowEndX + "px";
                node.style.top = windowEndY + "px";
            }
        };
        topElement.onmouseup = function () {
            canDrag = false;
        };
        topElement.onmouseup = function () {
            canDrag = false;
        };





        let step = 15;//网络间隔
        let netColor = "rgba(0,0,0,0.1)";//网络颜色

        let netBackground = document.getElementById("netBackground");
        let context = netBackground.getContext("2d");

        netBackground.width = canvasWidth;//初始化背景大小
        netBackground.height = canvasHeight;

        context.beginPath();
        for (let i = step; i < netBackground.width; i += step){
            context.moveTo(i, 0);
            context.lineTo(i, netBackground.height);
        }
        for (let j = step; j < netBackground.height; j += step){
            context.moveTo(0, j);
            context.lineTo(netBackground.width, j);
        }
        context.strokeStyle = netColor;
        context.stroke();
    });
