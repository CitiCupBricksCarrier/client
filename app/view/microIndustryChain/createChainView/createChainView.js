angular.module('myApp.microIndustryChain.createChainView', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('CreateChainViewCtrl',function($scope, $route, $http) {
        //DOM对象化
        let topElement = document.getElementById("topElement");
        let displayDiv = document.getElementById("displayDiv");
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");
        let nodeDiv = document.getElementById("nodeDiv");
        let connectionBackground = document.getElementById("connectionBackground");
        let connectionContext = connectionBackground.getContext("2d");
        let netBackground = document.getElementById("netBackground");
        let netContext = netBackground.getContext("2d");
        let animeBackground = document.getElementById("animeBackground");
        let animeContext = animeBackground.getContext("2d");
        let addCompanyNodeBoard = document.getElementById("addCompanyNodeBoard");
        let addNodeBoard = document.getElementById("addNodeBoard");
        let addNodeNameInput = document.getElementById("addNodeNameInput");
        let addNodeStockInput = document.getElementById("addNodeStockInput");
        let addNodeRoleInput = document.getElementById("addNodeRoleInput");
        let addNodeColorInput = document.getElementById("addNodeColorInput");
        let editNodeBoard = document.getElementById("editNodeBoard");
        let editNodeNameInput = document.getElementById("editNodeNameInput");
        let editNodeStockInput = document.getElementById("editNodeStockInput");
        let editNodeRoleInput = document.getElementById("editNodeRoleInput");
        let editNodeColorInput = document.getElementById("editNodeColorInput");
        let addConnectionBoard = document.getElementById("addConnectionBoard");
        let addConnectionFundExchangeInput = document.getElementById("addConnectionFundExchangeInput");
        let editConnectionBoard = document.getElementById("editConnectionBoard");
        let editConnectionFundExchangeInput = document.getElementById("editConnectionFundExchangeInput");

        //可调DOM参数
        let canvasWidth = 2000;//三层的 宽和高
        let canvasHeight = 1000;
        let canvasLeft = 260;
        let canvasTop = 150;
        let connectionLineWidth = 5;//连线层 连线宽度
        let connectionLineColor = "rgba(0,0,0,0.5)";//连线层 连线颜色
        let connectionLineAnimeWidth = 6;
        let connectionLineAnimeColor = "rgba(255,215,0,1)";//连线层 动画颜色
        let step = 15;//网格背景 网络间隔
        let netColor = "rgba(0,0,0,0.1)";//网格背景 网络颜色
        let nextNodePositionX = canvasLeft + 200;//新增节点 位置
        let nextNodePositionY = canvasTop + 30;
        let nextNodeID = 1;//新增节点 ID
        let nextConnectionID = 1;

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

        //$scope参数初始化
        $scope.isAddingNode = false;
        $scope.isEdittingNode = false;
        $scope.isAddingConnection = false;
        //高频更新变量
        $scope.mouseDownNodeID = "";//当前鼠标点击的node
        $scope.mouseDownConnectionIndex = 0;
        let mouseDownAnchorID = "";
        let connectionBeginNodeCache = "";
        let connectionEndNodeCache = "";
        $scope.nodeIDList = [];
        $scope.nodeList = [];//一个以ID为索引的字典
        $scope.nodeDisplayList = [];//一个以ID为索引的字典
        $scope.connectionList = [];
        let undoList = [];
        let redoList = [];
        $scope.searchCache = [];
        /**
         *   $scope.connectionList格式：
         *   ({
         *      id:
                begin:
                end:
                fund:
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

        //$http后端持久化参数初始化
        $http({
            method: 'post',
            url: 'http://localhost:8080/generalInfo/companyDetailList',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            //cache: true, //避免多次请求后台数据
        }).then(function (response) {
            $scope.companyList = response.data;
        }, function () {
            console.error("Link Failed");
        });


        //DOM绑定方法
        $scope.dblclickNodeHistoryBlockCell = function (id) {
            $scope.mouseDownNodeID = id;
            $scope.showEditNodeBoard();
        };

        $scope.dblclickConnectionHistoryBlockCell = function (index) {
            $scope.mouseDownConnectionIndex = index;
            $scope.showEditConnectionBoard();
        };

        $scope.addNewNode = function () {//
            addNode(addNodeNameInput.value, addNodeStockInput.value, addNodeRoleInput.value, addNodeColorInput.value);
            $scope.isAddingNode = false;
        };

        $scope.addCompanyNode = function (company) {
            addNode(company.compname, company.stkcd, "", "#000000");
        };

        $scope.addEmptyNode = function () {
            addNode("", "", "");
        };

        $scope.deleteNodeByMenu = function () {
            deleteNode($scope.mouseDownNodeID);
            refreshConnectionBackground();
        };

        $scope.deleteNodeByHistory = function (nodeID) {
            deleteNode(nodeID);
            refreshConnectionBackground();
        };

        $scope.editNode = function () {
            let name = editNodeNameInput.value,
                stock = editNodeStockInput.value,
                role = editNodeRoleInput.value,
                color = editNodeColorInput.value;
            editNode($scope.mouseDownNodeID, name, stock, role, color);
            $scope.isEdittingNode = false;
        };

        $scope.addNewConnection = function () {
            let fund = addConnectionFundExchangeInput.value;
            addConnection(connectionBeginNodeCache, connectionEndNodeCache, fund);
            $scope.isAddingConnection = false;
            refreshConnectionBackground();
        };

        $scope.deleteConnectionByHistory = function (index) {
            deleteConnectionByIndex(index);
            refreshConnectionBackground();
        };

        $scope.editConnection = function () {
            editConnection($scope.mouseDownConnectionIndex, editConnectionFundExchangeInput.value);
            $scope.isEdittingConnection = false;
        };

        $scope.showAddCompanyNodeBoard = function () {
            window.event.stopPropagation();
            hideAllBoard();
            addCompanyNodeBoard.style.left = window.event.clientX + "px";
            addCompanyNodeBoard.style.top = window.event.clientY + "px";
            $scope.isAddingCompanyNode = true;
        };

        $scope.hideAddCompanyNodeBoard = function () {
            $scope.isAddingCompanyNode = false;
        };

        $scope.showAddNodeBoard = function () {
            window.event.stopPropagation();
            hideAllBoard();
            addNodeNameInput.value = "";
            addNodeStockInput.value = "";
            addNodeRoleInput.value = "";
            addNodeBoard.style.left = window.event.clientX + "px";
            addNodeBoard.style.top = window.event.clientY + "px";
            $scope.isAddingNode = true;
        };

        $scope.hideAddNodeBoard = function () {
            $scope.isAddingNode = false;
        };

        $scope.showEditNodeBoard = function () {
            window.event.stopPropagation();
            hideAllBoard();
            let nodePartialCache = $scope.nodeList[$scope.mouseDownNodeID];
            editNodeNameInput.value = nodePartialCache.nodeName;
            editNodeStockInput.value = nodePartialCache.nodeStock;
            editNodeRoleInput.value = nodePartialCache.nodeRole;
            editNodeColorInput.value = nodePartialCache.nodeColor;
            editNodeBoard.style.left = window.event.clientX + "px";
            editNodeBoard.style.top = window.event.clientY + "px";
            $scope.isEdittingNode = true;
        };

        $scope.hideEditNodeBoard = function () {
            $scope.isEdittingNode = false;
        };

        $scope.showAddConnectionBoard = function () {
            window.event.stopPropagation();
            hideAllBoard();
            addConnectionFundExchangeInput.value = null;
            addConnectionBoard.style.left = window.event.clientX + "px";
            addConnectionBoard.style.top = window.event.clientY + "px";
            $scope.isAddingConnection = true;
        };

        $scope.hideAddConnectionBoard = function () {
            $scope.isAddingConnection = false;
            refreshConnectionBackground();
        };

        $scope.showEditConnectionBoard = function () {
            window.event.stopPropagation();
            hideAllBoard();
            let connectionPartialCache = $scope.connectionList[$scope.mouseDownConnectionIndex];
            editConnectionFundExchangeInput.value = connectionPartialCache.fund;
            editConnectionBoard.style.left = window.event.clientX + "px";
            editConnectionBoard.style.top = window.event.clientY + "px";
            $scope.isEdittingConnection = true;
        };

        $scope.hideEditConnectionBoard = function () {
            $scope.isEdittingConnection = false;
        };

        $scope.hideAllBoard = function () {
            hideAllBoard();
        };

        $scope.setMouseDownNodeID = function (id) {
            $scope.mouseDownNodeID = id;
        };

        $scope.setMouseDownConnectionIndex = function (index) {
            $scope.mouseDownConnectionIndex = index;
        };

        $scope.nodeDicToNodeArray = function () {
            let nodeArray = [];
            for(let i=0; i<$scope.nodeIDList.length; i++){
                nodeArray.push($scope.nodeList[$scope.nodeIDList[i]]);
                alert($scope.nodeList[$scope.nodeIDList[i]].name);
            }
            return nodeArray;
        };


        $scope.searchByStkcd = function (partStkcd) {
            if(partStkcd != "" && partStkcd.length < 6) {
                $http({
                    method: 'post',
                    url: 'http://localhost:8080/generalInfo/searchByStkcd',
                    params: {
                        "partStkcd": partStkcd,
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    //cache: true, //避免多次请求后台数据
                }).then(function (response) {
                    $scope.searchCache = response.data.slice(0,6);
                }, function () {
                    console.error("Link Failed");
                });
            }
        };

        $scope.searchByCompName = function (partName) {
            if(partName != ""){
                $http({
                    method: 'post',
                    url: 'http://localhost:8080/generalInfo/searchByName',
                    params: {
                        "partName": partName,
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    //cache: true, //避免多次请求后台数据
                }).then(function (response) {
                    $scope.searchCache = response.data.slice(0,6);
                }, function () {
                    console.error("Link Failed");
                });
            }
        };

        $scope.takeScreenshot = function () {
            console.log('test');
            html2canvas(displayDiv, {
                onrendered: function(canvas2) {
                    document.body.appendChild(canvas2);
                    let dataURL =canvas2.toDataURL("image/png");
                    console.log(dataURL);
                },
                width: 300,
                height: 300
            });
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
        let mouseDownNode;
        let mouseDownNodeWidth;
        let mouseDownNodeHeight;
        topElement.onmousedown = function (e) {
            //如果鼠标的对象id以n开头，代表为node
            if ($(e.target).attr("id")[0] == 'N') {
                $scope.mouseDownNodeID = $(e.target).attr("id");
                mouseDownNode = document.getElementById($scope.mouseDownNodeID);
                mouseDownNodeWidth = parseFloat(mouseDownNode.style.width);
                mouseDownNodeHeight = parseFloat(mouseDownNode.style.height);
                if (e.button == 0) {
                    saveStoragePositionWithScroll(document.getElementById($scope.mouseDownNodeID));
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
                stopAnimeBackground();
                calculateOffsetWithScroll();
                if(windowEndX>canvasLeft && windowEndX<(canvasLeft+canvasWidth-mouseDownNodeWidth) && windowEndY>canvasTop && windowEndY<(canvasTop+canvasHeight-mouseDownNodeHeight) ) {
                    mouseDownNode.style.left = windowEndX + "px";
                    mouseDownNode.style.top = windowEndY + "px";
                }
                refreshConnectionBackground();
            }
            else if(canDragAnchor) {
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                drawArrow(context,
                    anchorBeginPositionCacheX,
                    anchorBeginPositionCacheY,
                    window.event.clientX - canvas.offsetLeft + document.documentElement.scrollLeft,
                    window.event.clientY - canvas.offsetTop + document.documentElement.scrollTop,
                    30, 12, 2, '#000');
            }
        };
        topElement.onmouseup = function (e) {
            if(canDragNode){
                refreshNodeDisplayList();
                startAnimeBackground();
            }
            else if(canDragAnchor){
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                if($(e.target).attr("id")[0] == 'N' || $(e.target).attr("id")[0] == 'A'){
                    if($(e.target).attr("id")[0] == 'N') {
                        connectionEndNodeCache = $(e.target).attr("id");
                    }
                    else{
                        connectionEndNodeCache = $(e.target).parent().attr("id")
                    }
                    let beginNode = document.getElementById(connectionBeginNodeCache),
                        endNode = document.getElementById(connectionEndNodeCache);
                    connectionContext.beginPath();
                    connectionContext.moveTo(
                        parseFloat(beginNode.style.left) + parseFloat(beginNode.style.width)/2 - canvas.offsetLeft,
                        parseFloat(beginNode.style.top) + parseFloat(beginNode.style.height)/2 - canvas.offsetTop
                    );
                    connectionContext.lineTo(
                        parseFloat(endNode.style.left) + parseFloat(endNode.style.width)/2 - canvas.offsetLeft,
                        parseFloat(endNode.style.top) + parseFloat(endNode.style.height)/2 - canvas.offsetTop
                    );
                    connectionContext.stroke();
                    $scope.showAddConnectionBoard();
                }
            }

            $scope.$apply();
            canDragNode = false;
            canDragAnchor = false;
        };
        let saveStoragePositionWithScroll = function (ele) {//absolute型拖动
            storageWindowPosition = {
                x: parseFloat(ele.style.left),
                y: parseFloat(ele.style.top)
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
                x: parseFloat(ele.style.left),
                y: parseFloat(ele.style.top)
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




        //根据数据生成连线背景的实现
        let refreshConnectionBackground = function () {
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
        };



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


        /**
         *定时刷新的实现（解决删除关联时，不能立刻反映到图上？）

        let startAutoRefreshConnectionBackground = function () {
            refreshConnectionBackground();
            connectionTimeoutID = setTimeout(startAutoRefreshConnectionBackground, 100);
        };
        //startAutoRefreshConnectionBackground();

        let stopAutoRefreshConnectionBackground = function () {
            clearTimeout(connectionTimeoutID);
        };
         */



        let addNode = function (name, stock, role, color) {
            let node = document.createElement("node");
            let nodeName = document.createElement("p");
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
            node.style.width = 100 + "px";
            node.style.height = 50 + "px";
            nodeName.id = "nodeName";
            nodeName.innerText = name;
            nodeName.style.color = color;
            nodeAnchorTop.className = "node-anchor-top";
            nodeAnchorTop.id = "A" + nextNodeID + "1";
            nodeAnchorRight.className = "node-anchor-right";
            nodeAnchorRight.id = "A" + nextNodeID + "2";
            nodeAnchorRight.style.left = (parseFloat(node.style.width) - 8) + "px";
            nodeAnchorBottom.className = "node-anchor-bottom";
            nodeAnchorBottom.id = "A" + nextNodeID + "3";
            nodeAnchorBottom.style.top = (parseFloat(node.style.height) - 8) + "px";
            nodeAnchorLeft.className = "node-anchor-left";
            nodeAnchorLeft.id = "A" + nextNodeID + "4";
            node.appendChild(nodeName);
            node.appendChild(nodeAnchorTop);
            node.appendChild(nodeAnchorRight);
            node.appendChild(nodeAnchorBottom);
            node.appendChild(nodeAnchorLeft);

            $scope.nodeList[node.id] = {
                nodeName: name,
                nodeStock: stock,
                nodeRole: role,
                nodeColor: color
            };
            $scope.nodeIDList.push(node.id);

            nodeDiv.appendChild(node);

            nextNodeID += 1;
            nextNodePositionX += 20;
            nextNodePositionY += 20;

            refreshNodeDisplayList();
        };

        let deleteNode = function (nodeID) {
            //删除页面元素
            let nodeToDelete = document.getElementById(nodeID);
            nodeToDelete.parentNode.removeChild(nodeToDelete);
            //删除节点
            delete $scope.nodeList[nodeID];
            for(let i=0, length=$scope.nodeIDList.length; i<length; i++){
                if($scope.nodeIDList[i] == nodeID){
                    $scope.nodeIDList.splice(i, 1);
                    break;
                }
            }
            //删除节点相关的联系
            let relativeConnectionList = [];
            for(let i=0; i<$scope.connectionList.length; i++){
                if($scope.connectionList[i].begin == nodeID || $scope.connectionList[i].end == nodeID){
                    relativeConnectionList.push($scope.connectionList[i]);//将这个联系加入相关联系队列，写入日志
                    $scope.connectionList.splice(i, 1);
                    i--;
                }
            }

            pushUndoList("deleteNode", nodeID, relativeConnectionList, "");
        };

        let editNode = function (nodeID, name, stock, role, color) {
            $scope.nodeList[nodeID] = {
                nodeName: name,
                nodeStock: stock,
                nodeRole: role,
                nodeColor: color
            };
            let nodeToEdit = document.getElementById(nodeID);
            let nodeName = nodeToEdit.children[0];
            nodeName.innerText = editNodeNameInput.value;
            nodeName.style.color = color;
        };

        let refreshNodeDisplayList = function () {
            for(let i=0, length=$scope.nodeIDList.length; i<length; i++){
                let nodePartialCache = document.getElementById($scope.nodeIDList[i]);
                $scope.nodeDisplayList[$scope.nodeIDList[i]] = {
                    x: parseFloat(nodePartialCache.style.left) - canvas.offsetLeft,
                    y: parseFloat(nodePartialCache.style.top) - canvas.offsetTop
                }
            }
        };

        let addConnection = function (begin, end, fund) {
            if(begin != end) {
                for(let i=0, length=$scope.connectionList.length; i<length; i++){
                    if( ($scope.connectionList[i].begin == begin) && ($scope.connectionList[i].end == end) ){
                        return;
                    }
                }
                let newConnectionID = "C" + nextConnectionID;
                $scope.connectionList.push
                ({
                    id: newConnectionID,
                    begin: begin,
                    end: end,
                    fund: fund
                });
                nextConnectionID++;
            }
        };

        let deleteConnectionByIndex = function (index) {
            $scope.connectionList.splice(index, 1);
        };

        let deleteConnectionByBeginAndEnd = function (begin, end) {
            for(let i=0; i<$scope.connectionList.length; i++){
                if($scope.connectionList[i].begin == begin && $scope.connectionList[i].end == end){
                    $scope.connectionList.splice(i, 1);
                    i--;
                }
            }
        };

        let editConnection = function (index, fund) {
            $scope.connectionList[index].fund = fund;
        };

        let getConnection = function (begin, end) {
            for(let i=0; i<$scope.connectionList.length; i++){
                if($scope.connectionList[i].begin == begin && $scope.connectionList[i].end == end){
                    return $scope.connectionList[i];
                }
            }
        };

        let pushUndoList = function (type, id, begin, end) {
            undoList.push({
                type:type,
                id:id,
                begin:begin,
                end:end
            })
        };

        let hideAllBoard = function () {
            $scope.isAddingCompanyNode = false;
            $scope.isAddingNode = false;
            $scope.isEdittingNode = false;
            $scope.isAddingConnection = false;
            $scope.isEdittingConnection = false;
        };

        let drawArrow = function(ctx, fromX, fromY, toX, toY, theta, headlen, width, color) {
            let angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
                angle1 = (angle + theta) * Math.PI / 180,
                angle2 = (angle - theta) * Math.PI / 180,
                topX = headlen * Math.cos(angle1),
                topY = headlen * Math.sin(angle1),
                botX = headlen * Math.cos(angle2),
                botY = headlen * Math.sin(angle2);

            ctx.beginPath();
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);

            // Reverse length on the other side
            let arrowX = toX + topX;
            let arrowY = toY + topY;
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(toX, toY);
            arrowX = toX + botX;
            arrowY = toY + botY;
            ctx.lineTo(arrowX, arrowY);
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.stroke();
        };

    });
