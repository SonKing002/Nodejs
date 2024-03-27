//작성한 서버 모듈 가져오기
const server = require('./Server');
const requestHandler = require('./RequestHandler');//요청핸들러 가져오기

//경로 따라 함수를 분기하는 객체 선언
const handler = {
    '/' : requestHandler.responseToRoot, 
    '/favicon.ico' : requestHandler.reponseToFavicon
}

//반환타입이 함수이면 : function이면 처리, 아니면 다른 것
//undefined 정의되지 않음 : 예외처리

//서버 시작
server.start(3000,handler);