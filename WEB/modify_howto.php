<?php
include "db_info.php";
if(!isset($_GET['id'])){
    echo '잘못된접근';
    exit;
}

$id = $_GET['id'];
$query = "select* from board_howto where idx=$id";
$result = mysql_query($query);
   $row = mysql_fetch_row($result);
?>

<!DOCTYPE html>
<html>
    <head>
        
        <meta charset="utf-8" />
        <title>ALTIS TEST</title>
        
        
        
        <style>
            body{
                text-align: center;
            }
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
            }
            #content{
                font-size: 20px;
                width: 771px;
                padding: 15px;
                height: 350px;
                color: #262626;
                position: relative;
                font-family: 'NanumBarunGothic';
                top: -5px;
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
            
            #btn2{
                position: relative;
                left:  0px;
                width: 130px;
                background-color: #262626;
                font-size: 20px;
                color:white;
                padding:10px 20px 10px 20px;
                cursor:pointer;
                font-family: "NanumBarunGothic";
            }
            
            #file{
                left:  0px;
                width: 800px;
                background-color: white;
                color: red;
                border-style:solid;
                border-color: #262626;
                font-size: 20px;
                color:#262626;
                padding:10px 20px 10px 20px;
                cursor:pointer;
                font-family: "NanumBarunGothic";
            }
            
            .file_inputbox{
                font-size: 20px;
                width: 600px;
            }
            
            .file{
                position: relative;
                top: -70px;
                left: 383px;
                overflow: hidden;
            }
            
            .file_btn{
                color:#FFFFFF;
                background-color: #262626;
                border-style: solid;
                font-size: 20px;
                font-family: NanumBarunGothic;
            }
            .hidden{
                font-size: 45px;
                position: absolute;
                top:0px;
                right: 0px;
                opacity: 0;
                
                filter: alpha(opacity=0);
            }
            .file_string{
            }
        </style>
        
        <script>
            window.load = function(){
                document.getElementById('file').select();
                document.selection.clear();
            }
            function change(){
                var file = document.getElementById('hid').value;
                document.getElementById('fileName').value = file.substring(12, file.length);
            }
        </script>

    </head>
    
    
    <body>
        <div id="write">
        <br/>
        <form method="post" action="do_modify_howto.php" enctype="multipart/form-data">
            <input type=text id="title" name="title" placeholder="제목" value='<?=$row[1]?>'/>
            <textarea id="content" name="content" placeholder="내용"> <?=$row[3]?></textarea><br/>
            <input type=hidden name="idx" placeholder="제목" value='<?=$row[0]?>'/>

            <span ><input type="submit" id="btn" value="수정"></span>
            <span ><input type="reset" id="btn2" value="다시쓰기"></span>
        </form>
        </div>
        
        
        
    </body>

</html>