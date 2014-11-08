<?php
session_start();
include "db_info.php";
mysql_query('charset utf-8');
$query = "select* from board where idx=$_GET[id]";
$result = mysql_query($query);
$row = mysql_fetch_row($result);

$query = "select* from reply where idx=$_GET[id]";
$result = mysql_query($query);

$nick = '';
if(isset($_SESSION['login_nick'])) 
   $nick = $_SESSION['login_nick'];
?>
<!DOCTYPE html>
<html>
    <head>
        
        <meta charset="utf-8" />
        <title>ALTIS TEST</title>
        
        
        
        <style>
            
            #write{
                
                font-family: kor_font;
                font-size: 35px;
                margin: 0;
            }
            a{
                text-decoration: none;
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
            
           
            
            #title{
                
            }
            #body{
                font-size: 25px;
                font-family: 'NanumBarunGothic';
                position:relative;
                left: -10px;
            }
            #title{
                font-size: 20px;
                width: 790px;
                background-color: #262626;
                color: white;
                font-family: 'NanumBarunGothic';
                padding:5px;
                margin: 1px;
                text-align:left;
                
            }
            #right{
                text-align:right;
            }
            #left{
                text-align:left;
                float: left;
            }
            #content{
                font-size: 20px;
                text-align: left;
                width: 771px;
                padding: 15px;
                height: 350px;
                color: #262626;
                position: relative;
                font-family: 'NanumBarunGothic';
                top: -5px;
            }
            
            #reply{
                font-size: 17px;
                width: 650px;
                padding: 15px;
                height: 100px;
                color: #262626;
                position: relative;
                font-family: 'NanumBarunGothic';
                border-style: soild;
                border-color: #262626;
                top: -5px;
                resize: none;
                float: left;
<?php
if($nick=='')
echo "display:none;";
?>
            }
            
            #btn{
                position: relative;
                left:  0px;
                width: 100px;
                background-color: #262626;
                font-size: 20px;
                color:white;
                padding:10px 20px 10px 20px;
                cursor:pointer;
                font-family: "NanumBarunGothic";
            }
            
            .reply{
                padding: 10px;
                background-color: #C4C4C4;
                color: #262626;
                font-family: 'NanumBarunGothic';
                font-size: 20px;
                width: 782px;
                margin-bottom: 2px;
            }
            
            pre{
                background-color: #C4C4C4;
                color: #262626;
                font-family: 'NanumBarunGothic';
                font-size: 15px;
                width: 782px;
            }
            
            #do{
                position: relative;
                top: -7px;
                left: 20px;
                width: 100px;
                height: 133px;
                background-color: #262626;
                font-size: 20px;
                color:white;
                padding:10px 20px 10px 20px;
                cursor:pointer;
                font-family: "NanumBarunGothic";
<?php
if($nick=='')
echo "display:none;";
?>
            }
            
            #bot{
                text-align: right;
                width: 800px;
            }
            
            .end{
                font-size: 1px;
                width: 790px;
                background-color: #262626;
                color: #262626;
                font-family: 'NanumBarunGothic';
                padding:5px;
                margin: 1px;
                text-align:left;
                
            }
            
            #hid{
                <?php
if($row[2] != $nick) echo 'display: none;';
?>
            }
            
            
        </style>
        
        

    </head>
    
    
    <body>
        <div id="write">
        <br/>
            <div id="title"><div id="left">제목 | <?=$row[1]?>
                </div><div id="right">
                <?="20".substr($row[4],0,2)."-".substr($row[4],2,2)."-".substr($row[4],4,5)?></div></div>
            <div id="title">이름 | <?=$row[2]?></div>
            <pre id="content"><?=$row[3]?></pre>

            <form action='do_reply.php' method="post">
            <span><textarea id="reply" name='reply'></textarea></span>
                <input type="hidden" value="<?=$row[0]?>" name='idx' />
                <span><input type="submit" id="do" value="등록"></span><br/>
                </form>
            
<?php
    while($row = mysql_fetch_row($result)){
        echo "<div class='reply'>$row[2]<pre>$row[1]</pre></div>";
    }

?>
<div class='end'>qwe</div>            
            
            
            <div><input type="reset" onclick='history.back(-1);' id="btn" value="목록" style='float: left; margin:20px'></div>
            <div id='bot'>
            <span id='hid'><a href='modify.php?id=<?=$_GET['id']?>'><input type="button" id="btn" value="수정"></a></span>
                <span id='hid'><a href='delete.php?id=<?=$_GET['id']?>'><input type="button" id="btn" value="삭제"></a></span>
                </div>
        </div>
        
        
        
    </body>

</html>

<meta charset="utf-8">
<?php
if($row[5]){
  echo "<a href='download.php?id=$_GET[id]'> download: $row[6] </a>";
}

//댓글

?>