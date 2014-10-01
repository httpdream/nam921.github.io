
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
            화면을 바꿀경우 자동으로 캔버스의 크기가 조정됨.
            임시창 만ㄷ듬..
******************/

window.addEventListener("load", onPageLoadComplete, false);
var framework;
var Temp; //충돌처리
//var Interface;

var temp;
var imgData;

var STATE_START = 0;
var STATE_PLAY = 1;
var STATE_LOAD = 2;
var STATE_CONFIG = 3;
var STATE_GALALY = 4;
var STATE_MAKER = 5;
var STATE_PAUSE = 6;
var STATE_INVENTORY = 7;
var STATE_SAVE = 8;

var gamestate = STATE_START;

var menu = 0;
var sub_menu = 0;

var potal;
var potaling = 0;

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
var CURRENT_MAP;
var moveable = true;

var width = 0;
var height = 0;
var loader;
var movement = 10;

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
    width = $(window).innerWidth()-20;
    height = $(window).innerHeight() - 20;

    $(window).resize(function () {
        /*
        framework.Canvas.width = $(window).innerWidth()-20;
        framework.Canvas.height = $(window).innerHeight() - 20;
        width = $(window).innerWidth() - 20;
        height = $(window).innerHeight() - 20;
        framework.setWidth(width);
        framework.setHeight(height);
        framework.Context.translate(-bg_x, -bg_y);*/
    });
    
    Temp = new ALTIS('Temp', 2000, 2000, false);
    framework = new ALTIS('ALTIS', width, height, true);
    framework.loadImage('DATA/IMAGE/MAP/Map_Room.png', 'MAP1');
    framework.loadImage('DATA/IMAGE/MAP/picture.png', 'MAP2');
    Temp.loadImage('DATA/IMAGE/MAP/Temp_Map_Room.png', 'MAP1');
    Temp.loadImage('DATA/IMAGE/MAP/Temp_picture.png', 'MAP2');
    framework.loadSprite('DATA/IMAGE/CHARACTER/spp.png', 'char', 31, 48, 10);

    loadInterval = setInterval(draw_load, 1000 / FPS);
}

function do_newGame(){
    MAP_CODE = 0;
    CURRENT_MAP = MAP[0];
    player_y = 700;
    player_x = 500;
    //framework.Context.translate(0, 0);
    bg_x = 0;
    bg_y = 0;
    //bg_x += MAP[MAP_CODE].width-width;
    //bg_x += width;
    
    if(width>600) bg_y += 200;
    else bg_y += 500;
    bg_x += 130;
    framework.Context.translate(-bg_x, -bg_y);
}

//시작페이지
function start_load(){
    start_game();
}

//본게임
function start_game() {
    framework.clear();

    MAP.push({map: framework.addImage('MAP1', 0, 0, 1920, 1280), width: 1920, height: 1280});
    MAP.push({map: framework.addImage('MAP2', 0, 0, 1920, 1280), width: 1920, height: 1280});
    TEMP_MAP.push({map: Temp.addImage('MAP1', 0, 0, 1920, 1280), width: 1920, height: 1280});
    TEMP_MAP.push({map: Temp.addImage('MAP2', 0, 0, 1920, 1080), width: 1920, height: 1280});
    

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
                    gamestate = STATE_CONFIG;
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
        char_status.left = false;
        framework.setSprite('char', 'stand_left');
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
function Potal(MAP_Code, pl_x, pl_y, bgx, bgy){
    MAP_CODE = MAP_Code;
    CURRENT_MAP = MAP[MAP_Code];
    player_y = pl_x;
    player_x = pl_y;
    framework.Context.translate(bg_x, bg_y);
    bg_x = bgx;
    bg_y = bgy;
    
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
    var imgData = Temp.Context.getImageData(player_x, player_y, 31, 48);
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

            switch(MAP_CODE){
                case 0:
                    if(r==119 && g==149 && b==217){
                        Potal(1, 0, 0, 0, 0);
                        console.log('hi~');
                    }
                    break;
            }
            break;
        }
        
    }
}

var potaling = 0;
function Update() { }
function Render() {
    framework.clear();
    switch(gamestate){
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
            Temp.clear();
            TEMP_MAP[MAP_CODE].map.play(0, 0);
            MAP[MAP_CODE].map.play(0, 0);

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
            framework.addRect(0, 0, width, height, '#ff0', 1);
            framework.addRect(50, 50, width - 100, height - 100, '#fff', 0.7);
            framework.addText('해상도', '20px gothic', width / 2 - 70, height / 2, '#000');
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
            
            framework.addText('게임시작', '20px gulim', width/2-37, height/2-50, '#000');
            framework.addText('불러오기', '20px gulim', width/2-37, height/2-20, '#000');
            framework.addText('사용자 설정', '20px gulim', width/2-50, height/2+10, '#000');
            framework.addText('갤러리', '20px gulim', width/2-25, height/2+40, '#000');
            framework.addText('제작자', '20px gulim', width/2-25, height/2+70, '#000');
            
            break;
    }
}

function gameLoop() {
    Update();
    Render();
}

