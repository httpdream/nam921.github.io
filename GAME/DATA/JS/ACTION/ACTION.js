function ACTION(map, npc, action, r, g, b) {
    this.status = 0;
    this.npc = npc;
    this.map = map;
    
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