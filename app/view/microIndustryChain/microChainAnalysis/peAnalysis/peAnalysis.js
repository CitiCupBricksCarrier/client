angular.module('myApp.microIndustryChain.peAnalysis', [])
    .controller('PeAnalysisCtrl', function ($scope, items) {

        $scope.id = items.id;
        $scope.name = items.name;

        console.log("id: "+$scope.id);

        items.scope.modalInstance.rendered.then(function () {
            getPe(res => {
                $scope.data = res;
                let now=new Date();
                $scope.data.date =now.getMonth()+1+"-"+now.getDate() ;
            });
        })


    })


function getPe(callback) {
    let res = {
        "pe": 12.40,
        "pePercentile": 0.5,
        "timeToMarket": "2017-10-1",
        "evaluation": "估值适中",
        "forecast": 12.24,
        "peRank": [
            {
                "name": "xxCompany",
                "stockId": "1241353",
                "pe": 12.40,
                "evaluation": "估值适中"
            },
            {
                "name": "xxCompany",
                "stockId": "1241353",
                "pe": 12.40,
                "evaluation": "估值偏高"
            },
            {
                "name": "xxCompany",
                "stockId": "1241353",
                "pe": 12.40,
                "evaluation": "估值偏低"
            },
            {
                "name": "深圳市特力(集团)股份有限公司",
                "stockId": "000025",
                "pe": 12.40,
                "evaluation": "估值适中"
            },
            {
                "name": "xxCompany",
                "stockId": "1241353",
                "pe": 12.40,
                "evaluation": "估值适中"
            },
            {
                "name": "xxCompany",
                "stockId": "1241353",
                "pe": 12.40,
                "evaluation": "估值适中"
            },
            {
                "name": "中国南玻集团股份有限公司",
                "stockId": "000012",
                "pe": 12.40,
                "evaluation": "估值适中"
            },
            {
                "name": "xxCompany",
                "stockId": "1241353",
                "pe": 12.40,
                "evaluation": "估值适中"
            },
            {
                "name": "xxCompany",
                "stockId": "1241353",
                "pe": 12.40,
                "evaluation": "估值适中"
            }
        ]
    }

    callback(res);
}