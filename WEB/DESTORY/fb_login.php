<?php
session_start();
include "db_info.php";
$id = $_GET['id'];
$name = $_GET['name'];

$result = mysql_query("select * from fb_user where fbid=$id");
$row = @mysql_fetch_row($result);

if(count($row)==1 || count($row)==0){
    //echo "<script> parent.location = 'register.php?fb_id=$id';</script>";
    mysql_query("insert into fb_user (name,fbid) values('$name', '$id')");
    
    $_SESSION['login_nick'] = $name;
    echo "<script>alert('로그인 되었습니다.'); parent.location = 'index.php'; </script>";
}
else{
    $_SESSION['login_nick'] = $name;
    //echo "$_SESSION[login_id] $_SESSION[login_nick] 세션완료";
    echo "<script>alert('로그인 되었습니다.'); parent.location = 'index.php'; </script>";
}

?>
    
    