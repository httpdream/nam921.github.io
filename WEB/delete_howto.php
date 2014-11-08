<?php
session_start();
?>
<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    
<?php
if(!isset($_GET['id'])) exit;
if(!isset($_SESSION['login_nick'])) exit;
include "db_info.php";
$idx = $_GET['id'];
$result = mysql_query("select nickname from board_howto where idx = $idx");
$row = mysql_fetch_row($result);
$nickname = $row[0];
if($nickname != $_SESSION['login_nick']) exit;
//$query = "insert into board (title, nickname, content, time) values('$title', '$nickname', '$content', '$time')";

//$query = "UPDATE `web`.`board` SET `content` = 'eqwqwe' WHERE `board`.`idx` = 3";
//DELETE FROM `web`.`reply` WHERE `reply`.`idx_comment` = 1
$query = "delete from board_howto where idx=$idx";
$result = mysql_query($query);
echo "<script>alert('삭제되었습니다.'); location.href='community_howto.php'</script>";
    
?>
</html>