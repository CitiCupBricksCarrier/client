angular.module('myApp.macroIndustryDisplay.companyDetails', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('CompanyDetailsCtrl',function($scope, $route, $http, $stateParams) {
        var companyName = $stateParams.companyName;
        // console.log(companyName)
        $scope.companyDetails = {
            stkcd: 'xxx',
            compNanme: 'xxx',
            compNameEng: 'xxx',
            nature: 'xxx',
            foundDate: 'xxx',
            regCapital: 'xxx',
            chairman: 'xxx',
            fiscalDate: 'xxx',
            business: 'xxx',
            briefing: 'xxx',
            majorProdutType: 'xxx',
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
            orgnizationCode: 'xxx',
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
    })
