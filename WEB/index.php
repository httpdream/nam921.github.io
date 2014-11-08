<?php
session_start();
$register = '회원가입';
$login = '로그인';
$en_login = 'LOGIN';
    
if(isset($_SESSION['login_nick'])){
    $register = '정보관리';
    $login = '로그아웃';
    $en_login = 'LOGOUT';
}

?>
<html>
<head>
    <meta charset="utf-8">
    <title>인간의 시간</title>
<style>
    @font-face{
                font-family: 'eng_font';
                src: url('FONT/eng_Font.ttf');
            }
    #logo{
        background-image:url(IMAGE/logo2.png) ;
        background-size: 100% 100%;
        margin-left: -10px;
        color: transparent;
        opacity: 0.8;
        transition: all 0.5s;
    }
    
    #logo:hover{
        opacity: 1;
    }
    
    body{
        
    }
    #top{
        position:absolute;
        height:100px;
        width:1280px;
        top:0px;
        background-color: #262626;
        transition: all 0.5s;
    }
    ul{
        list-style: none;
    }
    ul li{
        font-family: "eng_font";
        float:left;
        
        
        margin:35px;
        margin-top:10px;
        padding-bottom: 20px;
        
        font-size:30px;
        color:#cacaca;
        cursor: pointer;
        transition: color 0.5s;
    }
    
    
    
    iframe{
        position:absolute;
        top:100px;
        transition: all 0.5s;
    }
    
    .sub_comm{
        transition: opacity 0.5s;
        opacity: 0;
        display: none;
    }
    
    .sub_qna{
        transition: opacity 0.5s;
        opacity: 0;
        display: none;
    }
    
    .sub_login{
        transition: opacity 0.5s;
        opacity: 0;
        display: none;
    }
    
    ol li{
        color: white;
        font-family: "eng_font";
        color:#cacaca;
        
        list-style-type: none;
        transition: color 0.5s;
        cursor: pointer;
    }
    
    #free{
        position:absolute;
        top: 70px;
        left: 520px;
    }
    
    
    #sc_shot{
        position:absolute;
        top: 70px;
        left: 605px;
    }
    
    
    #howto{
        position:absolute;
        top: 70px;
        left: 692px;
    }
    
    
    #bar1{
        position:absolute;
        top: 70px;
        left: 600px;
    }
    
    #bar2{
        position:absolute;
        top: 70px;
        left: 690px;
    }
    
    #q{
        position:absolute;
        top: 70px;
        left: 749px;
    }
    
    #bar3{
        position:absolute;
        top: 70px;
        left: 812px;
    }
    
    #faq{
        position:absolute;
        top: 70px;
        left: 827px;
    }
    
    #_login{
        position:absolute;
        top: 70px;
        left: 1158px;
    }
    
    #bar4{
        position:absolute;
        top: 70px;
        left: 1153px;
    }
    
    #register{
        position:absolute;
        top: 70px;
        left: 1087px;
    }
    
    #hide{
        position:absolute;
        left: 1200px;
        top: 50px;
    }
</style>
</head>
<script src="SCRIPT/jquery-1.10.2.min.js"></script>

<script>
    var hide = 1;
    var width;
    var height;
    
    function getWidth(WIDTH){
        var w = $(window).innerWidth()/1280;
        return WIDTH*w;
    }
    
    function getHeight(HEIGHT){
        var h = window.innerHeight/height;
        return HEIGHT*h;
    }
    
    function changesize(){
        width = $(window).innerWidth();
    height = $(window).innerHeight();
        
        /*if(width>0){
        
           $('ul li').css('margin', getWidth(30)+'px');
            $('ul li').css('font-size', getWidth(35)+'px');
            $('ol li').css('font-size', getWidth(20)+'px');
            $('ul li').css('margin-top', getWidth(10)+'px');
            $('ul li').css('padding-bottom', getWidth(20)+'px');
        
            $('#free').css('left', getWidth(520)+'px');
            $('#sc_shot').css('left', getWidth(620)+'px');
            $('#howto').css('left', getWidth(725)+'px');
            $('#faq').css('left', getWidth(870)+'px');
            $('#q').css('left', getWidth(790)+'px');
            $('#_login').css('left', getWidth(1180)+'px');
            $('#register').css('left', getWidth(1100)+'px');
            $('#free,#sc_shot,#howto,#faq,#q,#_login,#register').css('top', getWidth(70));
        
            $('#top').css('width', getWidth(1280)+'px');
            $('#top').css('height', getWidth(100)+'px');
            $('iframe').css('width', getWidth(1280)+'px');
            $('iframe').css('height', (height-getWidth(100))+'px');
            $('iframe').css('top',getWidth(100)+'px');
        }*/
        if(width>1280){
        $('iframe').css('left', ((width-1280)/2)+'px');
        $('#top').css('left', ((width-1280)/2)+'px');
        }
        else{
            $('iframe').css('left', 0+'px');
            $('#top').css('left', 0+'px');
        }
        
        $('#top').css('width', 1280+'px');
        $('#top').css('height', 100+'px');
        $('iframe').css('width', 1280+'px');
        $('iframe').css('height', (height-100)+'px');
        $('iframe').css('top',100+'px');
        
    }
$(document).ready(function(){
    
$(window).resize(function(){
    changesize();
});
    width = $(window).innerWidth();
    height = $(window).innerHeight();
    
    
    
    
    
    
    $('#comm,.sub_comm').hover(function(){
        $('#comm').css('color', '#d44a4a');
        
        $('.sub_comm').css('opacity', '1');
        $('.sub_comm').css('display', 'block');
    }, function(){
        $('#comm').css('color', '#cacaca');
        
            $('.sub_comm').css('opacity', '0');
            $('.sub_comm').css('display', 'none');

    });
    
    $('#qna,.sub_qna').hover(function(){
        $('#qna').css('color', '#d44a4a');
        
        $('.sub_qna').css('opacity', '1');
        $('.sub_qna').css('display', 'block');
    }, function(){
        $('#qna').css('color', '#cacaca');
        
            $('.sub_qna').css('opacity', '0');
            $('.sub_qna').css('display', 'none');

    });
    
    $('#login,.sub_login').hover(function(){
        $('#login').css('color', '#d44a4a');
        
        $('.sub_login').css('opacity', '1');
        $('.sub_login').css('display', 'block');
    }, function(){
        $('#login').css('color', '#cacaca');
        
            $('.sub_login').css('opacity', '0');
            $('.sub_login').css('display', 'none');

    });
    
    $('#intro').click(function(){
        $('iframe').attr('src', 'intro.html');
    });
    
    $('#logo').click(function(){
        $('iframe').attr('src', 'intro.html');
    });
    
    $('#play').click(function(){
        location.href="../GAME/";
    });
    
    $('#comm').click(function(){
        $('iframe').attr('src', 'community.php?comm=free');
    });
    
    $('#qna').click(function(){
        $('iframe').attr('src', 'qna.html');
    });
    
    $('#ranking').click(function(){
        $('iframe').attr('src', 'ranking.html');
    });
    
    $('#login').click(function(){
        $('iframe').attr('src', 'path_login.php');
    });
    
    
    $('#_login').click(function(){
        $('iframe').attr('src', 'path_login.php');
    });
    
    $('#free').click(function(){
        $('iframe').attr('src', 'community.php?comm=free');
    });
    
    $('#sc_shot').click(function(){
        $('iframe').attr('src', 'community.php?comm=sc_shot');
    });
    
    $('#howto').click(function(){
        $('iframe').attr('src', 'community.php?comm=howto');
    });
    
    $('#q').click(function(){
        $('iframe').attr('src', 'question.php');
    });
    
    $('#faq').click(function(){
        $('iframe').attr('src', 'faq.html');
    });
    
    $('#register').click(function(){
        $('iframe').attr('src', 'path_register.php');
    });
    
    $('#hide').click(function(){
        hide *= -1;
        if(hide == 1){
            $('#logo').css('display', 'block');
            $('iframe').css('height', (height-100)+'px');
            $('iframe').css('top',100+'px');
            $('#top').css('top', '0px');
            $('#hide').text('▲');
        }
        
        else{
            $('iframe').css('height', (height-35)+'px');
            $('iframe').css('top',35+'px');
            $('#top').css('top', '-65px');
            $('#hide').text('▼');
            $('#logo').css('display', 'none');
        }
    });
    
    $('#intro,#play,#ranking,#login,#free,#sc_shot,#howto,#q,#faq,#_login, #register,#hide').hover(function(){
        $(this).css('color', '#d44a4a');
    }, function(){
        $(this).css('color', '#cacaca');
    });
    
    changesize();
                  
    
<?php
$link = 'intro.html';
if(isset($_GET['link'])){
    switch($_GET['link']){
        case "comm_free":
        $link = 'community.php?comm=free';
        break;
        case "comm_scshot":
        $link = 'community.php?comm=sc_shot';
        break;
        case "comm_howto":
        $link = 'community.php?comm=howto';
        break;
        case "ranking":
        $link = 'ranking.html';
        break;
        case "qna":
        $link = 'qna.html';
        break;
        case "path_login":
        $link = 'path_login.php';
        break;
        case "path_register":
        $link = 'path_register.php';
        break;
        case "question":
        $link = 'question.php';
        break;
        case "faq":
        $link = 'faq.html';
        break;
    }
}

   echo "$('iframe').attr('src', '$link');";
?>
});
    
    
    
    
    
    
</script>
    
    <body>
<div id="top">
<ul>
    <li id="logo">LOGOLOGOLO</li>
    <li id="intro">INTRO</li>
    <li id="play">PLAY</li>
    <li id="comm">COMMUNITY</li>
    <li id="qna">Q&A</li>
    <li id="ranking">RANKING</li>
    <li id="login"><?=$en_login?></li>
    <li id="hide">▲</li>
</ul>
    
    <ol class = "sub_comm">
        <li id="free">자유게시판</li>
        <li id="bar1">|</li>
        <li id="sc_shot">&nbsp;스샷게시판</li>
        <li id="bar2">|</li>
        <li id="howto">&nbsp;공략게시판</li>
    </ol>
    
    <ol class = "sub_qna">
        <li id="q">질문하기</li>
        <li id="bar3">&nbsp;|&nbsp;</li>
        <li id="faq">&nbsp;FAQ</li>
    </ol>
    
    <ol class = "sub_login">
        <li id="register"><?=$register?>&nbsp;</li>
        <li id="bar4">|</li>
        <li id="_login">&nbsp;<?=$login?></li>
    </ol>
    
    
</div>
<iframe src="intro.html" frameborder=0 width=1280></iframe>
</body>
</html>

