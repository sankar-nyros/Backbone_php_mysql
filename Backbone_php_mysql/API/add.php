<?php

include "config.php";

$obj = $_GET['obj'];

$name = $obj[0]['value'];
$email = $obj[1]['value'];
$phone = $obj[2]['value'];
$address = $obj[3]['value'];
$id = $_GET['id'];

if(empty($id))
{
	$query = "INSERT INTO addressbook(name,email,phone,address) VALUE ('$name', '$email', '$phone', '$address')";
}
else
{
	$query = "UPDATE addressbook SET name = '$name', email = '$email', phone = '$phone', address = '$address' WHERE id = '$id'";    
}
$result = mysql_query($query);
if($result)
{
    exit(json_encode(array('success' => true, 'msg' => 'Addressbook saved successfully..!')));
}
else
{
	exit(json_encode(array('success' => false, 'msg' => 'Sorry..!Something going wrong please try some time later.')));
}

?>
