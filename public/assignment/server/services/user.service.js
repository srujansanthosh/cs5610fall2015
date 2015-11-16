module.exports = function(app,model){
  app.get("/api/assignment/user/username=:uname&password=:pword", findUserByUsernameAndPassword);
  app.get("/api/assignment/user", findAllUsers);
  app.get("/api/assignment/user/username=:uname", findUserByUsername);
  app.get("/api/assignment/user/:id", findUserById);
 	app.post("/api/assignment/user", addUser);
  app.put("/api/assignment/user/:id", updateUser);
 app.delete("/api/assignment/user/:id", deleteUser) 
 // app.get("/api/assignment/user?username=alice&password=alice", findUserByUsernameAndPassword);
	
    
	  function addUser(req, res) {
        var user = req.body;
          model
            .createUser(user)
            .then(function(user){
                res.json(user);
            });
    }
    
    	  function findUserByUsernameAndPassword(req, res) {
           var credentials = {"username" : req.params.uname , "password" : req.params.pword};
           model
            .findUserByCredentials(credentials)
            .then(function(user){
                res.json(user);
            });
    }
    
    	  function findAllUsers(req, res) {
           model
            .findAllUsers()
            .then(function(users){
                res.json(users);
            });
    }
    
    	  function findUserByUsername(req, res) {
            model
            .findUserByUsername(req.params.username)
            .then(function(user){
                res.json(user);
            });
    }
    
    	  function findUserById(req, res) {
          model
            .findUserById(req.params.id)
            .then(function(user){
                res.json(user);
            });
    }
    
    	  function updateUser(req, res) {
        var user = req.body;
          model
            .updateUser(req.params.id, user)
            .then(function(users){
                res.json(users);
            });
        }
            
        function deleteUser(req, res) {
          model
            .deleteUser(req.params.id)
            .then(function(users){
                res.json(users);
            });
    }
};