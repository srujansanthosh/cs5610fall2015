"use strict";
(function(){
	angular
		.module("FormBuilderApp")
		.factory("UserService", UserService);
		
	function UserService($http, $q){
					
		var service = {
			findAllUsers: findAllUsers,
			findUserByUsernameAndPassword: findUserByUsernameAndPassword,
			createUser: createUser,
			deleteUserById: deleteUserById,
			updateUser: updateUser
		};
		return service;
		
		function findAllUsers()
		{
			 var deferred = $q.defer();
			$http.get("/api/assignment/user")
		         .success(function(users){
                    deferred.resolve(users);
                });
                
            return deferred.promises;
		}
		
		function findUserByUsernameAndPassword(user){
		    var deferred = $q.defer();
			//console.log(uname);
			//console.log(pword);
			//var u = {'username':uname,'password':pword};
			
	//		$http.get("/api/assignment/user/username="+uname+"&password="+pword)
			$http.get("/api/assignment/user/?username="+user.username+"&password="+user.password)
		         .success(function(user){
                    deferred.resolve(user);
                });
            return deferred.promise;
			}	
		
	    
		function createUser(user){  
		  var deferred = $q.defer();
            $http.post("/api/assignment/user",user)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
		}
		
		function deleteUserById(userid)
		{
			 var deferred = $q.defer();
			$http.delete("/api/assignment/user"+userid)
                .success(function(users){
                    deferred.resolve(users);
                });
	       return deferred.promise;
		}
		
		function updateUser(id, user){
		 var deferred = $q.defer();
            $http.put("/api/assignment/user/"+id , user)
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
			}	
			
	}
})();