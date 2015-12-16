$(document).ready(function () {
    $(".navbar-nav li a:not(#pro-id)").click(function(event) {
        $(".navbar-collapse").collapse('hide');
    });
});