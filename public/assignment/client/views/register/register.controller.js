"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);
    function RegisterController( $http, $rootScope, $location, UserService) {
       var model = this;
       model.register = register;
                     
         function register (reguser){
             console.log (reguser);
            if (reguser.password != reguser.verifypassword){
                alert("Entered Passwords do not match. Please enter again.")
            } else {
            UserService.createUser(reguser)
                    .then(function(user){
                    model.user = user;
                    $rootScope.user = user;
                   $location.path("/profile")
                });
            };
        };
      }
    
})();