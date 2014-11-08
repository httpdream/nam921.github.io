<?php
session_start();

if(!isset($_POST['id'])) exit;
if(isset($_SESSION['login_nick'])) exit;
   
$id = $_POST['id'];

include "db_info.php";
$result = mysql_query("select* from user where id='$id'");
if(mysql_num_rows($result)==0)
    echo 'success';


?>
    
    