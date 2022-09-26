"use strict";
//모듈
const express = require('express');//자바스크립트 파일을 읽어옴
const bodyParser = require("body-parser");//json 파서해주는 모듈 설치
const app = express();//익스프레스 객체 생성


//라우팅 
const home = require("./src/routes/home");

//앱세팅
app.set("views", "./src/views");//views폴더의 위치를 알려줌
app.set("view engine", "ejs");//뷰엔진으로 ejs를 사용하겠다 명시

app.use(express.static(__dirname + '/src/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));//URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use("/",home);//use는 미들웨어를 등록해주는 메서드.

module.exports = app;//app객체를 다른 파일에서 사용할 수 있게 준비