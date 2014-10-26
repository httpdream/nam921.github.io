var Action_Array = new Array();
/*Action_Array.push({r: 119, g: 149, b: 217,
                  callback: function(){
                      Potal(1,100,100);
                      around=1;
                  }});*/


/*
Action_Array.push({r: 78, g: 255, b: 0, status:0, //선택문
                  callback: function(){
                      var this_status = Action_Array[0].status;
                      
                      if(this_status==0){
                          
                          makeScriptAction(["!!"], function(){
                              makeScript_Selection( ["책상위에 책이 있다. 읽어볼까?"], ["읽어본다", "그냥 나간다."],
                                                   [ function(){ViewIllust('RESEARCH', 0, 0, 800, 600, function(){makeScript(['아이템을 획득하였습니다.']);});},
                                                   function(){Potal(1,700,500); around=1;} ] );
                          });
                          Action_Array[0].status=1;
                      }
                      else if(this_status==1){
                          Potal(1,700,500);
                          around=1;
                      }
                  }});
/*
Action_Array.push({r: 119, g: 149, b: 217, status:0, //혼잣말
                  callback: function(){
                      var this_status = Action_Array[1].status;
                      
                      if(this_status==0){
                          makeScriptAction(["문이 열린다아"], function(){
                              
                              Potal(0,500,500);
                              around = 0;
                          });
                      }
                  }});*/
/*
Action_Array.push({r: 119, g: 149, b: 217, status: 0,
                   callback: [ function(){
                       makeScript(['문이열린다아?']);
                   },
                              function(){
                                  Potal(0,500,500);
                                  around = 1;
                              } ]});




/*Action_Array.push({r: 236, g: 20, b: 219, status:0, //말하는걸 들음
                  illust: 'ILLUST1', width:218, height:288, x:250, y:300,
                  callback: function(){
                      var this_status = Action_Array[1].status;
                      if(this_status==0){
                          makeScript(["난 알파다", "알파"]);
                          Action_Array[1].status=1;
                      }
                      else if(this_status==1){
                          Action_Array[1].status = 1;
                          Action_Array[1].illust = 'ILLUST2';
                          Action_Array[1].width = 209;
                          Action_Array[1].height = 258;
                          makeScriptAction(["포탈로 이동해볼까?", "ㅇㅇ"], function(){
                              Potal(0,700,500);
                              around=0;
                          });
                            
                      }
                      else{
                          console.log('abcd');
                      }
                  }
                  });*/



                              
                               


Action_Array.push({status: 0, r: 150, g: 214, b: 66,
                   illust: 'LUCID', width:218, height:288, x:250, y:300,delay: 500,
                  callback: [function(){
                      var this_status = Action_Array[0].status;
                      if(this_status==1){ //침대에 눕습니다
                                myItem.push(Item_Array[0]); 
                               myItem.push(Item_Array[1]); 
                               makeScript(['아이템 붉은 리본과 연구일지를 획득하였습니다.']);
                  } }, function(){
                             makeScript(['이책은  뭐지..?', '한번 읽어봐야겠다.']);
                   Action_Array[0].status=0;
                             }]
                  });

Action_Array.push({status:0, illust: 'ILLUST1', width:218, height:288, x:250, y:300, delay:500,  //AUTO
                   callback: [function(){
                       if(Action_Array[1].status == 0){
                           Illust_falling(['음……여기는?',
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
                                            ],framework.addImage('ILLUST1', 350, 500), 'STORY');
                                           }},
                                           function(){
                                           if(Action_Array[1].status == 0){
                                           Illust_falling(['……',
                                            '아무것도 기억나지 않아!',
                                            '이름도, 생긴 모습도,',
                                            '집 주소도, 아무것도!',
                                            '당황한 나는 벌떡 일어나 다시 한 번',
                                            '주변을 살펴보았다.',
                                            '아, 침대 옆에 뭔가 있다.',
                                            '붉은 리본과……「연구일지」?'], framework.addImage('ILLUST2', 350, 500), 'STORY')
                       }},
                           function(){
                               if(Action_Array[1].status == 0){
                                   makeScript(['[침대 옆에있는 연구일지와 붉은 리본을 살펴보자.]']);
                                   Action_Array[1].status = 1;
                                   Action_Array[0].status = 1;
                               }}]});
                              
                              
                Action_Array.push({status: 0, r: 66, g: 108, b: 214,
                   illust: 'LUCID', width:218, height:288, x:250, y:300,delay: 500,
                  callback: [function(){
                      var this_status = Action_Array[2].status;
                   if(this_status == 1){
                      makeScript(['은비님, 깨셨나요?', '어라, 아직도 잠들어 계신 건가요?', '이상하다. 박사님이 분명 이쯤 깨실 거라고 했는데 ...', '설마 자는 척 하는건 아니시죠? 은비님, 이 세진이를 속이면 다 들통나요~', '평소대로라면 간지럽혀서 일으킬텐데, 지금은 그럴 상황이 아니시니...', '이따가 올게요, 그 때까진 깨어나셨으면 좋겠네요.', '#우리들은 아직 할 말이 많으니까.하하하하하히히힣']);
                   Action_Array[2].illust = 'ILLUST1';
                  }
                  }, function(){
    if(Action_Array[2].status == 1){
        makeScript(['……이게 무슨 상황이지?', '틀림없어, 연구일지에 나왔던 그 이름은 아까 그 여자가 부르던 이름이야 ………', '상황을 정리해 보자.', '나는 연구실 침대에 누워있었고, 누군가 나를 관찰한 「연구일지」를 쓰고 있었어.', '거기엔 다 끝났다고 적혀 있었어.', '여자도 내가 깨어나기를 기다리는 것 같고…', '나는 왜 이곳에 있는 걸까?', '어떤 일이 있었던 걸까?', '그, 말로만 듣던 그런 걸까? 무시무시한 비밀 실험의 실험체 같은……', '나가야해.', '여기에 오래있으면 안돼.', '(알수없는 무언가가 나에게 나가야한다고 말하는것 같다. 빨리 나가자)']);
        Action_Array[3].status = 1;
        Action_Array[2].status = 0;
    }
                             
                             }]
                  });
                              

Action_Array.push({status: 0, r: 214, g: 66, b: 120,
                   illust: 'LUCID', width:218, height:288, x:250, y:300,delay: 500,
                   callback: [
                       function(){
                           if(Action_Array[3].status==1){
                               Potal(1, 200, 990);
                           }
                           else{
                               makeScript(['아직 할일이 남아있는거 같은데..?']);
                               
                           }
                           
                       }
                   ]});

Action_Array.push({status: 0, r: 255, g: 0, b: 210,
    callback: [
        function(){
            Potal(2, 350, 1180);
        }]});

Action_Array.push({status: 0, r: 255, g: 0, b: 210,
    callback: [
        function(){
            makeScript(['통제실이다']);
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