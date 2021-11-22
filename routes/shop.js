var router = require('express').Router();  //npm으로 설치했던 express 라이브러리 쓰겠다
                                           // 그안에 Router()라는 함수를 쓰겠다
router.use(로그인했니);

function 로그인했니(요청, 응답, next) {
  if (요청.user) { next() }
  else { 응답.send('로그인 안하셨는데요?') }
}

router.use('/shirts',로그인했니);

router.get('/shirts', function(요청, 응답){
   응답.send('셔츠 파는 페이지입니다.');
});

router.get('/pants', function(요청, 응답){
   응답.send('바지 파는 페이지입니다.');
}); 

module.exports = router;
// Node.js 환경에서 JS파일들을 불러와서 쓸 수 있는데 
// 그 문법이 바로 require() 이것과 module.exports 이다.