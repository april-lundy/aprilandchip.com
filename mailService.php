<?php

function formatJsend($status='failure', $message='The response defaults to a failure') {
	$ary = array(
		'status' => $status,
		'message' => $message
	);

	return json_encode($ary);
}

// build html email for myself
$header = "From:contact@aprilandchip.com\r\nContent-type: text/html \r\n";
$recipient = 'recipient@aprilandchip.com';
$subject = 'Contact Request from aprilandchip.com';
$body = 'HELLO WORLD';

// attempt to send the email
if(!mail($recipient, $subject, $body, $header))
{
	echo formatJsend('error', 'Mail not sent due to an unknown error. Looks like you\'ll have to try again later');
}

?>
