module.exports = function(app,model){
   app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
   app.get("/api/assignment/form/:formId/field/:fieldId", findFieldForForm);
   app.post("/api/assignment/form/:formId/field", createField);
   app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
   app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
 
   function findAllFieldsForForm(req, res) {
           model
            .findAllFieldsForForm(req.params.formId)
            .then(function(fields){
                console.log(fields);
                res.json(fields);
            });
    }
    
       function findFieldForForm(req, res) {
           model
            .findFormById(req.params.formId, req.params.fieldId)
            .then(function(fields){
                res.json(fields);
            });
    }
    
       function createField(req, res) {
           var field = req.body;
           model
            .createField(req.params.formId, field)
            .then(function(fields){
                res.json(fields);
            });
    }
        
       function updateField(req, res) {
       var field = req.body;
           model
            .updateField(req.params.formId, req.params.fieldId, field)
            .then(function(fields){
                res.json(fields);
            });
    }
	
       function deleteField(req, res) {
           model
            .deleteField(req.params.formId, req.params.fieldId)
            .then(function(fields){
                res.json(fields);
            });
    }
    
    
}