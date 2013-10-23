Mail = (function(W, $) {
	// basic selectors
	var $name, $email, $message, $error_div;
	
	function validateAll() {
		var validation_objects = [
			{
				jquery:$name, 
	  			regex:/^(\w|\s){1,50}$/,
				message:'Invalid Name'
			},
			{
				jquery:$email, 
	  			regex:/^(\w|\d|\-|\.)+@((\w|\d|\-)+\.)+(\w{2,4})$/, 
				message:'Invalid Email'
			},
			{
				jquery:$message,
				regex:/^.+$/,
				message:'Invalid Message'
			}
		];	
		var errors = [];
		for(var i in validation_objects) {
			var obj = validation_objects[i];
			if(!obj.regex.test(obj.jquery.val())) {
				errors.push(obj.message);
			}
		}
		return errors;
	}

	function sendMail() {
		var data = {
			userName: $name.val(),
			userEmail: $email.val(),
			userMessage: $email.val()
		};
		$.post('/mailService.php', data, mailerResponse);
	}

	function showSpinner() {
		// TODO: implement this
	}

	function hideSpinner() {
		// TODO: implement this
	}

	function mailerResponse(data) {
		console.log(data);
		hideSpinner();
	}

	function handleClick() {
		showSpinner();

		var errors = validateAll();
		if(errors.length > 0) {
			hideSpinner();
			$error_div.html(errors.join(', '));
		}
		else {
			sendMail();
		}
	}

	function letsDoThis() { 
		$name = $('#userName');
		$email = $('#userEmail');
		$message = $('#userMessage');	
		$error_div = $('.alert.alert-stay.error');
		$('#userSubmit').click(handleClick);
	}

	// setup the click event when the DOM is ready
	$(document).ready(letsDoThis);

})(window, jQuery);
