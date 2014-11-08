<?php
session_start();
include "db_info.php";

if(!isset($_POST['nick'])) exit;
if(isset($_SESSION['login_nick'])) exit;
   
$nick = $_POST['nick'];

$result = mysql_query("select* from user where name='$nick'");
if(mysql_num_rows($result)==0)
    echo 'success';

?>
    
    