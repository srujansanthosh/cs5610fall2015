"use strict";
(function(){
	angular
		.module("FormBuilderApp")
		.factory("FormService", FormService);
		
	function FormService($http, $q)
	{
			
	   var service = {
			findAllFormsForUser: findAllFormsForUser,
			createFormForUser: createFormForUser,
			deleteFormById: deleteFormById,
			updateFormById: updateFormById
		};
		return service;
		

		function findAllFormsForUser(userId){ 
			
			var deferred = $q.defer();
			$http.get("/api/assignment/user/"+userId+"/form")
		         .success(function(forms){
                    deferred.resolve(forms); 
								});
			return deferred.promise;
           }	
					
		function createFormForUser(userId, form){
			  var deferred = $q.defer();
            $http.post("/api/assignment/user/"+userId+"/form", form)
                .success(function(forms){
                    deferred.resolve(forms);
                });

            return deferred.promise;
		}
		
		function deleteFormById(formId){	
			 var deferred = $q.defer();
			$http.delete("/api/assignment/form/"+formId)
                .success(function(forms){
                    deferred.resolve(forms);
                });
	       return deferred.promise;
		}
		
		function updateFormById(formId, newForm){
		     var deferred = $q.defer();
		      $http.put("/api/assignment/form/"+formId , newForm)
                .success(function(form){
                    deferred.resolve(form);
                });

            return deferred.promise;
			}	
			
	}
})();