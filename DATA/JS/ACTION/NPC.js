var Action_Array = new Array();
/*Action_Array.push({r: 119, g: 149, b: 217,
                  callback: function(){
                      Potal(1,100,100);
                      around=1;
                  }});*/



Action_Array.push({r: 78, g: 255, b: 0, status:0, //혼잣말
                  callback: function(){
                      var this_status = Action_Array[0].status;
                      if(this_status==0){
                          makeScript([ "문이 안열리잖아", "다시한번 열어볼까?  " ]);
                          Action_Array[0].status=1;
                      }
                      else if(this_status==1){
                          makeScriptAction(["lalalala"], function(){
                              Potal(1,700,500);
                              around=1;
                          });
                          Action_Array[0].status=2;
                      }
                  }});

Action_Array.push({r: 119, g: 149, b: 217, status:0, //혼잣말
                  callback: function(){
                      var this_status = Action_Array[1].status;
                      
                      if(this_status==0){
                          makeScriptAction(["문이 열린다아"], function(){
                              Potal(0,500,500);
                              around=1;
                          });
                          Action_Array[0].status=2;
                      }
                  }});


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


Action_Array.push({status:0, illust: 'ILLUST1', width:218, height:288, x:250, y:300, delay:500,  //AUTO
                   callback: function(){
                       if(Action_Array[2].status == 0){
                            makeScript(['....', [],'여긴 어디지?', 
                                        function(){leftright();},
                                        function(){Action_Array[2].illust='LUCID'; Action_Array[2].delay = 2000;},
                                        '제로님, 깨셨어요?',
                                        function(){Action_Array[2].illust='ILLUST1'; Action_Array[2].delay = 500;},
                                        '(젊은 여자 목소리가 부른다. 설마 .... 내 이름?)'
                                       ]);
                           Action_Array[2].status=1;
                       }
                    
                   }
                  });


Action_Array.push({r: 214, g: 66, b: 171, //혼잣말
                  callback: function(){
                      ViewIllust('RESEARCH', 0, 0, 800, 600);
                  }});