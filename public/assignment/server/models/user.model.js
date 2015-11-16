var q = require("q");
var users = require("./user.mock.json");
module.exports = function(app) {
	    var api = {
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
		deleteUserById: deleteUserById,
		updateUser: updateUser
    };
    return api;
	
    function findUserById(id){
            var deferred = q.defer();
       for(var i = 0; i < users.length; i++) {
        		 if (users[i].id == id) {
        		 	var user = users[i];
				 	break;}
				 else user = null;
   			 }
                console.log(user);
        deferred.resolve(user);
        return deferred.promise;
    };
    
	function findUserByUsername(username){
       var deferred = q.defer();
       for(var i = 0; i < users.length; i++) {
        		 if (users[i].username == username) {
        		 	var user = users[i];
				 	break;}
				 else user = null;
   			 }
                console.log(user);
        deferred.resolve(user);
        return deferred.promise;
    };
    
    function findAllUsers(){
               var deferred = q.defer();
     
        deferred.resolve(users);
        return deferred.promise;
    };
    
	function findUserByCredentials(credentials){
       var deferred = q.defer();
       for(var i = 0; i < users.length; i++) {
        		 if (users[i].username == credentials.username && users[i].password == credentials.password) {
        		 	var user = users[i];
				 	break;}
				 else user = null;
   			 }
                console.log(user);
        deferred.resolve(user);
        return deferred.promise;
    };
    	
        function guid() {
  			function s4() {
  				  return Math.floor((1 + Math.random()) * 0x10000)
  				    .toString(16)
				      .substring(1);
			  }
 			 return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
 			   s4() + '-' + s4() + s4() + s4();
		} 
    
    function createUser(user){
       user.id = guid();
        var deferred = q.defer();
        users.push(user);
        console.log(users);
        deferred.resolve(user);
        return deferred.promise;
        };
	
    function deleteUserById(id){
        var deferred = q.defer();
        	for(var i = 0; i < users.length; i++) {
        		 if (users[i].id== id) {
        		 	users.splice(id, 1);
				 	break;}
				 else continue;
   			 }
        console.log(users);
        deferred.resolve(users);
        return deferred.promise;
    };
    
    function updateUser(id, user){
        
            var deferred = q.defer();
        	for(var i = 0; i < users.length; i++) {
        		 if (users[i].id== id) {
        		 	users[i] = user;
					var updated_user = users[i];
				 	break;}
				 else updated_user = null;
   			 }
        console.log(updated_user);
        deferred.resolve(updated_user);
        return deferred.promise;
    };
	
	
};