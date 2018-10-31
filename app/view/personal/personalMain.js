angular.module('myApp.personalMain', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('PersonalMainCtrl',function($scope, $route, $http, $state) {
        var userid = "";
        $scope.personDetail ={
            address: "",
            birthday: "",
            citinum: "",
            contactnum: "",
            credit: 0,
            idnum: "",
            isbinded: 0,
            name: "1",
            occupation: "",
            organization: "",
            password: "citicupuser",
            phonenum: "",
            sex: "男",
            summary: "这个用户很懒，什么也没留下",
            uid: ""
        }

        $http({
            url: urlHead + 'getSession',
            method: 'post',
            // contentType: "application/json",
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            withCredentials: true
        }).then(function successCallBack(response) {
            // console.log(response.data)
            var data = response.data;
            userid = data;
            console.log(111, response, data);

            $http({
                url: urlHead + 'getUserDetail',
                method: 'post',
                // contentType: "application/json",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                params:{
                    id:userid
                },
                withCredentials: true
            }).then(function successCallBack(response) {
                // console.log(response.data)
                var data = response.data;
                $scope.personDetail = data;
            }, function errorCallBack(response) {
                console.log("erreor");
            });

        }, function errorCallBack(response) {
            console.log("erreor");
        });






        $scope.charge = function(){
            var credits = parseInt($('#creditsChoice input[name="credit"]:checked ').val());
            // console.log(credits)
            $http({
                method: 'post',
                url: urlHead + 'creditsCharge',
                // headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                //cache: true, //避免多次请求后台数据
                params: {
                    id:userid,
                    credits:credits
                }
            }).then(function successCallBack(response) {
                console.log(11,response);
            }, function errorCallBack() {
                console.error("charge Failed");
            });
            // document.getElementsByClassName("fade")[].style.display = "none";
            $state.go('personalMain');
        };



        $scope.saveDetail = function(){
            var name = document.getElementById("personalNickName").value;
            var sex = document.getElementById("personalSex").value;
            var phonenum = document.getElementById("personalRealName").value;
            var birthday = document.getElementById("personalBirth").value;
            var idnum = document.getElementById("personalIdNum").value;
            var occupation = document.getElementById("personalOccupation").value;
            var organization = document.getElementById("personalOrganization").value;
            var contactnum = document.getElementById("personalContactNum").value;
            var address = document.getElementById("personalAddress").value;
            var summary = document.getElementById("personalSummary").value;
            $scope.personDetail.name = name;
            $scope.personDetail.sex = sex;
            $scope.personDetail.phonenum = phonenum;
            $scope.personDetail.birthday = birthday;
            $scope.personDetail.idnum = idnum;
            $scope.personDetail.occupation = occupation;
            $scope.personDetail.organization = organization;
            $scope.personDetail.contactnum = contactnum;
            $scope.personDetail.address = address;
            $scope.personDetail.summary = summary;

            var userStr = JSON.stringify($scope.personDetail);

            $http({
                url: urlHead + 'modifyUserDetail',
                method: 'post',
                // contentType: "application/json",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                params:{
                    user:userStr
                },
                withCredentials: true
            }).then(function successCallBack(response) {
                console.log(response.data);
            }, function errorCallBack(response) {
                console.log("erreor");
            });


        }


        $scope.blindAccount = function (){
            var account = $scope.citiAccount;
            var password = $scope.citiPassword;

            $http({
                url: urlHead + 'bindCiticupNum',
                method: 'post',
                // contentType: "application/json",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                params:{
                    user:userid,
                    citiNum:account,
                    citiPassword:password
                },
                withCredentials: true
            }).then(function successCallBack(response) {
                console.log(response.data);
            }, function errorCallBack(response) {
                console.log("erreor");
            });
            $state.go('personalMain');


        }

        $(document).ready(function(){

            $("#modify").click(function(){
                $(".info-detail").addClass("info-modify");
                $(".info-textArea").addClass("info-textArea-modify");
                $(".info-input,.info-textArea").removeAttr("readonly");
            });

            $("#save").click(function(){
                $(".info-detail").removeClass("info-modify");
                $(".info-textArea").removeClass("info-textArea-modify");
                $(".info-input,.info-textArea").attr("readonly",'readonly');
            });
        });

    });