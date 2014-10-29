<meta charset="utf-8">
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<?
session_start();
$conn = mysql_connect('localhost', 'root', 'root');
mysql_selectdb('web');
$id = $_POST['id'];
$password = md5($_POST['password']);
$name = $_POST['name'];
$birth = $_POST['birth'];
$fb_id='';
if(isset($_POST['fb_id'])) $fb_id = $_POST['fb_id'];

$result = mysql_query("insert into user (id, password, name, birth, fb_id) values ('$id', '$password', '$name', '$birth', '$fb_id')");
if($result == 0) ;
else{
    //echo "$_SESSION[login_id] $_SESSION[login_nick] 세션완료";
    echo "<script>alert('회원가입이 완료 되었습니다.'); parent.location = 'index.php'; </script>";
}

?>
    
    