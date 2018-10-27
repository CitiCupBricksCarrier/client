angular.module('myApp.register', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('RegisterCtrl',function($scope, $route, $http, $state) {

        var nickname_boolean = false;
        var password_boolean = false;
        var confirm_boolean = false;
        var phone_boolean = false;

        $('.phone-num').blur(function(){
            if ((/^1[34578]\d{9}$/).test($(".phone-num").val())){
                $('.username_mes').html("✔").css("color","green");
                phone_boolean = true;
            }else {
                $('.username_mes').html("×").css("color","red");
                phone_boolean = false;
            }
        });



        $('.password-first').blur(function(){
            if ((/^[a-z0-9_-]{6,16}$/).test($(".password-first").val())){
                $('.password_mes').html("✔").css("color","green");
                password_boolean = true;
            }else {
                $('.password_mes').html("×").css("color","red");
                password_boolean = false;
            }
        });


// password_confirm
        $('.password-sure').blur(function(){
            if (($(".password-sure").val())==($(".password-first").val())){
                $('.password_sure').html("✔").css("color","green");
                confirm_boolean = true;
            }else {
                $('.password_sure').html("×").css("color","red");
                confirm_boolean = false;
            }
        });

        $('.phone-num').blur(function(){
            if ((/^[a-z0-9_-]{4,8}$/).test($(".phone-num").val())){
                $('.username_mes').html("✔").css("color","green");
                nickname_boolean = true;
            }else {
                $('.username_mes').html("×").css("color","red");
                nickname_boolean = false;
            }
        });


    });