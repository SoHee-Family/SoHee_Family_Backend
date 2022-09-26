"use strict";

const express = require("express"); // 이하 생략
const router = express.Router(); // express의 Router 불러오기

const ctrl = require("./home.ctrl"); // home.ctrl 불러오기

// 해당 경로로 요청하면, 해당 경로에 있는 함수? 오브젝트? 불러오기
router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

// 서버에서 해당 경로에 있는 데이터 받기
router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

module.exports = router; // router를 외부에서 사용할 수 있도록 외부로 내보내기