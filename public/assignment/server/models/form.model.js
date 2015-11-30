var q = require("q");
//var forms = require("./form.mock.json");
module.exports = function(db, mongoose) {
	var FormSchema = require("./form.schema.js")(mongoose);
	var FormModel  = mongoose.model("FormModel", FormSchema);
	
	    var api = {
            getAllForms: getAllForms,
			findFormById: findFormById,
			findFormByTitle: findFormByTitle,
			createFormForUser: createFormForUser,
			deleteFormById: deleteFormById,
			updateFormById: updateFormById,
			findAllFieldsForForm:findAllFieldsForForm,
			createField:createField,
			deleteField:deleteField
    };
    return api;
	
    function getAllForms(id){
		 var deferred = q.defer();
		 
		 var formsofuser = [];
		  FormModel.find({userId : id}, function(err, forms){
            if(err) {
                deferred.reject(err);
            } else {
                formsofuser = forms;
				deferred.resolve(formsofuser);
            }
        });
		
        return deferred.promise;
		}
		
    function findFormById(id){
		 var deferred = q.defer();
	
			FormModel.find({_id : id}, function(err, form){
						if(err) {
							deferred.reject(err);
						} else {
						deferred.resolve(form);
						}
			});
	
	      return deferred.promise;
		}
			
				
	function findFormByTitle(title){
		 var deferred = q.defer();
	
			FormModel.find({title : title}, function(err, form){
					if(err) {
						deferred.reject(err);
					} else {
					deferred.resolve(form);
					}
				});
				
		 return deferred.promise;
		} ;	
		
		
		function guid() {
  			function s4() {
  				  return Math.floor((1 + Math.random()) * 0x10000)
  				    .toString(16)
				      .substring(1);
			  }
 			 return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
 			   s4() + '-' + s4() + s4() + s4();
		} 

		function createFormForUser(userId, form){
			//form.id = guid();
			form.userId = userId;
			//form.fields = [];
			var deferred = q.defer();
		
			FormModel.create(form, function(err, forms) {
				if(err) {
					deferred.reject(err);
				} else {
				deferred.resolve(forms);
				}
			});
			return deferred.promise;
			}
		
		function deleteFormById(formId){
			 var deferred = q.defer();	
					FormModel.remove({_id: formId}, function(err, status) {
					if(err) {
						deferred.reject(err);
					} else {
						deferred.resolve(status);
					}
				});
			return deferred.promise;
		}
		
		function updateFormById(formId, newForm){
			var deferred = q.defer();
			delete newForm._id;
				FormModel.update({_id: formId}, {$set: newForm},
				function(err,forms){
					if(err){
						deferred.reject(err);
					}else{
						deferred.resolve(findFormById(formId));
					}
				});
        return deferred.promise;
	}	
			
	function findAllFieldsForForm(formId){
       var deferred = q.defer();
			FormModel.findById(formId, function(err, form){
						if(err) {
							deferred.reject(err);
						} else {
							deferred.resolve(form.fields);
						}
			});
	      return deferred.promise;
	}
	
	function createField(formId, field){
	   var deferred = q.defer();
			FormModel.findById(formId, function(err, form){
						if(err) {
							deferred.reject(err);
						} else {
						form.fields.push(field);
						form.save(function(err, form){
							 if(err){
								 deferred.reject(err);
							 }else{
								deferred.resolve(form.fields);
							 }
           			     });
						}
			});
	      return deferred.promise;
		}
	
	function deleteField(formId, fieldId){
		 var deferred = q.defer();
				FormModel.findById(formId, function(err, form){
							if(err) {
								deferred.reject(err);
							} else {
						for(var j = 0; j < form.fields.length; j++) {
							if (form.fields[j]._id == fieldId){
								form.fields.splice(j,1);
								break;} 
								else continue;
						}
							form.save(function(err, form){
								deferred.resolve(form.fields);
				});
							}
				});
	      return deferred.promise;
};
}