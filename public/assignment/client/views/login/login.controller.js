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
                 .then(function(users){
                  if (users[0] == null){
                      alert("User credentials submitted do not exist");
                  } else{
                  model.user = users[0];
                  $rootScope.user = model.user;
                  $location.path("/profile")
                  }
                });
         };
    }
})();