<?php

// build html email for myself
$header = "From:contact@aprilandchip.com\r\nContent-type: text/html \r\n";
$recipient = 'recipient@aprilandchip.com';
$subject = 'Contact Request from aprilandchip.com';
$body = 'HELLO WORLD';

// attempt to send the email
if(!mail($recipient, $subject, $body, $header))
{
    echo "Mail not sent. Unknown error...";
}

?>
