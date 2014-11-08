/*
status: NPC의 진행상태(-1이면 대화불가능)
r,g,b: NPC 판별
illust: 오른쪽의 큰 일러스트
ill_width: 오른쪽일러스트 너비
ill_height: 오른쪽일러스트 높이
ill_y: 오른쪽일러스트 위치
npc_name: NPC의 이름
illust_left: 왼쪽일러스트
width: 왼쪽일러스트 너비
height: 왼쪽일러스트 높이
y: 왼쪽일러스트 위치
callback: 배열로 관리, 액션리스너
*/

var Action_Array = new Array();

//ROOM_1
Action_Array.push({status: -1, r: 255, g: 0, b: 0, //책상
                   illust_left: 'ENBI', width:197, height:215,  x:0, y:215, delay: 500,npc_name: '은비',
                  callback: [function(){
                      var this_status = Action_Array[0].status;
                      if(this_status==1){ //침대에 눕습니다
                                myItem.push(Item_Array[0]); 
                               myItem.push(Item_Array[1]); 
                               makeScript(['아이템 붉은 리본과 연구일지를 획득하였습니다.']);
                  } }, function(){
                             makeScript(['이 책은  뭐지..?', '한번 읽어봐야겠다.']);
                             }, function(){screen_msgBox('I키를 눌러 인벤토리를 여십시오.', '#f020'); Action_Array[0].status=-1;}]
                  });

Action_Array.push({status:0, illust_left: 'ENBI', width:197, height:215, x:0, y:215, delay:500,npc_name: '은비',  //AUTO
                   callback: [function(){
                       if(Action_Array[1].status == 0){
                           falling_Script(['음……여기는?',
                                            '내가 눈을 떴을 때, 가장 먼저 본 건 하얀 천장이었다.',
                                            '아주 긴 잠에서 깬 듯한 기분이 들었다.',
                                            '나는 눈을 비비며 천천히 방을 둘러보았다.',
                                            '여기저기 어질러진 시약들, 기다란 시험관.. 코를 찌르는 약품 냄새.',
                                            '아무래도 이곳은 연구소인 것 같다.',
                                            '으으……나는 어째서 여기에 누워있는 거지? 전혀 기억나지 않는다.',
                                            '……기억? 그러고보니 난 누구였더라?', //기준
                                           '……',
                                            '아무것도 기억나지 않아!',
                                            '이름도, 생긴 모습도 집 주소도, 아무것도!',
                                            '당황한 나는 벌떡 일어나 다시 한 번 주변을 살펴보았다.',
                                            '아, 침대 옆에 뭔가 있다.',
                                            '붉은 리본과…… 연구일지 ?'
                                            ]);
                                           }},
                           function(){
                               if(Action_Array[1].status == 0){
                                   makeScript(['[침대 옆에있는 연구일지와 붉은 리본을 살펴보자.]']);
                                   Action_Array[1].status = 1;
                                   Action_Array[0].status = 1;
                               }}]});
                              
                              
                Action_Array.push({status: -1, r: 198, g: 255, b: 0, //침대
                   illust_left: 'SEJIN', width:327, height:650, x:30, y:200,delay: 100, npc_name: '???',
                  callback: [function(){
                      var this_status = Action_Array[2].status;
                      player_x = 901;
                      player_y = 360;
                      framework.setSprite('char', 'stand_up');
                   if(this_status == 1){
                      makeScript(['은비님, 깨셨나요?', '어라, 아직도 잠들어 계신 건가요?', '이상하다. 박사님이 분명 이쯤 깨실 거라고 했는데 ...', '설마 자는 척 하는건 아니시죠? 은비님, 이 세진이를 속이면 다 들통나요~', function(){Action_Array[2].npc_name='세진'}, '평소대로라면 간지럽혀서 일으킬텐데, 지금은 그럴 상황이 아니시니...', '이따가 올게요, 그 때까진 깨어나셨으면 좋겠네요.', '!우리들은 아직 할 말이 많으니까 ……']);
                    
                  }
                  }, function(){
    
    if(Action_Array[2].status == 1){
        Action_Array[2].illust_left = 'ENBI';
                    Action_Array[2].width = 197;
                    Action_Array[2].height = 215;
                    Action_Array[2].y = 215;
                    Action_Array[2].x = 0;
                    Action_Array[2].npc_name= '은비';
        makeScript(['……이게 무슨 상황이지?', '틀림없어, 연구일지에 나왔던 그 이름은 아까 그 여자가 부르던 이름이야 ………', '상황을 정리해 보자.', '나는 연구실 침대에 누워있었고, 누군가 나를 관찰한 「연구일지」를 쓰고 있었어.', '거기엔 다 끝났다고 적혀 있었고.', '여자도 내가 깨어나기를 기다리는 것 같았고…', '나는 왜 이곳에 있는 걸까?', '어떤 일이 있었던 걸까?', '그, 말로만 듣던 그런 걸까? 무시무시한 비밀 실험의 실험체 같은……', '나가야 해.', '여기에 오래 있으면 안돼.', '[알 수 없는 무언가가 내게 나가야 한다고 말하는 것 같다. 빨리 나가자.]']);
        Action_Array[3].status = 1;
        Action_Array[2].status = -1;
        player_y = 450;
        framework.setSprite('char', 'stand_down');
    }
                             
                             }]
                  });
                              

Action_Array.push({status: 0, r: 131, g: 80, b: 13,
                   illust: 'LUCID', width:218, height:288, x:250, y:300,delay: 500,
                   callback: [
                       function(){
                           if(Action_Array[3].status==1){
                               //makeScript(['아직 할일이 남아있는거 같은데..?']);
                                Potal(1, 1439, 843);
                               //makeScript(['복도인것 같다.']);
                           }
                           else{
                               makeScript(['아직 할 일이 남아 있는 것 같은데..?']);
                               
                           }
                           
                       },
                   function(){}]});

Action_Array.push({status: 0, r: 228, g: 0, b: 255, //복도
    callback: [
        function(){
            Potal(2, 350, 1156);
            //makeScript(['통제실인것 같다.']);
        }]});

Action_Array.push({status: 0, r: 1, g: 201, b: 9, //통제실
    callback: [
        function(){
            var i=0;
            makeScript(['연구소 이곳저곳이 찍힌 모니터가 방을 가득 채우고 있다.', '그리고 방금 찍힌 내 모습도 보인다.', '그렇지, 연구소니까 감시 카메라가 있겠구나.', '이곳을 탈출하려면 역시 카메라를 꺼야 할 것 같아.']);
        }]});

Action_Array.push({status: 0, r: 112, g: 81, b: 18, //통제실의 문
    callback: [
        function(){
            Potal(1, 242, 829);
            //makeScript(['복도인것 같다.']);
        }]});

Action_Array.push({status: 0, r: 11, g: 52, b: 191, //통제실 의자
    callback: [
        function(){
            makeScript(['의자이다.', '맛있어 보인다.']);
        }]});

Action_Array.push({status: 0, r: 105, g: 79, b: 18, //복도
    callback: [
        function(){
            makeScript(['이곳에 더 머물러 있다간 아까 그 여자가 다시 올지도 모른다. 여기를 떠나는 것이 좋겠다.']);
        }]});

Action_Array.push({status: 0, r: 7, g: 243, b: 214, //복도
    callback: [
        function(){
            Potal(3, 388, 255);
        }]});

Action_Array.push({status: 0, r: 255, g: 0, b: 0, //복도2
    callback: [
        function(){
            Potal(4, 437, 272);
        }]});

Action_Array.push({status: 0, r: 255, g: 150, b: 0, //복도2
    callback: [
        function(){
            Potal(1, 242, 1179);
        }]});

Action_Array.push({status: 0, r: 204, g: 255, b: 0, //연구실1로 가는문
    callback: [
        function(){
            var find = 0;
            for(var i = 0; i<myItem.length; i++){
                if(myItem[i].name == 'KeyCard'){
                    find = 1;
                }
            }
            if(find==1){
                makeScript(['앗! 문이 열렸다!']);
                Action_Array[12].status = 1;
            }
            else
            makeScript(['문이 잠겨있다. 문을 열려면 키 카드가 필요할 것 같다.']);
        }, function(){if(Action_Array[12].status==1) Potal(7, 166, 1004);}]});

Action_Array.push({status: 0, r: 255, g: 0, b: 0, //치킨치킨
    callback: [
        function(){
            if(Action_Array[13].status==0){
                myItem.push(Item_Array[3]);
                makeScript(['여기서 음식을 만들어 먹는 듯 하다', '어? 자세히 보니 무언가가 있다.', '[KeyCard를 획득하였습니다.]', '이것으로 다른 문을 열 수 있는 것 같은데?']);
                Action_Array[13].status=1;
            }
            //Action_Array[13].status=1;
        }]});

Action_Array.push({status: 0, r: 17, g: 238, b: 50, //평범한 테이블
    callback: [
        function(){
            makeScript(['평범한 테이블이다.', '맛있어 보인다.']);
        }]});

Action_Array.push({status: 0, r: 228, g: 255, b: 0, npc1_name: '연구원', npc2_name: '은비', npc1_illust: 'CHICKEN', npc2_illust: 'ENBI', npc1_x: 0, npc1_y:162, npc1_width: 197, npc1_height: 215, delay: 100, npc2_x: 0, npc2_y: 162, npc2_width: 197, npc2_height: 215,
    callback: [
        function(){
                   makeScript(['#어, 은비구나!' , '@[이사람 나를 알고있어]', '#아프다더니, 괜찮아 보이는걸? 밥은 먹었니?', '@....아직이요.', '#밥, 먹고 가지 그래?']);
        }, function(){
            makeScript_Selection(['연구원이 치킨을 내밀었다. 먹을까?'], ['먹는다', '먹지 않는다']);
        }, function(){
            if(cur_select == 0){
                makeScript(['@[배는 별로 고프지 않지만 성의를 생각해서 먹자.]', '@감사합니다', '#이 정도 가지고 뭘! 낮이었다면 연구소 사람들과 나눠먹었을 텐데, 아쉽구나.', '@[왠지 지치는 기분이다.]']);
                Battery--;
            }
            else{
                makeScript(['@아직 배가 고프지 않아서요.', '#하하, 그렇니? 하긴 한밤중에 숙녀에게 먹을 것을 권하다니, 실례구나.']);
            }
        },
        function(){
            makeScript(['@지금은 밤인가요?', '#그럼, 벌써 자정을 넘었단다! 아무리 정신이 없어도 그렇지, 시계는 보고 살아야지.', '@알겠어요.']);
            Action_Array[15].status=-1;
        }
    ]});

Action_Array.push({status: 0, r: 128, g: 85, b: 29, //복도2
    callback: [
        function(){
            Potal(3, 388, 1256);
        }]});

Action_Array.push({status: 0, r: 0, g: 255, b: 228, //복도2
    callback: [
        function(){
            Potal(5, 218,421);
        }]});

Action_Array.push({status: 4, r: 1, g: 201, b: 10,
                   callback: [
                       function(){
                           if(Battery<7) {
                           
                           if(Action_Array[18].status>0)
                           makeScript(['어쩐지 전보다 기운이 넘치는 것 같다. (남은 횟수 '+Action_Array[18].status+'/5회)', function(){Action_Array[18].status--;Battery++;}]);
                           else
                               makeScript(['유리구슬을 만져보았지만 아무런 일도 일어나지 않았다.']);
                           }
                           else makeScript(['이미 기운이 넘치는 것 같다.']);
                       }]});

Action_Array.push({status: 0, r: 255, g: 0, b: 0, delay: 100, //19
                   callback: [
                       function(){
                           if(Action_Array[19].status==0){ makeScript(['화이트보드에는 온갖 일정과 서류들이 어지럽게 붙어 있다.', function(){Action_Array[19].status=1;}]); }
                           else{
                               makeScript(['누군가 서류가 아니라 실수로 보고서를 붙여두고 간 모양이다.', '제목은 「무(無)에 관한 고찰」이다.', '내용은……어려워 보인다. 제목과는 다르게 글이 빽빽하게 쓰여 있다.']);
                               Action_Array[19].status=-1;
                           }
                       }]});

Action_Array.push({status: 0, r: 0, g: 201, b: 9, password: '', //20
                   callback: [
                       function(){
                           if(Action_Array[20].status!=-1){ makeScript_Selection(['비밀번호가 필요합니다.'], ['비밀번호를 입력한다.', '힌트를 본다']); 
                            }
                       },
                       function(){
                           if(cur_select==0){
                               makeScript_Password(['비밀번호를 입력해주세요.(키패드로 입력)'], 4);
                           }
                           else if(cur_select==1){
                               makeScript(['힌트를 표시합니다.', '1. 휴게실의 연구 보고서', '2. 표본실의 말', '3. 제2연구실의 톱니바퀴', '4. 화장실에 핀 꽃']);
                           }
                       },
                       function(){
                           if(cur_password != ''){
                               if(cur_password == '0723'){
                                   makeScript_Selection(['관리시스템으로 접속합니다. 무엇을 하시겠습니까?'], ['감시 카메라를 끈다.', '종료한다']);
                               }
                               else{
                                   Action_Array[20].status++;
                                   if(Action_Array[20].status==3){
                                       makeScript(['「3회 이상 비밀번호를 틀리셨습니다. 패널티가 부여됩니다.」']);
                                       Battery--;
                                       Action_Array[20].status=0;
                                   }
                                   else makeScript(['비밀번호가 틀렸습니다.(남은횟수: '+(3-Action_Array[20].status)+')']);
                               }
                           }
                           else cur_select = -1;
                       },
                       function(){
                           if(cur_select==0){
                               makeScript(['감시카메라를 종료합니다. 감시카메라가 더이상 작동하지 않습니다.']);
                               Action_Array[20].status = -1;
                               MAP[2] = MAP[10];
                           }
                       }
                   ]
                  });
Action_Array.push({status: 0, r: 35, g: 165, b: 0, //계단
    callback: [
        function(){
            if(Action_Array[20].status == -1)
                Potal(11, 200,300);
            else makeScript(['전깃줄이 가로막고있다. 무언가를 꺼야할 것 같다.']);
        }]});

Action_Array.push({status: 0, r: 0, g: 6, b: 255, //남자화장실
    callback: [
        function(){
            makeScript(['잠깐만…여긴 남자화장실이잖아!', '들어가선 안될 것 같다.']);
        }]});

Action_Array.push({status: 0, r: 255, g: 0, b: 0, //복도2
    callback: [
        function(){
            Potal(6, 489, 143);
        }]});

Action_Array.push({status: 0, r: 201, g: 0, b: 224, //복도2
    callback: [
        function(){
            Potal(4, 1466, 440);
        }]});

Action_Array.push({status: 0, r: 0, g: 255, b: 6, //복도2
    callback: [
        function(){
            Potal(5, 505, 1268);
            
            
        }]});

Action_Array.push({status: 0, r: 0, g: 24, b: 255, //복도2
    callback: [
        function(){
            if(Action_Array[26].status == 0)
            makeScript(['거울에 내 모습이 비춰 보인다. 어디서 본 것 같은데……?', '[「여자아이의 사진」을 사용하자]']);
            else
                makeScript(['내 모습이 잘 보인다. 머리 정리라도 하고 갈까?']);
        },
        function(){
            if(Action_Array[26].status == 1){
                makeScript_Selection(['이 사진대로 「붉은 리본」으로 머리를 묶어 볼까? '], ['묶는다', '묶지 않는다']);
            }
        },
        function(){
            if(cur_select==0){
                makeScript(['사진에 나와있는 대로 똑같이 머리를 묶어보았다.', '나는 언제 어디서 이런 사진을 찍은 걸까?', '……아무것도 기억나지 않아. ']);
                //리본을 묶습니다
            }
            Action_Array[26].status = -1;
        }
    ]});

Action_Array.push({status: 0, r: 255, g: 255, b: 0, //복도2
    callback: [
        function(){
            makeScript(['꽃이 그려져 있다']);
        }]});

Action_Array.push({status: 0, r: 255, g: 0, b: 255, //복도2
    callback: [
        function(){
            makeScript(['꽃이 그려져 있다']);
        }]});

Action_Array.push({status: 0, r: 255, g: 0, b: 0, //복도2
    callback: [
        function(){
            makeScript(['꽃이 그려져 있다']);
        }]});

Action_Array.push({status: 0, r: 255, g: 0, b: 0, //복도2
    callback: [
        function(){
            makeScript(['엇! 스팅이 켜져있다. 재밌겠는걸?']);
        }]});

Action_Array.push({status: 0, r: 0, g: 255, b: 0, //복도2
    callback: [
        function(){
            makeScript(['무언가 입력하는 장치인 것 같다']);
        }]});

Action_Array.push({status: 0, r: 255, g: 162, b: 0, //복도2
    callback: [
        function(){
            makeScript(['시약이 묻은 종이, 그 외의 종이, 스크랩북 등이 있다.']);
        }]});

Action_Array.push({status: 0, r: 0, g: 234, b: 255, //복도2
    callback: [
        function(){
            Potal(8, 1176, 1127);
        }]});

Action_Array.push({status: 0, r: 0, g: 0, b: 255, //복도2
    callback: [
        function(){
            Potal(3, 536,758);
        }]});

Action_Array.push({status: 0, npc_name:'은비',
                   callback: [
                       function(){
                           if(Action_Array[35].status==0){
                           makeScript(['실험에 필요한 표본을 모아두는 표본실이다. 미묘한 잡음이 들린다.', '이 동물들을 순서대로 정리하면 어떨까…?']);
                  }
                       }
                   ]});

Action_Array.push({status: 0, r: 128, g: 94, b: 30, //복도2
    callback: [
        function(){
                Potal(9, 68,929);
            //makeScript(['쿠카쿠카쿠카쿠캌쿠']);
                spec_array = new Array();
        }]});

Action_Array.push({status: 0, r: 255, g: 0, b: 0, //복도2
    callback: [
        function(){
            if(Action_Array[37].status!=-1){
            makeScript(['쥐 표본이다.']);
            spec_array.push('쥐');
            Action_Array[37].status=-1;
            }
        }]});

Action_Array.push({status: 0, r: 255, g: 160, b: 0, //복도2
    callback: [
        function(){
            if(Action_Array[38].status!=-1){
            makeScript(['소 표본이다.']);
            spec_array.push('소');
            Action_Array[38].status=-1;
            }
        }]});

Action_Array.push({status: 0, r: 255, g: 255, b: 0, //복도2
    callback: [
        function(){
            if(Action_Array[39].status!=-1){
            makeScript(['호랑이 표본이다.']);
            spec_array.push('호랑이');
            Action_Array[39].status=-1;
            }
        }]});

Action_Array.push({status: 0, r: 0, g: 255, b: 0, //복도2
    callback: [
        function(){
            if(Action_Array[40].status!=-1){
            makeScript(['용 표본이다.']);
            spec_array.push('용');
            Action_Array[40].status=-1;
            }
        }]});

Action_Array.push({status: 0, r: 0, g: 0, b: 255, //복도2
    callback: [
        function(){
            if(Action_Array[41].status!=-1){
            makeScript(['말 표본이다.']);
            spec_array.push('말');
            Action_Array[41].status=-1;
            }
        }]});

Action_Array.push({status: 0, r: 0, g: 0, b: 100, //복도2
    callback: [
        function(){
            if(Action_Array[42].status!=-1){
            makeScript(['돼지 표본이다.']);
            spec_array.push('돼지');
            Action_Array[42].status=-1;
            }
        }]});

Action_Array.push({status: 0, r: 200, g: 0, b: 255, //복도2
    callback: [
        function(){
            if(Action_Array[43].status!=-1){
            makeScript(['원숭이 표본이다.']);
            spec_array.push('원숭이');
            Action_Array[43].status=-1;
            }
        }]});

Action_Array.push({status: 0, r: 0, g: 0, b: 0, //복도2
    callback: [
        function(){
            if(Action_Array[44].status!=-1){
            makeScript(['닭 표본이다.']);
            spec_array.push('닭');
            Action_Array[44].status=-1;
            }
        }]});

Action_Array.push({status: 0, r: 255, g: 170, b: 255, //복도2
    callback: [
        function(){
            if(Action_Array[45].status!=-1){
            makeScript(['양 표본이다.']);
            spec_array.push('양');
            Action_Array[45].status=-1;
            }
        }]});

Action_Array.push({status: 0, r: 170, g: 255, b: 255, //복도2
    callback: [
        function(){
            if(Action_Array[46].status!=-1){
            makeScript(['뱀 표본이다.']);
            spec_array.push('뱀');
            Action_Array[46].status=-1;
            }
        }]});

Action_Array.push({status: 0, r: 0, g: 100, b: 20, //복도2
    callback: [
        function(){
            if(Action_Array[47].status!=-1){
            makeScript(['토끼 표본이다.']);
            spec_array.push('토끼');
            Action_Array[47].status=-1;
            }
        }]});

Action_Array.push({status: 0, r: 138, g: 138, b: 138, //복도2
    callback: [
        function(){
        if(Action_Array[48].status!=-1){
            makeScript(['개 표본이다.']);
            spec_array.push('개');
            Action_Array[48].status=-1;
        }
        }]});

Action_Array.push({status: 0, r: 255, g: 255, b: 249, //복도2
    callback: [
        function(){
            Potal(7, 691, 514);
            spec_array = new Array();
        }]});

Action_Array.push({status: 0,
    callback: [
        function(){
            if(Action_Array[50].status!=1){
                letsgo_y(300);
                spec_array = new Array();
            }
        }]});

Action_Array.push({status: 0, r: 0, g: 0, b: 255, //복도2
    callback: [
        function(){
            Potal(5, 162, 1030);
        }]});

Action_Array.push({status: 0, r: 255, g: 71, b: 71, //복도2
    callback: [
        function(){
            Potal(12, 1119, 1819);
        }]});

Action_Array.push({status: 0,
    callback: [
        function(){
            if(Action_Array[53].status==0){
                makeScript(['아..안보여', '여기를 빠져나가보자.']);
            }
        }, function(){Action_Array[53].status=1;}]});

Action_Array.push({status: 0, r: 0, g: 255, b: 0, //복도2
    callback: [
        function(){
            makeScript(['헐, 통과함?']);
        }]});

Action_Array.push({status: 0, r: 0, g: 255, b: 0, //복도2
    callback: [
        function(){
            makeScript(['후... 힘들었어.. 드디어 나갈 수 있는 걸까?']);
        }]});
Action_Array.push({status: 0, r: 255, g: 0, b: 0, //책상
                   illust_left: 'SEJIN', width:327, height:650, x:30, y:200,delay: 100, npc_name: '???',
    callback: [
        function(){
            makeScript(['은비야, 거기 서렴!!', '은비야!!!']);
        },
        function(){
            falling_Script(['창고의 끝에서 누군가 나를 부르는 소리가 들렸다.',
'나는 그 말을 듣지 않고 엘리베이터를 작동시켰다.',
'',                            
'엘리베이터는 길었다.',
'온 몸을 감싸는 정적은 너무나도 고요해서',
'꼭 시간이 멈춘 것만 같았다.']);
        }
        , function(){Potal(14, 300,400);}]});

Action_Array.push({status: 0, r: 0, g: 255, b: 0, delay: 1000,//복도2
                   illust_left: 'ENBI', width:197, height:215, x:0, y:215, delay:500,npc_name: '은비', 
    callback: [
        function(){
            falling_Script([
                '엘리베이터는 역시 창고의 구석에 이어져 있었다.',
'마치 누군가의 눈을 피해 있는 것처럼.',
'그 사실을 대변하듯',
'1층 중앙의 지도에서는 그려져 있지 않았다.',
'',
'연구소 밖은 새벽이 문을 활짝 열고 기다리고 있었다.',
'나는 시원한 공기를 들이쉬며 한발짝씩 걸음을 내딛었다.',
'얼마나 걸었을까.',
'뒤를 돌아보니 어느새 연구소는 저만치 멀어져 있었다.'
            ]);
        }, function(){
            Potal(15,300,400);
            makeScript(['드디어 나왔구나.']);
        }, function(){
            falling_Script(['나는 계속해서',
'걷고, 또 걸었다.',
'연구소가 더이상 보이지 않을 때까지.']);
        }, function(){endding = 200;}]});

Action_Array.push({status: 0, r: 255, g: 168, b: 0, delay: 1000,//복도2
                callback: [function(){}]});
/*
Action_Array.push({status: 0, r: 66, g: 118, b: 214, callback: [
    function(){ makeScript(['[#배드엔딩1 = 기억리셋 테스트@]']); },
    function(){ makeScript(['나.. 죽은 사람이야?', '그런, 그렇다면, 나는 대체 누구야?', '나는…… 사람이잖아', '[확인하듯 손을 왼쪽 가슴에 갖다대었지만 심장뛰는 소리는 들리지 않았다.]']); },
    function(){ falling_Script(['「20△△년 7월 23일',
'박사님, 여쭙고 싶은 것이 있습니다.」',
'「무엇을 말입니까?」',
'「……사람과 같은 로봇, 지금도 가능할까요?」']);
    }
               ]});
*/