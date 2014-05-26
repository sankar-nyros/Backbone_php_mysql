<?php
include "config.php";

$query = "Select * from addressbook order by id desc";
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
