module.exports = function(app){
	//var model = require("./models/user.model.js")(app);
	require("./services/user.service.js")(app);
	// formmodel = require("./models/form.model.js")(app);
	//require("./services/form.service.js")(app,formmodel);
  };