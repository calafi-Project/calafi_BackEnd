require('dotenv').config(); // env호출
const express = require('express');
const app=express();
const port=process.env.PORT || 3000;
const router=require('./src/router'); //Router 파일을 메인 애플리케이션 파일인 index.js 에서 불러와 사용하는 방법
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',router);
app.listen(port,()=>{
    console.log(`웹 서버 구동 중... ${port}`);
});


// require('dotenv').config(); // env 호출
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000; // PORT로 수정
// const router = require('./src/router'); // Router 파일을 메인 애플리케이션 파일인 index.js에서 불러와 사용하는 방법
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // CORS 설정
// app.use(cors({
//     origin: 'http://localhost:5173',  // 프론트엔드에서 실행되는 URL
//     methods: ['GET', 'POST', 'OPTIONS'],  // 허용할 HTTP 메소드 설정
//     allowedHeaders: ['Content-Type'],  // 허용할 헤더 설정
//     preflightContinue: false,  // preflight 요청에 대해 자동으로 응답
//     optionsSuccessStatus: 204,  // preflight 요청의 성공 상태 코드
// }));

// // Body Parser 설정
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // 라우팅 설정
// app.use('/', router);

// // OPTIONS 요청에 대한 응답을 명시적으로 처리
// app.options('*', cors());  // 모든 경로에 대해 OPTIONS 요청을 처리

// // 서버 시작
// app.listen(port, () => {
//     console.log(`웹 서버 구동 중... ${port}`);
// });