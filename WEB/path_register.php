<?
session_start();
if($_SESSION['login_id']){
    echo "<script>location.href='config.php'</script>";
}
else echo "<script>location.href='register.php'</script>";
?>