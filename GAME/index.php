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
        
<script src="DATA/JS/jquery-1.10.2.min.js"></script>
<script src="DATA/JS/ALTIS.js"></script>
<script src="DATA/JS/ACTION/NPC.js"></script>
<script src="DATA/JS/resource.js"></script>
<script src="DATA/JS/ITEM.js"></script>
<script src="DATA/JS/import_hello.js"></script>
    
<style>
    @font-face{
                font-family: 'english_font';
                src: url('DATA/FONT/eng_Font.ttf');
            }
            @font-face{
                font-family: 'korean_font';
                src: url('DATA/FONT/kor_Font.ttf');
            }
            @font-face{
                font-family: 'script_font';
                src: url('DATA/FONT/script_Font.ttf');
            }
    
    #logo{
        background-image:url(DATA/IMAGE/RESOURCE/logo2.png) ;
        background-size: 100% 100%;
        margin-left: -10px;
        color: transparent;
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
        font-family: "english_font";
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
        font-family: "english_font";
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

<script>
    var hide = 1;
    var w;
    var h;
    
    function getWidth(WIDTH){
        var w = $(window).innerWidth()/1280;
        return WIDTH*w;
    }
    
    function getHeight(HEIGHT){
        var h = window.innerHeight/height;
        return HEIGHT*h;
    }
    
    function changesize(){
        w = $(window).innerWidth();
    h = $(window).innerHeight();
        
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
        if(w>1280){
            $('#ALTIS').css('position', 'absolute');
            $('#ALTIS').css('left', ((w-800)/2)+'px');
            $('#top').css('left', ((w-1280)/2)+'px');
        }
        else{
            $('#ALTIS').css('position', 'absolute');
            $('#ALTIS').css('left', 0+'px');
            $('#top').css('left', 0+'px');
        }
        
        $('#top').css('width', 1280+'px');
        $('#top').css('height', 100+'px');
        $('#ALTIS').css('top',100+'px');
        
    }
$(document).ready(function(){
    
$(window).resize(function(){
    changesize();
});
    width = $(window).innerWidth();
    height = $(window).innerHeight();
    
    
    
    
    
    
    
    
    changesize();
                  
    
    
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

</body>
</html>

