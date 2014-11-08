<?php
if(isset($_SESSION['login_nick'])) exit;
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
            #write{
                position: relative;
                top: 50px;
                font-family: kor_font;
                font-size: 35px;
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
            
           
            
            #auto{
                
            }
            
            #body{
                font-size: 25px;
                font-family: 'NanumBarunGothic';
                position:relative;
                left: -10px;
            }
            #txt{
                font-size: 20px;
                width: 300px;
                
            }
            
            #month{
                font-size: 20px;
                width: 100px;
            }
            
            #day{
                font-size: 20px;
                width: 100px;
            }
            
            #year{
                font-size: 20px;
                width: 100px;
            }
            
            textarea#txt{
                height: 350px;
            }
            
            #btn{
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
            
            #btn2{
                position: relative;
                left:  0px;
                width: 130px;
                background-color: white;
                border-style:solid;
                border-color: #262626;
                font-size: 20px;
                color:#262626;
                padding:10px 20px 10px 20px;
                cursor:pointer;
                font-family: "NanumBarunGothic";
            }
            
            #idchk{
                font-family:  'NanumBarunGothic';
                font-size: 20px;
                position: absolute;
                top: 135px;
                left: 550px;
            }
            
            #nickchk{
                font-family:  'NanumBarunGothic';
                font-size: 20px;
                position: absolute;
                top: 340px;
                left: 550px;
            }
            
        </style>
        
        <script>
            var str = '1203948576ASDQEWRFTGHYJUKIOLPZMXBCNV';
            var idchk = 0;
            var nickchk = 0;
            var autochk = 0;
            var pwchk = -1;
            
            window.onload = function(){
                var tmp = '';
                
                for(var i=0; i<7; i++)
                    tmp += str.charAt(Math.floor(Math.random()*str.length));
                $('#auto').text(tmp);
                console.log(tmp);
                
                $('#btn').click(function(){
                    $('#birth').val(''+$('#year').val()+$('#month').val()+$('#day').val());
                    
                    if(!idchk){
                        alert('아이디를 확인하세요');
                        return false;
                    }
                    
                    if(!pwchk){
                        alert('비밀번호와 비밀번호확인이 같은지 보세요');
                        return false;
                    }
                    
                    if(!nickchk){
                        alert('이름을 확인하세요');
                        return false;
                    }
                    
                    if(!autochk){
                        alert('자동가입문자를 확인하세요');
                        return false;
                    }
                });
                
                $('.id').change(function(){
                    if($('.id').val().length<4 || $('.id').val().length>12){
                        $('#idchk').text('아이디를 4자에서 12자로 맞춰주세요.');
                        $('#idchk').css('color', 'red');
                        idchk=0;
                        return;
                    }
                    
                    $.ajax({
                        type: 'POST',
                        url: 'idchk.php',
                        data: {id: $('.id').val()},
                        success: function (response){
                            if(response.length == 18){
                                $('#idchk').text('사용가능한 아이디입니다.');
                                $('#idchk').css('color', 'blue');
                                idchk=1;
                            }
                            else{
                                $('#idchk').text('이미 존재하는 아이디입니다.');
                                $('#idchk').css('color', 'red');
                                idchk=0;
                            }
                        }
                    });
                });
                
                $('.name').change(function(){
                    if($('.name').val().length<2 || $('.name').val().length>10){
                        $('#nickchk').text('이름을 2자에서 10자로 맞춰주세요.');
                        $('#nickchk').css('color', 'red');
                        nickchk=0;
                        return;
                    }
                    
                    $.ajax({
                        type: 'POST',
                        url: 'nickchk.php',
                        data: {nick: $('.name').val()},
                        success: function (response){
                            if(response.length == 18){
                                $('#nickchk').text('사용가능한 아이디입니다.');
                                $('#nickchk').css('color', 'blue');
                                nickchk=1;
                            }
                            else{
                                $('#nickchk').text('이미 존재하는 이름입니다.');
                                $('#nickchk').css('color', 'red');
                                nickchk=0;
                            }
                        }
                    });
                    
                    
                });
                
                $('.pw,.pwchk').change(function(){
                    if($('.pw').val() == $('.pwchk').val()) pwchk=1;
                    else pwchk=0;
                });
                
                $('.auto').change(function(){
                    if($('.auto').val() == $('#auto').text()) autochk=1;
                    else autochk=0;
                });
            }
        </script>

    </head>
    
    
    <body>
        
        
        
        <div id="write">
            
        <span id="title">회원가입</span>
        
            
        <form method="post" action="do_register.php">
            <span id='body' style= "margin-left:73px">아이디</span><input type=text id="txt" name="id" placeholder="아이디" class='id'/><span id='idchk'></span><br/>
            <span id='body' style= "margin-left:50px">비밀번호</span><input type=password id="txt" name="password" placeholder="비밀번호" class='pw'/><br/>
            <span id='body'>비밀번호 확인</span><input type=password id="txt" placeholder="비밀번호 확인" class='pwchk'/></textarea><br/>
            <span id='body' style= "margin-left:95px">이름</span><input type=text id="txt" name="name" placeholder='이름' class='name'/><span id='nickchk'></span><br/>
            <span id='body' style= "margin-left:97px">생년월일</span><input type=text id="year" placeholder='생년'/>
            </span><input type=text id="month" placeholder='월'/>
            <input type=text id="day" placeholder='일'/><br/>
            <input type=hidden id='birth' name="birth" />
        <input type=hidden name="fb_id"  value="<?=$fb_id?>"/>
            <div id='auto' style= "margin-left:70px"></div>
            <input type=text class='auto' id="txt" style= "margin-left:70px" placeholder="위의 글자를 그대로 써주세요"/><br/>
                   
                   <input  style= "margin-left:50px" type=submit id='btn' value='회원가입' />
            <input  style= "margin-left:80px" type=reset id='btn2' value='다시작성' />
        
        </form>
        </div>
        
        
        
    </body>

</html>