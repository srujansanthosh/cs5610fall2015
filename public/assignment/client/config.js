"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                })
                .when("/profile", {
                    templateUrl: "views/profile/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model"
                })
                 .when("/login", {
                    templateUrl: "views/login/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                 .when("/register", {
                    templateUrl: "views/register/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                  .when("/form", {
                    templateUrl: "views/form/form.view.html",
                    controller: "FormController",
                     controllerAs: "model"
                })
                  .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                })
                  .when("/form-fields", {
                    templateUrl: "views/form-fields/form-fields.view.html",
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();