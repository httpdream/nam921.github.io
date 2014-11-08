<meta charset="utf-8">
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<?php
session_start();
include "db_info.php";
$id = $_POST['id'];
$password = md5($_POST['pw']);

$result = mysql_query("select * from user where id='$id' and password='$password'");
$row = @mysql_fetch_row($result);

if(count($row)==1 || count($row)==0){
    echo "<script>alert('아이디 또는 비밀번호가 틀립니다.'); window.history.back();</script>";
    
}
else{
    $_SESSION['login_id'] = $row[0];
    $_SESSION['login_nick'] = $row[2];
    //echo "$_SESSION[login_id] $_SESSION[login_nick] 세션완료";
    echo "<script>alert('로그인 되었습니다.'); parent.location = 'index.php'; </script>";
}

?>
    
    