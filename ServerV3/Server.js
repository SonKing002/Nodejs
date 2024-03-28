//Node 기본 서버
//C# using 키워드
const http = require('http');//서버 모듈을 가져오기
const url = require('url');//경로 구분하기 위한 모듈을 가져오기
const queryString = require('querystring');//기본 모듈

//서버 생성
//응답 콜백 전달

//port : 외부에서 전달받을 포트 번호
function start(port, handler) {

    http.createServer(function (request,response) {//콜백 객체 만들면서 무명함수로 넘김
            
        //주소의 문자열 구조: 복잡하니까
            // 경로 해석
            let path = url.parse(request.url).pathname;
            let query = url.parse(request.url).query;//데이터
            
            //응답 요청,
            console.log('요청이 왔습니다' + path);
            console.log( '쿼리 객체 : '+ JSON.stringify(queryString.parse(query)));//console.log('요청이 왔습니다' + query);//id=nickname 분리하기위함
            //JSON.stringify(자바스크립트) 문자열로 강제 변환

            //처리할 수 있는지 확인
            if(typeof(handler[path])=== 'function'){//typeof(handler[request.url])
            
            handler[path](request,response);//요청 응답 함수 호출 handler[request.url] 함수 콜

            }else{//처리할 수 없는 오류 처리
                
                response.writeHead(404,{'Content-Type':'text/html'});//우리가 모름 404 html file : 디자인 보고 코드 가져와서 사용할 수 있음
                response.end('<h1>404 Page not found </h1>');//클라이언트에게 요청을 잘못 했다고 알려주는 역할
            }      
        }).listen(port);//delegate 콜백함으로써 함수가 실행된다.
    //서버 대기(listen) 무한 루프로 대기 //server.listen(3000);//포트 번호 == 프로그램을 구분하는 번호
    
}

//모듈로 내보내기 (nodeJS 한정) : 모듈화,은닉,캡슐 전부 별로이다.
module.exports = {
    start : start // 접근key : value함수 //외부에서 내부 접근을 할 수 없도록 하기 위함
}

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