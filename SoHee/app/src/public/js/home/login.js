"use strict";

// 상수에 해당 요소 가져오기
const id = document.querySelector("#id"), // #id = id로 부여한 선택자("id")를 가져오기
 psword = document.querySelector("#psword"), // 이하생략
 loginBtn = document.querySelector("#button"); // 이하생략

loginBtn.addEventListener("click", login); // click 이벤트 발생 시 login 실행

function login(){
    // 해당 값을 요청하기 (id & psword)
    const req = {
        id: id.value,
        psword: psword.value,
    };

    // 서버에 데이터 전달
    fetch("/login", {
        method: "POST", //body를 통해 데이터 전달할 땐 "POST" 사용 (rest api)
        headers:{
            "Content-Type": "application/json"
        }, // json 데이터로 전달한다고 명시
        body: JSON.stringify(req) // stringify: 오브젝트를 문자열로 바꿔주는 메소드
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.success) {
            location.href = "/";
        } // 데이터를 받아와서, success면 "/" 로 이동
        else {
            alert(res.msg);
        } // false 면 메세지 띄우기
    })
    .catch((err) => {
         console.error("로그인 중 에러 발생")
    }); // 오류 발생 시 콘솔에 메세지 뜸
}

// JSON: JavaScript Object Notation (속성-값)
// 데이터 오브젝트 전달
