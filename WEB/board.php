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
        <?php
             $mysql = mysql_connect('localhost', 'root', 'root');
             mysql_select_db('web', $mysql);
             mysql_query('charset utf-8');
             
             $result = mysql_query('select* from board');
             while($row = mysql_fetch_row($result)){
                 echo "<tr>";
                 for($i = 0; $i<3; $i++)
                    echo "<td>$row[$i]<br></td>";
                 echo "<td>$row[4]<br></td>";
                 echo "</tr>";
             }
             
        ?>
        </table>
    </body>

</html>