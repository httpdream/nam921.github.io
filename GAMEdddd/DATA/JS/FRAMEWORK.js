
/******************
TEST GAME
2014.09.21: v0.01
            파일 생성.
            맵 로드.
            캐릭터 상하좌우 움직임.
            카메라 구현.
2014.09.22: v0.02
            포탈 기능의 프로토타입 구현.
2014.09.23: v0.03
            쿠키를 이용한 시나리오 저장기능 구현.
2014.09.25: v0.04
            동적으로 캔버스의 사이즈가 결정됨.
            사이즈에 따라서 카메라가 동적으로 바뀜.
2014.09.26: v0.05
            쿠키는 자동삭제가 가능하므로 localStorage에 저장하는 것으로 변경.
            getImageData함수를 이용하여 장애물 충돌시 멈추기, 노란부분, 파란부분일 때 다른 맵 이동
2014.09.27: v0.06
            시작페이지의 프로토타입 구현.
            ESC키를 누를 경우 메뉴가 나옴.
2014.09.29: v0.07
            화면을 바꿀경우 자동으로 캔버스의 크기가 조정됨. //파괴
            임시창 만ㄷ듬..
2014.10.04: v0.08
            전체화면 ㅇ
2014.10.05: v0.09
            동굴 기능 추가!
2014.10.06: v0.10
            resize관련 버그를 모두 해결했다. 이제 정상적으로 resize할 때 bg_x, bg_y가 자동으로 바뀌어 가운데로 온다.
            
            대화할수있다.
            저장이 된다.
            일러가 나온다.

패치노트 쓰기가 귀찮아졌다...
            
******************/

window.addEventListener("load", onPageLoadComplete, false);
var framework; //메인
var Temp; //충돌처리
var imgData; //충돌처리

var STATE_START = 0; //처음창
var STATE_PLAY = 1; //게임플레이
var STATE_LOAD = 2; //로딩
var STATE_CONFIG = 3; //설정
var STATE_GALALY = 4; //갤러리
var STATE_CREDIT = 5; //제작자
var STATE_PAUSE = 6; //정지
var STATE_INVENTORY = 7; //인벤토리
var STATE_SAVE = 8; //저장
var STATE_DIALOGUE = 9; //대화중
var STATE_ILLUST = 10; //일러스트 표시중
var STATE_FALLING = 11; //책같은거 표시중
var STATE_STORY = 12; //스토리 표시중
var STATE_CHARACTER = 13;
var STATE_PASSWORD = 14;

var item_index = 0;
var Current = 0;
var spl = false;
var dialogue;
var dialogue_index = 0;
var myItem = new Array();
var Default_Action = new Array();

var falling_dialogue;
var falling_index = 0;
var cur_password='';

var gamestate = STATE_START;
var MenuInterval;

var menu = 0;
var sub_menu = 0;

var potal;
var potaling = 0;
var illuster;

var sp = true; //중복대화 방지

var loadInterval;
var char_status = { up: false, down: false, left: false, right: false };
var MAP = new Array();
var TEMP_MAP = new Array();
var bg_y = 0;
var bg_x = 0;
var player_y = 0;
var player_x = 0;
var MAP_CODE = 0;
var moveable = true;

var width = 0;
var height = 0;

var full_width=0;
var full_height=0;

var loader;
var movement = 7;
var current_npc;

var resize;
var illust_load = 0;

var fullscreen = false;
var around = 0;
var scale = 1;

var limit = 35;

function ViewIllust(_name, _x, _y, _width, _height, _action){
    gamestate = STATE_ILLUST;
    illuster = {ILL: framework.addImage(_name, _width, _height), x: _x, y: _y, width: _width, height: _height};
}

function animate_goplay(){
    animate_menu-=10;
    if(animate_menu <= 0){
        gamestate = STATE_PLAY;
        MenuInterval = cancelAnimationFrame(MenuInterval);
    }
    else{
        MenuInterval = requestAnimationFrame(animate_goplay);
    }
}

function draw_load() {
    loader = 0;

    for (var i = 0; i < framework.Image.length; i++) {
        loader += framework.Image[i].load;
    }
    
    for (var i = 0; i < Temp.Image.length; i++) {
        loader += Temp.Image[i].load;
    }

    for (var i = 0; i < framework.Sprite.length; i++) {
        loader += framework.Sprite[i].load;
    }


    framework.clear();
    framework.addRect(100,200,300,30,'#00f',0.7);
    var per = loader/(framework.Sprite.length+Temp.Image.length+framework.Image.length);
    console.log(per);
    framework.addRect(100,200,300*per,30,'#0f0',0.7);
    //framework.addText('이미지 리소스 로딩중 (' + loader + '/' + (framework.Image.length + framework.Sprite.length + Temp.Image.length) + ')...', '20px "korean_font"', 150, 180, '#000');

    if (loader == (framework.Image.length + framework.Sprite.length + Temp.Image.length)) {
        requestAnimationFrame(gameLoop);
        cancelAnimationFrame(loadInterval);
        start_game();
    }
    else loadInterval = requestAnimationFrame(draw_load);
}
var full_sc = 0;

function onPageLoadComplete() {
    var FPS = 60;
    width = 800;
    height = 600;
    
    
    Temp = new ALTIS('Temp', 2000, 2000, false);
    framework = new ALTIS('ALTIS', width, height, true);
    
    framework.loadAudio('DATA/AUDIO/opening.mp3', 'opening');
    framework.playAudio('opening');
    framework.Autoplay('opening');
    
    $(framework.Canvas).css('top', '100px');
    $(framework.Canvas).css('left', ((w-800)/2)+'px');
    
    enable_css();
    


    $(window).resize(function () {
        if(fullscreen){
            $(framework.Canvas).css('left', '0px');
            $(framework.Canvas).css('top', '0px');
            framework.setHeight(height);
            framework.setWidth(width);
            full_width = ($(window).innerWidth());
            full_height = ($(window).innerHeight());
            framework.Canvas.width = full_width;
            framework.Canvas.height = full_height;
            framework.Context.scale(full_width/width, full_height/height);
            framework.Context.translate(-bg_x, -bg_y);
            full_sc=1;
            fullscreen=0;
        }
        else if(full_sc==1){
            full_sc=0;
            $(framework.Canvas).css('left', ((w-800)/2)+'px');
            $(framework.Canvas).css('top', '100px');
            console.log('full_w'+full_width+'inner_w'+($(window).innerWidth() - 20));
            console.log('full_h'+full_height+'inner_h'+($(window).innerHeight() - 20));
            framework.Canvas.width = width;
            framework.Canvas.height = height;
            framework.Context.scale(1, 1);
            framework.Context.translate(-bg_x, -bg_y);
            //fullscreen = 0;
        }
        else{
            $(framework.Canvas).css('left', ((w-800)/2)+'px');
            $(framework.Canvas).css('top', '100px');
        }
    });
    
    
    
    for(var i=0; i<Map_Array.length; i++){
        framework.loadImage('DATA/IMAGE/'+Map_Array[i].src, Map_Array[i].name);
        Temp.loadImage('DATA/IMAGE/'+Map_Tmp_Array[i].src, Map_Tmp_Array[i].name);
    }
    
    for(var i=0; i<Illust_Array.length; i++)
        framework.loadImage('DATA/IMAGE/'+Illust_Array[i].src, Illust_Array[i].name);
    
    for(var i=0; i<Sprite_Array.length; i++)
        framework.loadSprite('DATA/IMAGE/'+Sprite_Array[i].src, Sprite_Array[i].name, Sprite_Array[i].width, Sprite_Array[i].height, Sprite_Array[i].delay);
    
   
    for(var i=0; i<Action_Array.length; i++)
        Default_Action.push(Action_Array[i].status);

    loadInterval = requestAnimationFrame(draw_load);
}

function nextDlg(){
    if(typeof dialogue[dialogue_index] == "string"){
    if(gamestate == STATE_DIALOGUE){
            if(dialogue_index < dialogue.length-1){
                
                if(current_dialogue<dialogue[dialogue_index].length) current_dialogue = dialogue[dialogue_index].length;
                else{
                    dialogue_index++;
                current_dialogue = 0;
                }
            }
        }
    
    if(dialogue_index >= dialogue.length-1){
            gamestate = STATE_PLAY;
            dialogue_index = 0;
            console.log('대화 엔드');
            sp = true;
            function_index++;
            if(current_npc.callback[function_index]){
                setTimeout(current_npc.callback[function_index], 1);
            }
        else function_index=-1;
        }
    }
}

var selection;//선택문
var cur_select = -1; //현재 선택
var falling_illust;
var falling_string;

function enable_css(){
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
        location.href='../WEB';
    });
    
    $('#play').click(function(){
        location.href="http://nam921.github.io/GAME/";
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
        $('iframe').attr('src', 'question.html');
    });
    
    $('#faq').click(function(){
        $('iframe').attr('src', 'faq.html');
    });
    
    $('#register').click(function(){
        $('iframe').attr('src', 'path_register.php');
    });
    
    $(framework.Canvas).css('transition', 'top 0.5s');
    
    $(window).keydown(function(e){
        var charCode = e.charCode || e.keyCode || e.which;
    if (charCode == 122){
         alert("Escape is not suppressed for lightbox!");
        return false;
    }
    });
    
    $('#hide').click(function(){
        hide *= -1;
        if(hide == 1){
            $('#logo').css('display', 'block');
            $(framework.Canvas).css('top',100+'px');
            $('#top').css('top', '0px');
            $('#hide').text('▲');
        }
        
        else{
            $(framework.Canvas).css('top',35+'px');
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
}

function falling_Script(script){
    gamestate = STATE_FALLING;
    falling_dialogue = script;
    falling_index = 0;
    falling_alpha = 0;
    falling_illust = undefined;
    falling_string = undefined;
}

function Illust_falling(script, Illust, top_string){
    gamestate = STATE_STORY;
    falling_dialogue = script;
    falling_index = 0;
    falling_alpha = 0;
    falling_illust = Illust;
    falling_string = top_string;
}

function makeScript_Selection(script, select){
    dialogue = script;
    gamestate = STATE_DIALOGUE;
    dialogue.push("");
    selection = select;
    dialogue_index = 0;
    cur_select = 0;
}
var password_length;

function makeScript_Password(script, password){
    dialogue = script;
    gamestate = STATE_PASSWORD;
    dialogue.push("");
    dialogue_index = 0;
    password_length = password;
    cur_password = '';
}

function makeScript(script){
    dialogue = script;
    gamestate = STATE_DIALOGUE;
    dialogue.push("");
    cur_select = -1;
    dialogue_index = 0;
}

function makeScriptAction(script, Action){
    dialogue = script;
    gamestate = STATE_DIALOGUE;
    dialogue.push("");
    cur_select = -1;
    dialogue_index = 0;
}

function do_newGame(){               
    MAP_CODE = 0;
    player_x = 810;
    player_y = 428; 
    
    if(player_y>height/2)
            bg_y = player_y-height/2;
        if(player_x>width/2)
            bg_x = player_x-width/2;
    
    if(MAP[MAP_CODE].auto){
        function_index = 0;
        current_npc = Action_Array[MAP[MAP_CODE].auto];
        current_npc.callback[function_index]();
        addSpaceDown(500, 500, MAP_CODE, current_npc.callback);
        sp = false;
    }
    
    myItem = new Array();
    for(var i = 0; i<Default_Action.length; i++)
        Action_Array[i].status = Default_Action[i];
    
    framework.Context.translate(-bg_x, -bg_y);
}

//시작페이지
function start_load(){
    start_game();
}

var once = false;
var goX = 0;
var goInterval = 0;
var final_x = 0;
function goTOx(_x){
    final_x = _x;
    if(_x>0){
        framework.setSprite('char', 'right');
        goInterval = requestAnimationFrame(go_x);
    }
    else{
        framework.setSprite('char', 'left');
        goInterval = requestAnimationFrame(go_x);
    }
}

function go_x(){
    console.log('실행되었자나');
    goX+=1;
    player_x += movement;
   
    if(goX>=final_x)
    {
        if(final_x>0) framework.setSprite('char', 'stand_right');
        else framework.setSprite('char', 'stand_left');
        cancelAnimationFrame(goInterval);
    }
}

function leftright(){
    if(!once){
        console.log('한번만 되어야되');
        letsgo_x(300);
        once=true;
    }
}

function letsgo_x(max){
    Current=0;
    Max = max;
    if(max>0){
        framework.setSprite('char', 'right');
        GOInterval = requestAnimationFrame(gotoX);
    }
    else {
        framework.setSprite('char', 'left');
        GOInterval = requestAnimationFrame(gotoDeX);
    }
}

function letsgo_y(max){
    Current=0;
    Max = max;
    if(max>0){
        framework.setSprite('char', 'down');
        GOInterval = requestAnimationFrame(gotoY);
    }
    else {
        framework.setSprite('char', 'up');
        GOInterval = requestAnimationFrame(gotoDeY);
    }
}

function gotoY(){
    player_y += movement;
    if(bg_y < MAP[MAP_CODE].height-height && bg_y+height/2<player_y){
        bg_y += movement;
        framework.Context.translate(0, -movement);
        check(0, -movement, false);
    }
    else check(0, -movement, true);

    if(Current>=Max) {
        GOInterval = cancelAnimationFrame(GOInterval);
        framework.setSprite('char', 'stand_down');
    }
    else
        requestAnimationFrame(gotoY);
}

function gotoDeY(){
    Current+=movement;
    player_y -= movement;
    if(bg_y > 0 && bg_y+height/2>player_y){
        bg_y -= movement;
        framework.Context.translate(0, movement);
        check(0, movement, false);
    }
    else check(0, movement, true);

    if(Current>=Max) {
        GOInterval = cancelAnimationFrame(GOInterval);
        framework.setSprite('char', 'stand_up');
    }
    else
        requestAnimationFrame(gotoDeY);
}

function gotoDeX(){
    Current-=movement;
    player_x -= movement;
    if(bg_x > 0 && bg_x+width/2>player_x){
        framework.Context.translate(movement, 0);
        bg_x -= movement;
        check(movement, 0, false);
    }
    else check(movement, 0, true);

    if(Current>=Max) {
        GOInterval = cancelAnimationFrame(GOInterval);
        framework.setSprite('char', 'stand_left');
    }
    else
        requestAnimationFrame(gotoDeX);
}

var animate_menu = 0;

function gotoX(){
    Current+=movement;
    player_x += movement;
    TEMP_MAP[MAP_CODE].map.play(0,0);
    if(bg_x < MAP[MAP_CODE].width-width && bg_x+width/2<player_x){
        framework.Context.translate(-movement, 0);
        bg_x+=movement;
        check(-movement, 0, false);
    }   
    else check(-movement, 0, true);

    if(Current>=Max) {
        GOInterval = cancelAnimationFrame(GOInterval);
        framework.setSprite('char', 'stand_right');
    }
    else
        requestAnimationFrame(gotoX);
}

function nextFalling(){
    if(falling_index<falling_dialogue.length) falling_index = falling_dialogue.length+1;
    else{
        gamestate = STATE_PLAY;
        function_index++;
            if(current_npc.callback[function_index]){
                setTimeout(current_npc.callback[function_index], 1);
            }else function_index = -1;
    }
}

//본게임
function start_game() {
    framework.clear();
    
    for(var i=0; i<Map_Array.length; i++){
        MAP.push({map: framework.addImage(Map_Array[i].name, Map_Array[i].width, Map_Array[i].height), width: Map_Array[i].width, height: Map_Array[i].height, npc: Map_Array[i].npc, auto: Map_Array[i].auto});
        TEMP_MAP.push({map: Temp.addImage(Map_Tmp_Array[i].name, Map_Tmp_Array[i].width, Map_Tmp_Array[i].height), width: Map_Tmp_Array[i].width, height: Map_Tmp_Array[i].height});
    }


    

    framework.addSprite('char', 'left', [4, 5, 6, 7]);
    framework.addSprite('char', 'right', [8, 9, 10, 11]);
    framework.addSprite('char', 'up', [12, 13, 14, 15]);
    framework.addSprite('char', 'down', [0, 1, 2, 3]);
    framework.addSprite('char', 'stand_left', [4]);
    framework.addSprite('char', 'stand_right', [8]);
    framework.addSprite('char', 'stand_up', [12]);
    framework.addSprite('char', 'stand_down', [0]);
    
    framework.addKeyDown('Y', function(){
        framework.controlVolume('opening',-0.1);
    });
    framework.addKeyDown('N', function(){
        framework.controlVolume('opening',0.1);
    });

    framework.setSprite('char', 'stand_down');

    framework.addKeyDown('LEFT', function () {
        if(gamestate == STATE_PLAY){
            if(char_status.down==false && char_status.right == false && char_status.up ==false){
                char_status.left = true;
                framework.setSprite('char', 'left');
            }
        }
        else if (gamestate == STATE_START){
            if(menu != 0) menu--;
            else menu = 4;
        }
        else if (gamestate == STATE_INVENTORY){
            if(item_index>0) item_index --;
        }
    });

    framework.addKeyDown('RIGHT', function () {
        if(gamestate == STATE_PLAY){
            if(char_status.left==false && char_status.down == false && char_status.up ==false){
                char_status.right = true;
                framework.setSprite('char', 'right');
            }
        }
        else if (gamestate == STATE_START){
            if(menu != 4) menu++;
            else menu = 0;
        }
        else if (gamestate == STATE_INVENTORY){
            if(item_index<myItem.length-1) item_index++;
        }
    });
    
    
    framework.addKeyDown('SPACE', function(){
        if(gamestate == STATE_ILLUST){
            gamestate = STATE_PLAY;
            function_index++;
            if(current_npc.callback[function_index]){
                setTimeout(current_npc.callback[function_index], 1);
            }else function_index = -1;
        }
        
        else if(gamestate == STATE_FALLING||gamestate == STATE_STORY){
            nextFalling();
        }
        
        else if(gamestate == STATE_DIALOGUE)
            nextDlg();
        
        
        
    });
    
    $(framework.Canvas).click(function(){
        if(gamestate == STATE_DIALOGUE)
            nextDlg();
        else if(gamestate == STATE_ILLUST){
            gamestate = STATE_PLAY;
            function_index++;
            if(current_npc.callback[function_index]){
                setTimeout(current_npc.callback[function_index], 1);
            } else function_index = -1;
        }
        else if(gamestate == STATE_FALLING||gamestate == STATE_STORY){
            nextFalling();
        }
    });

    framework.addKeyDown('UP', function () {
        if(gamestate == STATE_PLAY){
            if(char_status.left==false && char_status.right == false && char_status.down ==false){
                char_status.up = true;
                framework.setSprite('char', 'up');
            }
        }
        
        else if (gamestate == STATE_PAUSE){
            if(sub_menu != 0) sub_menu--;
            else sub_menu = 5;
        }
        else if (gamestate == STATE_DIALOGUE && cur_select != -1){
            if(cur_select != 0) cur_select--;
            else cur_select = selection.length-1;
        }
        else if (gamestate == STATE_INVENTORY){
            if(item_index>=11) item_index -= 11;
        }
    });

    framework.addKeyDown('DOWN', function () {
        if(gamestate == STATE_PLAY){
            if(char_status.left==false && char_status.right == false && char_status.up ==false){
                char_status.down = true;
                framework.setSprite('char', 'down');
            }
        }
        
        else if (gamestate == STATE_PAUSE){
            if(sub_menu != 5) sub_menu++;
            else sub_menu = 0;
        }
        else if (gamestate == STATE_DIALOGUE && cur_select != -1){
            if(cur_select != selection.length-1) cur_select++;
            else cur_select = 0;
        }
        else if (gamestate == STATE_INVENTORY){
            if((item_index+11)<myItem.length) item_index += 11;
        }
    });
    
    //framework.addKeyDown('F12', function(){});
    framework.addKeyDown('F11', function(){});
    
    framework.addKeyDown('ENTER', function(){
        if (gamestate == STATE_START) {
            switch (menu) {
                case 0:
                    gamestate = STATE_PLAY;
                    do_newGame();
                    break;
                case 1:
                    player_x = parseInt(framework.getData('data_x'));
                    player_y = parseInt(framework.getData('data_y'));
                    //framework.Context.translate(bg_x, bg_y);
                    bg_x = parseInt(framework.getData('data_bgx'));
                    bg_y = parseInt(framework.getData('data_bgy'));
                    MAP_CODE = parseInt(framework.getData('data_map'));
                    var item = JSON.parse(framework.getData('data_item'));
                    var status = JSON.parse(framework.getData('data_status'));
            
                    for(var i=0; i<Action_Array.length; i++)
                        Action_Array[i].status = parseInt(status[i]);
                    
                    for(var i=0; i<item.length; i++)
                        myItem.push(Item_Array[item[i]]);
            
                    if(MAP[MAP_CODE].auto){
                         function_index = 0;
                        current_npc = Action_Array[MAP[MAP_CODE].auto];
                        current_npc.callback[function_index]();
                        addSpaceDown(500, 500, MAP_CODE, current_npc.callback);
                        sp = false;
                    }
    
                    framework.Context.translate(-bg_x, -bg_y);
                    gamestate = STATE_PLAY;
                    break;
                case 2:
                    framework.fullScreen();
                    fullscreen = true;
                    full_width = $(window).innerWidth() - 20;
                    full_height = $(window).innerHeight()+80;
                    break;
                case 3:
                    gamestate = STATE_GALALY;
                    break;
                case 4:
                    gamestate = STATE_CREDIT;
                    break;
            }
        }

        else if (gamestate == STATE_PAUSE) {
            switch (sub_menu) {
                case 0: //save
                    //gamestate = STATE_SAVE;
                    framework.saveData('data_x', player_x);
                    framework.saveData('data_y', player_y);
                    framework.saveData('data_bgx', bg_x);
                    framework.saveData('data_bgy', bg_y);
                    framework.saveData('data_map', MAP_CODE);
            
                    var status = new Array();
                    for(var i=0; i<Action_Array.length; i++)
                        status.push(Action_Array[i].status);
                    framework.saveData('data_status', JSON.stringify(status));
                    
                    var item = new Array();
                    for(var i=0; i<myItem.length; i++)
                        item.push(myItem[i].index);
                    framework.saveData('data_item', JSON.stringify(item));
                    framework.Context.translate(bg_x, bg_y);
                    gamestate = STATE_START;
                    break;
                case 1: //load
                    player_x = parseInt(framework.getData('data_x'));
                    player_y = parseInt(framework.getData('data_y'));
                    framework.Context.translate(bg_x, bg_y);
                    bg_x = parseInt(framework.getData('data_bgx'));
                    bg_y = parseInt(framework.getData('data_bgy'));
                    MAP_CODE = parseInt(framework.getData('data_map'));
                    var item = JSON.parse(framework.getData('data_item'));
                    var status = JSON.parse(framework.getData('data_status'));
            
                    for(var i=0; i<Action_Array.length; i++)
                        Action_Array[i].status = parseInt(status[i]);
                    
                    for(var i=0; i<item.length; i++)
                        myItem.push(Item_Array[item[i]]);
            
                    if(MAP[MAP_CODE].auto){
                        current_npc = Action_Array[MAP[MAP_CODE].auto];
                        addSpaceDown(500, 700, MAP_CODE, current_npc.callback);
                        sp = false;
                    }
    
                    framework.Context.translate(-bg_x, -bg_y);
                    gamestate = STATE_PLAY;
                    break;
                case 2:
                    gamestate = STATE_INVENTORY;
                    break;
                case 3:
                    framework.fullScreen();
                    fullscreen = true;
                    
                    framework.Context.translate(-bg_x, -bg_y);
                    break;
                case 4:
                    gamestate = STATE_START;
                    framework.Context.translate(bg_x, bg_y);
                    
                    bg_x = 0;
                    bg_y = 0;
                    break;
                case 5:
                    MenuInterval = requestAnimationFrame(animate_goplay);
                    break;
            }
        }
        
        else if(gamestate == STATE_DIALOGUE)
            nextDlg();
        
        else if(gamestate == STATE_PASSWORD && password_length == 0){
            gamestate = STATE_DIALOGUE;
            nextDlg();
        }
        
        else if(gamestate == STATE_INVENTORY){
            function_index = 0;
            if(myItem[item_index].callback){
            if(myItem[item_index].callback[function_index] && myItem[item_index].status != -1){
                function_index = 0;
                setTimeout(myItem[item_index].callback[function_index], 1);
                current_npc = myItem[item_index];
            }
            }
        }
        
        else if(gamestate == STATE_SAVE){
            framework.saveData('data_x', player_x);
            framework.saveData('data_y', player_y);
            framework.saveData('data_bgx', bg_x);
            framework.saveData('data_bgy', bg_y);
            framework.saveData('data_map', MAP_CODE);
            
            var status = new Array();
            for(var i=0; i<Action_Array.length; i++)
                status.push(Action_Array[i].status);
            framework.saveData('data_status', status);
        }
        
        else if(gamestate == STATE_ILLUST){
            gamestate = STATE_PLAY;
            function_index++;
            if(current_npc.callback[function_index]){
                setTimeout(current_npc.callback[function_index], 1);
            }else function_index = -1;
        }
        
        else if(gamestate == STATE_FALLING||gamestate == STATE_STORY) nextFalling();
        
        else if(gamestate == STATE_LOAD){
            ///ㅎㅎ
        }
        
        
        menu = 0;
        sub_menu = 0;
    });

    framework.addKeyUp('LEFT', function () {
        if(gamestate == STATE_PLAY){
            if(char_status.up==false && char_status.right == false && char_status.down ==false){
                char_status.left = false;
                framework.setSprite('char', 'stand_left');
            }
        }
    });

    framework.addKeyUp('RIGHT', function () {
        if(gamestate == STATE_PLAY){
            if(char_status.left==false && char_status.up == false && char_status.down ==false){
                char_status.right = false;
                framework.setSprite('char', 'stand_right');
            }
        }
    });

    framework.addKeyUp('UP', function () {
        if(gamestate == STATE_PLAY){
            if(char_status.left==false && char_status.right == false && char_status.down ==false){
                char_status.up = false;
                framework.setSprite('char', 'stand_up');
            }
        }
    });

    framework.addKeyUp('DOWN', function () {
        if(gamestate == STATE_PLAY){
            if(char_status.left==false && char_status.right == false && char_status.up ==false){
                char_status.down = false;
                framework.setSprite('char', 'stand_down');
            }
        }
    });
    
    framework.addKeyDown('ESC', function(){
        char_status.left=false;
        char_status.right=false;
        char_status.up=false;
        char_status.down=false;
        framework.setSprite('char', 'stand_down');
        
        menu = 0;
        sub_menu = 0;
        if (gamestate == STATE_PLAY)
            gamestate = STATE_PAUSE;
        else if (gamestate == STATE_PAUSE){
            MenuInterval = requestAnimationFrame(animate_goplay);
        }
    });
    
    framework.addKeyDown('I', function(){
        
        if (gamestate == STATE_PLAY)
            gamestate = STATE_INVENTORY;
        
        else if(gamestate == STATE_INVENTORY)
            gamestate = STATE_PLAY;
    });
    
    ///COOKIE TEST
    framework.addKeyDown('A', function(){
        framework.saveData('save', '3b45ssae');
    });
    framework.addKeyDown('B', function(){
        framework.saveData('save', 'p5j2h1q');
    });
    framework.addKeyDown('C', function(){
        framework.saveData('save', 'mj7g2vd');
    });
    framework.addKeyDown('F', function(){
        alert(framework.getData('save'));
    });
    framework.addKeyDown('D', function(){
        framework.delData('save');
    });
    
    /*
    framework.addKeyDown('ONE', function(){
        width = 1024;
        height = 768;
        framework.setWidth(1024);
        framework.setHeight(768);
        framework.Canvas.width = 1024;
        framework.Canvas.height = 768;
    });*/
    
    
    framework.addKeyDown('ZERO', function(){
        if(gamestate == STATE_PASSWORD && password_length>0){
            cur_password += '0';
            password_length--;
        }
    });
    
    framework.addKeyDown('ONE', function(){
        if(gamestate == STATE_PASSWORD && password_length>0){
            cur_password += '1';
            password_length--;
        }
    });
    
    framework.addKeyDown('TWO', function(){
        if(gamestate == STATE_PASSWORD && password_length>0){
            cur_password += '2';
            password_length--;
        }
    });
    
    framework.addKeyDown('THREE', function(){
        if(gamestate == STATE_PASSWORD && password_length>0){
            cur_password += '3';
            password_length--;
        }
    });
    framework.addKeyDown('FOUR', function(){
        if(gamestate == STATE_PASSWORD && password_length>0){
            cur_password += '4';
            password_length--;
        }
    });
    
    framework.addKeyDown('FIVE', function(){
        if(gamestate == STATE_PASSWORD && password_length>0){
            cur_password += '5';
            password_length--;
        }
    });
    
    framework.addKeyDown('SIX', function(){
        if(gamestate == STATE_PASSWORD && password_length>0){
            cur_password += '6';
            password_length--;
        }
    });
    
    framework.addKeyDown('SEVEN', function(){
        if(gamestate == STATE_PASSWORD && password_length>0){
            cur_password += '7';
            password_length--;
        }
    });
    
    framework.addKeyDown('EIGHT', function(){
        if(gamestate == STATE_PASSWORD && password_length>0){
            cur_password += '9';
            password_length--;
        }
    });
    
    framework.addKeyDown('NINE', function(){
        if(gamestate == STATE_PASSWORD && password_length>0){
            cur_password += '9';
            password_length--;
        }
    });
    
}

function doPotal(){
        potaling += 0.01;
        framework.Context.globalAlpha = potaling;
        if (potaling > 1) {
            potaling = 0;
            moveable = true;
            potal = cancelAnimationFrame(potal);
        }
        else potal = requestAnimationFrame(doPotal);
    }

//Potal(MAP_CODE, player_x, player_y, bg_x, bg_y);
function Potal(MAP_Code, pl_x, pl_y){
    MAP_CODE = MAP_Code;
    player_y = pl_x;
    player_x = pl_y;
    framework.Context.translate(bg_x, bg_y);
    if(player_y>height/2) bg_y = player_y-height/2;
    else bg_y = 0;
    if(player_x>width/2) bg_x = player_x-width/2;
    else bg_x = 0;
    
    char_status.down = false;
    char_status.left = false;
    char_status.right = false;
    char_status.up = false;
    
    framework.Context.translate(-bg_x, -bg_y);
    
    moveable = true;
    
    if(!potal)potal = requestAnimationFrame(doPotal);
}

//Temp와 현재 캐릭터의 위치를 비교
function check(x, y, moved){
    //character width: 31, width: 48
    var imgData = Temp.Context.getImageData(player_x, player_y+48, 64, 48);
    for(var i=0; i<imgData.data.length; i+=4){
        var r = imgData.data[i];
        var g = imgData.data[i+1];
        var b = imgData.data[i+2];
        
        if(r!=255 || g!=255 || b!=255){
            if(!moved){
                framework.Context.translate(-x, -y);
                bg_x+=x;
                bg_y+=y;
            }
            player_x+=x;
            player_y+=y;
            
            console.log('r: ' + r + 'g: ' + g + 'b: ' + b + 'a: ' +imgData.data[i+3]);
            var current = MAP_CODE;
            var _x = player_x;
            var _y = player_y;
            
            for(var j=0; j<MAP[MAP_CODE].npc.length; j++){
                
                var npc = Action_Array[MAP[MAP_CODE].npc[j]];
                
                if(npc.status!=-1 && r==npc.r && g==npc.g && npc.b==b){
                    if(sp == true){
                        addSpaceDown(_x, _y, current, npc.callback);
                        current_npc = npc;
                        sp = false;
                        console.log('추우가');
                        function_index = 0;
                    }
                }
            }
            break;
        }else sp = true;
    }
    
    

}

var auto = 0; //auto_중복대화 방지
var current_dialogue = 0; //현재 숫자
var dialogue_delay = 0;
var end_delay = 0;
var end_visible = false;
var falling_alpha = 0;

var potaling = 0;
function Update() { }
function Render() {
    framework.clear();
    
    switch(gamestate){
            
            case STATE_ILLUST:
            MAP[MAP_CODE].map.play(0,0);
            illuster.ILL.play(illuster.x+bg_x,illuster.y+bg_y);
            break;
            
            case STATE_STORY:
            MAP[MAP_CODE].map.play(0,0);
            framework.addRect(bg_x, bg_y, width, height, '#000', 1);
            framework.addRect_Triangle(bg_x+20, bg_y+20, 280, 70, 40, '#c0c0c0', '#fff');
            framework.addText(falling_string, '40px "english_font"', bg_x+80, bg_y+70,'#000' );
            falling_illust.play(bg_x, bg_y+100);
            if(falling_index<falling_dialogue.length) falling_index+=0.02;
            falling_alpha+=0.02;
            if(falling_alpha>=1) falling_alpha = 0;
            var i=-1;
            for(i = 0; i<falling_index-1; i++)
                framework.addTextAlpha(falling_dialogue[i], '24px korean_font', 360+bg_x, 130+bg_y+35*i, '#fff', 0.99);
            if(i<falling_index) if(falling_dialogue[i]) framework.addTextAlpha(falling_dialogue[i], '24px korean_font', 360+bg_x, 130+bg_y+35*i, '#fff', falling_alpha);
            end_delay++;
            if(end_delay>40){ end_visible = !end_visible; end_delay=0; }
            if(falling_index>=falling_dialogue.length && end_visible)
                framework.addText('▼', '24px korean_font', width+bg_x-75, 120+bg_y+35*i, '#fff');
            
            break;
            
            case STATE_CHARACTER:
            framework.addTriangle_Rect(bg_x+width-240, 20, 40, 200, 200, '#000', '#f0f');
            break;
            
            case STATE_FALLING:
            MAP[MAP_CODE].map.play(0,0);
            framework.addRect(bg_x, bg_y, width, height, '#000', 0.7);
            if(falling_index<falling_dialogue.length) falling_index+=0.02;
            falling_alpha+=0.02;
            if(falling_alpha>=1) falling_alpha = 0;
            var i=-1;
            for(i = 0; i<falling_index-1; i++)
                framework.addTextAlpha(falling_dialogue[i], '24px korean_font', 60+bg_x, 70+bg_y+35*i, '#fff', 0.99);
            if(i<falling_index) if(falling_dialogue[i]) framework.addTextAlpha(falling_dialogue[i], '24px korean_font', 60+bg_x, 70+bg_y+35*i, '#fff', falling_alpha);
            end_delay++;
            if(end_delay>40){ end_visible = !end_visible; end_delay=0; }
            if(falling_index>=falling_dialogue.length && end_visible)
                framework.addText('▼', '24px korean_font', width+bg_x-75, 70+bg_y+35*i, '#fff');
            
            break;
            
        case STATE_PASSWORD:
            var cur_map = MAP[MAP_CODE];
            MAP[MAP_CODE].map.play(0, 0);
            
            framework.addImage('MAP', 350,35).play(bg_x, bg_y);
            framework.addText(Map_Array[MAP_CODE].location, '24px script_font',bg_x+20, bg_y+25, '#fff');
            
            TEMP_MAP[MAP_CODE].map.play(0,0);
            framework.addImage('SCRIPT', width,150).play(bg_x, bg_y+height-150, 0.8);
            
            var cur_script = dialogue[dialogue_index].substring(0, current_dialogue);
            
            var minus = 0;
                    if(!current_npc.illust_left) minus=150;
                if(current_dialogue>limit){
                    for(var i=0; i<current_dialogue; i++)
                        framework.addText(cur_script.slice(limit*i, limit*(i+1)), '22px script_font', 200+bg_x-minus, height-100+bg_y+30*i, '#000');
                }
                else framework.addText(cur_script, '22px script_font', 200+bg_x-minus, height-100+bg_y, '#000'); ///NPC스크립트 표시창
            
            var tmp = cur_password;
            for(var i = 0; i<password_length; i++)
                tmp+='_';
            framework.addText(tmp, '22px script_font', 50+bg_x, height-50+bg_y, '#000');
            
            if(typeof dialogue[dialogue_index] == "string"){
                
                
                dialogue_delay++;
                end_delay++;
                if(end_delay>40){ end_visible = !end_visible; end_delay=0; }
                if(dialogue_delay>=3 && current_dialogue<dialogue[dialogue_index].length){
                    current_dialogue++;
                    dialogue_delay=0;
                }
                
                
            }
            
            break;
            
        case STATE_DIALOGUE:
            var cur_map = MAP[MAP_CODE];
            MAP[MAP_CODE].map.play(0, 0);
            
            framework.addImage('MAP', 350,35).play(bg_x, bg_y);
            framework.addText(Map_Array[MAP_CODE].location, '24px script_font',bg_x+20, bg_y+25, '#fff');
            
            TEMP_MAP[MAP_CODE].map.play(0,0);
            
                
            if(current_npc.illust_left || current_npc.illust)
                limit = 35;
            else limit = 40;
                    
            
            if(current_npc.illust){
                    var illust = framework.addImage(current_npc.illust, current_npc.ill_width, current_npc.ill_height);
                illust.play(bg_x+width-current_npc.ill_width,bg_y+height-current_npc.ill_y);
                }
            
            
            
            if(cur_select != -1){
                
                framework.addImage('SCRIPT', width,150).play(bg_x, bg_y+height-150, 0.8);
                for(var t = 0; t<selection.length; t++){
                    if(t == cur_select) framework.addText('►', '24px arial', 60+bg_x, height-50+bg_y+25*t, '#000');
                    framework.addText(selection[t], '24px script_font', 80+bg_x, height-50+bg_y+25*t, '#000');
                }
                framework.addText(dialogue[dialogue_index].substring(0,current_dialogue), '24px script_font', 80+bg_x, height-100+bg_y, '#000');
            }
            else if(typeof dialogue[dialogue_index] == "string"){
                
                framework.addImage('SCRIPT', width,150).play(bg_x, bg_y+height-150, 0.8);
                
                
                var cur_script = dialogue[dialogue_index].substring(0, current_dialogue);
                if(cur_script[0]=='#'){
                    if(current_dialogue>1){
                    for(var i=0; i<current_dialogue; i++)
                        framework.addText(cur_script.slice(limit*i+1, limit*(i+1)+1), '24px script_font', 100+bg_x, height-100+bg_y+30*i, '#f00');
                }
                    else
                        framework.addText(cur_script.substring(1, cur_script.length), '24px malgungothic', 100+bg_x, height-100+bg_y, '#f00');
                }
                else{
                    var minus = 0;
                    if(!current_npc.illust_left) minus=150;
                if(current_dialogue>limit){
                    for(var i=0; i<current_dialogue; i++)
                        framework.addText(cur_script.slice(limit*i, limit*(i+1)), '22px script_font', 200+bg_x-minus, height-100+bg_y+30*i, '#000');
                }
                else
                    framework.addText(cur_script, '22px script_font', 200+bg_x-minus, height-100+bg_y, '#000'); ///NPC스크립트 표시창
                }
                if(current_npc.illust_left){
                    var illust = framework.addImage(current_npc.illust_left, current_npc.width, current_npc.height);
                illust.play(bg_x-current_npc.x,bg_y+height-current_npc.y);
                framework.addImage('NPC', 150,40).play(bg_x+194, bg_y+430);
                    framework.addText(current_npc.npc_name, '22px script_font', bg_x+194+50, bg_y+460, '#fff');
                }
                
            else{
                
            }
                
            }
    
            if(typeof dialogue[dialogue_index] == "string"){
                
                
                dialogue_delay++;
                end_delay++;
                if(end_delay>40){ end_visible = !end_visible; end_delay=0; }
                if(dialogue_delay>=3 && current_dialogue<dialogue[dialogue_index].length){
                    current_dialogue++;
                    dialogue_delay=0;
                }
                
                
                if(current_dialogue>=dialogue[dialogue_index].length && end_visible){
                    if(current_npc.illust)
                        framework.addText('▼', '24px korean_font', width+bg_x-300, height+bg_y-10, '#000');
                    else framework.addText('▼', '24px korean_font', width+bg_x-75, height+bg_y-10, '#000');
                }
                
                
            }
            else{
                if(typeof dialogue[dialogue_index] == "function")
                    dialogue[dialogue_index]();
                if(auto == 0){
                setTimeout(function(){
                    console.log('실_행');
                    auto=0;
                    dialogue_index++;
                    if(dialogue_index >= dialogue.length-1){
                gamestate = STATE_PLAY;
                dialogue_index = 0;
                sp = true;
            }
                }, current_npc.delay);
                    auto=1;
                }
                
                
            }
            framework.showSprite('char', player_x, player_y, 4);
            break;
        case STATE_PLAY:
            if(moveable){
                if (char_status.up) {
                    player_y -= movement;
                    if(bg_y > 0 && bg_y+height/2>player_y){
                        bg_y -= movement;
                        framework.Context.translate(0, movement);
                        check(0, movement, false);
                    }
                    else check(0, movement, true);
                }

                else if (char_status.down) {
                    player_y += movement;
                    if(bg_y < MAP[MAP_CODE].height-height && bg_y+height/2<player_y){
                        bg_y += movement;
                        framework.Context.translate(0, -movement);
                        check(0, -movement, false);
                    }
                    else check(0, -movement, true);
                }
                else if (char_status.left) {
                    player_x -= movement;
                    if(bg_x > 0 && bg_x+width/2>player_x){
                        framework.Context.translate(movement, 0);
                        bg_x -= movement;
                        check(movement, 0, false);
                    }
                    else check(movement, 0, true);
                }        
                else if(char_status.right){
                    player_x += movement;
                    if(bg_x < MAP[MAP_CODE].width-width && bg_x+width/2<player_x){
                        framework.Context.translate(-movement, 0);
                        bg_x+=movement;
                        check(-movement, 0, false);
                    }   
                    else check(-movement, 0, true);
                }
            }
            
        case STATE_PAUSE:
            framework.clear();
            Temp.clear();
            TEMP_MAP[MAP_CODE].map.play(0, 0);
            MAP[MAP_CODE].map.play(0, 0);
            
            
            
            if(around==1){
                if(!potaling) framework.addRect(0,0,2000,2000,'#000', 0.7);
                else framework.addRect(0,0,2000,2000, '#000', 0.7*potaling);
                framework.Context.save();
            framework.Context.beginPath();
            framework.Context.arc(player_x+22,player_y+40,140,140,10*Math.PI,true);
            
            
            framework.Context.clip();
            MAP[MAP_CODE].map.play(0, 0);
            framework.Context.restore();
            
            framework.Context.closePath();
            }
            else MAP[MAP_CODE].map.play(0,0);
            framework.addImage('MAP', 350,35).play(bg_x, bg_y);
            framework.addText(Map_Array[MAP_CODE].location, '24px script_font',bg_x+20, bg_y+25, '#fff');
            
            framework.showSprite('char', player_x, player_y, 4);
            
            if(!sp){
                framework.addImage('EFFECT', 20, 50).play(player_x+20, player_y-60);
            }
            
            if (gamestate == STATE_PAUSE) {
                if(animate_menu<=250&&!MenuInterval) animate_menu+=10;
                
                framework.addImage('MENU', 260, 600).play(bg_x-260+animate_menu, bg_y);
                
                
                framework.addText('SAVE', '33px "english_font"', bg_x+90-260+animate_menu, bg_y+140, '#000');
                framework.addText('LOAD', '33px "english_font"', bg_x+90-260+animate_menu, bg_y+190, '#000');
                framework.addText('ITEM', '33px "english_font"', bg_x+90-260+animate_menu, bg_y+240, '#000');
                framework.addText('SYSTEM', '33px "english_font"', bg_x+70-260+animate_menu, bg_y+290, '#000');
                framework.addText('TITLE', '33px "english_font"', bg_x+85-260+animate_menu, bg_y+340, '#000');
                framework.addText('BACK', '33px "english_font"', bg_x+90-260+animate_menu, bg_y+390, '#000');
                
                switch(sub_menu){
                        //►
                        case 0:
                        framework.addText('►', '33px arial', bg_x+50-260+animate_menu, bg_y+140, '#000');
                        break;
                
                        case 1:
                        framework.addText('►', '33px arial', bg_x+50-260+animate_menu, bg_y+190, '#000');
                        break;
                
                        case 2:
                        framework.addText('►', '33px arial', bg_x+50-260+animate_menu, bg_y+240, '#000');
                        break;
                
                        case 3:
                        framework.addText('►', '33px arial', bg_x+30-260+animate_menu, bg_y+290, '#000');
                        break;
                
                        case 4:
                        framework.addText('►', '33px arial', bg_x+50-260+animate_menu, bg_y+340, '#000');
                        break;
                
                        case 5:
                        framework.addText('►', '33px arial', bg_x+50-260+animate_menu, bg_y+390, '#000');
                        break;
                
                }
                
                
                /*
                framework.addRect(bg_x, bg_y, MAP[MAP_CODE].width+bg_x, MAP[MAP_CODE].height+bg_y, '#000', 0.7);
                
                char_status.up = false;
                char_status.down = false;
                char_status.left = false;
                char_status.right = false;
                
                var tmp_width, tmp_height;
                if(MAP[MAP_CODE].width>width) tmp_width = width;
                else tmp_width = MAP[MAP_CODE].width;
                
                if(MAP[MAP_CODE].height>height) tmp_height = height;
                else tmp_height = MAP[MAP_CODE].height;
                framework.addRect(bg_x+tmp_width/2-100, bg_y+tmp_height/2-75, 200, 150, '#ffcc00', 1);
                
                switch(sub_menu){
                case 0:
                    framework.addRect(bg_x+tmp_width/2-100, bg_y+tmp_height/2-60, 200, 30, '#f0f', 0.7);
                    break;
                    
                case 1:
                    framework.addRect(bg_x+tmp_width/2-100, bg_y+tmp_height/2-30, 200, 30, '#f0f', 0.7);
                    break;
                    
                case 2:
                    framework.addRect(bg_x+tmp_width/2-100, bg_y+tmp_height/2, 200, 30, '#f0f', 0.7);
                    break;
                    
                case 3:
                    framework.addRect(bg_x+tmp_width/2-100, bg_y+tmp_height/2+30, 200, 30, '#f0f', 0.7);
                    break;
                    
                case 4:
                    framework.addRect(bg_x+tmp_width/2-100, bg_y+tmp_height/2+60, 200, 30, '#f0f', 0.7);
                    break;
            }
            
            framework.addText('저장', '20px korean_font', bg_x+tmp_width/2-20, bg_y+tmp_height/2-40, '#000');
            framework.addText('불러오기', '20px korean_font', bg_x+tmp_width/2-40, bg_y+tmp_height/2-10, '#000');
            framework.addText('인벤토리', '20px korean_font', bg_x+tmp_width/2-40, bg_y+tmp_height/2+20, '#000');
            framework.addText('메인화면', '20px korean_font', bg_x+tmp_width/2-40, bg_y+tmp_height/2+50, '#000');*/
            }
            break;
    
            
        case STATE_LOAD:
            framework.addRect(0, 0, width, height, '#0ff', 1);
            framework.addRect(50, 50, width - 100, height - 100, '#fff', 0.7);
            framework.addText('LOAD', '20px korean_font', bg_x+width / 2-50, bg_y+height / 2, '#000');
            break;
        case STATE_SAVE:
            framework.addRect(0, 0, bg_x+width, bg_y+height, '#369', 1);
            framework.addRect(50, 50, bg_x+width - 100, bg_y+height - 100, '#fff', 0.7);
            framework.addText('정말로 저장하시겠습니까?', '20px korean_font', bg_x+ width / 2-50, bg_y+height / 2, '#fff');
            break;
        case STATE_INVENTORY:
            framework.addRect(bg_x, bg_y, width, height, '#ff0', 1);
            framework.addRect(bg_x+50, bg_y+50,width - 100, height - 100, '#fff', 0.7);
            
            for(var i = 0; i<4; i++){
                for(var j = 0; j<11; j++){
                    framework.addRect(bg_x+70+j*60, bg_y+70+i*60, 50, 50, '#0f0', 1);
                }
            }
            
            for(var i= 0 ; i<(myItem.length/11); i++){
                var end = 0;
                if(i>(myItem.length/11)-1) end = myItem.length%11;
                else end = 11;
                for(var j = 0; j<end; j++){
                //아이템의 이미지를 출력할 것이야
                    if(i*11+j == item_index)
                        framework.addRect(bg_x+70+j*60, bg_y+70+i*60, 50, 50, '#f00', 1);
                    else framework.addRect(bg_x+70+j*60, bg_y+70+i*60, 50, 50, '#ff0', 1);
                }
            }
            
            framework.addRect(bg_x+100, bg_y+height-250, 600, 150, '#000', 0.5);
            framework.addText(myItem[item_index].name, '20px korean_font', bg_x+130, bg_y+height-200, '#fff');
            framework.addText(myItem[item_index].description, '20px korean_font', bg_x+130, bg_y+height-170, '#fff');
            break;
        case STATE_GALALY:
            framework.addRect(0, 0, width, height, '#00f', 1);
            framework.addRect(50, 50, width - 100, height - 100, '#fff', 0.7);
            framework.addText('GALALY', '20px "english_font"', width / 2 - 70, height / 2, '#000');
            break;
        
            case STATE_CREDIT:
            
            
            Illust_falling(['기획: 양효준', '트릭, 사운드: 이창선', '일러스트, 시나리오: 김혜인',  '맵, 스프라이트: 여재훈', '프로그래밍: 김남환', 'This Game made by', 'TEAM "닝겐쟈나이 <Not-Ningen>"', '', 'For 선린인터넷 고등학교', '디지털 콘텐츠 경진대회'], function(){ gamestate = STATE_START;}, framework.addImage('ILLUST1', 350, 500), 'CREDIT');
            break;
            
        case STATE_START:
            framework.addRect(0,0,width, height, '#000', 0.8);
            framework.addImage('INTRO', 800, 605).play(1, -2);
            
            framework.addText('START', '20px "english_font"', width/2-325, height-30, '#262626');
            framework.addText('LOAD', '20px "english_font"', width/2-175, height-30, '#262626');
            framework.addText('CONFIG', '20px "english_font"', width/2-25, height-30, '#262626');
            framework.addText('GALLERY', '20px "english_font"', width/2+125, height-30, '#262626');
            framework.addText('CREDIT', '20px "english_font"', width/2+275, height-30, '#262626');
            switch(menu){
                case 0:
                    //framework.addRect(width/2-340, height-125, 100, 40, '#f0f', 0.7);
                    framework.addText('►', '20px arial', width/2-350, height-30, '#262626');
                    break;
                    
                case 1:
                    framework.addText('►', '20px arial', width/2-200, height-30, '#262626');
                    //framework.addRect(width/2-190, height-125, 90, 40, '#f0f', 0.7);
                    break;
                    
                case 2:
                    framework.addText('►', '20px arial', width/2-50, height-30, '#262626');
            
                    //framework.addRect(width/2-40, height-125, 100, 40, '#f0f', 0.7);
                    break;
                    
                case 3:
                    framework.addText('►', '20px arial', width/2+100, height-30, '#262626');
            
                    //framework.addRect(width/2+110, height-125, 100, 40, '#f0f', 0.7);
                    break;
                    
                case 4:
                    framework.addText('►', '20px arial', width/2+250, height-30, '#262626');
                    //framework.addRect(width/2+260, height-125, 100, 40, '#f0f', 0.7);
                    break;
            }
            
            
            
    }
}

function gameLoop(){
    Update();
    Render();
    requestAnimationFrame(gameLoop);
}
var function_index = -1;


function addSpaceDown(x,y,current,callback){                                                                                   
    framework.addKeyDown('SPACE', function(){
        char_status.down=false;
        char_status.left=false;
        char_status.right=false;
        char_status.up=false;
        framework.setSprite('char', 'stand_down');
        
        
        
        if(gamestate == STATE_ILLUST) gamestate = STATE_PLAY;
        
        else if(gamestate == STATE_DIALOGUE){
            
            
        if(dialogue_index >= dialogue.length-1){
            gamestate = STATE_PLAY;
            dialogue_index = 0;
            console.log('대화 엔드');
            sp = true;
            function_index++;
            if(callback[function_index]){
                setTimeout(callback[function_index], 1);
            }else function_index = -1;
            
        }
        }
        
        
        else{
            if(gamestate == STATE_STORY|| gamestate == STATE_FALLING);
            else if(x == player_x && y == player_y && current==MAP_CODE){
            setTimeout(callback[function_index], 1);
            console.log('p2');
            }
        }
        
        
        
    });
    
}
