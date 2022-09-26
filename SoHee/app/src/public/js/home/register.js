"use strict";

const id = document.querySelector("#id"), // #id = id로 부여한 선택자("id")를 가져오기
 name = document.querySelector("#name"), // 이하 생략
 psword = document.querySelector("#psword"), // 이하 생략
 confirmPsword = document.querySelector("#confirm-psword"), // 이하 생략
 registerBtn = document.querySelector("#button"); // 이하 생략

registerBtn.addEventListener("click", register); // click 이벤트 발생시 register 실행

function register(){
    if (!id.value) return alert("아이디를 입력해주세요"); // id값이 없으면 알림창 띄우기
    if (psword.value !== confirmPsword.value) return alert("비밀번호가 일치하지 않습니다"); // psword 와 confirmPsword가 다르면 알림창 띄우기
      
    // 해당 값을 요청 (id, name, psword)
    const req = {
        id: id.value,
        name: name.value,
        psword: psword.value,
    };

    // 서버에 데이터 전달
    fetch("/register", {
        method: "POST", //body를 통해 데이터 전달할 땐 "POST" 사용 (rest api)
        headers:{
            "Content-Type": "application/json"
        }, // json 데이터로 전달한다고 명시
        body: JSON.stringify(req) // stringify: 오브젝트를 문자열로 바꿔주는 메소드
    })
    .then((res) => res.json()) // 응답이 오면 json 메소드 호출
    .then((res) => {
        if(res.success) {
            location.href = "/login";
        } // 데이터를 받아와서, success면 "/login" 으로 이동
        else {
            alert(res.msg);
        } // false 면 메세지 띄우기
    })
    .catch((err) => {
         console.error("회원가입 중 에러 발생")
    }); // 오류 발생 시 콘솔에 메세지 뜸
}