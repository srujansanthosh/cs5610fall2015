(function()
{
	angular
		.module("FormBuilderApp")
		.factory("UserService", UserService);
		
	function UserService()
	{
		var users = [
			{username:"Alice" , password:"alice123"}
			
		];
			
		var service = {
			findAllUsers: findAllUsers,
			findUserByUsernameAndPassword: findUserByUsernameAndPassword,
			createUser: createUser,
			deleteUserById: deleteUserById,
			updateUser: updateUser
		};
		return service;
		
		function findAllUsers(callback)
		{
			callback(users);
		}
		
		function findUserByUsernameAndPassword(username,password,callback){
			for(var i = 0; i < users.length; i++) {
        		 if (users[i].username == username && users[i].password == password) {
        		 	var user = users[i];
				 	break;}
				 else user = null;
   			 }
			callback(user);
			}	
		
		function guid() {
  			function s4() {
  				  return Math.floor((1 + Math.random()) * 0x10000)
  				    .toString(16)
				      .substring(1);
			  }
 			 return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
 			   s4() + '-' + s4() + s4() + s4();
		} 

		function createUser(user, callback)
		{  user.id = guid();
			users.push(user);
			callback(user);
		}
		
		function deleteUserById(id, callback)
		{
			users.splice(id, 1);
			callback(users);
		}
		
		function updateUser(id, user, callback){
			for(var i = 0; i < users.length; i++) {
        		 if (users[i].id== id) {
        		 	users[i] = user;
					var updated_user = users[i];
				 	break;}
				 else updated_user = null;
   			 }
			callback(updated_user);
			}	
			
	}
})();