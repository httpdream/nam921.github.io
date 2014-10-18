/***********
ALTIS FRAMEWORK
2014.09.21: v0.01
            파일 생성,
            생성자,
            이미지 관련 함수 loadImage, addImage,
            애니메이션 관련 함수loadSprite, addSprite, setSprite, getSprite, showSprite
            텍스트, 사각형 추가 함수 addText, addRect 구현.
2014.09.22: v0.02
            키입력 관련 함수 keyCode, addKeyDown, addKeyUp 구현.
2014.09.23: v0.03
            데이터를 저장할 수단인 saveData, getData, delData 구현
2014.09.27: v0.04
            버튼 관련 함수 addButton 구현
2014.10.03: v0.05
            전체화면으로 만드는 fullScreen 구현
***********/


var keyCode = {
    9: 'TAB',
    13: 'ENTER',
    27: 'ESC',
    32: 'SPACE',
    
    //Arrow
    37: 'LEFT',
    38: 'UP',
    39: 'RIGHT',
    40: 'DOWN',

    //Number
    48: 'ZERO',
    49: 'ONE',
    50: 'TWO',
    51: 'THREE',
    52: 'FOUR',
    53: 'FIVE',
    54: 'SIX',
    55: 'SEVEN',
    56: 'EIGHT',
    57: 'NINE',

    //Alahabet
    65: 'A',
    66: 'B',
    67: 'C',
    68: 'D',
    69: 'E',
    70: 'F',
    71: 'G',
    72: 'H',
    73: 'I',
    74: 'J',
    75: 'K',
    76: 'L',
    77: 'M',
    78: 'N',
    79: 'O',
    80: 'P',
    81: 'Q',
    82: 'R',
    83: 'S',
    84: 'T',
    85: 'U',
    86: 'V',
    87: 'W',
    88: 'X',
    89: 'Y',
    90: 'Z',

    //Function Key
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12'
};

function ALTIS(id, width, height, visible) {
    this.width = width;
    this.height = height;
    this.Image = new Array();
    this.Sprite = new Array();

    if(visible == true)
        document.body.innerHTML += '<canvas id = ' + id + ' width=' + width + ' height=' + height + ' style="position: absoulte;">캔버스도 안되</canvas>';
    else
        document.body.innerHTML += '<canvas id = ' + id + ' width=' + width + ' height=' + height + ' style="position: absoulte; display:none;">캔버스도 안되</canvas>';
    
    this.Canvas = document.getElementById(id);
    this.Context = this.Canvas.getContext("2d");

    return this;
}

Array.prototype.Last = function(){
    return this[this.length-1];
}

ALTIS.prototype.loadImage = function (src, name){
    this.Image.push({ img: new Image(), name: name, load: 0});
    var thisImage = this.Image.Last();
    thisImage.img.addEventListener('load', function () { thisImage.load = 1; }, false);
    thisImage.img.src = src;
}

ALTIS.prototype.loadSprite = function (src, name, width, height, delay) {
    this.Sprite.push({ img: new Image(), name: name, width: width, height: height, delay: delay, count: 0, curFrame: 0, sprite: Array(), current: 0, load: 0 });
    var thisSprite = this.Sprite.Last();
    thisSprite.img.addEventListener('load', function () { thisSprite.load = 1; }, false);
    thisSprite.img.src = src;
}

ALTIS.prototype.addSprite = function (src_name, sprite_name, sprite_frames) {
    var found = 0;
    for (var i = 0; i < this.Sprite.length; i++) {
        if (src_name == this.Sprite[i].name) {
            this.Sprite[i].sprite.push({ src_name: sprite_name, frame: sprite_frames });
            break;
        }
    }
}

ALTIS.prototype.setSprite = function (src_name, sprite_name) {
    var find = 0;
    for (var i = 0; i < this.Sprite.length; i++) {
        if (src_name == this.Sprite[i].name) {
            for (var j = 0; j < this.Sprite[i].sprite.length; j++) {
                if (sprite_name == this.Sprite[i].sprite[j].src_name) {
                    if (this.Sprite[i].current != j) {
                        this.Sprite[i].current = j;
                        this.Sprite[i].curFrame = 0;
                        find = 1;
                    }
                    break;
                }
            }
            break;
        }
    }
    if (!find) console.log('헐 못찾음');
}

ALTIS.prototype.fullScreen = function(){
	/*var width = $(window).innerWidth();
	var height = $(window).innerHeight();
    this.Canvas.width = width;
    this.Canvas.height = height;
    this.setWidth(width);
    this.setHeight(height);*/
    
 	if(this.Canvas.webkitRequestFullScreen) {
       this.Canvas.webkitRequestFullScreen();
    }
    
    else {
       this.Canvas.mozRequestFullScreen();
    }
}

ALTIS.prototype.getSprite = function (src_name) {
    var sprt;
    for (var i = 0; i < this.Sprite.length; i++) {
        if (src_name == this.Sprite[i].name) {
            sprt = this.Sprite[i];
        }
    }
    return sprt;
}

ALTIS.prototype.addText = function (text, font, x, y, color) {
    this.Context.fillStyle = color;
    this.Context.font = font;
    this.Context.fillText(text, x, y);
}

ALTIS.prototype.underline = function(text, x, y, font, size, color, thickness ,offset){
    var ctx = this.Context;
  var width = ctx.measureText(text).width;

  switch(ctx.textAlign){
    case "center":
    x -= (width/2); break;
    case "right":
    x -= width; break;
  }

  y += size+offset;
    this.Context.font = font;
    this.Context.fillText(text, x, y);

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.moveTo(x,y);
  ctx.lineTo(x+width,y);
  ctx.stroke();

}

ALTIS.prototype.addRect = function (x, y, width, height, color, alpha) {
    this.Context.globalAlpha = alpha;
    this.Context.fillStyle = color;
    this.Context.fillRect(x, y, width, height);
    this.Context.globalAlpha = 1;
}

ALTIS.prototype.flipStart = function(){
    this.Context.save();
    this.Context.scale(-1, 1);
}

ALTIS.prototype.flipEnd = function(){
    this.Context.restore();
}

ALTIS.prototype.addImage = function (src_name, width, height) {
    var found;
    for (var i = 0; i < this.Image.length; i++) {
        if (src_name == this.Image[i].name) {
            found = this.Image[i].img;
            break;
        }
    }
    if (!found) {
        //found = this.none;
    }

    return {
        Context: this.Context, play: function (to_x, to_y) {
            this.Context.drawImage(found, to_x, to_y, width, height);
        }
    };
}

ALTIS.prototype.showSprite = function (src_name, x, y, other_frame) {
    var found = 0;
    for (var i = 0; i < this.Sprite.length; i++) {
        if (src_name == this.Sprite[i].name) {
            var spriteX = Math.floor(this.Sprite[i].sprite[this.Sprite[i].current].frame[this.Sprite[i].curFrame] % other_frame) * this.Sprite[i].width;
            var spriteY = Math.floor(this.Sprite[i].sprite[this.Sprite[i].current].frame[this.Sprite[i].curFrame] / other_frame) * this.Sprite[i].height;
            this.Context.drawImage(this.Sprite[i].img, spriteX, spriteY, this.Sprite[i].width, this.Sprite[i].height, x, y, this.Sprite[i].width, this.Sprite[i].height);
            if (this.Sprite[i].count++ > this.Sprite[i].delay) { this.Sprite[i].curFrame++; this.Sprite[i].count = 0; }
            if (this.Sprite[i].curFrame >= this.Sprite[i].sprite[this.Sprite[i].current].frame.length) this.Sprite[i].curFrame = 0;
            found = 1;
            break;
        }
    }
    if (found == 0) {
        this.Context.drawImage(this.none, x, y, 80, 80);
    }
}


ALTIS.prototype.addKeyDown = function (key, callback) {
    var code;
    for (var i in keyCode) {
        if (keyCode.hasOwnProperty(i))
            if (key == keyCode[i]) code = i;
    }
    
    if (!code) console.log('not found');

    window.addEventListener('keydown', function (e) {
        if (e.keyCode == code){
            callback();
            e.preventDefault();
        }
    }, false);
}

ALTIS.prototype.addKeyUp = function (key, callback) {
    var code;
    for (var i in keyCode) {
        if (keyCode.hasOwnProperty(i))
            if (key == keyCode[i]) code = i;
    }

    if (!code) console.log('not found');

    window.addEventListener('keyup', function (e) {
        if (e.keyCode == code) callback();
    }, false);
}

ALTIS.prototype.saveData = function(name, data){
    localStorage.setItem(name, data);
}

ALTIS.prototype.getData = function(name){
    return localStorage.getItem(name);
}

ALTIS.prototype.delData = function(name){
    localStorage.removeItem(name);
}

ALTIS.prototype.setWidth = function(w){
    this.width = w;
}

ALTIS.prototype.setHeight = function(h){
    this.height = h;
}

ALTIS.prototype.clear = function () {
    this.Context.clearRect(0, 0, 5000, 5000);
}
