"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($rootScope, $http, UserService) {
        
       var model = this;
       model.user = $rootScope.user,
       model.update = update;
           
      function update(){
            UserService.updateUser($rootScope.user.id, model.user)
             .then(function(user){
                  model.user = user;
                  console.log(model.user);
                  $rootScope.user = model.user;
               });
       };
    }
})();