const express = require('express'); //라이브러리를 첨부해줘!
const app = express(); //라이브러리를 이용해서 새로운 객체를 만들어줘!
const bodyParser = require('body-parser') //body-parser는 요청데이터 해석을 쉽게 도와준다. npm install body-parser  or  yarn add body-parser로 추가.
const MongoClient = require('mongodb').MongoClient;
const methodOverride = require('method-override')
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true })) // body-parser 라이브러리는 express 기본에 포함. (2021이후)
app.set('view engine', 'ejs');  
app.use('/public', express.static('public')); //static파일을 보관하기위해 public폴더를 쓰겠다, Node짱에게 나 public 폴더도 있다라고 알려주는 것.
app.use(methodOverride('_method')) // npm install method-override 로 설치해주기


let db; //페이지 전체에서 쓸 수 있는 전역변수 만들고,
// { useUnifiedTopology: true }는 워닝메세지를 제거해준다.
MongoClient.connect(process.env.DB_URL,{ useUnifiedTopology: true }, function (에러, client) {
  //연결되면 할일
  if (에러) { return console.log(에러) }

  db = client.db('todoapp'); //client.db('todoapp')이라는 함수로 todoapp이라는 database에 접속해달라는 명령어.

  console.log('client.db : ',client.db);

  console.log('client.db(todoapp) : ',db);

  //app. listen으로 서버를 열수 있고, 어디다 열지 정해주기.
  //app. listen (서버띄울 포트번호, 띄운 후 실행할 코드 )
  http.listen(process.env.PORT, function () {          // database 접속이 완료되면
    console.log('listening on 8080')  // 내부 코드를 실행해라(노드js 서버 띄우는 코드)
  });

})

//누군가가  /pet으로 방문을 하면 .. pet 관련된 안내문을 띄워주자

app.get('/pet', function (요청, 응답) {   //PET 경로로의 GET요청을 처리하는 기계 제작
  응답.send('펫용품 쇼핑할 수 있는 페이지입니다.');  //서버를 하나 만든 것
});

app.get('/', function (요청, 응답) {
  응답.render('index.ejs')
})

app.get('/write', function (요청, 응답) {
  응답.render('write.ejs')
})

// app.get('/', function(요청, 응답){   
//     응답.sendFile(__dirname + '/index.ejs');   // .sendFile(보낼파일경로)
// });

// app.get('/write', function(요청, 응답){   
//     응답.sendFile(__dirname + '/write.ejs');   // .sendFile(보낼파일경로)
// });

// 어떤 사람이 /add 경로로 POST 요청을 하면 ~를 해주세요 -->코드로 작성
// app.post('/add', function(요청, 응답){
//     응답.send('전송완료')
//     console.log(요청.body.title);
//     console.log(요청.body.date); 
//     //DB에 저장해주세요
// });

// 어떤 사람이 /add 경로로 POST 요청을 하면 데이터 2개(날짜, 제목)를 보내주는데
// 이 때, 'POST'라는 이름을 가진 collection에 두개 데이터를 저장하기
// {제목:'' , 날짜:''}
app.post('/add', function (요청, 응답) {
  console.log('add경로로 post 요청 할때 요청.body : ',요청.body);
  alert('전송완료 list 목록에서 확인하세요');
  // 응답.send('전송완료 list 목록에서 확인하세요');

  //counter라는 콜렉션에서 totalPost라는 총 게시물 갯수 숫자를 가져와서 총게시물갯수라는 변수에 저장함. 그다음 밑에 코드 실행.
  //findOne함수를 쓰면 collection 내에서 원하는 문서를 쉽게 찾을 수 있다.
  //그럼 찾은 결과는 function내의 결과라는 이름의 변수에 담겨온다.
  //그럼 totalPost라는 자료도 출력가능하다.
  //그리고 그 다음 insertOne을 써서 제대로된 _id와 함께 자료를 저장한다.
  //그리고 응답.send라는 코드를 이용해 응답해준다. (응답.어쩌구는 꼭들어있어야 한다.)
  db.collection('counter').findOne({ name: '게시물갯수' }, function (에러, 결과) {
    console.log('결과.totalPost', 결과.totalPost);
    var 총게시물갯수 = 결과.totalPost;

    // insertOne 함수 안에 _id : 1 이라는 항목을 쓰면 번호달아서 저장하기 끝.
    db.collection('post').insertOne({ _id: 총게시물갯수 + 1, 제목: 요청.body.title, 날짜: 요청.body.date }, function () {
      console.log('저장완료');

      // counter 라는 콜렉션에 있는 totalPost 라는 항목도 1 증가시켜야함
      db.collection('counter').updateOne({ name: '게시물갯수' }, { $inc: { totalPost: 1 } }, function (에러, 결과) {
        if (에러) { return console.log(에러) }
      })

    });
  });
});

// /list로 GET요청으로 접속하면 HTML을 보여줌
// 실제 DB에 저장된 데이터들로 예쁘게 꾸며진 HTML을 보여줌

app.get('/list', function (요청, 응답) {

  //DB에 저장된 POST라는 Collection 안의 <조건>인 데어터를 꺼내줘
  db.collection('post').find().toArray(function (에러, 결과) {  // 데이터 다 찾아줘
    console.log('결과 : ',결과);
    //.render()라는 함수에 둘째 파라미터를 이렇게 적어주면 list.ejs 파일을 렌더링함과 동시에 {posts: 결과} 라는 데이터를 함께 보내줄 수 있다. 
    응답.render('list.ejs', { posts: 결과 });  // 정확히 말하면 결과라는 데이터를 posts 라는 이름으로 ejs 파일에 보내주라는 의미이다.
  });                                        // list.ejs 파일에서 데이터를 가지고 여기저기 넣어주면 된다.
});

app.delete('/delete', function (요청, 응답) {
  //parseInt라는 함수는 '1'이라는 문자를 정수 1로 바꿔주는 고마운 함수이다.
  // list 페이지를 새로고침해서 AJAX 요청해보면 데이터가 삭제된다.
  요청.body._id = parseInt(요청.body._id);
  // 요청.body에 담겨온 게시물번호를 가진 글을 db에서 찾아서 "이승기-삭제"
  // deleteOne 함수를 쓰면 원하는 데이터를 삭제 가능하다
  // deleteOne(삭제원하는 데이터이름, function(){}) 이렇게 쓰면 된다.
  // 그리고 AJAX 요청시 삭제원하는 데이터이름은 요청.body라는 곳에 담겨온다.
  // 그래서 그 정보를 deleteOne에 집어넣으면 삭제원하는 데이터 게시물을 삭제할 수 있다.
  // { _id : 요청.body._id }인 경우 글번호만 확인하고 삭제.
  // { 작성자 : 지금로그인한사용자의_id } 이것도 가지고 있으면 삭제하라고 업글. 이제 사용자1,2가 발행한 게시물 삭제가 불가능하다.
  db.collection('post').deleteOne({ _id: 요청.body._id, 작성자: 요청.user._id }, function (에러, 결과) {
    console.log('삭제완료');
    console.log('에러', 에러)
    응답.status(200).send({ message: '성공했습니다' });
  })
});


// detail로 접속하면 detail.ejs를 보여줌
// /detail/1 로 접속하면 1번게시물을 보여줌
// /detail/2 로 접속하면 2번게시물을 보여줌
// 콜론(:)기호를 붙여주면 누군가  /detail/뒤에 "아무문자열이나 입력하면 ~" 이라는 소리이다
// /detail 뒤의 무작위의 문자를 id라고 부르겠다 라는 뜻
// detail/1 로 방문하면 1번 게시물을 보내야 한다.
app.get('/detail/:id', function (요청, 응답) {
  // db.어쩌구.findOne()이라는 함수를 사용
  // 이 함수는 db에서 원하는 게시물 하나 찾고싶을 때 사용한다.
  // 사용법은 .findOne({원하는게시물정보}, function(){ 완료시 실행할 코드 }) 이렇게 하면 된다.
  db.collection('post').findOne({ _id: parseInt(요청.params.id) }, function (에러, 결과) {
    // console.log(결과);
    응답.render('detail.ejs', { data: 결과 })

  })

});


app.get('/edit/:id', function (요청, 응답) {

  db.collection('post').findOne({ _id: parseInt(요청.params.id) }, function (에러, 결과) {
    응답.render('edit.ejs', { post: 결과 }) //파라미터중 :id 번 게시물의 제목, 날짜
  })
})

// 사용자가 /edit로 PUT요청을 하면 post라는 콜렉션에 있는 {_id : 요청.body.id } 데이터를 찾아서 
// { 제목 : 요청.body.title , 날짜 : 요청.body.date } 로 바꿔줘 라는 뜻.
app.put('/edit', function (요청, 결과) {
  // 폼에담긴 제목데이터, 날짜데이터를 가지고 
  // db.collection에다가 업데이트함
  // DB 데이터를 수정하려면 updateOne을 쓴다. 사용법은 updateOne( 1.업데이트할게시물찾기, 2.수정할내용, 3.콜백함수) 
  db.collection('post').updateOne({ _id: parseInt(요청.body.id) }, { $set: { 제목: 요청.body.title, 날짜: 요청.body.date } }, function () {
    console.log('수정완료')
    응답.redirect('/list')
  });
});

//==================================================================================
//=================================== login.ejs ====================================
//==================================================================================

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

// app.use()는 미들웨어를 쓰겠다라는 뜻.
// 서버는 요청을 받으면 응답해준는 기계인데,
// 요청과 응답 사이에 뭔가 실행시키는 코드가 미들웨어이다.
app.use(session({ secret: '!cha159632', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// /login으로 방문시 login.ejs 페이지 보여주기
app.get('/login', function (요청, 응답) {
  응답.render('login.ejs')
});

// 로그인시 아이디랑 비번이 맞는지 물어보기(passport라이브러리)
// 로그인 성공시 메인 화면으로 넘겨줌
app.post('/login', passport.authenticate('local', {
  failureRedirect: '/fail'  //로그인 인증 실패시 이동시켜줄 경로
}), function (요청, 응답) {
  응답.redirect('/')
});

// 로그인 실패시 다시 로그인 화면으로 넘겨줌
app.get('/fail', function (요청, 응답) {
  응답.render('login.ejs')
})

// 아이디, 비밀번호를 검사해주는 코드
passport.use(new LocalStrategy({      // local방식으로 아이디,비번 검사를 도와주는 부분
  usernameField: 'id',              // 사용자가 제출한 아이디가 어디 적혔는지
  passwordField: 'pw',              // 사용자가 제출한 비번이 어디 적혔는지
  session: true,                   // 세션을 만들건지
  passReqToCallback: false,        // id,pw말고 다른 정보검사가 필요한지
}, function (입력한아이디, 입력한비번, done) {  //사용자의 id,pw를 검사하는 코드
  console.log(입력한아이디, 입력한비번);
  db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
    if (에러) return done(에러)
    if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
    if (입력한비번 == 결과.pw) {
      return done(null, 결과)
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));

// 세션 만들고 세션아이디 발급해서 쿠키로 보내주기
passport.serializeUser(function (user, done) {
  done(null, user.id)
});

passport.deserializeUser(function (아이디, done) {
  db.collection('login').findOne({ id: 아이디 }, function (에러, 결과) {
    done(null, 결과)
  })
});

//==================================================================================
//=================================== mypage.ejs ===================================
//==================================================================================

app.get('/mypage', 로그인했니, function (요청, 응답) {
  console.log(요청.user); // 요청.user는 로그인 한 유저의 DB상 정보이다.
  응답.render('mypage.ejs', { 사용자: 요청.user })
})

// 로그인했니()함수는 "요청.user 가 있으면 next()로 통과시켜주시고요, 없으면 에러메세지를 응답.send() 해주세요~" 라는 뜻
function 로그인했니(요청, 응답, next) {
  // 요청.user는 로그인 한 유저의 DB상 정보입니다. (아이디, 비번, 유저명 등)
  // 하지만 그냥 출력해보면 아무것도 없고, 이걸 사용하려면 deserializeUser 라는 부분 기능개발이 필요합니다. 
  // deserializeUser 라는 부분은 고객의 세션아이디를 바탕으로 이 유저의 정보를 DB에서 찾아주세요~ 역할을 하는 함수입니다. 
  // 그리고 그 결과를 요청.user 부분에 꽂아줍니다. 
  if (요청.user) {
    next()
  } else {
    응답.render('login.ejs')
    alert('로그인 먼저 해주세요');
  }
}

// 폼에서 뭔가 전송시킬 때마다 DB에 데이터를 저장한다.
// 1. 누군가 /add 경로로 post 요청을 한다.
// 2. counter라는 콜렉션에서 총게시물갯수 저장해놓은 문서를 찾는다. 그 찾은 문서는 결과라는 변수에 담겨온다. 
// 3. 결과.totalPost하면 총게시물 갯수가 출현한다. 그것을 총게시물갯수라는 변수에 저장해서 사용한다.
// 4. post라는 콜렉션에 insertOne을 이용해 게시물을 추가한다. 추가할 때 _id를 총게시물갯수를 이용해 제대로 부여해준다.
// 5. 성공했다고 응답.send로 브라우저에게 글자를 보낸다. 응답.render, 응답.redirect 이런 것도 이용가능하다. 
// counter라는 콜렉션 내의 'totalPost'라는 값도 1 증가시켜야한다. (totalPost가 총게시물갯수 세는 역할이라면)
app.post('/add', function (요청, 응답) {
  console.log(요청.user._id)
  //응답.send() 부분은 항상 존재해야한다. 전송이 성공하든 실패하든 뭔가 서버에서 보내주어야 한다. 안그러면 브라우저가 멈춘다. 간단한 응답코드나 리다이렉트(페이지강제이동)를 해주는 코드도 있다.
  응답.send('전송완료'); 
  db.collection('counter').findOne({ name: '게시물갯수' }, function (에러, 결과) {
    var 총게시물갯수 = 결과.totalPost;
    var post = { _id: 총게시물갯수 + 1, 작성자: 요청.user._id, 제목: 요청.body.title, 날짜: 요청.body.date }
    db.collection('post').insertOne(post, function (에러, 결과) {
      // counter라는 콜렉션 내의 자료를 수정하고 싶으면 updateOne을 쓰면 된다.
      // updateOne( {이런 이름의 자료를}, {이렇게 수정해주세요}, function (에러, 결과) )
      // 왼쪽에 {name:'게시물갯수'} 이렇게 자료를 찾을 수 있는 이름이라든지 쿼리문을 적어준다.
      // 가운데 수정할 값을 입력해준다. { $set : { totalPost : 100 } } 이렇게 넣어서 값을 아예 100으로 변경할 수도 있고 { $inc : { totalPost : 5 } } 이렇게 넣어서 값을 5만큼 더해줄 수도 있다.
      // 오른쪽은 콜백함수. 수정이 실패나 성공시 실행할 코드
      db.collection('counter').updateOne({ name: '게시물갯수' }, { $inc: { totalPost: 1 } }, function (에러, 결과) {
        if (에러) { return console.log(에러) }
      })
    });
  });
});

app.use('/shop', require('./routes/shop.js'));
app.use('/board/sub', require('./routes/board.js'));

//==================================================================================
//=================================== upload.ejs ===================================
//==================================================================================

//multer은 업로드된 파일을 매우 쉽게 저장, 이름변경, 처리할 수 있게 도와주는 라이브러리.

// mulert 세팅
let multer = require('multer');
var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, './public/image')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }

});

var upload = multer({ storage: storage });

// 업로드한 파일의 확장자 필터로 원하는 파일만 거르기
var path = require('path');

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return callback(new Error('PNG, JPG만 업로드하세요'))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 1024 * 1024
  }
});

// upload로 방문시 upload.ejs를 보여준다
app.get('/upload', function (요청, 응답) {
  응답.render('upload.ejs')
});

app.post('/upload', upload.single('프로필'), function (요청, 응답) {
  응답.send('업로드완료')
});

//누군가 /image/:파라미터 로 접속하면 /public/image/:파라미터 라는 파일을 보내달라는 코드
app.get('/image/:imageName', function (요청, 응답) {
  응답.sendFile(__dirname + '/public/image/' + 요청.params.imageName)
})

//==================================================================================
//=================================== signup.ejs ===================================
//==================================================================================

// singup으로 방문시 signup.ejs를 보여준다
app.get('/signup', function (요청, 응답) {
  응답.render('signup.ejs')
});

app.post('/signup', function (요청, 응답) {   //성공시 db에 저장되고 메인화면으로 
  db.collection('login').insertOne(
    {
      id: 요청.body.id,                      // MongoDB에선 자료들을 서로 구분하기 위해 _id가 꼭 있어야 한다. 일종의 출석번호라고 생각하면 된다.
      pw: 요청.body.pw,
      address: 요청.body.address,
      mail: 요청.body.mail
    }, function (에러, 결과) {
      응답.redirect('/')
    })
})

app.get('/fail', function (요청, 응답) {    //실패시 다시 회원가입 화면
  응답.render('singup.ejs')
})

//==================================================================================
//=================================== search.ejs ===================================
//==================================================================================

app.get('/search', (요청, 응답)=>{
  
  console.log(요청.query);
  db.collection('post').find( { $text : { $search: 요청.query.value }} ).toArray((에러, 결과)=>{
    console.log(결과)
    응답.render('search.ejs', {posts : 결과})
  })
}) 

//==================================================================================
//=================================== chat.ejst ====================================
//==================================================================================

const http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

app.get('/chat', function(요청,응답){
  응답.render('chat.ejs')
});

io.on('connection', function(){
  console.log('연결되었어요');
  
  socket.on('인삿말', function(data){
    console.log(data)
  });
  
});