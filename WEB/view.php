<!-----------
GAME HOMEPAGE
------------>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>ALTIS TEST</title>
        
    </head>
    <body>
        <table border=1>
            <tr><td>번호</td><td>제목</td><td>닉네임</td></td><td>작성시각</td></tr>
        <?
            $num = 1;
             $mysql = mysql_connect('localhost', 'root', 'apmsetup');
             mysql_select_db('web', $mysql);
             mysql_query('charset utf-8');
             
             $result = mysql_query('select* from board');
$row = '';

for($i=0; $i<$num; $i++){
    $row = mysql_fetch_row($result);
}
echo $row[1];
             
        ?>
        </table>
    </body>

</html>