# 공부 일지

작성값 : 날짜, 커밋 A(날짜, 제목) - 커밋 B(날짜, 제목)

cherry-pick 으로 필요한 부분만 가져와서 운영 반영

## 2021.10.26

### 서버란?

클라이언트의 요청을 받으면 서비스, 데이터를 제공하는 컴퓨터 혹은 프로그램
요청을 받으면 데이터를 보내주는 기계

서버 코드 예시 : if 누군가가 OO페이지 요청을 하면 OO페이지 html을 보내줌.

### 서버에 요청할 수 있는 4가지 방법

웹서버에 유저가 정식으로 할 수 있는 요청은 4 종류가 있다.

1. GET(읽기요청) : 웹 페이지를 읽을 때
2. POST(쓰기or생성요청) : 글쓸 때, 로그인할 때
3. PUT(수정요청) : 글이나 댓글 수정
4. DELETE(삭제요청) : 글이나 댓글 삭제

GET 요청을 하는 가장 쉬운 방법은 바로 브라우저 주소창에 URL을 입력하는 것.
브라우저의 URL입력란이 바로 GET 요청하는 곳이다.
BUT  URL을 외우는건 어렵기 때문에 웹개발자들은 버튼을 누르면 URL 이동을 할 수 있게 HTML을 짜놓는 것.

### Node.js

HTML : 웹페이지를 만들 때 사용하는 언어.
JavaScript : 웹페이지를 움직이게 만들 때 사용하는 언어.
Node.js : 자바스크립트 해석엔진인 V8이라는 프로그램을 만들었는데 성능이 뛰어나 이것만 떼어 살을 붙여 출시한 것.
Node.js란 자바스크립트를 브라우저 말고도 로컬 PC에서도 실행시켜줄 수 있는 실행창(런타임)이다.
Node.js는 요청이 차례로 들어왔을 때, 접수를 다 받고 빨리 완료된 것부터 처리해준다. Event Loop (동작 원리)

### 서버를 띄우기 위해 작성할 기본 템플릿

(server.js 파일)

const express = require('express');
const app = express();

app.listen(8080, function() {
    console.log('listening on 8080')
})

이렇게 쓰면 서버가 뜬다. 첫 두줄은 express 라이브러리 첨부와 사용. 밑에 app.listen()은 원하는 포트에 서버를 오픈하는 문법.
listen() 함수 안엔 두개의 파라미터가 필요.  listen(서버를 오픈할 포트번호, function(){서버 오픈시 실행할 코드}) 이렇게 사용. 
위 코드를 작성하고 터미널에서 node server.js 입력하면 서버가 뜸. 브라우저에서 localhost:8080 접속하면 확인 가능.

### 포트

컴퓨터는 외부와 통신할 수 있는 구멍이 60000개 정도 있다. 이걸 포트라고 부른다. 

### 콜백함수

function(){} 이라는 문법은 자바스크립트로 함수를 하나 만들겠다~ 라는 뜻

위 코드를 보면, 
.listen(서버를 오픈할 포트번호, function(){서버 오픈시 실행할 코드})
이렇게 되어있다. 
위의 예제 코드에선 함수명을 작명하는 부분이 없고 function(){} 이렇게 사용하고 있고,
listen()이라는 함수 안에 함수를 집어넣는 형태로 사용,
이걸 자바스크립트에선 '콜백함수'라고 부른다. 
정의는 함수안에 들어가는 함수 이다.
콜백함수를 왜 쓰냐면.. 자바스크립트에서 뭔가 순차적으로 실행하고 싶을 때 사용한다고 알 것
listen() 이라는 함수를 동작시킨 다음에 function(){} 내에 있는 코드를 실행해주세요~ 라는 뜻으로 사용
Node.js 특성상 코드를 연달아서 2개 적는다고 그 코드가 순차적으로 실행된다는 보장이 없기 때문에 뭔가 순차적으로 실행할 때 '함수안에 함수를 집어넣는 콜백함수'를 꼭 사용
순차적 실행이 목적이고 이 패턴을 눈에 익혀두시면 이제 서버만들 때 문법적으로 어려운게 전혀 없다.

### GET 요청시 HTML 파일을 보내주도록 하기.

1. HTML 파일이란? 웹페이지를 구성하는 언어. 그림 넣고 글씨 쓰고 예쁘게 꾸민 파일.

### Bootstrap (부트스트랩)  --> 빠르게 HTML UI 개발 --> Tailwind CSS도 알아볼 것

    - 트위터 사내 개발자들이 만든 웹 컴포넌트 라이브러리
    - 기존의 HTML CSS 디자인하고 메뉴만들고 하던 작업의 시간을 줄여주는 라이브러리
    - 구글 "Bootstrap" 검색 후 사이트 방문 -> Get started 메뉴 -> starter template라는 부분 코드 -> index.html에 적용
    - https://getbootstrap.com/docs/4.4/getting-started/introduction/#starter-template
    - 연습 때는 CSS파일 등을 직접 다운받아서 설치하지 않고 CDN 방식으로 했음. CSS 파일 다운 받아서 해볼 것.
    - npm 으로도 Bootstrap 설치 가능.

### 2021년 이후 설치한 프로젝트들은 body-parser 라이브러리가 express에 기본 포함이라 따로 npm으로 설치할 필요가 없음.

    - app.use(express.urlencoded({extended: true}))  
    - 이 코드만 위쪽에 추가해주면 된다.

### 콜백함수

1. 함수는 그냥 function 함수 (){} 이렇게 만든다.
2. 함수를 사용할 때 파라미터자리에 함수도 집어넣을 수 있다.
3. 예를 들면 get 함수를 쓸 때 계속 그래 왔다.
    - app.get(어쩌구, function(){} );
    - get도 소괄호를 뒤에 붙이는걸 보면 함수가 맞는데, get함수를 쓸 때 소괄호 내에 또 function(){} 이라는 함수를 집어넣고 있다.
    - 함수안에 들어가는 함수를 바로 콜백함수라고 부른다.
    - 자바스크립트에서는 순차적으로 실행하고 싶을 때 콜백함수를 이용한다.

    - app.get('/write', function(){어쩌구} );
    - 누군가 /write로 요청하면 콜백함수 내부의 어쩌구라는 코드를 실행해주세요~ 라고 순차적으로 기능을 실행할 때 많이 사용한다.
    - express 문법에 따라서 콜백함수 넣어서 써라 하면 콜백함수 넣어서 쓰면 된다.

    - app.get('/write', ( ) => { 어쩌구 } );
    - function 이라는 키워드 대신 => 라는 화살표를 이용 가능하다. (위치는 소괄호 오른쪽!! 주의)
    - ES6라고 부르는 자바스크립트 신문법. 콜백함수를 만들 때 코드가 간단해질 수 있어서 선호된다.
    - 함수 내부에서 this라는 키워드의 값이 바뀐다는 특징이 있는데 보통 상황에선 전혀 신경 쓸 필요없으니 자유롭게 사용하면 된다.

#### API란?

    - Application Programming Interface
    - 서로 다른 프로그램간에 소통할 수 있게 도와주는 통신 규약
    - 웹에서는 '서버와 고객간의 통신 규약'  -->  '서버에게 요청해서 데이터 가져오는 방법'
    - 지금까지 한 코딩이 /write 로 접속하면 write.html을 보내줘 같은 것. 바로 이게 서버의 API이다. 
    - 즉, write.html을 보고싶으면 /write로 접속할라는 API를 정의한 것.

#### REST API란?

    - Representational State Transfer
    - 웹 API 짤 때 REST 원칙을 지켜서 짜면 좋다 라고 하는데 총 6개의 원칙이 있음.

1. Uniform Interface 
    - 인터페이스는 일관성이 있어야한다
    - 하나의 URL로는 하나의 데이터를 가져와야함 (하나를 가져오기 위한 두개의 URL을 만들지 말자)
    - 간결하고 예측가능하게 짜야한다 (URL 하나를 알면 둘을 알게)
    - URL 이름짓기 관습을 잘 따라야 한다. 
    - URL 대신 URI 용어를 많이 쓰기도 하는데, URI는 자료를 넘버링하고 분류하고 지칭하는 방법. 도서관 책분류할 때 URI에 의해 분류하기도 한다.

2. Client-server 역할 구분하기
    - 고객들은 URL 하나만 알면 서버에 있는 자료를 갖다쓸 수 있다.
    - 고객에게 서버역할을 맡기거나, DB에 있는 자료를 직접 꺼내라고 하는 식으로 코드를 짜면 안된다.

3. Stateless
    - 요청들은 각각 독립적으로 처리되어야 한다.
    - 요청1이 성공해야 요청2를 보내주는 식의 요청간 의존성이 존재하는 코드를 짜면 안된다.
    - 요청하나 만으로 자료를 가져오기 충분하도록 요청에 필요한 모든 정보들을 실어 보내는게 좋다는 뜻.

4. Cacheable
    - 요청을 통해 보내는 자료들은 캐싱이 가능해야한다.
    - 그리고, 캐싱가능하다고 표시하거나 캐싱 기간을 설정해주여아 한다
    - 캐싱이란? 네이버 방문시 크롬 브라우저는 자동으로 자주 사용하는 이미지 파일, CSS 파일 등을 하드에 저장해놓는다. 별로 바뀔일 없는 네이버 로고나 아이콘 등.
      하드에 저장해놓고 네이버 방문할 때 네이버서버에 네이버 로고주세요 라고 요청하지 않고 하드에서 불러온다. 이 행위를 캐싱이라고 한다.

5. Layered System
    - 요청처리하는곳, DB에 저장하는곳 이런 여러가지 단계를 거쳐 요청을 처리해도 된다.
    - 여러개의 레이어를 거쳐서 요청을 처리하게 만들어도 된다고 한다.

6. Code on Demand
    - 서버는 고객에게 실제 실행가능한 코드를 전송해줄 수도 있다.

#### URL 이름짓기 관습

    - instagram.com/explore/tags/kpop
    - instagram.com/explore/tags/food
    - facebook.com/natgeo/photos
    - facebook.com/bbc/photos

    - 이 URL들은 페이스북이 매우 잘만든 API이다.
    - 왜냐하면, facebook.com/bbc/photos는 딱봐도 BBC뉴스 페북계정의 사진첩인 느낌이 들기 때문이다.

    - 단어들을 동사보다는 명사 위주로 구성함.
    - 응용해서 다른 정보들을 쉽게 가져올 수 있을 정도로 일관성 있음
    - 대충 봐도 어떤 정보가 들어올지 예측이 가능함.

    - 띄어쓰기는 _(언더바) 대신 -(대시) 기호 사용
    - 파일 확장자 쓰지 말기 (.html 이런거)
    - 하위 문서들을 뜻할 땐 / 기호를 사용함 (하위폴더 같은 느낌)

    - 서버 API 중에 "/add로 POST 요청을 하면 ~ 해주세요" 를 "/newpost로 POST 요청을 하면 ~해주세요" 이렇게 명사로 바꾸면 더 REST 해진다.

#### MongoDB 셋팅하기

    - Database Access 메뉴에서 DB 접속용 아이디/비번을 생성한다.
    - 데이터베이스 접속할 수 있는 아이디/비번을 새로 만들어주는 것. [admin/qwer1234]

    - Network Access 메뉴에서 IP를 추가
    - 데이터베이스 접속할 수 있는 IP를 미리 정의해놓는 일종의 보안장치
    - Allow access from anywhere을 누르시거나 0.0.0.0/0 을 추가

    - Databases --> Browse Collections. collection 만들기를 진행 (Add My own Data -> 데이터베이스 설정 및 생성)
    - Cluster는 하나의 호스팅 공간. 그 안에 데이터베이스를 만들어야 데이터를 저장할 수 있다.
    - 이 데이터베이스를 내 컴퓨터에서 접속하려면 접속 URL을 코드에 복붙해주면 된다.
    - 접속 URL에는 내 디비 접속용 아이디/비번/데이터베이스 이름이 들어가야 한다.

    -접속 URL 복붙하실 때 mongodb+srv://디비계정아이디:디비계정패스워드@cluster0-qaxa3.mongodb.net/데이터베이스이름?retryWrites=true&w=majority
    이거 3개를 잘 입력해야합니다. (server.js 참고)

#### Database

    - 데이터를 일정한 형식으로 저장할 수 있게 도와주는 곳 (가장 쉽게 볼 수 있는게 엑셀) (엑셀에서 시트를 하나 만든 후 행과 열에 원하는 데이터를 기입하면 자료 저장 끝 처럼 데이터베이스도 동일)
    - 데이터베이스는 SQL이라는 언어를 써서 데이터를 입력, 출력 한다.

    - BUT MongoDB는 NoSQL
    - 처음 다룰 때 어려운 셋팅작업 없음 (스키마 생성 등)
    - SQL문 쓰지 않음
    - 평생 무료 호스팅해주는 곳이 있음

    - server.js에서 DB에 접속하기위한 접속 방법
    - mongodb main 화면에서 connect 버튼 누르기 -> 가운데 Connect Your Application 버튼 누르기 -> 
    - (1) Choose your driver version 에서 Node.js 선택되어있는지 잘 확인하기 -> (2) 밑에 접속 URL(Connection String) 긴게 뜨면 복사해서 일단 메모장 같은 곳에 저장해놓기
    - 접속 URL만 잘 써주면 이제 Node.js로 돌아가는 파일에서 내 DB와 직접 통신이 가능.

    - server.js에서 DB에 접속하려면
    1. 터미널 켜서 npm install mongodb 를 입력해 라이브러리 설치한다.
    2. server.js 상단에 다음 코드를 추가한다 : const MongoClient = require('mongodb').MongoClient;  require라는 글자 많은 곳에 함께 위치시켜 줄 것.
    3. 하단에 MongoClient.connect()~ 추가. (server.js 참고)

#### Database에 자료 저장하는 방법

    - 사용자가 /add로 POST 요청을 하면 폼에 입력된 자료를 2개가 서버로 도착한다.
    - 이 때 자료 2개를 post라는 이름의 collection에 저장해보도록 하자.
    - { 제목:'123', 날짜'456'} 이런 Object 자료형으로 저장하면 된다.

#### 자료를 저장하기 위해선 먼저, MongoDB에 저장할 폴더와 파일을 만들자.

    - 위의 접속 URL 길게 적어서 쓴건 내 계정에 접속하는 것.
    - 계정 안에 있는 여러가지 database와 collection에 자료를 저장해보자.

#### database / collection 만들기

1. MongoDB Atlas 메인 대시보드에서 Collections 라는 버튼을 누르도록 합시다.
2. Add my own data  버튼을 누르자. (혹은 이미 뭐가 있다면 creat database)
3. database 이름, collection 이름을 하나씩 정해준 다음 저장. (예를들어, database이름은 todoapp collection이름은 post로 저장)
4. ----------------database----------------
    collection             collection
   ----------------------------------------
5. database는 하나의 폴더, collection은 하나의 엑셀파일이라고 생각하기

#### collection에 자료 추가하는 방법

1. db.collection('post') 라는건 collection 중에 post라는걸 선택한다는 뜻이고, 뒤에 .insertOne을 붙이면 자료를 추가할 수 있다. (Object 자료형식으로 추가가능)
2. inserOne 함수는 insertOne(추가할자료, 콜백함수) 이렇게 쓰면 된다.
3. db.collection('post').insertOne() 이 패턴을 잘 기억하기. 데이터 추가하고 삭제하고 수정할 때도 이와 동일한 형식이다. 서버 개발은 이해보다 패턴 외우는게 중요하다.
4. 몇줄에 걸친 긴 코드를 합쳐서 한번에 작성 하면, client.db('todoapp').collection('post').insertOne(추가할 자료, 콜백함수) 이렇게 된다.

#### HTML에 DB데이터 꽂아 넣는 법 (EJS)

1. /list 로 방문하면 ejs 파일을 보내주자
2. 그냥 HTML 파일만 보내주면 흔히 말하는 Static페이지가 된다.
3. HTML에 실제 DB데이터를 넣어서 보내줄 수 없다. 그래서 EJS, Pug같은 템플릿 엔진을 사용한다.
4. EJS는 서버 데이터를 HTML에 쉽게 박아 넣을 수 있게 도와주는 일종의 HTML 랜더링 엔진이다.
5. EJS를 이용해서 DB데이터를 HTML에 박아넣어보도록 하자. 

#### EJS 파일 만들기

1. EJS 파일은 그냥 html과 똑같이 만들어 쓰면 된다.
2. 중간중간 EJS 문법으로 데이터를 꽂아넣는다.
3. EJS를 사용하면 HTML에 여러가지 자바스크립트 문법을 사용가능하다.

#### EJS 파일 기본 문법

    - <h2><%= user.name %></h2>
    - HTML 중간중간에 서버 데이터를 집어넣고 싶을 땐 이렇게 사용한다.  <%= 서버에서 보낸 데이터의 변수명 %>
    - 그럼 HTML 글자로 렌더링 된다.

    - <% if (user) { %>    <h2><%= user.name %></h2>  <% } %>
    - HTML에 if문을 적용하거나 반복문을 적용하고 싶을 땐 <% %> 내부에 자바스크립트 문법을 담으면 된다.
    - 위의 예시 코드는 user라는 변수가 참일 때만 내부 <h2>코드를 보여줄 것.
    
    - EJS 안에서 자바스크립트 문법을 쓸 때 <% %> 내부에 담아야 한다.

#### 코드 작성 흐름 정리

1. 사용자가 /list로 GET 요청을 하면,
2. MongoDB에서 데이터를 꺼낸뒤,
3. list.ejs 파일에 그 데이터를 꽂아넣어서 사용자에게 보내줌.

#### MongoDB에서 데이터를 꺼내고 싶을 때

    - db.collection('post').find() 
    - db.colleciton('post').findOne()
    - 이런 식으로 쓰면 데이터를 꺼낼 수 있다.
    - db.collection('post').find().toArray() 라고 적으면 collection('post')에 있는 모든 데이터를 Array 자료형으로 가져온다.