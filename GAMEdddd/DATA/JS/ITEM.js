var Item_Array = new Array();
Item_Array.push({index: 0, name: '연구일지', description: '누군가의 연구일지다. 첫 페이지 빼곤 텅 비어있다. 한번 읽어볼까?', illust_left: 'ENBI', width:197, height:215,  x:0, y:215, npc_name: '은비' ,status: 0, callback: [
    function(){
        console.log('??');
        var d = new Date();
                                   var script = ['▶ '+d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+(d.getDate()-1)+'일',
'끝났다! 드디어 모든 것이 끝났다!',
'이제 깨어나는 걸 기다리기만 하면 돼!',
'그 아이가 깨어나면 할 일이 많지만 그건 그때 가서 생각하자.',
'어서 빨리 보고 싶다, 내 걸작.'];
                                   
                                   if(framework.getData('Bad_1')){
                                       script.push('');
                                        script.push('▶'+framework.getData('Bad_1'));
                                        script.push('실패했다.');
                                   }
                                      
                                   falling_Script(script);
    },
    function(){
        
        
        makeScript(['이런게 왜 내 침대 옆에 놓여있는거지?', 
                                        function(){
                                            Item_Array[0].illust = 'SEJIN';
                                            Item_Array[0].ill_width = 327;
                                            Item_Array[0].ill_height = 650;
                                            Item_Array[0].ill_y = 500;
                                            Item_Array[0].npc_name= '???';
                                        },
                                        '들어갈게요~',
                                        function(){
                                            Item_Array[0].npc_name= '은비',
                                            Item_Array[0].illust = undefined;
                                        },
                                        '[그래, 일단 침대로 가서 다시 자는 척 하자.]']);
                                       Action_Array[2].status = 1;
                                        Item_Array[0].status = -1;
    }
]});


Item_Array.push({index: 1, name: '붉은 리본', description: '붉은 리본 한 쌍이다. 어디서 본 것 같은데 ……?'});
Item_Array.push({index: 2, name: '여자아이의 사진', description: '붉은 리본을 양 옆으로 예쁘게 묶고 있는 여자아이 사진이다.'});
Item_Array.push({index: 3, name: 'KeyCard', description: '제 1연구실에 들어갈 수 있는 키이다.'});
