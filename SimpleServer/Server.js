//Node 기본 서버
//C# using 키워드
const http = require('http');//서버 모듈을 가져오기


//경로 구분하기 위한 모듈을 가져오기
//const url = require('url');

//파일 시스템 모듈 가져오기
const fileSystem = require('fs'); 
//비동기 처리, 동기 처리 

//콜백 함수 선언
function requestCallback(request,response)//고정되어있음 요청하면 응답함
{
    
    //request 요청 : web으로 말 걸면, 목적이 있어야 함 
    //response 응답 :서버가 재차 대답함
    //console.log('요청이 왔습니다' + request.url);
    console.log('요청이 왔습니다');

    //경로 구분
    if(request.url === '/')
    {
        //응답의 성격을 전달 (200 -> ok) :상태 코드 Successful
        //content-Type은 이어서 전달할 데이터의 포멧을 알려주는 역할: 데이터 성격 정의 (멀티미디어 전달시 파일이 바뀜)
        response.writeHead(200, {'content-Type':'text/plain'});//header머릿말
        //데이터 전달 및 응답 완료
        response.end('hello this is very simple server');
    
    }
    else if(request.url ==='/favicon.ico')//이미지 전달
    {
        //이미지 파일을 읽어서 이미지를 전달한다.
        //fileSystem.reaf
        fileSystem.readFile('./SimpleServer/favicon.png',function(error, data)//무명함수
        {
            response.writeHead(200, {'content-Type':'image/png'});//header머릿말 : 포맷 맞춤
            response.end(data);//글이 아닌 이미지 데이터를 넘김
        });
    }
    else //우리가 모름 404 html file : 디자인 보고 코드 가져와서 사용할 수 있음
    {
        //우리가 모름 404
        response.writeHead(404,{'Content-Type':'text/html'});
        //클라이언트에게 요청을 잘못 했다고 알려주는 역할
        response.end('<h1>404 Page not found </h1>');
    }
     

   
    //비동기 (비 연결) <-> 소캣은 연결 (통로를 뚫고 커넥션을 확인) : 일정한 시간 동안 물어봐줌
    //정해진 시간으로 응답해줌 응답이 없으면 TimeOut: timer가 늘어났다가 응답이 늦게 오면 다시 timer = 0초로 됨 

    //TCP (소켓) : 연결을 빡세게 잡아줌 (부하가 많이 걸림) 재차 같은 메세지가 계속 옴
    
    //실시간 UDP 연결에 대한 신뢰가 없음 (데이터 오가는 상황) 대부분의 게임
    //(연결유지는 하지 않음 : 있다고 가정함) 누락되어도 속도 우선 시 "나는 던졌으니: 너가 받았다는 확신 메시지를 줘!"

    //카톡도 웹 서버 : 웹환경에서도  소켓 뚫어놓는 구현이 있음 (웹에서 계속 접속확인을 함)

    //요청하지 않으면, 모름(클라이언트 끼리도 모름)
    //Web 은 내가 말을 걸지 않으면, 살아있는지 모름 :검색 엔진 검색할 때 응답을 줌
    //request를 모르는 경우, response로 404를 띄워줌 : 또는 
    //(서버 응답을 클라이언트가 기다림 : 무한 로딩) 기다리다가 응답이 없으면 TimeOut으로 응답없음을 띄워줌
}

//서버 생성
//응답 콜백 전달
const server = http.createServer(requestCallback)//delegate 콜백함으로써 함수가 실행된다.

//서버 대기(listen) 무한 루프로 대기 
server.listen(3000);//포트 번호 == 프로그램을 구분하는 번호
//80포트 속도 느림 : 누구나 알 수 있음 (잘 안 쓸만한 포트를 사용한다.) : 고유번호이기 때문에 이미 돌고 있으면 충돌나기 때문이다.
//별도의 프로세스로 돌리려면, 포트번호 고유해야한다.
//node ./server.js 무한 루프
//실행 중단 =Ctrl + C 
//http://localhost:3000/ 끊김
//127.0.0.1:3000 내 컴퓨터를 가리킴 -> loopback 내컴퓨터 내서버 나에게 요청
//ipconfig 주소가 나옴 : 내부 네트워크라고 부름 (라우터 : 공유기가 해주는 역할이기도 함)
//공유기도 각 통신사 방패막이 -> 요청 할 때 ( tag : 3.165) 붙여서 보냄 == IP가 하나로 요청
//회선의 수에 따라 주소를 묶어서 보내게 됌

//유니티에 웹요청시 전달 받기 위함ㅑ192.168.3.165