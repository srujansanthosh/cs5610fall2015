(function(){
    angular
        .module("MobileApp")
        .factory("MobileService", MobileService);

    function MobileService($http){
        var url = "http://api.bestbuy.com/v1/products(longDescription=iPhone*|sku=7619002)?show=sku,name&pageSize=15&page=5&apiKey=f5gcfz25e6percfdjjaut7hh&format=json$callback=JSONP_CALLBACK";
        var service = {
            searchMobileByName : searchMobileByName
        };
        return service;

        function searchMobileByName(title, callback){
            $http.jsonp(url)
                .success(callback);

        }
    }

}) ();