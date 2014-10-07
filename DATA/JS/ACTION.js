function ACTION(npc, callback, r, g, b) {
    this.status = 0;
    this.npc = npc;
    this.r = r;
    this.g = g;
    this.b = b;
    
    return this;
}

ACTION.prototype.NPC = function(illust, message){
    this.illust = illust;
    this.message = message;
}