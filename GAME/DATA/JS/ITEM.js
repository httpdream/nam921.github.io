var Item_Array = new Array();


Item_Array.push({name: '연구일지', description: '누군가의 연구일지다. 첫 페이지 빼곤 텅 비어있다.', callback: function(){
    var d = new Date();
                                   var script = ['▶ '+d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+(d.getDate()-1)+'일',
'끝났다! 드디어 모든 것이 끝났다!',
'이제 깨어나는 걸 기다리기만 하면 돼!',
'그 아이가 깨어나면 할 일이 많지만 그건 그때 가서 생각하자.',
'어서 빨리 보고 싶다, 내 걸작.'];
                                   
                                   if(framework.getData('Bad__1')){
                                       script.push('');
                                        script.push('▶'+framework.getData('Bad__1'));
                                        script.push('실패했다.');
                                   }
                                      
                                   falling_Script(script, function(){
                                       makeScript(['이런게 왜 내 침대 옆에 놓여있는거지?', 
                                        function(){Action_Array[2].illust='LUCID';},
                                        '들어갈게요~',
                                        function(){Action_Array[2].illust='ILLUST1';},
                                        '(그래, 일단 침대로 가서 다시 자는 척 하자.)']);
                                       Action_Array[3].status=1;
                               }); }});

Item_Array.push({name: '붉은 리본', description: '붉은 리본 한 쌍이다. 어디서 본 것 같은데 ……?'});
Item_Array.push({name: '여자아이의 사진', description: '붉은 리본을 양 옆으로 예쁘게 묶고 있는 여자아이 사진이다.'});