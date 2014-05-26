<?php

include "config.php";

$id = $_GET['id'];

$query = "DELETE FROM addressbook WHERE id = '$id' ";
$result = mysql_query($query);


if ($result) 
{
    echo json_encode(array('success' => true));
}
else 
{
    echo json_encode(array('success' => false,'msg' => 'Sorrt..!!Something wrong please try later.'));
}

?>
