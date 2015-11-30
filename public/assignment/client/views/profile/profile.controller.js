"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($rootScope, $http, UserService) {
       var model = this;
       model.user = $rootScope.user;
       model.update = update;
   
      function update(){
            UserService.updateUser($rootScope.user._id, model.user)
             .then(function(user){
                  model.user = user[0];
                  $rootScope.user = model.user;
               });
       };
    };
})();