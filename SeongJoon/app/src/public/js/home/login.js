"use strict";

const id =document.querySelector("#id"),//ejs파일에서 id태그를 읽어옴
psword= document.querySelector("#psword"),
loginbtn = document.querySelector("button");
loginbtn.addEventListener("click",login);//로그인버튼 누르면 아래 로그인함수 실행

function login(){
    
    const req ={
        id:id.value,//id값 저장
        psword: psword.value,//psword값 저장
    };
    fetch("/login",{//fetch()를 호출하면 브라우저는 네트워크 요청을 보내고 프라미스가 반환됩니다. 반환되는 프라미스는 fetch()를 호출하는 코드에서 사용됨
        method:"POST",//post방식으로 전송
        headers:{
            "Content-Type":"application/json",//json형식으로
        },
        body : JSON.stringify(req),
    })

    .then((res)=>res.json())
    .then((res)=>{
        if(res.success){
            location.href="/";//res로 success가 오면 메인화면으로 이동
        }else{
            alert(res.msg);
        }
    })
    .catch((err) =>{
        console.error(new Error("로그인 중 에러 발생"))
    });
}