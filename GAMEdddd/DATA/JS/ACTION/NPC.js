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
                             makeScript(['이책은  뭐지..?', '한번 읽어봐야겠다.']);
                   Action_Array[0].status=-1;
                             }]
                  });

Action_Array.push({status:0, illust_left: 'ENBI', width:197, height:215, x:0, y:215, delay:500,npc_name: '은비',  //AUTO
                   callback: [function(){
                       if(Action_Array[1].status == 0){
                           falling_Script(['음……여기는?',
                                            '내가 눈을 떴을 때, 가장 먼저 본 건',
                                            '하얀 천장이었다.',
                                            '아주 긴 잠에서 깬 듯한 기분이 들었다.',
                                            '나는 눈을 비비며 천천히 방을 둘러보았다.',
                                            '여기저기 어질러진 시약들,',
                                            '기다란 시험관..',
                                            '코를 찌르는 약품 냄새.',
                                            '아무래도 이곳은 연구소인 것 같다.',
                                            '으으……나는 어째서 여기에',
                                            '누워있는 거지? 전혀 기억나지 않는다.',
                                            '……기억? 그러고보니 난 누구였더라?', //기준
                                            ]);
                                           }},
                                           function(){
                                           if(Action_Array[1].status == 0){
                                           falling_Script(['……',
                                            '아무것도 기억나지 않아!',
                                            '이름도, 생긴 모습도,',
                                            '집 주소도, 아무것도!',
                                            '당황한 나는 벌떡 일어나 다시 한 번',
                                            '주변을 살펴보았다.',
                                            '아, 침대 옆에 뭔가 있다.',
                                            '붉은 리본과……「연구일지」?'])
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
                   if(this_status == 1){
                      makeScript(['은비님, 깨셨나요?', '어라, 아직도 잠들어 계신 건가요?', '이상하다. 박사님이 분명 이쯤 깨실 거라고 했는데 ...', '설마 자는 척 하는건 아니시죠? 은비님, 이 세진이를 속이면 다 들통나요~', function(){Action_Array[2].npc_name='세진'}, '평소대로라면 간지럽혀서 일으킬텐데, 지금은 그럴 상황이 아니시니...', '이따가 올게요, 그 때까진 깨어나셨으면 좋겠네요.', '우리들은 아직 할 말이 많으니까.......']);
                    
                  }
                  }, function(){
    
    if(Action_Array[2].status == 1){
        Action_Array[2].illust_left = 'ENBI';
                    Action_Array[2].width = 197;
                    Action_Array[2].height = 215;
                    Action_Array[2].y = 215;
                    Action_Array[2].x = 0;
                    Action_Array[2].npc_name= '은비';
        makeScript(['……이게 무슨 상황이지?', '틀림없어, 연구일지에 나왔던 그 이름은 아까 그 여자가 부르던 이름이야 ………', '상황을 정리해 보자.', '나는 연구실 침대에 누워있었고, 누군가 나를 관찰한 「연구일지」를 쓰고 있었어.', '거기엔 다 끝났다고 적혀 있었어.', '여자도 내가 깨어나기를 기다리는 것 같고…', '나는 왜 이곳에 있는 걸까?', '어떤 일이 있었던 걸까?', '그, 말로만 듣던 그런 걸까? 무시무시한 비밀 실험의 실험체 같은……', '나가야해.', '여기에 오래있으면 안돼.', '(알수없는 무언가가 나에게 나가야한다고 말하는것 같다. 빨리 나가자)']);
        Action_Array[3].status = 1;
        Action_Array[2].status = -1;
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
                               makeScript(['아직 할일이 남아있는거 같은데..?']);
                               
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
            makeScript(['의자이다', '맛있겠다']);
        }]});

Action_Array.push({status: 0, r: 105, g: 79, b: 18, //복도
    callback: [
        function(){
            makeScript(['이곳에 더 머물러 있다간 아까 그 여자가 다시 올지도 모른다. 여기를 떠다는 것이 좋겠다.']);
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
                makeScript(['엇! 문이 열렸다!']);
                Action_Array[12].status = 1;
            }
            else
            makeScript(['문이 잠겨있다. 문을 열려면 키카드가 필요할것같다.']);
        }, function(){if(Action_Array[12].status==1) Potal(7, 691, 514);}]});

Action_Array.push({status: 0, r: 255, g: 0, b: 0, //치킨치킨
    callback: [
        function(){
            if(Action_Array[13].status==0){
                myItem.push(Item_Array[3]);
                makeScript(['여기서 음식을 만들어 먹는 듯 하다', '어? 자세히 보니 무언가가 있다.', '[KeyCard를 획득했다]', '이것으로 다른문을 열수있는거 같은데?']);
                Action_Array[13].status=1;
            }
            //Action_Array[13].status=1;
        }]});

Action_Array.push({status: 0, r: 17, g: 238, b: 50, //평범한 테이블
    callback: [
        function(){
            makeScript(['평번한 테이블이다', '맛있겠다']);
        }]});

Action_Array.push({status: 0, r: 228, g: 255, b: 0, npc_name: '연구원', illust_left: 'CHICKEN', x: 0, y: 162, width: 197, height: 215,delay: 100,
    callback: [
        function(){
            makeScript(['어, 은비구나!', function(){Action_Array[15].npc_name = '은비';Action_Array[15].illust_left = 'ENBI';},
                        '[이 사람, 나를 알고있어]', function(){Action_Array[15].npc_name = '연구원';Action_Array[15].illust_left = 'CHICKEN';},
                        '아프다더니, 괜찮아 보이는걸? 밥은 먹었니?', function(){Action_Array[15].npc_name = '은비';Action_Array[15].illust_left = 'ENBI';},
                        '……아직이요.', function(){Action_Array[15].npc_name = '연구원';Action_Array[15].illust_left = 'CHICKEN';},
                        '밥, 먹고 가지 그래?'
                       ]);
        }, function(){
            makeScript_Selection(['연구원이 치킨을 내밀었다. 먹을까?'], ['먹는다', '먹지 않는다']);
        }, function(){
            Action_Array[15].npc_name = '은비';Action_Array[15].illust_left = 'ENBI';
            if(cur_select == 0){
                makeScript(['[배는 별로 고프지 않지만 성의를 생각해서 먹자.]', '감사합니다', function(){Action_Array[15].npc_name = '연구원';Action_Array[15].illust_left = 'CHICKEN';}, '이 정도 가지고 뭘! 낮이었다면 연구소 사람들과 나눠먹었을 텐데, 아쉽구나.',function(){Action_Array[15].npc_name = '은비';Action_Array[15].illust_left = 'ENBI';}, '[왠지 지치는 기분이다.]' ]);
            }
            else{
                makeScript(['아직 배가 고프지 않아서요.',function(){Action_Array[15].npc_name = '연구원';Action_Array[15].illust_left = 'CHICKEN';},'하하, 그렇니? 하긴 한밤중에 숙녀에게 먹을 것을 권하다니, 실례구나.']);
            }
        },
        function(){
            Action_Array[15].npc_name = '은비';Action_Array[15].illust_left = 'ENBI';
            makeScript(['지금은 밤인가요?', function(){Action_Array[15].npc_name = '연구원';Action_Array[15].illust_left = 'CHICKEN';}, '그럼, 벌써 자정을 넘었단다! 아무리 정신이 없어도 그렇지, 시계는 보고 살아야지.', function(){Action_Array[15].npc_name = '은비';Action_Array[15].illust_left = 'ENBI';}, '알겠어요.'])
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

Action_Array.push({status: 0, r: 1, g: 201, b: 10,
                   callback: [
                       function(){
                           battery_recover--;
                           battery++;
                           if(battery_recover>0)
                           makeScript(['어쩐지 전보다 기운이 넘치는 것같다. (남은 횟수 '+battery_recover+'/5회']);
                           else
                               makescript(['유리구슬을 만져보았지만 아무런일도 일어나지 않았다.']);
                       }]});

Action_Array.push({status: 0, r: 255, g: 0, b: 0, delay: 100, //19
                   callback: [
                       function(){
                           if(Action_Array[19].status==0){ makeScript(['화이트보드에는 온갖 일정과 서류들이 어지럽게 붙어 있다.', function(){Action_Array[19].status=1;}]); }
                           else{
                               makeScript(['누군가 서류가 아니라 실수로 보고서를 붙여두고 간 모양이다.', '제목은 "무에 관한 「무(無)에 관한 고찰」이다.', '내용은……어려워 보인다. 제목과는 다르게 글이 빽빽하게 쓰여 있다.']);
                               Action_Array[19].status=-1;
                           }
                       }]});

Action_Array.push({status: 0, r: 0, g: 201, b: 9, password: '', //20
                   callback: [
                       function(){
                           if(Action_Array[20].status==0){ makeScript_Selection(['비밀번호가 필요합니다.'], ['비밀번호를 입력한다.', '힌트를 본다']); 
                            }
                       },
                       function(){
                           if(cur_select==0){
                               makeScript_Password(['비밀번호를 입력해주세요.(키패드로 입력)'], 4);
                           }
                           else if(cur_select==1){
                               makeScript(['힌트를 표시합니다.', '1. 휴게실의 연구 보고서', '2. 표본실의 말', '3. 제2연구실의 톱니바퀴', '4 화장실에 핀 꽃']);
                           }
                       },
                       function(){
                           if(cur_password != ''){
                               if(cur_password == '0723'){
                                   makeScript_Selection(['관리시스템으로 접속합니다. 무엇을 하시겠습니까?'], ['감시 카메라를 끈다.', '종료한다']);
                               }
                           }
                           else cur_select = -1;
                       },
                       function(){
                           if(cur_select==0){
                               makeScript(['감시카메라를 종료합니다. 감시카메라가 더이상 작동하지 않습니다.']);
                           }
                       }
                   ]
                  });
Action_Array.push({status: 0, r: 35, g: 165, b: 0, //계단
    callback: [
        function(){
            makeScript(['다음층으로 가는 계단이다.', '구현되었을거같냐?']);
        }]});

Action_Array.push({status: 0, r: 0, g: 6, b: 255, //남자화장실
    callback: [
        function(){
            makeScript(['잠깐만.. 여긴 남자화장실이잖아!!', '난 착한아이니까 들어가면 안되!!']);
        }]});

Action_Array.push({status: 0, r: 255, g: 0, b: 0, //복도2
    callback: [
        function(){
            Potal(6, 500, 388);
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
            makeScript(['거울 이벤트 -- 일어나서함']);
        }]});

Action_Array.push({status: 0, r: 255, g: 255, b: 0, //복도2
    callback: [
        function(){
            makeScript(['꽃이 그러져 있다']);
        }]});

Action_Array.push({status: 0, r: 255, g: 0, b: 255, //복도2
    callback: [
        function(){
            makeScript(['꽃이 그러져 있다']);
        }]});

Action_Array.push({status: 0, r: 255, g: 0, b: 0, //복도2
    callback: [
        function(){
            makeScript(['꽃이 그러져 있다']);
        }]});

Action_Array.push({status: 0, r: 255, g: 0, b: 0, //복도2
    callback: [
        function(){
            makeScript(['엇! 스팅이 켜져있다. 재밌겠는걸?']);
        }]});

Action_Array.push({status: 0, r: 0, g: 255, b: 0, //복도2
    callback: [
        function(){
            makeScript(['무언가 입력하는 장치인것 같다']);
        }]});

Action_Array.push({status: 0, r: 255, g: 162, b: 0, //복도2
    callback: [
        function(){
            makeScript(['시약이 묻은 종이, 그외의 종이, 스크랩붕 등이있다']);
        }]});

Action_Array.push({status: 0, r: 0, g: 0, b: 255, //복도2
    callback: [
        function(){
            makeScript(['표본실로 들어갈수있는 문이당', '근데 아직 맵이없당 ㅎㅎㅎ']);
        }]});

Action_Array.push({status: 0, r: 0, g: 234, b: 255, //복도2
    callback: [
        function(){
            Potal(3, 536,758);
            
        }]});

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