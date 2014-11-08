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

if(!$_FILES['file']['name'])
    {
        echo "<script>alert('업로드 할 파일이 입력되지 않았습니다.');";
$query = "insert into board_scshot (title, nickname, content, time) values('$title', '$nickname', '$content', '$time')";

$result = mysql_query($query);
echo "<script>location.href='community_scshot.php'</script>";
    
        exit;
    }
    
    if(strlen($_FILES['file']['name']) > 255)
    {
        echo "<script>alert('파일 이름이 너무 깁니다.');";
        echo "history.back();</script>";
        exit;
    }


$dir = "./files/";
$file_hash = $date.$_FILES['file']['name'];
$file_hash = md5($file_hash);
$upfile = $dir.$file_hash;

if(is_uploaded_file($_FILES['file']['tmp_name'])){
    if(!move_uploaded_file($_FILES['file']['tmp_name'], $upfile)){
        echo "upload error";
        exit;
    }
}

$query = "insert into board_scshot (title, nickname, content, time, file_name, file_hash) values('$title', '$nickname', '$content', '$time', '".$_FILES['file']['name']."', '$file_hash')";
echo $query;

$result = mysql_query($query);
echo "<script>location.href='community_scshot.php'</script>";
?>
</html>