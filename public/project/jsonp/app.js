
/*var app = angular.module("MobileApp", []);

app.controller("searchmobilecontroller", searchmobilecontroller);

function searchmobilecontroller($scope,$http, MobileService) {
    $http.jsonp(url)
        .success(function(response){
            $scope.response = response;
        });

    $scope.searchmobile = function(name){
        MovieService.searchMobileByName(name,function(response) {
            $scope.response = response;
        });

    }

}
    */
(function(){
    angular
        .module("MobileApp", [])

})();