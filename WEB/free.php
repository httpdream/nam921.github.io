<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <script>
    
<?php
//$id = $_POST['id'];
//$nick = $_POST['nick'];
//$pw = $_POST['password'];
//$gender = $_POST['gender'];
$id='1111';
$pw='3654';
$nick='asdfffgf';
$gender='1';

include "db_info.php";
$query = "insert into user values('$id', '$pw', '$nick')";

$result = mysql_query($query);
echo "var free = '회원가입이 완료되었습니다.'";
?>
    
    window.onload = function(){
        alert(free);
    }
    </script>
    
    
    <?
echo $query;
?>
</html>