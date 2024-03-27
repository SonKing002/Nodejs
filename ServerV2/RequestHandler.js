//경로 구분하기 위한 모듈을 가져오기
//파일 시스템 모듈 가져오기
const fileSystem = require('fs'); 
//비동기 처리, 동기 처리 

//응답처리 함수:한번에 처리하지 않고 성격별로 정리한다.
function responseToRoot(request,response) {
    
    //content-Type은 이어서 전달할 데이터의 포멧을 알려주는 역할: 데이터 성격 정의 (멀티미디어 전달시 파일이 바뀜)
    response.writeHead(200, {'content-Type':'text/plain'});//header머릿말 :응답의 성격을 전달 (200 -> ok) :상태 코드 Successful
    response.end('hello this is very simple server');//데이터 전달 및 응답 완료

}

function reponseToFavicon(request, response) {
    //이미지 파일을 읽어서 이미지를 전달한다.
        fileSystem.readFile('./favicon.png',function(error, data) {//무명함수
            response.writeHead(200, {'content-Type':'image/png'});//header머릿말 : 포맷 맞춤
            response.end(data);//글이 아닌 이미지 데이터를 넘김
        });
}

//모듈 내보내기
module.exports = {
    responseToRoot : responseToRoot,
    reponseToFavicon : reponseToFavicon
}