"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);
    function LoginController($rootScope, $http, $location, UserService) {
       var model = this;
       model.login = login;

        function login(user){
            console.log(user.username);
            console.log(user.password);

            UserService.findUserByUsernameAndPassword(user)
                 .then(function(response){
                   model.user = response;
                  $rootScope.user = model.user;
                  $location.path("/profile")
                });

         }
    }
})();