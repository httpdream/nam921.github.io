var Map_Array = new Array();
var Map_Tmp_Array = new Array();
var Illust_Array = new Array();
var Sprite_Array = new Array();

Map_Array.push({src: 'NEW_MAP/Room_1.png', name: 'MAP1', width: 1600, height: 900, npc: [0,2,3], auto: 1, location: '지하2층 - 시작 위치'});
Map_Array.push({src: 'NEW_MAP/Room_2.png', name: 'MAP2', width: 1600, height: 1600, npc: [4, 8, 9, 18, 19], location: '지하2층 - 휴게실'});
Map_Array.push({src: 'NEW_MAP/Room_3.png', name: 'MAP3', width: 1600, height: 900, npc: [5, 6, 7, 20], location: '지하2층 - 상황통제실'});
Map_Array.push({src: 'NEW_MAP/Room_4.png', name: 'MAP4', width: 1600, height: 900, npc: [10, 11, 12], location: '지하2층 - 복도'});
Map_Array.push({src: 'NEW_MAP/Room_5.png', name: 'MAP5', width: 1600, height: 1600, npc: [13, 14, 15 ,16, 17], location: '지하2층 - 식당'});
Map_Array.push({src: 'NEW_MAP/Room_6.png', name: 'MAP6', width: 1600, height: 1200, npc: [21,22,23,24], location: '지하2층 - 복도'});
Map_Array.push({src: 'NEW_MAP/Room_7.png', name: 'MAP7', width: 1600, height: 900, npc: [25,26,27,28,29], location: '지하2층 - 여자화장실'});
Map_Array.push({src: 'NEW_MAP/Room_8.png', name: 'MAP8', width: 1600, height: 900, npc: [30,31,32,33,34], location: '지하2층 - 제 1연구실', research: 1});
Map_Array.push({src: 'NEW_MAP/Room_9.png', name: 'MAP9', width: 1600, height: 1600, npc: [36,37,38,39,40,41,42,43,44,45,46,47,48,49], auto: 35, location: '지하2층 - 표본실', research: 1});
Map_Array.push({src: 'NEW_MAP/Room_10.png', name: 'MAP10', width: 1600, height: 900, npc: [58], auto: 50, location: '지하2층 - 제 2연구실', research: 1});
Map_Array.push({src: 'NEW_MAP/Room_3_after.png', name: 'MAP11', width: 1600, height: 900, npc: [5, 6, 7, 20], location: '지하2층 - 상황통제실'});
Map_Array.push({src: 'NEW_MAP/Room_12.png', name: 'MAP12', width: 1600, height: 900, npc: [51,52], location: '지하2층 - 복도'});
Map_Array.push({src: 'NEW_MAP/Room_13.png', name: 'MAP13', width: 2000, height: 1600, npc: [54], auto: 53, location: '지하2층 - 창고', around: 1});
Map_Array.push({src: 'NEW_MAP/Room_14.png', name: 'MAP14', width: 800, height: 600, npc: [56], auto: 55, location: '지하2층 - 엘리베이터'});
Map_Array.push({src: 'NEW_MAP/Room_15.png', name: 'MAP15', width: 1200, height: 900, npc: [], auto: 57, location: '지상'});
Map_Array.push({src: 'NEW_MAP/ILLUST.png', name: 'MAP16', width: 800, height: 600, npc: [], location: 'ENDING'});

Map_Tmp_Array.push({src: 'NEW_MAP/(TMP) Room_1.png', name: 'MAP1', width: 1600, height: 900});
Map_Tmp_Array.push({src: 'NEW_MAP/(TMP) Room_2.png', name: 'MAP2', width: 1600, height: 1600});
Map_Tmp_Array.push({src: 'NEW_MAP/(TMP) Room_3.png', name: 'MAP3', width: 1600, height: 900});
Map_Tmp_Array.push({src: 'NEW_MAP/(TMP) Room_4.png', name: 'MAP4', width: 1600, height: 900});
Map_Tmp_Array.push({src: 'NEW_MAP/(TMP) Room_5.png', name: 'MAP5', width: 1600, height: 1600});
Map_Tmp_Array.push({src: 'NEW_MAP/(TMP) Room_6.png', name: 'MAP6', width: 1600, height: 1200});
Map_Tmp_Array.push({src: 'NEW_MAP/(TMP) Room_7.png', name: 'MAP7', width: 1600, height: 900});
Map_Tmp_Array.push({src: 'NEW_MAP/(TMP) Room_8.png', name: 'MAP8', width: 1600, height: 900});
Map_Tmp_Array.push({src: 'NEW_MAP/(TMP) Room_9.png', name: 'MAP9', width: 1600, height: 1600});
Map_Tmp_Array.push({src: 'NEW_MAP/(TMP) Room_10.png', name: 'MAP10', width: 1600, height: 900});
Map_Tmp_Array.push({src: 'NEW_MAP/(TMP) Room_10.png', name: 'MAP11', width: 1600, height: 900});
Map_Tmp_Array.push({src: 'NEW_MAP/(TMP) Room_12.png', name: 'MAP12', width: 1600, height: 900});
Map_Tmp_Array.push({src: 'NEW_MAP/(TMP) Room_13.png', name: 'MAP13', width: 2000, height: 1600});
Map_Tmp_Array.push({src: 'NEW_MAP/(TMP) Room_14.png', name: 'MAP14', width: 800, height: 600});
Map_Tmp_Array.push({src: 'NEW_MAP/(TMP) Room_15.png', name: 'MAP15', width: 1200, height: 900});
Map_Tmp_Array.push({src: 'NEW_MAP/ILLUST.png', name: 'MAP16', width: 800, height: 600});

Illust_Array.push({src: 'ILLUST/enbi_npc.png', name: 'ENBI'});
Illust_Array.push({src: 'ILLUST/sejin.png', name: 'SEJIN'});
Illust_Array.push({src: 'ILLUST/sejin.png', name: 'LUCID'});
Illust_Array.push({src: 'ILLUST/intro.png', name: 'INTRO'});
Illust_Array.push({src: 'ILLUST/chicken.png', name: 'CHICKEN'});
Illust_Array.push({src: 'ILLUST/illust_1.png', name: 'ILLUST1'});
Illust_Array.push({src: 'RESOURCE/Menu_BG.png', name: 'MENU'});
Illust_Array.push({src: 'RESOURCE/Map_BG.png', name: 'MAP'});
Illust_Array.push({src: 'RESOURCE/Time_BG.png', name: 'TIME'});
Illust_Array.push({src: 'RESOURCE/NPC_BG.png', name: 'NPC'});
Illust_Array.push({src: 'RESOURCE/Script_BG.png', name: 'SCRIPT'});
Illust_Array.push({ src: 'RESOURCE/effect.png', name: 'EFFECT' });
Illust_Array.push({ src: 'RESOURCE/credit.png', name: 'CREDIT' });
Illust_Array.push({ src: 'RESOURCE/item.png', name: 'ITEM' });
Illust_Array.push({ src: 'RESOURCE/gallery.png', name: 'GALLERY' });
Illust_Array.push({ src: 'RESOURCE/option.png', name: 'OPTION' });
Illust_Array.push({ src: 'RESOURCE/msg.png', name: 'MSG' });
Illust_Array.push({ src: 'RESOURCE/illust_box.png', name: 'ILLUST_BOX' });
Illust_Array.push({ src: 'RESOURCE/item_script.png', name: 'SCRIPT_BOX' });
Illust_Array.push({ src: 'RESOURCE/norm.png', name: 'NORM' });
Illust_Array.push({ src: 'RESOURCE/bad.png', name: 'BAD' });

Illust_Array.push({ src: 'RESOURCE/Battery/0.png', name: '0' });
Illust_Array.push({ src: 'RESOURCE/Battery/1.png', name: '1' });
Illust_Array.push({ src: 'RESOURCE/Battery/2.png', name: '2' });
Illust_Array.push({ src: 'RESOURCE/Battery/3.png', name: '3' });
Illust_Array.push({ src: 'RESOURCE/Battery/4.png', name: '4' });
Illust_Array.push({ src: 'RESOURCE/Battery/5.png', name: '5' });
Illust_Array.push({ src: 'RESOURCE/Battery/6.png', name: '6' });
Illust_Array.push({ src: 'RESOURCE/Battery/7.png', name: '7' });

Illust_Array.push({ src: 'ITEM/item1.png', name: 'ITEM1' });
Illust_Array.push({ src: 'ITEM/item2.png', name: 'ITEM2' });
Illust_Array.push({ src: 'ITEM/item3.png', name: 'ITEM3' });
Illust_Array.push({ src: 'ITEM/item4.png', name: 'ITEM4' });
Illust_Array.push({ src: 'ITEM/item5.png', name: 'ITEM5' });

Sprite_Array.push({src: 'CHARACTER/PPlayer.png', name: 'char', width: 64, height: 96, delay: 7})
Sprite_Array.push({src: 'RESOURCE/rs.png', name: 'rs', width: 100, height: 100, delay: 3})
