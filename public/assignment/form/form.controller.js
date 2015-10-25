(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);
    function FormController($rootScope, $scope, FormService) {
        $scope.userid = $rootScope.userid
        $scope.addForm = function(){
            FormService.createFormForUser($scope.userid, $scope.newformname, function(value){
                console.log(value);                                              
            });
       };
       
          $scope.updateForm = function(){
            FormService.updateFormById($scope.userid, $scope.formname, function(value){
                console.log(value);                                              
            });
       };
       
          $scope.deleteForm = function(){
            FormService.deleteFormById($scope.userid, $scope.formname, function(value){
                console.log(value);                                              
            });
       };
       
          $scope.selectForm = function(){
            FormService.updateFormById($scope.userid, $scope.formname, function(value){
                console.log(value);                                              
            });
       };
   
    }
})();