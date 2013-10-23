Mail = (function(W, $) {
	// basic selectors
	var $name, $email, $message, $notification;
	
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
		$.post('/mail.php', data, mailerResponse);
	}

	function showSpinner() {
		// TODO: implement this
	}

	function hideSpinner() {
		// TODO: implement this
	}

	function notify(message, positive) {
		var notification_class = 'alert-error';
		if(positive) {
			notification_class = 'alert-success';
		}
		$notification.addClass('alert')
			.removeClass('alert-error alert-success')
			.addClass(notification_class)
			.html(message);
	}

	function mailerResponse(data) {
		data = JSON.parse(data);
		success = data.status == 'success';
		message = data.message;
		notify(message, success);
		hideSpinner();
	}

	function handleClick() {
		showSpinner();

		var errors = validateAll();
		if(errors.length > 0) {
			hideSpinner();
			notify(errors.join(', '), false);
		}
		else {
			sendMail();
		}
	}

	function letsDoThis() { 
		$name = $('#userName');
		$email = $('#userEmail');
		$message = $('#userMessage');	
		$notification = $('#notification');
		$('#userSubmit').click(handleClick);
	}

	// setup the click event when the DOM is ready
	$(document).ready(letsDoThis);

})(window, jQuery);
