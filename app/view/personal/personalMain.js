angular.module('myApp.personalMain', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('PersonalMainCtrl',function($scope, $route, $http, $state) {
        var userid = "";

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
            // console.log(111, response, data);
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
            }).then(function (response) {
                console.log(11,response);
            }, function () {
                console.error("charge Failed");
            });
            // document.getElementsByClassName("fade")[].style.display = "none";

        };

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