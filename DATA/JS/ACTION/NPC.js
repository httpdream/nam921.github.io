var Action_Array = new Array();
/*Action_Array.push({r: 119, g: 149, b: 217,
                  callback: function(){
                      Potal(1,100,100);
                      around=1;
                  }});*/
Action_Array.push({r: 119, g: 149, b: 217, status:0, 
                  callback: function(){
                      var this_status = Action_Array[0].status;
                      if(this_status==0){
                          makeScript([ "문이 안열리잖아", "다시한번 열어볼까?  " ]);
                          Action_Array[0].status=1;
                      }
                      else if(this_status==1){
                          makeScriptAction(["lalalala"], function(){
                              Potal(1,100,100);
                              around=1;
                          });
                          Action_Array[0].status=2;
                      }
                  }});

Action_Array.push({r: 236, g: 20, b: 219, status:0,
                  illust: 'ILLUST1', width:218, height:288, x:250, y:250,
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
                  }});

