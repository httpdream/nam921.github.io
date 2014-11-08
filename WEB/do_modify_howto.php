<?php
session_start();
?>
<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    
<?php
if(!isset($_POST['title'])) exit;
if(!isset($_SESSION['login_nick'])) exit;
$content = $_POST['content'];
$title = $_POST['title'];
$date = date("YmdHis");
$time = date("ymd");
$idx = $_POST['idx'];
include "db_info.php";
$result = mysql_query("select nickname from board_howto where idx = $idx");
$row = mysql_fetch_row($result);
$nickname = $row[0];
if($nickname != $_SESSION['login_nick']) exit;
//$query = "insert into board (title, nickname, content, time) values('$title', '$nickname', '$content', '$time')";

//$query = "UPDATE `web`.`board` SET `content` = 'eqwqwe' WHERE `board`.`idx` = 3";
$query = "update board_howto set content = '$content' where idx=$idx";
$result = mysql_query($query);
$query = "update board_howto set time = '$time' where idx=$idx";
$result = mysql_query($query);
$query = "update board_howto set title = '$title' where idx=$idx";
$result = mysql_query($query);
echo "<script>alert('수정이 완료되었습니다.'); location.href='community_howto.php'</script>";
    
?>
</html>