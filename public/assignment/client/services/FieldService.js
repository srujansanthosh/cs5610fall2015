"use strict";
(function(){
	angular
		.module("FormBuilderApp")
		.factory("FieldService", FieldService);
		
	function FieldService($http, $q)
	{
	   var service = {
			findAllFieldsForForm: findAllFieldsForForm,
			createField: createField,
			deleteFieldById: deleteFieldById,
			updateFormById: updateFormById
		};
		return service;
	
		function findAllFieldsForForm(formId){ 
			var deferred = $q.defer();
			$http.get("/api/assignment/form/"+formId+"/field")
		         .success(function(fields){
                    deferred.resolve(fields); 
					console.log(fields);
			});
			return deferred.promise;
           }	
					
		function createField(formId, field){
			  var deferred = $q.defer();
            $http.post("/api/assignment/form/"+formId+"/field", field)
                .success(function(fields){
                    deferred.resolve(fields);
                });
            return deferred.promise;
		}
		
		function deleteFieldById(formId, fieldId){	
			 var deferred = $q.defer();
			$http.delete("/api/assignment/form/"+formId+"/field/"+fieldId)
                .success(function(fields){
                    deferred.resolve(fields);
                });
	       return deferred.promise;
		}
		
		function updateFormById(formId, fieldId, newField){
		     var deferred = $q.defer();
		      $http.put("/api/assignment/form/"+formId+"/field/"+fieldId , newField)
                .success(function(field){
                    deferred.resolve(field);
                });
            return deferred.promise;
			}	
	}
})();