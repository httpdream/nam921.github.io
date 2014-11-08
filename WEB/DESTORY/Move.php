<?php
session_start();
// 세션 또는 별도의 스토리지에서 state token을 가져옴 
$stored_state = $_SESSION['state'];
?>
<html>
<body>
    
    <script>
        location.href='https://nid.naver.com/oauth2.0/token?client_id=m3wLZVV3Btf8IHlDahhx&client_secret=Qvxrru2wpd&grant_type=authorization_code&state='+'<?=$_GET['state']?>'+'&code='+'<?=$_GET['code']?>';
    </script>

</body>
</html>

