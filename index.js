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
