"use strict";
const express = require("express");
const router = express.Router();//익스프레스 라우터 객체 선언
const ctrl = require("./home.ctrl");//mvc패턴의 c파일을 가져다 사용함
//라우팅(CTRL에서 OUTPUT, PROCESS객체를 가져옴)
router.get("/",ctrl.output.home);
router.get("/login",ctrl.output.login);
router.post("/login",ctrl.process.login);

module.exports = router;//라우터를 다른 파일에서 사용하기 위한