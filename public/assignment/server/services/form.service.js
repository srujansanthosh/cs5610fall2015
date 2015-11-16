module.exports = function(app,model){
   app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
  app.get("/api/assignment/form/:formId", findform);
  app.post("/api/assignment/user/:userId/form", createFormForUser);
  app.put("/api/assignment/form/:formId", updateFormById);
 app.delete("/api/assignment/form/:formId", deleteFormById) ;
 
   function findAllFormsForUser(req, res) {
           model
            .getAllForms(req.params.userId)
            .then(function(forms){
                console.log(forms);
                res.json(forms);
            });
    }
    
       function findform(req, res) {
           model
            .findFormById(req.params.formId)
            .then(function(form){
                res.json(form);
            });
    }
    
       function createFormForUser(req, res) {
           var form = req.body;
           model
            .createFormForUser(req.params.userId, form)
            .then(function(form){
                res.json(form);
            });
    }
    
    
       function updateFormById(req, res) {
       var form = req.body;
           model
            .updateFormById(req.params.formId, form)
            .then(function(form){
                res.json(form);
            });
    }
       function deleteFormById(req, res) {
           model
            .findFormById(req.params.formId)
            .then(function(forms){
                res.json(forms);
            });
    }
    
    
}