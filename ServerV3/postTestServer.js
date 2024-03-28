//http 모듈
const http = require('http');

//서버 생성
http.createServer(function(request, response){

    
    if(request.method === 'GET'){//Get 요청 웹
        response.writeHead(200,{'content-Type': 'text/html; charset=utf-8'})//charset=utf-8한글 안깨짐
        response.end('hello this is simple Server');
    }else if(request.method === 'POST'){//Post 요청 유니티

        //데이터를 전달 받을 빈 변수 선언
        let downloadData = '';

        //이벤트 등록 .on 함수를 사용
        //data : 이벤트, 데이터 전송 이벤트 
        //같이 전달할 콜백을 실행한다.: 약속 되어있음 
        request.on('data');

        //전송이 끝나면 발생하는 이벤트 end : 데이터 전송 종료 이벤트
        request.on('end');
    }

    
    
}).listen(3000);