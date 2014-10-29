<?
session_start();
?>
<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    
<?
$nickname = $_SESSION['login_id'];
$reply = $_POST['reply'];
$idx = $_POST['idx'];
$time = date("ymd");


        $conn = mysql_connect('localhost', 'root', 'root');
mysql_selectdb('web');
$query = "insert into reply (idx, comment, nickname, time) values('$idx', '$reply', '$nickname', '$time')";

$result = mysql_query($query);
echo $query;
echo "<script>location.href='view_board.php?id=$idx';</script>";
    
?>
</html>