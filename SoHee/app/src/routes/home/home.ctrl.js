"use strict";

// User 불러오기
const User = require("../../models/User");

// 컨트롤러 함수 ( => 요청 받으면 반환해줌 )
const output = {
  home: (req, res) => {
    res.render("home/index");
  },
  login: (req, res) => {
    res.render("home/login");
  },
  register: (req, res) => {
    res.render("home/register");
  }
};

// 과정
const process = {
  login: async (req, res) => {
   const user = new User(req.body); // 전달 받은 req를 넣어서 user 인스턴트화 (객체를 메모리에 올리기)
   const response = await user.login(); // login 메소드 호출
   return res.json(response); // json객체로 반환
  },
  register: (req, res) => {
   const user = new User(req.body); // 이하 생략 
   const response = user.register(); // register의 반환값 받기
   return res.json(response); // json 메소드를 통해 응답하기
  },
};

// 외부에서 사용할 수 있게 내보내기
  module.exports = {
    output,
    process,
  };