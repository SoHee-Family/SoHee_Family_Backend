"use strict";

// app 폴더에서 app을 찾아서 불러오기
const app = require("../app");

// 포트 3000번으로 지정
const PORT = 3000;

// 포트 3000번에서 서버 실행
// 서버가 실행되면 콘솔에 "서버 가동" 출력
app.listen(PORT, () => {
    console.log("서버 가동");
});