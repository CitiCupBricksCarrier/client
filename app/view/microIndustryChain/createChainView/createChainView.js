angular.module('myApp.microIndustryChain.createChainView', [])

    .config(function ($stateProvider, $urlRouterProvider) {

    })

    .controller('CreateChainViewCtrl', function ($scope, $route, $http, $stateParams, $state) {
        //DOM对象化
        let topElement = document.getElementById("topElement");
        let displayDiv = document.getElementById("displayDiv");
        let displayDivContainer = document.getElementById("displayDivContainer");
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

        let addConnectionBoard = document.getElementById("addConnectionBoard");
        let addConnectionFundExchangeInput = document.getElementById("addConnectionFundExchangeInput");
        let editConnectionBoard = document.getElementById("editConnectionBoard");
        let editConnectionFundExchangeInput = document.getElementById("editConnectionFundExchangeInput");
        let infectTimeBoard = document.getElementById("infect-time-board");

        //可调DOM参数
        let canvasWidth = 1230;//三层的 宽和高
        let canvasHeight = 1000;
        let canvasLeft = 0;
        let canvasTop = 0;
        let connectionLineWidth = 5;//连线层 连线宽度
        let connectionLineColor = "#dcdcdc";//连线层 连线颜色
        let connectionLineAnimeWidth = 6;
        let connectionLineAnimeColor = "#7ecef4";//连线层 动画颜色
        let riskAnimeWidth = 10;
        let riskAnimeColor = "rgba(255,69,0,0.5)";//连线层 动画颜色
        let step = 15;//网格背景 网络间隔
        let netColor = "#eeeeee";//网格背景 网络颜色
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

        //$scope参数初始化
        $scope.isAddingNode = false;
        $scope.isEdittingNode = false;
        $scope.isAddingConnection = false;
        $scope.showInfectTimeBoard = false;
        $scope.riskCompanyStatusList = {};
        $scope.colorList = ['#579ad7', '#4cbae4', '#54dee4', '#57ddb9', '#a3da91', '#f7b24c'];


        //高频更新变量
        $scope.mouseDownNodeID = "";//当前鼠标点击的node
        $scope.mouseDownConnectionIndex = 0;
        let mouseDownAnchorID = "";
        let connectionBeginNodeCache = "";
        let connectionEndNodeCache = "";
        let connectionBeginNodeStock = "";
        let connectionEndNodeStock = "";
        $scope.nodeIDList = [];
        $scope.nodeList = [];//一个以ID为索引的字典
        $scope.nodeDisplayList = [];//一个以ID为索引的字典
        $scope.connectionList = [];
        let undoList = [];
        let redoList = [];
        $scope.searchCache = [];

        //路由参数获取
        $scope.graphID = $stateParams.graphid;

        //$http后端持久化参数初始化
        $http({
            method: 'post',
            url: urlHead + 'generalInfo/companyDetailList',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            //cache: true, //避免多次请求后台数据
        }).then(function (response) {
            $scope.companyList = response.data;
        }, function () {
            console.error("Link Failed");
        });


        $http({
            method: 'post',
            url: urlHead + 'getGraphByID',
            params: {
                "graghid": $scope.graphID,
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            withCredentials: true
            //cache: true, //避免多次请求后台数据
        }).then(function (response) {

            console.log(response);
            let partialNodeArray = response.data.nodeList,
                partialConnectionArray = response.data.connectionList;

            for (let i = 0, length = partialNodeArray.length; i < length; i++) {
                let particalNodeCache = partialNodeArray[i];
                addNode(particalNodeCache.name, particalNodeCache.stkcd, particalNodeCache.role, particalNodeCache.color, canvasLeft + parseFloat(particalNodeCache.posx), canvasTop + parseFloat(particalNodeCache.posy), particalNodeCache.id);

            }

            if (partialNodeArray.length > 0) {
                nextNodeID = parseInt((partialNodeArray[partialNodeArray.length - 1].id).substr(1)) + 1;
            }

            for (let i = 0, length = partialConnectionArray.length; i < length; i++) {
                let partialConnectionCache = partialConnectionArray[i];
                addConnection(partialConnectionCache.begin, partialConnectionCache.end, $scope.nodeList[partialConnectionCache.begin].nodeStock, $scope.nodeList[partialConnectionCache.end].nodeStock, partialConnectionCache.fund);
            }

            if (partialConnectionArray.length > 0) {
                nextConnectionID = parseInt((partialConnectionArray[partialConnectionArray.length - 1].id).substr(1)) + 1;
            }

            refreshConnectionBackground();

        }, function () {
            console.error("get graph error");
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

            addNode(company.compnamesummary, company.stkcd, "", $scope.colorList[Math.floor(Math.random() * $scope.colorList.length)]);
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
                color = document.getElementById('colorSelect').value;

            editNode($scope.mouseDownNodeID, name, stock, role, color);
            $scope.isEdittingNode = false;
        };

        $scope.addNewConnection = function () {
            let fund = addConnectionFundExchangeInput.value;
            addConnection(connectionBeginNodeCache, connectionEndNodeCache, connectionBeginNodeStock, connectionEndNodeStock, fund);
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

            editNodeBoard.style.left = window.event.clientX + "px";
            editNodeBoard.style.top = window.event.clientY + "px";
            editNodeBoard.style.zIndex = "1001";
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
            for (let i = 0; i < $scope.nodeIDList.length; i++) {
                nodeArray.push($scope.nodeList[$scope.nodeIDList[i]]);
                alert($scope.nodeList[$scope.nodeIDList[i]].name);
            }
            return nodeArray;
        };


        $scope.searchByStkcd = function (partStkcd) {
            if (partStkcd != "" && partStkcd.length < 6) {
                $http({
                    method: 'post',
                    url: urlHead + 'generalInfo/searchByStkcd',
                    params: {
                        "partStkcd": partStkcd,
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    //cache: true, //避免多次请求后台数据
                }).then(function (response) {
                    $scope.searchCache = response.data.slice(0, 6);
                }, function () {
                    console.error("Link Failed");
                });
            }
        };

        $scope.searchByCompName = function (partName) {
            if (partName != "") {
                $http({
                    method: 'post',
                    url: urlHead + 'generalInfo/searchByName',
                    params: {
                        "partName": partName,
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    //cache: true, //避免多次请求后台数据
                }).then(function (response) {
                    $scope.searchCache = response.data.slice(0, 6);
                }, function () {
                    console.error("Link Failed");
                });
            }
        };

        $scope.takeScreenshot = function () {
            console.log('test');
            html2canvas(displayDiv, {
                onrendered: function (canvas2) {
                    document.body.appendChild(canvas2);
                    let dataURL = canvas2.toDataURL("image/png");
                    console.log(dataURL);
                },
                width: 300,
                height: 300
            });
        };


        $scope.save = function () {
            let nodeListArray = [],
                connectionListArray = [];

            for (let i = 0, length = $scope.nodeIDList.length; i < length; i++) {
                let id = $scope.nodeIDList[i];
                nodeListArray.push({
                    id: id,
                    nodeName: $scope.nodeList[id].nodeName,
                    nodeStock: $scope.nodeList[id].nodeStock,
                    nodeRole: $scope.nodeList[id].nodeRole,
                    nodeColor: $scope.nodeList[id].nodeColor,
                    x: $scope.nodeDisplayList[id].x,
                    y: $scope.nodeDisplayList[id].y
                })
            }
            connectionListArray = $scope.connectionList;

            let graphJson = {
                graphid: $scope.graphID,
                linkList: connectionListArray,
                companyList: nodeListArray
            };

            $http({
                method: 'post',
                url: urlHead + 'updateGraph',
                params: {
                    graphJson: graphJson
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                withCredentials: true
                //cache: true, //避免多次请求后台数据
            }).then(function (response) {
                console.log(response.data);
            }, function () {
                console.error("Link Failed");
            });
        };


        $scope.openRisk = function () {
            window.event.stopPropagation();
            hideAllBoard();
            infectTimeBoard.style.left = window.event.clientX + "px";
            infectTimeBoard.style.top = window.event.clientY + "px";
            $scope.showInfectTimeBoard = true;
        };

        $scope.getRisk = function (riskCompanyID) {
            if (riskCompanyID == 'stop') {
                $scope.riskCompanyStatusList = {};
                return;
            }
            console.log(riskCompanyID);
            let nodeListArray = [],
                connectionListArray = [];

            for (let i = 0, length = $scope.nodeIDList.length; i < length; i++) {
                let id = $scope.nodeIDList[i];
                nodeListArray.push({
                    id: id,
                    nodeName: $scope.nodeList[id].nodeName,
                    nodeStock: $scope.nodeList[id].nodeStock,
                    nodeRole: $scope.nodeList[id].nodeRole,
                    nodeColor: $scope.nodeList[id].nodeColor,
                    x: $scope.nodeDisplayList[id].x,
                    y: $scope.nodeDisplayList[id].y
                })
            }
            let riskCompany = {
                id: riskCompanyID,
                nodeName: $scope.nodeList[riskCompanyID].nodeName,
                nodeStock: $scope.nodeList[riskCompanyID].nodeStock,
                nodeRole: $scope.nodeList[riskCompanyID].nodeRole,
                nodeColor: $scope.nodeList[riskCompanyID].nodeColor,
                x: $scope.nodeDisplayList[riskCompanyID].x,
                y: $scope.nodeDisplayList[riskCompanyID].y
            };
            connectionListArray = $scope.connectionList;

            let graphJson = {
                riskCompany: riskCompany,
                linkList: connectionListArray,
                companyList: nodeListArray
            };

            $http({
                method: 'post',
                url: urlHead + 'riskDiffusion',
                params: {
                    data: graphJson
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                withCredentials: true
                //cache: true, //避免多次请求后台数据
            }).then(function (response) {
                console.log(response.data);
                let riskList = response.data;
                for (let i = 10; i <= 100; i += 10) {
                    $scope.riskCompanyStatusList[i] = {};
                    for (let key in riskList[i].companyList) {
                        for (let index in $scope.nodeIDList) {
                            let id = $scope.nodeIDList[index];
                            if ($scope.nodeList[id].nodeStock == key) {
                                $scope.riskCompanyStatusList[i][id] = riskList[i].companyList[key].status;
                            }
                        }
                    }
                    $scope.riskCompanyStatusList[i][$scope.riskFrom] = 1;
                }
                console.log($scope.riskCompanyStatusList);
            }, function () {
                console.error("Link Failed");
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
            if ($(e.target).attr("id") !== null && $(e.target).attr("id") !== undefined) {
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
                    if (e.button == 0) {
                        mouseDownAnchorID = $(e.target).attr("id");
                        anchorBeginPositionCacheX = window.event.clientX - (displayDivContainer.offsetLeft + 20) + displayDiv.scrollLeft;
                        anchorBeginPositionCacheY = window.event.clientY - (displayDivContainer.offsetTop + 20) + displayDiv.scrollTop;
                        connectionBeginNodeCache = $(e.target).parent().attr("id");
                        connectionBeginNodeStock = $scope.nodeList[connectionBeginNodeCache].nodeStock;
                        canDragAnchor = true;
                        console.log(window.event.clientX + "  " + displayDivContainer.offsetLeft + "  " + displayDivContainer.paddingLeft + "  " + displayDiv.scrollLeft)
                    }
                    else if (e.button == 2) {
                    }
                }
            }
        };
        topElement.onmousemove = function (e) {
            if (canDragNode) {
                stopAnimeBackground();
                calculateOffsetWithScroll();
                if (windowEndX > canvasLeft && windowEndX < (canvasLeft + canvasWidth - mouseDownNodeWidth) && windowEndY > canvasTop && windowEndY < (canvasTop + canvasHeight - mouseDownNodeHeight)) {
                    mouseDownNode.style.left = windowEndX + "px";
                    mouseDownNode.style.top = windowEndY + "px";
                }
                refreshConnectionBackground();
            }
            else if (canDragAnchor) {
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                drawArrow(context,
                    anchorBeginPositionCacheX,
                    anchorBeginPositionCacheY,
                    window.event.clientX - (displayDivContainer.offsetLeft + 20) + displayDiv.scrollLeft,
                    window.event.clientY - (displayDivContainer.offsetTop + 20) + displayDiv.scrollTop,
                    30, 12, 2, '#000');
            }
        };
        topElement.onmouseup = function (e) {
            if (canDragNode) {
                refreshNodeDisplayList();
                startAnimeBackground();
            }
            else if (canDragAnchor) {
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                if ($(e.target).attr("id")[0] == 'N' || $(e.target).attr("id")[0] == 'A') {
                    if ($(e.target).attr("id")[0] == 'N') {
                        connectionEndNodeCache = $(e.target).attr("id");
                    }
                    else {
                        connectionEndNodeCache = $(e.target).parent().attr("id")
                    }
                    connectionEndNodeStock = $scope.nodeList[connectionEndNodeCache].nodeStock;
                    let beginNode = document.getElementById(connectionBeginNodeCache),
                        endNode = document.getElementById(connectionEndNodeCache);
                    connectionContext.beginPath();
                    connectionContext.moveTo(
                        parseFloat(beginNode.style.left) + parseFloat(beginNode.style.width) / 2 - canvas.offsetLeft,
                        parseFloat(beginNode.style.top) + parseFloat(beginNode.style.height) / 2 - canvas.offsetTop
                    );
                    connectionContext.lineTo(
                        parseFloat(endNode.style.left) + parseFloat(endNode.style.width) / 2 - canvas.offsetLeft,
                        parseFloat(endNode.style.top) + parseFloat(endNode.style.height) / 2 - canvas.offsetTop
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
            netContext.lineWidth = 1;
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
            for (let i = 0, length = $scope.connectionList.length; i < length; i++) {
                let beginNode = document.getElementById($scope.connectionList[i].begin);
                let endNode = document.getElementById($scope.connectionList[i].end);
                connectionContext.moveTo(
                    parseFloat(beginNode.style.left) + parseFloat(beginNode.style.width) / 2 - canvas.offsetLeft,
                    parseFloat(beginNode.style.top) + parseFloat(beginNode.style.height) / 2 - canvas.offsetTop
                );
                connectionContext.lineTo(
                    parseFloat(endNode.style.left) + parseFloat(endNode.style.width) / 2 - canvas.offsetLeft,
                    parseFloat(endNode.style.top) + parseFloat(endNode.style.height) / 2 - canvas.offsetTop
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

        function startAnimeBackground() {
            animeI = animeI + 1.0;
            if (animeI > animeTime) {
                animeI = 4.0;
            }
            animeContext.clearRect(0, 0, canvasWidth, canvasHeight);
            animeContext.lineWidth = connectionLineAnimeWidth;
            animeContext.strokeStyle = connectionLineAnimeColor;
            animeContext.beginPath();
            for (let i = 0; i < $scope.connectionList.length; i++) {
                let beginNode = document.getElementById($scope.connectionList[i].begin);
                let endNode = document.getElementById($scope.connectionList[i].end);
                let beginX = parseFloat(beginNode.style.left) + parseFloat(beginNode.style.width) / 2 - canvas.offsetLeft;
                let beginY = parseFloat(beginNode.style.top) + parseFloat(beginNode.style.height) / 2 - canvas.offsetTop;
                let endX = parseFloat(endNode.style.left) + parseFloat(endNode.style.width) / 2 - canvas.offsetLeft;
                let endY = parseFloat(endNode.style.top) + parseFloat(endNode.style.height) / 2 - canvas.offsetTop;
                animeContext.moveTo(
                    beginX + ((animeI - 4.0) / animeTime) * (endX - beginX),
                    beginY + ((animeI - 4.0) / animeTime) * (endY - beginY)
                );
                animeContext.lineTo(
                    beginX + (animeI / animeTime) * (endX - beginX),
                    beginY + (animeI / animeTime) * (endY - beginY)
                );
            }
            animeContext.stroke();
            animeContext.lineWidth = riskAnimeWidth;
            animeContext.strokeStyle = riskAnimeColor;
            if ($scope.riskCompanyStatusList !== {}) {
                for (let nodeID in $scope.riskCompanyStatusList[$scope.infectTime]) {
                    if ($scope.riskCompanyStatusList[$scope.infectTime][nodeID] == 0) {
                        continue;
                    }
                    let riskNode = document.getElementById(nodeID);
                    animeContext.beginPath();
                    animeContext.arc(
                        parseFloat(riskNode.style.left) + parseFloat(riskNode.style.width) / 2 - canvas.offsetLeft,
                        parseFloat(riskNode.style.top) + parseFloat(riskNode.style.height) / 2 - canvas.offsetTop,
                        2 * animeI, 0, 2 * Math.PI);
                    animeContext.stroke();
                }
            }
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



        let addNode = function (name, stock, role, color, x, y, id) {
            let node = document.createElement("node");
            let nodeName = document.createElement("p");
            let nodeAnchorTop = document.createElement("nodeAnchorTop");
            let nodeAnchorRight = document.createElement("nodeAnchorRight");
            let nodeAnchorBottom = document.createElement("nodeAnchorBottom");
            let nodeAnchorLeft = document.createElement("nodeAnchorLeft");

            node.className = "node";
            node.id = (id !== undefined) ? id : ("N" + nextNodeID);
            node.setAttribute("data-toggle", "context");
            node.setAttribute("data-target", "#node-menu");
            node.style.left = ((x !== undefined) ? x : nextNodePositionX) + "px";
            node.style.top = ((y !== undefined) ? y : nextNodePositionY) + "px";
            node.style.width = 180 + "px";
            node.style.height = 60 + "px";
            node.style.padding = "15px 30px 0 30px";
            node.style.backgroundColor = color;
            nodeName.id = "nodeName";
            nodeName.innerText = name;
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
            for (let i = 0, length = $scope.nodeIDList.length; i < length; i++) {
                if ($scope.nodeIDList[i] == nodeID) {
                    $scope.nodeIDList.splice(i, 1);
                    break;
                }
            }
            //删除节点相关的联系
            let relativeConnectionList = [];
            for (let i = 0; i < $scope.connectionList.length; i++) {
                if ($scope.connectionList[i].begin == nodeID || $scope.connectionList[i].end == nodeID) {
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
            nodeToEdit.style.backgroundColor = color;
        };

        let refreshNodeDisplayList = function () {
            for (let i = 0, length = $scope.nodeIDList.length; i < length; i++) {
                let nodePartialCache = document.getElementById($scope.nodeIDList[i]);
                $scope.nodeDisplayList[$scope.nodeIDList[i]] = {
                    x: parseFloat(nodePartialCache.style.left) - canvas.offsetLeft,
                    y: parseFloat(nodePartialCache.style.top) - canvas.offsetTop
                }
            }
        };

        let addConnection = function (begin, end, stkcdA, stkcdB, fund) {
            if (begin != end) {
                for (let i = 0, length = $scope.connectionList.length; i < length; i++) {
                    if (($scope.connectionList[i].begin == begin) && ($scope.connectionList[i].end == end)) {
                        return;
                    }
                }
                let newConnectionID = "C" + nextConnectionID;
                $scope.connectionList.push
                ({
                    id: newConnectionID,
                    begin: begin,
                    end: end,
                    stkcdA: stkcdA,
                    stkcdB: stkcdB,
                    fund: fund,
                });
                nextConnectionID++;
            }
        };

        let deleteConnectionByIndex = function (index) {
            $scope.connectionList.splice(index, 1);
        };

        let deleteConnectionByBeginAndEnd = function (begin, end) {
            for (let i = 0; i < $scope.connectionList.length; i++) {
                if ($scope.connectionList[i].begin == begin && $scope.connectionList[i].end == end) {
                    $scope.connectionList.splice(i, 1);
                    i--;
                }
            }
        };

        let editConnection = function (index, fund) {
            $scope.connectionList[index].fund = fund;
        };

        let getConnection = function (begin, end) {
            for (let i = 0; i < $scope.connectionList.length; i++) {
                if ($scope.connectionList[i].begin == begin && $scope.connectionList[i].end == end) {
                    return $scope.connectionList[i];
                }
            }
        };

        let pushUndoList = function (type, id, begin, end) {
            undoList.push({
                type: type,
                id: id,
                begin: begin,
                end: end
            })
        };

        let hideAllBoard = function () {
            $scope.isAddingCompanyNode = false;
            $scope.isAddingNode = false;
            $scope.isEdittingNode = false;
            $scope.isAddingConnection = false;
            $scope.isEdittingConnection = false;
            $scope.showInfectTimeBoard = false;
        };

        let drawArrow = function (ctx, fromX, fromY, toX, toY, theta, headlen, width, color) {
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


        $scope.editArticle = function (){
            document.getElementById("articleEdit").style.display = "block";
        }

        document.getElementById("article-close").onclick = function(){
            document.getElementById("articleEdit").style.display = "none";
        }
        function Mover(articleMove) {
            this.obj = articleMove;
            this.startx = 0;
            this.starty;
            this.startLeft;
            this.startTop;
            this.articleEditDiv = articleMove.parentNode;
            var that = this;
            this.isDown = false;
            this.movedown = function (e) {
                e = e ? e : window.event;
                if (!window.captureEvents) {
                    this.setCapture();
                }
                that.isDown = true;
                that.startx = e.clientX;
                that.starty = e.clientY;

                that.startLeft = parseInt(that.articleEditDiv.style.left);
                that.startTop = parseInt(that.articleEditDiv.style.top);
            }
            this.move = function (e) {
                e = e ? e : window.event;
                if (that.isDown) {
                    that.articleEditDiv.style.left = e.clientX - (that.startx - that.startLeft) + "px";
                    that.articleEditDiv.style.top = e.clientY - (that.starty - that.startTop) + "px";
                }
            }
            this.moveup = function () {
                that.isDown = false;
                if (!window.captureEvents) {
                    this.releaseCapture();
                } //事件捕获仅支持ie
            }
            this.obj.onmousedown = this.movedown;
            this.obj.onmousemove = this.move;
            this.obj.onmouseup = this.moveup;

            //非ie浏览器
            document.addEventListener("mousemove", this.move, true);
        }
        var mover = new Mover(document.getElementById("articleMove"));



    });
