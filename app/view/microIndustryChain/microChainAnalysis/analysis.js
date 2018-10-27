angular.module('myApp.microIndustryChain.analysis', [
    'ngAnimate', 'ui.bootstrap', 'myApp.microIndustryChain.publicOpinion', 'myApp.microIndustryChain.peAnalysis', 'myApp.microIndustryChain.financialContrast'
])
    .controller('AnalysisCtrl', function ($scope, $uibModal, $uibModalInstance, items) {

        $scope.method = "pe";
        $scope.name = items.name;
        $scope.id = items.id;

        let urls = ["/view/microIndustryChain/microChainAnalysis/publicOpinion/publicOpinion.html",
            "/view/microIndustryChain/microChainAnalysis/peAnalysis/peAnalysis.html",
            "/view/microIndustryChain/microChainAnalysis/financialContrast/financialContrast.html"];

        let controllers = ["PublicOpinionCtrl", "PeAnalysisCtrl", "FinancialContrastCtrl"];

        let methods = ["opinion", "pe", "financial"]

        $scope.confirm = function () {

            let index = methods.indexOf($scope.method);

            $uibModalInstance.close();
            $scope.modalInstance = $uibModal.open({
                templateUrl: urls[index],//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
                controller: controllers[index],//这是模态框的控制器,是用来控制模态框的
                appendTo: angular.element(document.getElementById('nodeDiv')),

                resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                    items: function () {//items是一个回调函数
                        return {
                            name: $scope.name,
                            id: $scope.id,
                            scope: $scope,
                            // data: JSON.parse(res)
                        }//这个值会被模态框的控制器获取到
                    },

                }
            });


        }
    })