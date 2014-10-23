<!-----------
GAME HOMEPAGE
------------>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>ALTIS TEST</title>
        <?
             $mysql = mysql_connect('localhost', 'root', 'root');
             mysql_select_db('ht', $mysql);
             
$title = '시간이 남아도냐?';
$body = '남아도냐고 디콘이나해 크으으으악';
$nickname = '꺄아악';
$password = hash('sha256', 'happy');
             

             mysql_query("INSERT INTO `board` (title, body, nickname, password) VALUES ('$title', '$body', '$nickname', '$password')");
        ?>
    </head>
    <body>   
    </body>

</html>