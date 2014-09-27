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
******************/

window.addEventListener("load", onPageLoadComplete, false);
var framework;
var Temp; //충돌처리
//var Interface;

var temp;
var imgData;

var gamestate = 1;
var STATE_START = 0;
var STATE_PLAY = 1;
var STATE_OPEN = 2;
var STATE_CUSTOM = 3;
var STATE_GALALY = 4;
var STATE_MAKER = 5;
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
        start_load();
        setInterval(gameLoop, 1000 / 60);
        clearInterval(loadInterval);
    }
}

function onPageLoadComplete() {
    var FPS = 60;
    width = $(window).innerWidth()-32;
    height = $(window).innerHeight()-32;
    
    Temp = new ALTIS('Temp', 2000, 2000, false);
    framework = new ALTIS('ALTIS', width, height, true);
    framework.loadImage('DATA/IMAGE/MAP/bg_npcnpc.png', 'MAP1');
    Temp.loadImage('DATA/IMAGE/MAP/bg_temp.png', 'MAP1');
    Temp.loadImage('DATA/IMAGE/MAP/picture.jpg', 'MAP2');
    framework.loadImage('DATA/IMAGE/MAP/picture.jpg', 'MAP2');
    framework.loadSprite('DATA/IMAGE/CHARACTER/spp.png', 'char', 31, 48, 10);

    loadInterval = setInterval(draw_load, 1000 / FPS);
}

//시작페이지
function start_load(){
    start_game();
}

//본게임
function start_game() {
    framework.clear();

    MAP.push({map: framework.addImage('MAP1', 0, 0, 1024, 768), width: 1024, height: 768});
    MAP.push({map: framework.addImage('MAP2', 0, 0, 1920, 1280), width: 1920, height: 1280});
    TEMP_MAP.push({map: Temp.addImage('MAP1', 0, 0, 1024, 768), width: 1024, height: 768});
    TEMP_MAP.push({map: Temp.addImage('MAP1', 0, 0, 1920, 1280), width: 1920, height: 1280});
    

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
        char_status.left = true;
        framework.setSprite('char', 'left');
    });

    framework.addKeyDown('RIGHT', function () {
        char_status.right = true;
        framework.setSprite('char', 'right');
    });

    framework.addKeyDown('UP', function () {
        char_status.up = true;
        framework.setSprite('char', 'up');
    });

    framework.addKeyDown('DOWN', function () {
        char_status.down = true;
        framework.setSprite('char', 'down');
    });

    framework.addKeyUp('LEFT', function () {
        char_status.left = false;
        framework.setSprite('char', 'stand_left');
    });

    framework.addKeyUp('RIGHT', function () {
        char_status.right = false;
        framework.setSprite('char', 'stand_right');
    });

    framework.addKeyUp('UP', function () {
        char_status.up = false;
        framework.setSprite('char', 'stand_up');
    });

    framework.addKeyUp('DOWN', function () {
        char_status.down = false;
        framework.setSprite('char', 'stand_down');
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
            
            console.log('r: ' + r + 'g: ' + g + 'b: ' + b);

            switch(MAP_CODE){
                case 0:
                    if(r==115 && g==78 && b==69){
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
    switch(gamestate){
        case STATE_PLAY:
            if(moveable){
                if (char_status.up) {
                    player_y -= 3;
                    if(bg_y > 0 && bg_y+height/2>player_y){
                        bg_y -= 3;
                        framework.Context.translate(0, 3);
                        check(0, 3, false);
                    }
                    else check(0, 3, true);
                }

                else if (char_status.down) {
                    player_y += 3;
                    if(bg_y < MAP[MAP_CODE].height-height && bg_y+height/2<player_y){
                        bg_y += 3;
                        framework.Context.translate(0, -3);
                        check(0, -3, false);
                    }
                    else check(0, -3, true);
                }
                else if (char_status.left) {
                    player_x -= 3;
                    if(bg_x > 0 && bg_x+width/2>player_x){
                        framework.Context.translate(3, 0);
                        bg_x -= 3;
                        check(3, 0, false);
                    }
                    check(3, 0, true);
                }        
                else if(char_status.right){
                    player_x += 3;
                    if(bg_x < MAP[MAP_CODE].width-width && bg_x+width/2<player_x){
                        bg_x+=3;
                        check(-3, 0, false);
                    }
                    else check(-3, 0, true);
                }
            }

            framework.clear();
            Temp.clear();

    
            TEMP_MAP[MAP_CODE].map.play(0, 0);
            MAP[MAP_CODE].map.play(0, 0);

            framework.showSprite('char', player_x, player_y, 4);
            break;
            
        case STATE_OPEN:
            break;
        case STATE_START:
            framework.addRect(0,0,width, height, '#0f0');
            break;
    }
}

function gameLoop() {
    Update();
    Render();
}
