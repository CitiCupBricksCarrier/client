angular.module('myApp.macroIndustryDisplay.companyDetails', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('CompanyDetailsCtrl',function($scope, $route, $http, $state,$stateParams) {
        var stkcd_toShow = $stateParams.stkcd_toShow;
        console.log(stkcd_toShow)
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

        /**
         * ------------------------------
         * ------------------------------
         * http请求
         */
        function getCompanyDetail() {
            $http({
                url: 'http://localhost:8080/generalInfo/companyDetail',
                method: 'post',
                // contentType: "application/json",
                params: {
                    stkid: stkcd_toShow
                }
            }).then(function successCallBack(response) {
                console.log(response.data)
                var data = response.data;
                $scope.companyDetails = {
                    stkcd: data.stkcd,
                    compName: data.compname,
                    compNameEng: data.compnameeng,
                    nature: data.nature,
                    foundDate: data.founddate,
                    regCapital: data.regcapital,
                    chairman: data.chairman,
                    fiscalDate: data.fiscaldate,
                    business: data.business,
                    briefing: data.briefing,
                    majorProductType: data.majorproducttype,
                    majorProductName: data.majorproductname,
                    employee: data.employee,
                    administrativeDivision: data.administrativedivision,
                    province: data.province,
                    city: data.city,
                    address: data.address,
                    office: data.office,
                    zipCode: data.zipcode,
                    phone: data.phone,
                    fax: data.fax,
                    email: data.email,
                    website: data.website,
                    disclose: data.disclose,
                    registerNumber: data.registernumber,
                    organizationCode: data.orgnizationcode,
                    reportCur: data.reportcur,
                    listingOrNot: data.listingornot,
                    mainProduct: data.mainproduct,
                    compPrename: data.compprename,
                    boardChairmen: data.boardchairmen,
                    CEO: data.ceo,
                    discloser: data.discloser,
                    sar: data.sar,
                    crtinDPDirector: data.crtindpdirector,
                    frminDPDirector: data.frmindpdirector
                }
            },function errorCallBack(response) {
                console.log(response);
            });
        }

        /**
         * ------------------------------
         * ------------------------------
         * 方法调用
         */
        getCompanyDetail();
    })
