<?php
session_start();
?>

<!DOCTYPE html>
<html>
    <head>
        
        <meta charset="utf-8" />
        <title>ALTIS TEST</title>
        
        
        <style>
            body{
            }
            a{
                text-decoration: none;
                color: #262626;
                transition: color 0.5s;
            }
            
            a:hover{
                color: #d44a4a;
            }
            @font-face{
                font-family: 'kor_font';
                src: url('FONT/kor_Font.ttf');
            }
            
            @font-face{
                font-family: 'eng_font';
                src: url('FONT/eng_Font.ttf');
            }
            
            @font-face{
                font-family: 'NanumBarunGothic';
                src: url('FONT/NanumBarunGothic.ttf');
            }
            
            #btn{
                position: relative;
                left:  530px;
                width: 100px;
                background-color: #262626;
                color:white;
                padding:10px 20px 10px 20px;
                cursor:pointer;
                font-family: "NanumBarunGothic";
                <?php if(!isset($_SESSION['login_nick'])) echo 'display:none;'; ?>
            }
            
            #title{
                font-family: kor_font;
                font-size: 45px;
            }
            
            .black{
                color:white;
                background-color: #262626;
                text-align: center;
                font-size: 20px;
                font-family: 'NanumBarunGothic';
                height: 40px;
            }
            
            .end{
                background-color: #262626;
                height: 10px;
                width: 1000px;
            }
            
            .body{
                color: black;
                text-align: center;
                font-size: 20px;
                font-family: 'NanumBarunGothic';
                height: 40px;
            }
            
            .bottom{
                color: 262626;
                text-align: center;
                font-family: 'NanumBarunGothic';
                font-size: 20px;
            }
            
            .arrow{
                color: 262626;
                text-align: center;
                font-size: 25px;
                font-family: arial;
            }
            
            .section1{
                width: 150px;
            }
            .section2{
                width: 450px;
            }
            .section3{
                width: 150px;
            }
            .section4{
                width: 150px;
            }
            .center{
                text-align: center;
            }
            
            .section{
                width: 200px;
                height: 200px;
            }
            td{
                width: 250px;
                height: 50px;
                text-align: center;
                font-size: 25px;
                font-family: 'NanumBarunGothic';
                
            }
            .center{
                text-align: center;
            }
        </style>
        
        <script>
        </script>

    </head>
    
    
    <body>
        <span id="title">스샷게시판</span>
        <span ><a href="write_scshot.html" id="btn">글쓰기</a></span>
        <br/>
        
        <table>
            
            <tbody>
                
                
                
                <?php
             include "db_info.php";
             mysql_query('charset utf-8');
             
$result='addr';
             if(isset($_GET['page'])){
                 $f = $_GET['page'];
                 $prev = ($f-1)*6;
                 $next = $f*6;
                $result = mysql_query("select* from board_scshot order by idx desc limit $prev,6");
             }

            else $result = mysql_query('select* from board_scshot order by idx desc');

$count = 0;

             while($row = mysql_fetch_row($result)){
                 if($count%3==0)
                    echo "<tr>";
                 echo "<td class='section'><a href='view_scshot.php?id=$row[0]'><img src=files/$row[4]  class='section'/><br/>$row[1]<br />$row[2]</a><td/>
                 ";
                 $count++;
                 if($count==6)
                    echo "</tr>";
             }
             
        ?>
                
            </tbody>
        </table>
                
                <div class="center">
            <a href='community_scshot.php?page=<?php
if(isset($_GET['page'])){ if($_GET['page']>1) echo ($_GET['page']-1); else echo '1';}
else echo '1';
?>
                     '><span class="arrow">◄</span></a>
        
        <span>
            
            <?php
$result = mysql_query("select* from board_scshot");
$row = ceil(mysql_num_rows($result)/6);

for($i = 1; $i<=$row; $i++)
    echo "<a href='community_scshot.php?page=$i'> $i </a>";
            ?>
            
        </span>
            
            <a href='community_scshot.php?page=<?php
if(isset($_GET['page'])) echo ($_GET['page']+1);
else echo '2';
?>
                     '><span class="arrow">►</span></a>
        </div>
            
    </body>
</html>