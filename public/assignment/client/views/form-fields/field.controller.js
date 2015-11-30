"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);
		
		
 function FieldController($rootScope, $http, $routeParams, FieldService) {
       var model = this;
       var userid = $routeParams.userId;
       var formid = $routeParams.formId;
	   model.addField = addField;
       model.deleteField = deleteField;
        
        function init() {
             FieldService.findAllFieldsForForm(formid)
             .then(function(fields){
                 model.fields = fields;
             });
        }
        init(); 
        
        function addField(fieldtype){
          var field;
          if (fieldtype == "TEXT"){
             field = {"id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
          } else if(fieldtype == "TEXTAREA"){
                  field = {"id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};;
          }else if(fieldtype == "DATE"){
                  field = {"id": null, "label": "New Date Field", "type": "DATE"};
          }else if(fieldtype == "EMAIL"){
                  field = {"id": null, "label": "New Email Field", "type": "EMAIL", "placeholder": "New Field"};
          }else if(fieldtype == "OPTIONS"){
                  field = {"id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
	                       {"label": "Option 1", "value": "OPTION_1"},
	                       {"label": "Option 2", "value": "OPTION_2"},
	                       {"label": "Option 3", "value": "OPTION_3"}
                            ]};
          }else if(fieldtype == "CHECKBOX"){
                  field = {"id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        	{"label": "Option A", "value": "OPTION_A"},
                        	{"label": "Option B", "value": "OPTION_B"},
	                        {"label": "Option C", "value": "OPTION_C"}
                             ]};
           }else if(fieldtype == "RADIOS"){
                  field = {"id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
	                           {"label": "Option X", "value": "OPTION_X"},
	                           {"label": "Option Y", "value": "OPTION_Y"},
	                           {"label": "Option Z", "value": "OPTION_Z"}
                             ]};
            }
            
           FieldService.createField(formid, field)
             .then(function(fields){
                   init();
                });
            };
         
            function deleteField(field){
                console.log(field)
            FieldService.deleteFieldById(formid, field._id)
            .then(function(fields){
                console.log(fields);
                init();
                });
            };
      };
 })();