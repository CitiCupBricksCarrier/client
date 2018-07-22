angular.module('myApp.macroIndustryDisplay.companyDetails', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('CompanyDetailsCtrl',function($scope, $route, $http, $state,$stateParams) {
        var companyName = $stateParams.companyName;
        // console.log(companyName)
        $scope.companyDetails = {
            stkcd: 'xxx',
            compName: 'xxx',
            compNameEng: 'xxx',
            nature: 'xxx',
            foundDate: 'xxx',
            regCapital: 'xxx',
            chairman: 'xxx',
            fiscalDate: 'xxx',
            business: 'xxx',
            briefing: 'xxx',
            majorProductType: 'xxx',
            majorProductName: 'xxx',
            employee: 'xxx',
            administrativeDivision: 'xxx',
            province: 'xxx',
            city: 'xxx',
            address: 'xxx',
            office: 'xxx',
            zipCode: 'xxx',
            phone: 'xxx',
            fax: 'xxx',
            email: 'xxx',
            website: 'xxx',
            disclose: 'xxx',
            registerNumber: 'xxx',
            organizationCode: 'xxx',
            reportCur: 'xxx',
            listingOrNot: 'xxx',
            mainProduct: 'xxx',
            compPrename: 'xxx',
            boardChairmen: 'xxx',
            CEO: 'xxx',
            discloser: 'xxx',
            sar: 'xxx',
            crtinDPDirector: 'xxx',
            frminDPDirector: 'xxx'
        }

        /**
         * 返回上一页（即行业信息界面）
         */
        $scope.goBack = function (){
            history.back()
        }
    })
