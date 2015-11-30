var app = angular.module("MobileApp");

app.controller("searchmobilecontroller", searchmobilecontroller);

function searchmobilecontroller($scope,$http, MobileService) {

    $scope.searchmobile = function(name){
        MobileService.searchMobileByName(name,function(response) {
            $scope.response = response;
        });

    }

}