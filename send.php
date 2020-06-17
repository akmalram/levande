<?php

$API_KEY = "618316327:AAF6k6dspDoA38xmAtKbEwK0WjAha2-wTxM";
$chat_id = -1001481624330;

$name = $_POST['name'];
$phone = $_POST['phone'];

$message = "Имя: {$name}\n";
$message .= "Телефон: {$phone}\n";

	$url = 'https://api.telegram.org/bot' . $API_KEY . '/sendMessage?';

	$fields = [
        'chat_id' => urlencode($chat_id),
        'parse_mode' => urlencode('HTML'),
        'text' => urlencode($message),
    ];

//url-ify the data for the POST
foreach ($fields as $key => $value) {
    $fields_string .= $key . '=' . $value . '&';
}
$fields_string = rtrim($fields_string, '&');

$fields_string = str_replace(' ', '', $fields_string);

//echo $fields_string;

header("Location: {$url}{$fields_string}");

?>