//http 모듈
const http = require('http');

//queryString모듈 추가
const querystring = require('querystring');
//mysql 통신을 위한 모듈 추가
const mysql = require('mysql');

//mysql접속과 접속확인
const connection = mysql.createConnection({
    user : "root",
    password :"12345",
    charset :"utf8",
    database : "userdata"
});
connection.connect(function(error){
    if(error){
        console.log('DB Connection error : ' + error);
    }else{
        console.log('DB 접속 완료');
    }
});

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
        request.on('data',function(chunk){
            downloadData += chunk;//데이터 누적시킨다.
        });

        //전송이 끝나면 발생하는 이벤트 end : 데이터 전송 종료 이벤트
        request.on('end',function(){//콜백 1
            console.log('데이터 전송 완료');
            //console.log(downloadData);//데이터 전송이 완료되면 필요한 일을 진행한다.
            let json = querystring.parse(downloadData);//파싱
            console.log(json);//파싱 띄우기

            //쿼리문 작성 -다른 방식으로 작성해보자 =? 가 mysql 기능으로 지원해준다.
            //let dbQuery = 'select * from userinfo where userid="' + json.id +'" and password="' + json.pw +'"';
            let dbQuery = 'select * from userinfo where userid=? and password=?';

            //쿼리 전달 (요청)// =?으로  , [json.id, json.pw], 배열 조립을 해준다.
            connection.query(dbQuery, [json.id, json.pw], function(error, results){ //field없어도 됨 필요할 때 씀
                if(error){//콜백2
                    console.log('쿼리 처리 도중 Error :' + error);
                    response.writeHead(200,{'Content-Type' : 'text/plain; charset=utf-8'});
                    response.end('쿼리 처리 중 오류 발생');
                }else{
                    if(results.length > 0){//결과값이 있는 경우
                        response.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});
                        //response.end('로그인 성공함');
                        
                        let testData = {
                            name : 'testUserName'
                        }
                        response.end(JSON.stringify(testData));//문자열 형식으로 바꿔 보낸다.

                    }else{
                        response.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});
                        response.end('로그인 로그인 실패, ID 또는 Password가 잘못 입력 되었습니다');
                    }
                    
                }
            });

            //응답을 중복으로 하면 서버는 죽어버리므로 지운다.
            //response.writeHead(200, {'Content-Type' : 'text-plain; charset=utf-8'});
            //response.end('We Received Your Data from form');
        });
    }

}).listen(3000);

