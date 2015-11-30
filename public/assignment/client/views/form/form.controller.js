"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);
 function FormController($rootScope, $http, FormService) {
        var model = this;
        model.user = $rootScope.user;
        model.addForm = addForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;
        model.selectForm = selectForm;
                     
         function init() {
             FormService.findAllFormsForUser(model.user._id)
             .then(function(forms){
                 console.log(forms);
                 model.forms = forms;
             });
         }
        init();       
                    
                   
    function addForm(){
           FormService.createFormForUser(model.user._id, model.newform)
             .then(function(forms){
                 console.log("Got the following object:"+forms);
                 model.forms = forms;
                  model.newform = null;
                  init();
                });
          
         };
       
         function updateForm(){
             FormService.updateFormById(model.newform._id, model.newform)
                .then(function(form){
             
                 model.newform = null;
                  init();
                });
          };
       
           function deleteForm(formid){
            FormService.deleteFormById(formid)
            .then(function(forms){
                  init();
                });
          };
       
          function selectForm($index){
            model.newform  = model.forms[$index];
          };
    }
})();"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);
 function FormController($rootScope, $http, FormService) {
        var model = this;
        model.user = $rootScope.user;
       /* model.addForm = addForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;
        model.selectForm = selectForm;*/
                     
         function init() {
             FormService.findAllFormsForUser(model.user.id)
             .then(function(forms){
                 model.forms = forms;
             });
        }
        init();       
                    
                   
   /*   function addForm(){
           FormService.createFormForUser(model.user.id, model.newform)
             .then(function(form){
                 console.log(form);
                  model.newform = form;
                });
          
         };
       
         function updateForm(){
             FormService.updateFormById(model.newform.id, model.newform)
                .then(function(form){
                  model.newform = form;
                });
          };
       
           function deleteForm($index){
            FormService.deleteFormById($index)
            .then(function(forms){
                  model.forms = forms;
                });
          };
       
          function selectForm($index){
            model.newform  = model.forms[$index];
          };*/
    }
})();