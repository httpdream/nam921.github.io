<?php
session_start();
?>
<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    
<?php
$nickname = $_SESSION['login_nick'];
$reply = $_POST['reply'];
$idx = $_POST['idx'];
$time = date("ymd");


include "db_info.php";
$query = "insert into reply_scshot (idx, comment, nickname, time) values($idx, '$reply', '$nickname', '$time')";

$result = mysql_query($query);
echo $query;
echo "<script>location.href='view_scshot.php?id=$idx';</script>";
    
?>
</html>