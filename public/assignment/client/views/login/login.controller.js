"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);
    function LoginController($rootScope, $http, $location, UserService) {
       var model = this;
       model.login = login;
       function login(){
            UserService.findUserByUsernameAndPassword(model.user.username,model.user.password)
                 .then(function(user){
                   model.user = user;
                  $rootScope.user = model.user;
                  $location.path("/profile")
                });
          
            
         };
    }
})();