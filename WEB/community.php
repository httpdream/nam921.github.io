<html>
<head>
    <meta charset="utf-8">
<style>
    @font-face{
                font-family: 'eng_font';
                src: url('FONT/eng_Font.ttf');
            }
    @font-face{
                font-family: 'NanumBarunGothic';
                src: url('FONT/NanumBarunGothic.ttf');
            }
    #logo{
        margin-left: -10px;
        font-family: 'eng_font';
    }
    body{
        
    }
    #left{
        position:absolute;
        width:200px;
        left:0px;
        top:10px;
        float:left;
    }
    ul{
        list-style: none;
    }
    
    ul li{
        font-family: "NanumBarunGothic";
        float:left;
        
        font-size:30px;
        color:#262626;
        cursor: pointer;
        transition: color 0.5s;
        margin:13px;
    }
    
    
    iframe{
        position:absolute;
        left:250px;
        top:0px;
        transition: all 0.5s;
    }
    
    
    
</style>
</head>
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>

<script>
    var hide = 0;
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
    
   
$(document).ready(function(){
    $('#free,#sc_shot,#howto').css('font-size', '24px');
    $('#free,#sc_shot,#howto').css('text-align', 'center');
    $('#free,#sc_shot,#howto').hover(function(){
        $(this).css('color', '#d44a4a');
    }, function(){
        $(this).css('color', '#262626');
    });
    
    $('#free').click(function(){
        $('iframe').attr('src', 'community_free.php?page=1');
    });
    
    $('#sc_shot').click(function(){
        $('iframe').attr('src', 'community_scshot.php?page=1');
    });
    
    $('#howto').click(function(){
        $('iframe').attr('src', 'community_howto.php?page=1');
    });
    
<?php
    $comm = $_GET['comm'];
    if($comm == "free")
        echo "$('iframe').attr('src', 'community_free.php?page=1');";
    else if($comm == "sc_shot")
        echo "$('iframe').attr('src', 'community_scshot.php?page=1');";
    else if($comm == "howto")
        echo "$('iframe').attr('src', 'community_howto.php?page=1');";
?>
    
                  
    
    
});
    
    
    
    
    
    
</script>
    
    <body>
<div id="left">
<ul>
    <li id="logo">COMMUNITY<br/></li>
    
    <li id="free">자유게시판</li>
    <li id="sc_shot">스샷게시판<br/></li>
    <li id="howto">공략게시판<br/></li>
</ul>
</div>
<iframe src="community_free.php?page=0" frameborder=0 width="1000px" height="100%"></iframe>
</body>
</html>

