<meta charset="utf-8">
<script>
<?
session_start();
$conn = mysql_connect('localhost', 'root', 'root');
mysql_selectdb('fourcard');
$id = $_POST['id'];
$password = $_POST['pw'];
$result = mysql_query("select * from user where id=$id and password=$password");
$row = @mysql_fetch_row($result);

if(count($row)==1 || count($row)==0){
    echo "var free='아이디 또는 비밀번호가 틀립니다.';";
    
}
else{
    $_SESSION['login_id'] = $row[0];
    $_SESSION['login_nick'] = $row[2];
    //echo "$_SESSION[login_id] $_SESSION[login_nick] 세션완료";
    echo "var free='로그인 성공';";
}

?>
    
    window.onload = function(){
        alert(free);
        
    }
    </script>