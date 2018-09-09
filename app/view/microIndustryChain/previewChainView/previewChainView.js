angular.module('myApp.microIndustryChain.previewChainView', [
    'ngAnimate', 'ui.bootstrap','myApp.microIndustryChain.publicOpinion'
])

    .config(function ($stateProvider, $urlRouterProvider) {

    })

    .controller('PreviewChainViewCtrl', function ($scope, $route, $http, $stateParams, $uibModal) {
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


        $scope.graphID = $stateParams.graphid;
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
            for (let i = 0, length = $scope.nodeIDList.length; i < length; i++) {
                let nodeIDCache = $scope.nodeIDList[i];

                let node = document.createElement("node");
                let nodeName = document.createElement("p");

                node.className = "node";
                node.id = nodeIDCache;
                node.setAttribute("data-toggle", "context");
                node.setAttribute("data-target", "#node-menu");
                node.style.left = (canvas.offsetLeft + $scope.nodeDisplayList[nodeIDCache].x) + "px";
                node.style.top = (canvas.offsetTop + $scope.nodeDisplayList[nodeIDCache].y) + "px";
                node.style.width = 100 + "px";
                node.style.height = 50 + "px";
                nodeName.id = "nodeName";
                nodeName.innerText = $scope.nodeList[nodeIDCache].nodeName;
                nodeName.style.color = $scope.nodeList[nodeIDCache].nodeColor;
                node.appendChild(nodeName);

                nodeDiv.appendChild(node);
                node.onclick=function () {
                    let item=$scope.nodeList[nodeIDCache]
                    $scope.showPublicOpinion(item.nodeName,item.nodeStock);
                }
            }
        })();


        (function refreshConnectionBackground() {
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
        })();

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
            animeTimeoutID = setTimeout(startAnimeBackground, 50);
        }

        startAnimeBackground();

        let stopAnimeBackground = function () {
            clearTimeout(animeTimeoutID);
            animeContext.clearRect(0, 0, canvasWidth, canvasHeight);
        };

        // document.getElementById("right_div").style.height = $('#article').height()+parseInt(document.getElementById("article").style.top)+"px";
        // console.log($('#article').height(),document.getElementById("article").style.top);
        // console.log(22222222,$('#topElement').height());

        /**
         * 评论区
         * @type {HTMLElement | null}
         */
        function getTime() {
            var now = new Date();
            var year = now.getFullYear();
            var month = (now.getMonth() + 1).toString();
            var day = (now.getDate()).toString();
            var hours = (now.getHours()).toString();
            var minutes = (now.getMinutes()).toString();
            var seconds = (now.getSeconds()).toString();
            if (month.length == 1) {
                month = "0" + month;
            }
            if (day.length == 1) {
                day = "0" + day;
            }
            if (hours.length == 1) {
                hours = "0" + hours;
            }
            if (minutes.length == 1) {
                minutes = "0" + minutes;
            }
            if (seconds.length == 1) {
                seconds = "0" + seconds;
            }
            var dateTime = year + month + day + hours + minutes + seconds;
            console.log(dateTime)
            return dateTime;
        }

        /**
         * 得到当前围观产业链的ID
         */

        var graphid_current = $stateParams.graphid;
        console.log("id", graphid_current)

        /**
         * 得到用户登录的session
         *
         */
        var username = "";
        $http({
            url: urlHead + 'getSession',
            method: 'post',
            // contentType: "application/json",
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            withCredentials: true
        }).then(function successCallBack(response) {
            // console.log(response.data)
            var data = response.data;
            username = data;
            $scope.user_id = username;
            console.log(111, response, data);
        }, function errorCallBack(response) {
            console.log("erreor");
        });


        /**
         * 提交评论
         * @type {HTMLElement | null}
         */
        var sub = document.getElementById("subm");
        sub.onclick = function submit() {
            // console.log("ss");
            var inputText = $('.text').val();
            // inputText = inputText.replace(/\n|\r\n/g,"<br/>");
            // $('#info-show ul').append(reply(AnalyticEmotion(inputText)));
            // console.log(inputText);
            console.log(inputText);
            var data = {};
            data.graphid = graphid_current;
            data.comment = inputText;
            var result = JSON.stringify(data);

            $http({
                url: urlHead + 'addComment',
                method: 'post',
                // contentType: "application/json",
                // headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                withCredentials: true,
                params: {
                    "data": result
                }
            }).then(function successCallBack(response) {
                // console.log(response.data)
                var data = response.data;
                if (data.retmessage == "success") {

                    var local_comment = {
                        "author": username,
                        "comment": inputText,
                        "graphid": graphid_current,
                        "time": getTime(),
                        "up": 0,
                        "down": 0
                    };
                    $scope.commentList.push(local_comment);

                    // $scope.$apply();
                }
            }, function errorCallBack(response) {
                console.log("erreor");
            });


        };

        /**
         * 加载评论
         */

        $http({
            url: urlHead + 'getComments',
            method: 'post',
            // contentType: "application/json",
            // headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            // withCredentials: true,
            params: {
                "graphid": graphid_current
            }
        }).then(function successCallBack(response) {
            var data = response.data;
            $scope.commentList = data;
            // $scope.conExpModel=trimStr($scope.commentList)
            console.log(data);
        }, function errorCallBack(response) {
            console.log("erreor");
        });
        // var s = {
        //         "author":1,
        //         "comment":213,
        //         "graphid":1,
        //         "time":20180910125369
        //
        // }
        // $scope.commentList = [];
        // for(var  i = 0 ;i <20;i++){
        //     $scope.commentList.push(s);
        // }
        // $scope.$apply();

        /**
         *  删除功能
         * @type {HTMLElement | null}
         */

        $scope.delete_comment = function (comment_detail) {
            console.log(comment_detail);
            var data = {
                "graphid": graphid_current,
                "time": comment_detail.time,
                "username": comment_detail.author
            }
            var result = JSON.stringify(data);

            $http({
                url: urlHead + 'deleteComment',
                method: 'post',
                // contentType: "application/json",
                // headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                withCredentials: true,
                params: {
                    "data": result
                }
            }).then(function successCallBack(response) {
                console.log(response.data)
                var data = response.data;
                console.log(data);
                if (data.retmessage == "success") {
                    var deleted_index = $scope.commentList.indexOf(comment_detail);
                    $scope.commentList.splice(deleted_index, 1);
                    console.log($scope.commentList);
                }
            }, function errorCallBack(response) {
                console.log("erreor");
            });
        };

        /**
         * 点赞评论事件
         *
         */
        $scope.like_comment = function (comment_detail) {
            var data = {
                "graphid": graphid_current,
                "time": comment_detail.time,
                "username": comment_detail.author
            }
            var result = JSON.stringify(data);

            $http({
                url: urlHead + 'commentUp',
                method: 'post',
                // contentType: "application/json",
                // headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                withCredentials: true,
                params: {
                    "data": result
                }
            }).then(function successCallBack(response) {
                console.log(response.data)
                var data = response.data;
                console.log(data);
                if (data.retmessage == "success") {
                    // var deleted_index = $scope.commentList.indexOf(comment_detail);
                    // $scope.commentList.splice(deleted_index,1);
                    // console.log($scope.commentList);
                    comment_detail.up++;
                    // console.log($scope.commentList);

                }
            }, function errorCallBack(response) {
                console.log("erreor");
            });
        };

        /**
         * 踩评论事件
         *
         */
        $scope.step_comment = function (comment_detail) {
            var data = {
                "graphid": graphid_current,
                "time": comment_detail.time,
                "username": comment_detail.author
            }
            var result = JSON.stringify(data);

            $http({
                url: urlHead + 'commentDown',
                method: 'post',
                // contentType: "application/json",
                // headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                withCredentials: true,
                params: {
                    "data": result
                }
            }).then(function successCallBack(response) {
                console.log(response.data)
                var data = response.data;
                console.log(data);
                if (data.retmessage == "success") {
                    // var deleted_index = $scope.commentList.indexOf(comment_detail);
                    // $scope.commentList.splice(deleted_index,1);
                    // console.log($scope.commentList);
                    comment_detail.down++;
                    // console.log($scope.commentList);

                }
            }, function errorCallBack(response) {
                console.log("erreor");
            });

        };


        $scope.showPublicOpinion = function (name,stkId) {


            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,//打开时的动画开关
                templateUrl: '/view/microIndustryChain/publicOpinion/publicOpinion.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
                controller: 'PublicOpinionCtrl',//这是模态框的控制器,是用来控制模态框的
                appendTo: angular.element(document.getElementById('nodeDiv')),

                resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                    items: function () {//items是一个回调函数
                        return {
                            name:name,
                            id:stkId ,
                            scope: $scope
                        }//这个值会被模态框的控制器获取到
                    },

                }
            });

            $scope.modalInstance.result.then(function(){}, function(res){});


        };

    });

