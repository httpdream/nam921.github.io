<?
session_start();
if($_SESSION['login_id']){
    echo "<script>location.href='logout.php'</script>";
}
else echo "<script>location.href='login.php'</script>";
?>
