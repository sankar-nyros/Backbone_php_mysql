<?php

include "config.php";

$input = $_GET['input'];

$query = "select * from addressbook where name like '%$input%' or email like '%$input%' or phone like '%$input%' or address like '%$input%'";
$result = mysql_query($query);

$contacts = array();
 
	while($row = mysql_fetch_array($result)):
		$contacts[] = array(
			'id' => $row['id'],
			'name' => $row['name'], 
		    'email' => $row['email'], 
		    'phone' => $row['phone'], 
		    'address' => $row['address']
		);
	endwhile;
	
echo json_encode($contacts);
?>
