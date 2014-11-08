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
$result = mysql_query("select nickname from board_scshot where idx = $idx");
$row = mysql_fetch_row($result);
$nickname = $row[0];
if($nickname != $_SESSION['login_nick']) exit;
//$query = "insert into board (title, nickname, content, time) values('$title', '$nickname', '$content', '$time')";

//$query = "UPDATE `web`.`board` SET `content` = 'eqwqwe' WHERE `board`.`idx` = 3";
$query = "update board_scshot set content = '$content' where idx=$idx";
$result = mysql_query($query);
$query = "update board_scshot set time = '$time' where idx=$idx";
$result = mysql_query($query);
$query = "update board_scshot set title = '$title' where idx=$idx";
$result = mysql_query($query);
if($row[5] != $_FILES['file']['name']){
    $dir = "./files/";
$file_hash = $date.$_FILES['file']['name'];
$file_hash = md5($file_hash);
$upfile = $dir.$file_hash;
    $file = $_FILES['file']['name'];

if(is_uploaded_file($_FILES['file']['tmp_name'])){
    if(!move_uploaded_file($_FILES['file']['tmp_name'], $upfile)){
        echo "upload error";
        exit;
    }
}
    $query = "update board_scshot set file_name = '$file' where idx=$idx";
    mysql_query($query);
    $query = "update board_scshot set file_hash = '$file_hash' where idx=$idx";
    mysql_query($query);
}
echo "<script>alert('수정이 완료되었습니다.'); location.href='community_scshot.php'</script>";
    
?>
</html>