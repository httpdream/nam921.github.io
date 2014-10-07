function ACTION(map, npc, action, r, g, b) {
    this.status = 0;
    this.npc = npc;
    var.map = map;
    
    if(r==119 && g==149 && b==217){
                        addSpaceDown(_x, _y, current, function(){
                            Potal(1,100,100,0,0);
                            around = 1;
                        });
                    }
    
    this.r = r;
    this.g = g;
    this.b = b;
    
    this.action = action;
    
    return this;
}

ACTION.prototype.NPC = function(illust, message){
    this.illust = illust;
    this.message = message;
}