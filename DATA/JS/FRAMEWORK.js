
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
var STATE_MAKER = 5; //제작자
var STATE_PAUSE = 6; //정지
var STATE_INVENTORY = 7; //인벤토리
var STATE_SAVE = 8; //저장
var STATE_DIALOGUE = 9; //대화중

var dialogue;
var dialogue_index = 0;

var gamestate = STATE_START;

var menu = 0;
var sub_menu = 0;

var potal;
var potaling = 0;

var sp = true; //중복대화 방지
var after_action; //대화후

var loadInterval;
var char_status = { up: false, down: false, left: false, right: false };
var MAP = new Array();
var TEMP_MAP = new Array();
var bg_y = 0;
var bg_x = 0;
var player_y = 0;
var player_x = 0;
var loadInterval;
var MAP_CODE = 0;
var moveable = true;

var width = 0;
var height = 0;
var loader;
var movement = 10;
var current_npc;

var resize;

var fullscreen = false;

var around = 0;

var scale = 1;

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
    framework.addText('이미지 리소스 로딩중 (' + loader + '/' + (framework.Image.length + framework.Sprite.length + Temp.Image.length) + ')...', '20px nanumgothiccoding', 150, 180, '#000');

    if (loader == (framework.Image.length + framework.Sprite.length + Temp.Image.length)) {
        //start_load();
        setInterval(gameLoop, 1000 / 60);
        clearInterval(loadInterval);
        start_game();
    }
}

function onPageLoadComplete() {
    var FPS = 60;
    width = 800;
    height = 600;

    $(window).resize(function () {
        if(fullscreen){
        console.log("resize");
            if(player_y>height/2)
                bg_y = player_y-height/2;
            if(player_x>width/2)
                bg_x = player_x-width/2;
        framework.Canvas.width = $(window).innerWidth()-20;
        framework.Canvas.height = $(window).innerHeight() - 20;
        width = $(window).innerWidth() - 20;
        height = $(window).innerHeight() - 20;
        framework.setWidth(width);
        framework.setHeight(height);
        framework.Context.translate(-bg_x, -bg_y);
        }
    });
    
    Temp = new ALTIS('Temp', 2000, 2000, false);
    framework = new ALTIS('ALTIS', width, height, true);
    
    for(var i=0; i<Map_Array.length; i++){
        framework.loadImage('DATA/IMAGE/'+Map_Array[i].src, Map_Array[i].name);
        Temp.loadImage('DATA/IMAGE/'+Map_Tmp_Array[i].src, Map_Tmp_Array[i].name);
    }
    
    for(var i=0; i<Illust_Array.length; i++)
        framework.loadImage('DATA/IMAGE/'+Illust_Array[i].src, Illust_Array[i].name);
    
    for(var i=0; i<Sprite_Array.length; i++)
        framework.loadSprite('DATA/IMAGE/'+Sprite_Array[i].src, Sprite_Array[i].name, Sprite_Array[i].width, Sprite_Array[i].height, Sprite_Array[i].delay);
    
   
    


    loadInterval = setInterval(draw_load, 1000 / FPS);
}

function makeScript(script){
    dialogue = script;
    gamestate = STATE_DIALOGUE;
    dialogue.push("");
    after_action = undefined;
}

function makeScriptAction(script, Action){
    dialogue = script;
    gamestate = STATE_DIALOGUE;
    dialogue.push("");
    after_action = Action;
}

function do_newGame(){               
    MAP_CODE = 0;
    player_x = 500;
    player_y = 500;
    
    bg_y = player_y-height/2;
    bg_x = player_x-width/2;
    
    if(MAP[MAP_CODE].auto){
        current_npc = Action_Array[MAP[MAP_CODE].auto];
        current_npc.callback();
        addSpaceDown(500, 700, MAP_CODE, current_npc.callback);
        sp = false;
    }
    
    framework.Context.translate(-bg_x, -bg_y);
}

//시작페이지
function start_load(){
    start_game();
}

function leftright(){
    framework.setSprite('char', 'stand_left');
    setTimeout(function(){
        framework.setSprite('char', 'stand_right');
               }, 1000);
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

    framework.setSprite('char', 'stand_down');

    framework.addKeyDown('LEFT', function () {
        if(gamestate == STATE_PLAY){
            char_status.left = true;
            framework.setSprite('char', 'left');
        }
    });

    framework.addKeyDown('RIGHT', function () {
        if(gamestate == STATE_PLAY){
            char_status.right = true;
            framework.setSprite('char', 'right');
        }
    });
    
    
    framework.addKeyDown('SPACE', function(){
        if(gamestate == STATE_DIALOGUE){
            if(dialogue_index < dialogue.length-1){
                
                if(current_dialogue<dialogue[dialogue_index].length) current_dialogue = dialogue[dialogue_index].length;
                else{
                    dialogue_index++;
                current_dialogue = 0;
                }
            }
        }
    });

    framework.addKeyDown('UP', function () {
        if(gamestate == STATE_PLAY){
            char_status.up = true;
            framework.setSprite('char', 'up');
        }
        else if (gamestate == STATE_START){
            if(menu != 0) menu--;
            else menu = 4;
        }
        else if (gamestate == STATE_PAUSE){
            if(sub_menu != 0) sub_menu--;
            else sub_menu = 3;
        }
    });

    framework.addKeyDown('DOWN', function () {
        if(gamestate == STATE_PLAY){
            char_status.down = true;
            framework.setSprite('char', 'down');
        }
        else if (gamestate == STATE_START){
            if(menu != 4) menu++;
            else menu = 0;
        }
        else if (gamestate == STATE_PAUSE){
            if(sub_menu != 3) sub_menu++;
            else sub_menu = 0;
        }
    });
    
    framework.addKeyDown('ENTER', function(){
        if (gamestate == STATE_START) {
            switch (menu) {
                case 0:
                    gamestate = STATE_PLAY;
                    do_newGame();
                    break;
                case 1:
                    gamestate = STATE_LOAD;
                    break;
                case 2:
                    framework.fullScreen();
                    fullscreen = true;
                    //framework.fullScreen();
                    framework.Context.translate(-bg_x, -bg_y);
                    break;
                case 3:
                    gamestate = STATE_GALALY;
                    break;
                case 4:
                    gamestate = STATE_MAKER;
                    break;
            }
        }

        else if (gamestate == STATE_PAUSE) {
            switch (sub_menu) {
                case 0:
                    gamestate = STATE_SAVE;
                    break;
                case 1:
                    gamestate = STATE_LOAD;
                    break;
                case 2:
                    gamestate = STATE_INVENTORY;
                    break;
                case 3:
                    gamestate = STATE_START;
                    framework.Context.translate(bg_x, bg_y);
                    break;
            }
        }
        
        
        menu = 0;
        sub_menu = 0;
    });

    framework.addKeyUp('LEFT', function () {
        if(gamestate == STATE_PLAY){
            char_status.left = false;
            framework.setSprite('char', 'stand_left');
        }
    });

    framework.addKeyUp('RIGHT', function () {
        if(gamestate == STATE_PLAY){
            char_status.right = false;
            framework.setSprite('char', 'stand_right');
        }
    });

    framework.addKeyUp('UP', function () {
        if(gamestate == STATE_PLAY){
            char_status.up = false;
            framework.setSprite('char', 'stand_up');
        }
    });

    framework.addKeyUp('DOWN', function () {
        if(gamestate == STATE_PLAY){
            char_status.down = false;
            framework.setSprite('char', 'stand_down');
        }
    });
    
    framework.addKeyDown('ESC', function(){
        menu = 0;
        sub_menu = 0;
        if (gamestate == STATE_PLAY) 
            gamestate = STATE_PAUSE;
        else if (gamestate == STATE_PAUSE) gamestate = STATE_PLAY;
        else gamestate = STATE_START;
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
    framework.addKeyDown('P', function(){
        framework.Context.scale(2, 2);
        width = width/2;
        height = height/2;
        framework.setHeight(height);
        framework.setWidth(width);
    });
    
    framework.addKeyDown('I', function(){
        framework.Context.scale(0.5, 0.5);
        width = width/0.5;
        height = height/0.5;
        framework.setHeight(height);
        framework.setWidth(width);
    });*/
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
    
    framework.Context.translate(-bg_x, -bg_y);
    
    moveable = false;
    var potal = setInterval(function () {
        potaling += 0.01;
        framework.Context.globalAlpha = potaling;
        if (potaling > 1) {
            potaling = 0;
            moveable = true;
            clearInterval(potal);
        }
            
    }, 1000 / 60);
}

//Temp와 현재 캐릭터의 위치를 비교
function check(x, y, moved){
    //character width: 31, width: 48
    var imgData = Temp.Context.getImageData(player_x, player_y, 53, 40);
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
                if(r==npc.r && g==npc.g && npc.b==b){
                    
                    
                    if(sp == true){
                        addSpaceDown(_x, _y, current, npc.callback);
                        current_npc = npc;
                        sp = false;
                        console.log('추우가');
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

var potaling = 0;
function Update() { }
function Render() {
    framework.clear();
    switch(gamestate){
        case STATE_DIALOGUE:
            var cur_map = MAP[MAP_CODE];
            MAP[MAP_CODE].map.play(0, 0);
            if(typeof dialogue[dialogue_index] == "string"){
                framework.addRect(30+bg_x , height-130+bg_y, width-60, 100, '#345', 0.5);
                
                dialogue_delay++;
                end_delay++;
                if(end_delay>40){ end_visible = !end_visible; end_delay=0; }
                if(dialogue_delay>=3){
                    current_dialogue++;
                    dialogue_delay=0;
                }
                framework.addText(dialogue[dialogue_index].substring(0,[current_dialogue]), '24px gulim', 60+bg_x, height-100+bg_y, '#0f0');
                if(current_dialogue>=dialogue[dialogue_index].length && end_visible){
                    framework.addText('▼', '24px gulim', width+bg_x-300, height+bg_y-40, '#0f0');
                }
                
                if(current_npc.illust){
                    var illust = framework.addImage(current_npc.illust, current_npc.width, current_npc.height);
                illust.play(bg_x+width-current_npc.x,bg_y+height-current_npc.y);
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
                //(after_action) after_action();
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
                framework.Context.save();
                if(!potaling) framework.addRect(0,0,2000,2000,'#000', 0.7);
                else framework.addRect(0,0,2000,2000, '#000', 0.7*potaling);
            framework.Context.beginPath();
            framework.Context.arc(player_x+15,player_y+24,140,140,10*Math.PI,true);
            
            
            framework.Context.clip();
            MAP[MAP_CODE].map.play(0, 0);
            framework.Context.restore();
            
            framework.Context.closePath();
            }
            else MAP[MAP_CODE].map.play(0,0);
            
            framework.showSprite('char', player_x, player_y, 4);
            
            
            if (gamestate == STATE_PAUSE) {
                
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
            
            framework.addText('저장', '20px gulim', bg_x+tmp_width/2-20, bg_y+tmp_height/2-40, '#000');
            framework.addText('불러오기', '20px gulim', bg_x+tmp_width/2-40, bg_y+tmp_height/2-10, '#000');
            framework.addText('인벤토리', '20px gulim', bg_x+tmp_width/2-40, bg_y+tmp_height/2+20, '#000');
            framework.addText('메인화면', '20px gulim', bg_x+tmp_width/2-40, bg_y+tmp_height/2+50, '#000');
            }
            break;
            
        case STATE_LOAD:
            framework.addRect(0, 0, width, height, '#0ff', 1);
            framework.addRect(50, 50, width - 100, height - 100, '#fff', 0.7);
            framework.addText('LOAD', '20px gothic', width / 2-50, height / 2, '#000');
            break;
        case STATE_CONFIG:
            /*framework.addRect(0, 0, width, height, '#ff0', 1);
            framework.addRect(50, 50, width - 100, height - 100, '#fff', 0.7);
            framework.addText('전체화면하기', '20px gothic', width / 2 - 70, height / 2, '#000');*/
            //framework.fullScreen();
            break;
        case STATE_GALALY:
            framework.addRect(0, 0, width, height, '#00f', 1);
            framework.addRect(50, 50, width - 100, height - 100, '#fff', 0.7);
            framework.addText('GALALY', '20px githic', width / 2 - 70, height / 2, '#000');
            break;
        case STATE_MAKER:
            framework.addRect(0, 0, width, height, '#0f0', 1);
            framework.addRect(50, 50, width - 100, height - 100, '#fff', 0.7);
            framework.addText('다같이', '20px gothic', width / 2 - 50, height / 2, '#000');
            break;
        case STATE_START:
            framework.addRect(0,0,width, height, '#000', 1);
            framework.addRect(width/2-100,height/2-100, 200, 200, '#fff', 0.7);
            switch(menu){
                case 0:
                    framework.addRect(width/2-100,height/2-70, 200, 30, '#f0f', 0.7);
                    break;
                    
                case 1:
                    framework.addRect(width/2-100,height/2-40, 200, 30, '#f0f', 0.7);
                    break;
                    
                case 2:
                    framework.addRect(width/2-100,height/2-10, 200, 30, '#f0f', 0.7);
                    break;
                    
                case 3:
                    framework.addRect(width/2-100,height/2+20, 200, 30, '#f0f', 0.7);
                    break;
                    
                case 4:
                    framework.addRect(width/2-100,height/2+50, 200, 30, '#f0f', 0.7);
                    break;
            }
            
            //5글자 50
            
            framework.addText('게임시작', '20px gulim', width/2-37, height/2-50, '#000');
            framework.addText('불러오기', '20px gulim', width/2-37, height/2-20, '#000');
            framework.addText('전체화면', '20px gulim', width/2-37, height/2+10, '#000');
            framework.addText('갤러리', '20px gulim', width/2-25, height/2+40, '#000');
            framework.addText('제작자', '20px gulim', width/2-25, height/2+70, '#000');
            
            break;
    }
}

function gameLoop() {
    Update();
    Render();
}


function addSpaceDown(x,y,current,callback){                                                                                   
    framework.addKeyDown('SPACE', function(){
        if(dialogue){
        if(dialogue_index >= dialogue.length-1){
            gamestate = STATE_PLAY;
            dialogue_index = 0;
            console.log('대화 엔드');
            sp = true;
            if(after_action) after_action();
        }
            else if(player_x==x && player_y == y && MAP_CODE == current && gamestate == STATE_PLAY&&sp==false){
                callback();
                console.log('p1');
        }
        }
        else{
            callback();
            console.log('p2');
        }
        
        
        
    });
    
}
