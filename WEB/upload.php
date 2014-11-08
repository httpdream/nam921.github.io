<?php
session_start();
?>
<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    
<?php
$title = $_POST['title'];
$nickname = $_SESSION['login_nick'];
$content = $_POST['content'];
$date = date("YmdHis");
$time = date("ymd");


        include "db_info.php";
$query = "insert into board (title, nickname, content, time) values('$title', '$nickname', '$content', '$time')";

$result = mysql_query($query);
echo "<script>alert('작성이 완료되었습니다.'); location.href='community_free.php'</script>";
    
?>
</html>