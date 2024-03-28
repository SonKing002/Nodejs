//DB 에 접속
const mysql = require('mysql');

//연결 객체 만들기
const connection = mysql.createConnection({
    user : "root",
    password : "12345",
    database : "userdata"
});

//접속 
connection.connect(function(error) {
    if (error) {
        console.log('Connection Error: ' + error);
    }
});//주소의 체계(IP:localhost/Port:3306 기본 정보 지정하면 해당 포트 필요) 중요

//쿼리 보내기
let queryString = 'select * from userinfo';//mysql 명령문 작성 : 목록 출력
connection.query(queryString, function (error, results, fields){

    //결과 출력
    if(error) { // null 아니라면 오류가 존재하는 것
        console.log('Error : ' + error);
    }else{
        if(results.length > 0) { //출력결과가 존재하는지
            console.log(results);
            console.log(fields);
        }else {
            console.log('no result');//결과 없음
        }
    }
}); //any 모든값


//접속 종료
connection.end();