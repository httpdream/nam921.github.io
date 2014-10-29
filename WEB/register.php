<?
$fb_id = '';
if(isset($_GET['fb_id'])) $fb_id = $_GET['fb_id'];
echo $fb_id;
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
            
            
        </style>
        
        <script>
            var str = '1203948576ASDQEWRFTGHYJUKIOLPZMXBCNV';
            var tmp = '';
            var year = '';
            var month = '';
            var day = '';
            window.onload = function(){
                
                
                for(var i=0; i<7; i++)
                    tmp += str.charAt(Math.floor(Math.random()*str.length));
                $('#auto').text(tmp);
                console.log(tmp);
                
                $('#btn').click(function(){
                    $('#birth').val(''+$('#year').val()+$('#month').val()+$('#day').val());
                });
            }
        </script>

    </head>
    
    
    <body>
        
        <div id='top'></div>
        
        <div id="write">
        <span id="title">회원가입</span>
        
            
        <form method="post" action="do_register.php">
            <span id='body' style= "margin-left:73px">아이디</span><input type=text id="txt" name="id" placeholder="아이디" class='id'/><br/>
            <span id='body' style= "margin-left:50px">비밀번호</span><input type=password id="txt" name="password" placeholder="비밀번호" class='pw'/><br/>
            <span id='body'>비밀번호 확인</span><input type=password id="txt" placeholder="비밀번호 확인"/></textarea><br/>
            <span id='body' style= "margin-left:95px">이름</span><input type=text id="txt" name="name" placeholder='이름' class='name'/><br/>
            <span id='body' style= "margin-left:97px">생년월일</span><input type=text id="year" placeholder='생년'/>
            </span><input type=text id="month" placeholder='월'/>
            <input type=text id="day" placeholder='일'/><br/>
            <input type=hidden id='birth' name="birth" />
        <input type=hidden name="fb_id"  value="<?=$fb_id?>"/>
            <div id='auto' style= "margin-left:70px"></div>
            <input type=text class='auto' id="txt" style= "margin-left:70px" placeholder="위의 글자를 그대로 써주세요"/><br/>
                   
                   <input  style= "margin-left:50px" type=submit id='btn' value='회원가입' />
            <input  style= "margin-left:70px" type=reset id='btn2' value='다시작성' />
        
        </form>
        </div>
        
        
        
    </body>

</html>