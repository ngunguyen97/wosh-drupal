window.jQuery = window.$ = jQuery;


/*
function initialise(){
	$('.commerce-order-item-add-to-cart-form .field--name-quantity .form-number').bootstrapNumber();
	return false;
};
$(document).ready(function(){
    initialise();
});
$(document).ajaxComplete(function () {
    initialise();
});

*/

function initialise(){
	$('.commerce-order-item-add-to-cart-form .field--name-quantity .form-number').bootstrapNumber();
	return false;
};
$(document).ready(function(){
    initialise();
});
 $(document).bind('ready ajaxComplete', function(){
  $('.commerce-order-item-add-to-cart-form .field--name-quantity .form-number').unbind(initialise);
  initialise();
 })


 
 
