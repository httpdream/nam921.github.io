
<!DOCTYPE html>
<html>
    <head>
        
        <meta charset="utf-8" />
        <title>ALTIS TEST</title>
        
        
        <style>
            body{
            }
            a{
                text-decoration: none;
                color: #262626;
                transition: color 0.5s;
            }
            
            a:hover{
                color: #d44a4a;
            }
            @font-face{
                font-family: 'kor_font';
                src: url('FONT/kor_Font.ttf');
            }
            
            @font-face{
                font-family: 'eng_font';
                src: url('FONT/eng_Font.ttf');
            }
            
            @font-face{
                font-family: 'NanumBarunGothic';
                src: url('FONT/NanumBarunGothic.ttf');
            }
            
            #btn{
                position: relative;
                left:  584px;
                width: 100px;
                background-color: #262626;
                color:white;
                padding:10px 20px 10px 20px;
                cursor:pointer;
                font-family: "NanumBarunGothic";
            }
            
            #title{
                font-family: kor_font;
                font-size: 45px;
            }
            
            .black{
                color:white;
                background-color: #262626;
                text-align: center;
                font-size: 20px;
                font-family: 'NanumBarunGothic';
                height: 40px;
            }
            
            .end{
                background-color: #262626;
                height: 10px;
                width: 1000px;
            }
            
            .body{
                color: black;
                text-align: center;
                font-size: 20px;
                font-family: 'NanumBarunGothic';
                height: 40px;
            }
            
            .bottom{
                color: 262626;
                text-align: center;
                font-family: 'NanumBarunGothic';
                font-size: 20px;
            }
            
            .arrow{
                color: 262626;
                text-align: center;
                font-size: 25px;
                font-family: arial;
            }
            
           
            .section{
                width: 200px;
                height: 200px;
            }
            td{
                width: 250px;
                height: 50px;
                text-align: center;
                font-size: 25px;
                font-family: 'NanumBarunGothic';
                
            }
            .center{
                text-align: center;
            }
            .end{
                color: #262626;
            }
        </style>
        
        <script>
        </script>

    </head>
    
    
    <body>
        <span id="title">스샷게시판</span>
        <span ><a href="write.html" id="btn">글쓰기</a></span>
        <br/><br/><br/><br/>
        
        
        <table>
            
            <tbody>
                
                
                <tr>
                    <td class='section'><img src='IMAGE/question.png'  class='section'/></td>
                    <td class='section'><img src='IMAGE/faq.png' class='section'/></td>
                    <td class='section'><img src='IMAGE/intro.png' class='section'/></td>
                </tr>
                <tr>
                    <td>질문해라</td>
                    <td>뭐가 궁금한가</td>
                    <td>우리인트로</td>
                </tr>
                
                <tr>
                    <td class='section'><img src='IMAGE/intro1.png'  class='section'/></td>
                    <td class='section'><img src='IMAGE/intro2.png' class='section'/></td>
                    <td class='section'><img src='IMAGE/intro3.png' class='section'/></td>
                </tr>
                <tr>
                    <td>스토리</td>
                    <td>캐릭터정보</td>
                    <td>플레이하는법</td>
                </tr>
                
                <tr class="end">
                    <td colspan=4 class="end">1</td>
                </tr>
                
                
            </tbody>
        </table>
        <div class="center">
        <span class="arrow">◄</span>
        <span class="bottom">
            <a href='community.php?page=1'>1 </a>
                 2 
                 3 
                 4 
                 5 
                 6 
                 7 
                 8 
                 9 
                 10 
        </span>
        <span class="arrow">►</span>
        </div>
    </body>

</html>