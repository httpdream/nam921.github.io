<meta charset="utf-8">

<?php
session_start();
include "db_info.php";
$id = $_POST['id'];
$password = md5($_POST['password']);
$name = $_POST['name'];
$birth = $_POST['birth'];
$fb_id='';
if(isset($_POST['fb_id'])) $fb_id = $_POST['fb_id'];

$result = mysql_query("insert into user (id, password, name, birth) values ('$id', '$password', '$name', '$birth')");
if($result == 0) ;
else{
    //echo "$_SESSION[login_id] $_SESSION[login_nick] 세션완료";
    //echo "insert into user (id, password, name, birth) values ('$id', '$password', '$name', '$birth')";
    echo "<script>alert('회원가입이 완료 되었습니다.'); parent.location = 'index.php'; </script>";
}

?>
    
    