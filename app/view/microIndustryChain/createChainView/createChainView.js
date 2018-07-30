angular.module('myApp.microIndustryChain.createChainView', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('CreateChainViewCtrl',function($scope, $route, $http) {
        //DOM对象化
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");
        let topElement = document.getElementById("topElement");
        let nodeDiv = document.getElementById("nodeDiv");
        let connectionBackground = document.getElementById("connectionBackground");
        let connectionContext = connectionBackground.getContext("2d");
        let netBackground = document.getElementById("netBackground");
        let netContext = netBackground.getContext("2d");

        //可调DOM参数
        let canvasWidth = 1000;//三层的 宽和高
        let canvasHeight = 500;
        canvas.style.left = "100px";//三层的 页面边距
        canvas.style.top = "150px";
        let connectionLineWidth = 5;//连线层 连线宽度
        let connectionLineColor = "rgba(0,0,0,0.5)";//连线层 连线颜色
        let step = 15;//网格背景 网络间隔
        let netColor = "rgba(0,0,0,0.1)";//网格背景 网络颜色
        let nextNodePositionX = 100;//新增节点 位置
        let nextNodePositionY = 50;
        let nextNodeID = 1;//新增节点 ID
        let nextConnectionID = 1;

        //DOM参数初始化
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        connectionBackground.width = canvas.width;//初始化 连线背景大小
        connectionBackground.height = canvas.height;
        connectionBackground.style.left = canvas.style.left;
        connectionBackground.style.top = canvas.style.top;
        connectionContext.lineWidth = connectionLineWidth;
        netBackground.width = canvas.width;//初始化 网格背景大小
        netBackground.height = canvas.height;
        netBackground.style.left = canvas.style.left;
        netBackground.style.top = canvas.style.top;

        //高频更新变量
        let mouseDownNodeID = "";//当前鼠标点击的node
        let mouseDownAnchorID = "";
        let nodeList = [];//一个以ID为索引的字典
        let connectionList = [];
        let undoList = [];
        let redoList = [];
        /**
         *   connectionList格式：
         *   ({
                type:"normal",
                begin:connectionBeginNodeCache,
                end:connectionEndNodeCache
             });
         *
         *
         *   undoList格式：
         *  ({
                type: type, //操作类型，addNode,deleteNode,moveNode,addConnection ...(后续再增加）
                id: id, //操作对象的ID
                begin: begin, //操作前状态
                end: end //操作后状态
            })
         */


        //DOM绑定方法
        $scope.addNewNode = function () {
            addNode();
        };

        $scope.deleteNode = function () {
            deleteNode(mouseDownNodeID);
            refreshConnectionBackground();
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
        topElement.onmousedown = function (e) {
            //如果鼠标的对象id以n开头，代表为node
            if ($(e.target).attr("id")[0] == 'N') {
                mouseDownNodeID = $(e.target).attr("id");
                if (e.button == 0) {
                    saveStoragePositionWithScroll(document.getElementById(mouseDownNodeID));
                    canDragNode = true;
                }
                else if (e.button == 2) {
                }
            }
            else if ($(e.target).attr("id")[0] == 'A') {
                if(e.button == 0) {
                    mouseDownAnchorID = $(e.target).attr("id");
                    anchorBeginPositionCacheX = window.event.clientX - canvas.offsetLeft + document.documentElement.scrollLeft;
                    anchorBeginPositionCacheY = window.event.clientY - canvas.offsetTop + document.documentElement.scrollTop;
                    connectionBeginNodeCache = $(e.target).parent().attr("id");
                    canDragAnchor = true;
                }
                else if(e.button == 2){
                }
            }
        };
        topElement.onmousemove = function (e) {
            if(canDragNode) {
                calculateOffsetWithScroll();
                let node = document.getElementById(mouseDownNodeID);
                node.style.left = windowEndX + "px";
                node.style.top = windowEndY + "px";
                refreshConnectionBackground();
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
            if(canDragNode){
                let node = document.getElementById(mouseDownNodeID);
                let beginPosition = storageWindowPosition;
                let endPosition = {
                    x: parseInt(node.style.left),
                    y: parseInt(node.style.top)
                };
                
                pushUndoList("moveNode", mouseDownNodeID, beginPosition, endPosition);
            }
            else if(canDragAnchor){
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                if($(e.target).attr("id")[0] == 'N'){
                    connectionEndNodeCache = $(e.target).attr("id");
                    let newConnectionID = "C" + nextConnectionID;
                    connectionList.push
                    ({
                        id: newConnectionID,
                        type: "normal",
                        begin: connectionBeginNodeCache,
                        end: connectionEndNodeCache
                    });
                    nextConnectionID ++;
                    refreshConnectionBackground();

                    pushUndoList("addConnection", newConnectionID, "", "");
                }
                else if($(e.target).attr("id")[0] == 'A'){
                    connectionEndNodeCache = $(e.target).parent().attr("id");
                    let newConnectionID = "C" + nextConnectionID;
                    connectionList.push
                    ({
                        id: newConnectionID,
                        type: "normal",
                        begin: connectionBeginNodeCache,
                        end: connectionEndNodeCache
                    });
                    nextConnectionID ++;
                    refreshConnectionBackground();

                    pushUndoList("addConnection", newConnectionID, "", "");
                }
            }

            canDragNode = false;
            canDragAnchor = false;
        };
        let saveStoragePositionWithScroll = function (ele) {//absolute型拖动
            storageWindowPosition = {
                x: parseInt(ele.style.left),
                y: parseInt(ele.style.top)
            };
            storageClickPosition = {
                x: window.event.clientX + document.documentElement.scrollLeft,
                y: window.event.clientY + document.documentElement.scrollTop
            };
        };
        let calculateOffsetWithScroll = function () {
            windowEndX = storageWindowPosition.x + window.event.clientX + document.documentElement.scrollLeft - storageClickPosition.x;
            windowEndY = storageWindowPosition.y + window.event.clientY + document.documentElement.scrollTop - storageClickPosition.y;
        };
        let saveStoragePosition = function (ele) {//fix型拖动
            storageWindowPosition = {
                x: parseInt(ele.style.left),
                y: parseInt(ele.style.top)
            };
            storageClickPosition = {
                x: window.event.clientX,
                y: window.event.clientY
            };
        };
        let calculateOffset = function () {
            windowEndX = storageWindowPosition.x + window.event.clientX - storageClickPosition.x;
            windowEndY = storageWindowPosition.y + window.event.clientY - storageClickPosition.y;
        };


        /**
         *网格背景的实现
         */
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



        //根据数据生成连线背景的实现
        let refreshConnectionBackground = function () {
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

        let addNode = function () {
            let node = document.createElement("node");
            let nodeText = document.createTextNode("新节点");
            let nodeAnchorTop = document.createElement("nodeAnchorTop");
            let nodeAnchorRight = document.createElement("nodeAnchorRight");
            let nodeAnchorBottom = document.createElement("nodeAnchorBottom");
            let nodeAnchorLeft = document.createElement("nodeAnchorLeft");

            node.className = "node";
            node.id = "N" + nextNodeID;
            node.setAttribute("data-toggle","context");
            node.setAttribute("data-target","#node-menu");
            node.style.left = nextNodePositionX + "px";
            node.style.top = nextNodePositionY + "px";
            node.style.width = 80 + "px";
            node.style.height = 40 + "px";
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

            nodeList[node.id] = "新节点";//将node的id加入list

            nodeDiv.appendChild(node);

            nextNodeID += 1;
            nextNodePositionX += 20;
            nextNodePositionY += 20;

            pushUndoList("addNode",node.id,"","");
        };

        let deleteNode = function (nodeID) {
            //删除页面元素
            let nodeToDelete = document.getElementById(nodeID);
            nodeToDelete.parentNode.removeChild(nodeToDelete);
            //删除节点
            delete nodeList[mouseDownNodeID];
            //删除节点相关的联系
            let relativeConnectionList = [];
            for(let i=0; i<connectionList.length; i++){
                if(connectionList[i].begin == mouseDownNodeID || connectionList[i].end == mouseDownNodeID){
                    relativeConnectionList.push(connectionList[i]);//将这个联系加入相关联系队列，写入日志
                    connectionList.splice(i, 1);
                    i--;
                }
            }

            pushUndoList("deleteNode", nodeID, relativeConnectionList, "");
        };

        let pushUndoList = function (type, id, begin, end) {
            undoList.push({
                type:type,
                id:id,
                begin:begin,
                end:end
            })
        }
    });
