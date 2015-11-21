"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);
    function LoginController($rootScope, $http, $location, UserService) {
       var model = this;
       model.login = login;
       function login(){
                                console.log(model.user.username);                             UserService.findUserByUsernameAndPassword(model.user.username, model.user.password)
                 .then(function(response){
                   model.user = response;
                  $rootScope.user = model.user;
                  $location.path("/profile")
                });
          
            
         };
    }
})();