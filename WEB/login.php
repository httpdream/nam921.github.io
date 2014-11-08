<?php
if(isset($_SESSION['login_nick'])){
    echo '이미 로그인되었는데?';
    exit;
}
?>
<!DOCTYPE html>
<html>
    <head>
        
        <meta charset="utf-8" />
        <title>ALTIS TEST</title>
        
        <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        
        <style>
            body{
                text-align: center;
            }
            #login{
                
                font-family: kor_font;
                font-size: 35px;
                margin: 0;
                position: relative;
                top: 100px;
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
            #txt{
                font-size: 20px;
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
                width: 100px;
                background-color: white;
                border-style:solid;
                border-color: #262626;
                font-size: 20px;
                color:#262626;
                padding:10px 20px 10px 20px;
                cursor:pointer;
                font-family: "NanumBarunGothic";
            }
            
            
            
            .
        </style>
        
        

    </head>
    
    <script>
        window.onload = function(){
            $('#fb').click(function(){
                $('iframe').attr('src', 'loginFB.html');
            });
        }
    </script>
    
    <body>
      
          
        
        
        <div id="login">
        <span id="title">로그인</span>
        <br/>
        <form method="post" action="do_login.php">
            <span id="body">아 이 디</span><input type=text id="txt" name="id"/><br/>
            <span id="body">비밀번호</span><input type=password id="txt" name="pw"/><br/>
            
            <span ><a href="register.php" id="btn">회원가입</a></span>
            <span ><input type="submit" id="btn2" value="로그인"></span><br/>

  
            
            <iframe width='0px' height='0px'/>
                
            
            
            
    <!--<a href="#" id="auth-logoutlink" style="font-size: 20px;" onclick="FB.logout(function() { document.location.reload(); });">[logout]</a><br>-->
            
        </form>
        </div>
        
        
        
    </body>

</html>