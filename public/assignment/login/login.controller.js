(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);
    function LoginController($rootScope, $scope, $location, UserService) {
        //var username = $scope.username;
        
        $scope.$location = $location;
           
          
        $scope.login = function(){
            $rootScope.user = UserService.findUserByUsernameAndPassword($scope.username,$scope.password,function(value){
                console.log(value);
                  
            });
         $location.path("/profile")
             };
    
    }
})();