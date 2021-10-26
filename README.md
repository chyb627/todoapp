# restApi만들기
- Nodejs : chrome V8 javaScript 엔진으로 빌드된 JavaScript 런타임
- JavaScript 런타임 : 프로그래밍 언어가 구동되는 환경을 말함
- 자바스크립트로 Nodejs 기반 expressjs를 사용하여 RestApi 만들기
- DB ORM은 sequelize를 사용한다

# restApi페이징작업
- db에서 설정해야 할 것 :offset (떨어트리는 것), limit (몇 개까지 가져올것인지)
- underflow, overflow 예외처리 해주기

# restApi배포하기
- aws 호스팅을 사용해서 외부에서 접속이 가능하도록 하고 목록을 추가하고 수정
- [api서버 링크](http://13.124.194.108:3000/user)  
- post, put, get, delete 사용가능
