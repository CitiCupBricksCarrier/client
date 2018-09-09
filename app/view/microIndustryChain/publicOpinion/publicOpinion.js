angular.module('myApp.microIndustryChain.publicOpinion', [
    'ngAnimate', 'ui.bootstrap'
])
    .controller('PublicOpinionCtrl', function ($scope,$uibModal,items) {
        $scope.data = {
            sentimentIndex: [],
            wordCloud: [],
            opinions: []
        };

        $scope.name=items.name;
        $scope.id=items.id;
        console.log(items);



        items.scope.modalInstance.rendered.then(function () {
            let pieChart = echarts.init(document.getElementById('pieChart'));
            let wordCloud = echarts.init(document.getElementById('cloud'));
            initPieChart($scope, pieChart);
            initWordCloud($scope, wordCloud);

            $.get('http://localhost:8080/sentimentAnalysis?stkid='+$scope.id, res => {
                res = JSON.parse(res);
                refreshData(pieChart, res.sentimentIndex);
                refreshData(wordCloud, res.wordCloud);
                for (let key in res.news.data) {
                    res.news.data[key].sentimentIndex = res.sentimentIndexList[key];
                }
                $scope.data.opinions = res.news.data;

            })
        })

       $scope.$on("modalRendered",function () {

       })


        $scope.animationsEnabled = true;

        $scope.open = function (title, opinions,keyWord) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,//打开时的动画开关
                templateUrl: '/view/microIndustryChain/publicOpinion/myModal.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
                controller: 'ModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
                windowTopClass:'topWindow',
                resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                    items: function () {//items是一个回调函数
                        return {
                            title: title,
                            opinions: opinions,
                        }//这个值会被模态框的控制器获取到
                    },

                }
            });
            modalInstance.rendered.then(function () {
                console.log("opened");
                let content=document.getElementById('opinionsTable');
                let contents=content.innerHTML;
                var values = contents.split(keyWord);
                content.innerHTML = values.join('<span style="background:yellow;">' + keyWord + '</span>');
            });
            modalInstance.result.then(function(){});


        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;//动画效果
        };


        $scope.openIndexModal = function (index) {
            let opinions = [];
            let source = $scope.data.opinions;
            index = index.index;
            for (let key in source) {
                if (source[key].sentimentIndex === index) {
                    opinions.push(source[key]);
                }
            }
            $scope.open('情感指数为 "' + index + '" 的舆情列表', opinions);

        }

        $scope.openModal=function(){
            $scope.open("舆情列表",$scope.data.opinions);
        }

        $scope.openWordModal = function (index) {
            let opinions = [];
            let source = $scope.data.opinions;

            console.log("open Word")

            index = index.index;
            for (let key in source) {
                if (source[key].content.indexOf(index)!==-1||source[key].title.indexOf(index)!==-1) {
                    opinions.push(source[key]);
                }
            }
            $scope.open('包含关键词 "' + index + '" 的舆情列表', opinions,index);

        }

    })
    .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
//这是模态框的控制器,记住$uibModalInstance这个是用来调用函数将模态框内的数据传到外层控制器中的,items则上面所说的入参函数,它可以获取到外层主控制器的参数

        $scope.title = items.title;
        $scope.opinions = items.opinions;

        $scope.ok = function () {
            //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
            console.log($scope.title)
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
            $uibModalInstance.dismiss('cancel');
        };
    })


function initPieChart($scope, pieChart) {
    let option = {

        title: {
            text: '情感指数',//标题说明
            x: 'center'//居中
        },
        // 提示框，鼠标悬浮交互时的信息提示

        tooltip: {
            show: true,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // 图例
        legend: {
            x: 'center',
            y: 'bottom',
        },

        // 数据内容数组
        series: [
            {
                name: '情感指数',
                type: 'pie',
                radius: "55%",
                center: ['50%', '50%'],

                label: {
                    normal: {
                        position: 'inner' //内置文本标签
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },


                data: '',


                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            position: 'outer'
                        },
                        labelLine: {
                            show: true,
                            lineStyle: {
                                color: 'red'
                            },
                        },
                    }
                }
            }

        ]

    };

    pieChart.setOption(option);
    pieChart.showLoading();
    pieChart.on('click', function (data) {
        $scope.openIndexModal({index: data.name})

    })
}

function initWordCloud($scope, wordCloud) {
    let option = {

        title: {
            text: '热点词',//标题说明
            x: 'center'//居中
        },
        // 提示框，鼠标悬浮交互时的信息提示

        tooltip: {
            show: true,
        },

        // 数据内容数组

        series: [{
            type: 'wordCloud',
            size: ['80%', '80%'],
            textRotation: [0, 45, 90, -45],
            textPadding: 0,
            autoSize: {
                enable: true,
                minSize: 14
            },
            textStyle: {
                normal: {
                    fontFamily: 'sans-serif',
                    color: function () {
                        return 'rgb('
                            + [Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)]
                                .join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 5,  //阴影距离
                    shadowColor: '#333'  //阴影颜色
                }

            },
            data: []
        }]

    }

    wordCloud.setOption(option);
    wordCloud.on('click', function (data) {
        $scope.openWordModal({index:data.name});
    })
    wordCloud.showLoading();
}


function createRandomItemStyle() {
    return {
        normal: {
            color: 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
            ].join(',') + ')'
        }
    };
}


function refreshData(chart, data) {
    let option = chart.getOption();
    option.series[0].data = data;
    chart.setOption(option);
    chart.hideLoading();
}



