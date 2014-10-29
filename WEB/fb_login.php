<meta charset="utf-8">
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<?
session_start();
$conn = mysql_connect('localhost', 'root', 'root');
mysql_selectdb('web');
$id = $_GET['id'];

$result = mysql_query("select * from user where fbid=$id");
$row = @mysql_fetch_row($result);

if(count($row)==1 || count($row)==0){
    echo "<script> parent.location = 'register.php?fb_id=$id';</script>";
}
else{
    $_SESSION['login_id'] = $row[0];
    $_SESSION['login_nick'] = $row[2];
    //echo "$_SESSION[login_id] $_SESSION[login_nick] 세션완료";
    echo "<script>alert('로그인 되었습니다.'); parent.location = 'index.php'; </script>";
}

?>
    
    