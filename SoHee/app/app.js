"use strict";

// 모듈
const express = require("express"); // express 모듈을 require로 불러오기
const bodyParser = require("body-parser"); // 바디 파싱 모듈 불러오기
const app = express(); // app에 express 실행하기

// 라우팅
const home = require("./src/routes/home"); // 해당 경로에 있는 파일 불러오기

// 앱 세팅
app.set("views", "./src/views"); //views 폴더에서 viwes 읽기
app.set("view engine","ejs"); // view engine을 ejs로 설정
app.use(express.static(`${__dirname}/src/public`)); // public 폴더에 있는 정적 파일 읽기
app.use(bodyParser.json()); // bodyparser 가 json 데이터를 파싱할 수 있도록 명시
app.use(bodyParser.urlencoded({extended: true})); // URL을 통헤 전달되는 데이터에 한글, 공백 같은 문자가 포함될 경우 발생하는 문제 해결

app.use("/", home); // use -> 미들웨어 등록해주는 메소드 & /로 접속하면 home으로 보내기
module.exports = app; // 외부에서 app 쓸 수 있게 내보내기