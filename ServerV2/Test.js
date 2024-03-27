//주석
/*
var number = 10;
예전에는 변수 선언할 때, var만 존재한다.
상수를 만드는 약속이 없었다.
var / const / let 
변수 생성 시, let 이 좀 더 좋다. 
var 호환성 때문에 아직 남아있다.
*/

let number = 10;//할당 될 떄 자료형을 규정한다.
//인터프리터 언어 : 컴파일하지 않음

//자바 스크립트는 어떤 타입이든 중요하지 않다. 타입을 와리가리 가능하다.
//강 타입string type 타입이 중요하다. == 메모리에 목숨을 거는 C 계열 언어 
number = "'test'"+"제한이 없어서 쉽다";

//숫자 형 (정수실수 구분x)
//문자열만 존재 (문자가 없다.)
number = "'testing'"; //가능

//type script가 아닌 기본 자바 스크립트에서는 :타입을 지정하지 않는다.
//console.log(number);//출력 
//Control + ~  : 틸트 
//node +Enter = welcomeToNode.js가 뜨면 성공 
//Ctrl + c : 2번 누르면 node 탈출 
//ls //cls
// node .\SimpleServer\Test.js 

//소숫점 처리 주의!
let number1 = 0.1;
let number2 = 0.2;
let isSame = (number + number2) == 0.3;//false? true? : 부동소수 정확도가 떨어지기로 악명이 높음

/* 비교
// == 비교하는 것 가능 (왼쪽 , 오른쪽) 알아서 형 변환해서 비교함
// === 암묵적으로 형변환하지 않고, 비교한다.
// !== 
*/

//그러므로, 부동소수가 없는 정수로 바꾼 후 비교한다.서버 요청해서 결과값 받는 용도로 사용
console.log(isSame);

//C샵은 멀티바이트, 자바스크립트: 멀티바이트 와이드캐릭터 2바이트를 먹는다. => 문자열로 조립 UTF-8 인코딩한다.
//버퍼 범위로 1byte에 용량을 넣어서 보낸다. 타입별로 처리하는데, 웹과 약속이 되어있어야 한다.
//그 약속 체계를 프로토콜이라 부른다.
// 2byte -> 16bit 

//배열
let array = [1,2,3,4,5,"test",[1,2,3]]; //우리가 아는 배열이 아니다.
console.log(array);//출력 잘 된다. 쉽다.
//C#에서는 string.join(",",arr); 보간법으로 하거나 for(int i =0 ; i < arr.length; i++){} 으로 요소들 출력
console.log(array[0]);//우리가 아는 배열이 아니다.메모리 구조상 해시테이블이용해서 구현한 것.
// key value 가 있고,  배열보다 느리다.
array[10] = 20;//해시테이블이라 key값이 들어가고, 중간 사이 값은 비어있음을 알려준다.
console.log(array);
console.log(array.length);//자바 스크립트 안에 데이터가 전부 들어있지 않다.주의

//객체.
/*
javaScript Object 
- array 객체 == 해시테이블이다.
-객체 문법
let person = {};
*/
let person = //생략 가능 Json : javaScript Object Notion 이라는 뜻
{
    //Key 선언 : value 할당, 자료 형태의 제한 없음
    'name' : 'JaeHyeuk',//띄어쓰기 가능
    age : 40,  //따옴표가 생략되어도 내부적으로 문자열처럼 해석함
    data : [   //배열 또한 만들 수 있음
        //버퍼 데이터 -> 객체로 살리는 경우에 객체구조( 변수이름과 타입이 ) 맞아야한다.
    ], 
};
//객체를 덜 복잡하게 문자열로 만든다.
let objectString = JSON.stringify(person);//유니티 직렬화랑 동일하다.
console.log(objectString);//한번에 출력함

//객체 안에 key를 접근하는 두가지 방법 
//1. .연산자 활용 : 인터프리터 특성상 KEY의 첫 문자로 숫자를 입력할 수 없다.
console.log(person.name);
//2. 괄호 안에 [''] 문자열로 감싼 후 key 입력한다. 첫 문자로 숫자를 입력시 인식 할 수 있다.
console.log(person['name']);
person.name = 20; //가능

//ex.임시로 KEY에 아이디를 주르륵 넣고 클라이언트에게 받으면, 없으면 추가할 수 있다.

console.log(array['0']);//숫자 아닌 key 도 받는다. 해시테이블 문자열을 다루고 있기 때문에 성능은 좋지 않다.
//C 비트연산이 제일 빠르다. 자바 스크립트에서는 비트 연산으로 해도, 동작 메커니즘이 다르기 때문에 속도가 좋아지지 않는다.

//함수 문법
//선언 방법 3가지
//1.function 정석만들기
function testFunction(a,b,c)//인자 파라미터 받기
{
    console.log('testFunction is called');
    console.log( a + " : " + b + " : " + c);
    return 10; //반환형을 따로 지정하지 않음 실행됨
}
//자바스크립트,C가 : 캐멀캐이스 사용
let result = testFunction(19,32,10);//할당 받고, 파라미터도 알아서 파싱해준다.
console.log(result);
let result2 = testFunction();//할당 받고, 파라미터를 받지 않으면, 오류가 아닌 Undefined로 출력된다.
console.log(result2);
//인터프리터는 에러가 뜨지 않는다.

//2. 변수로 시작하고 함수를 만들고 할당
let function2 = function02()
{
    console.log('function2 is called');
}//함수 콜 하면 그제서야 내용을 알 수 있다.

let function3 = () =>//위 함수를
{
    console.log('람다식으로 작성함');
}
function3();

(() =>//함수 생성 및 람다식
{
    console.log('루프, 한번 콜할 때 이상한 함수 작성 완료');
})();//함수 콜함

//함수 기반으로 객체 확장 키워드로 함수를 확장한다. (상속성)
//객체 지향 언어 4특성 : 추상화 캡슐화 상속성 다형성