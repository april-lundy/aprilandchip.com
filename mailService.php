<?php

function formatJsend($status='failure', $message='The response defaults to a failure') {
	$ary = array(
		'status' => $status,
		'message' => $message
	);

	return json_encode($ary);
}

function sanitizeAndValidate($s, $regex) {
	// remove bad characters
	$old_s = $s;
	$s = htmlspecialchars($old_s);

	if($old_s != $s) {
		throw new Exception('The input provided is invalid');
	}

	if(preg_match($regex, $s)) {
		return $s;
	}
	else {
		throw new Exception('The input provided is invalid: ' . $s);
	}
}

// build html email for myself

// First the variables in the email
$name = '';
$email = '';
$message = '';
try {
	// for the name, only allow letters and spaces, up to 50 characters
	$name = sanitizeAndValidate($_POST['userName'], '/^(\w|\s){1,50}$/');

	// for emails, use a general email regular expression 
	$email_regex = "/^(\w|\d|\-|\.)+@((\w|\d|\-)+\.)+(\w{2,4})$/";
	$email = sanitizeAndValidate($_POST['userEmail'], $email_regex);
	
	// for messages, 
	$message = sanitizeAndValidate($_POST['userMessage'], '/^.+$/');
}
catch(Exception $e) {
	echo formatJsend('error', $e->getMessage());
	exit();
}


$header = "From:contact@aprilandchip.com\r\nContent-type: text/html \r\n";
$recipient = 'recipient@aprilandchip.com';
$subject = 'Contact Request from aprilandchip.com';
$body = <<<EOT
<!DOCTYPE html>
<html>
<body>
	<h1>Contact Request</h1>
	<p>
	</p>
</body>
</html>
EOT;

echo formatJsend('success', 'Mail sent correctly');
exit();

// attempt to send the email
if(!mail($recipient, $subject, $body, $header))
{
	echo formatJsend('error', 'Mail not sent due to an unknown error. Looks like you\'ll have to try again later');
}
else
{
	echo formatJsend('success', 'Mail sent correctly');
}

?>
