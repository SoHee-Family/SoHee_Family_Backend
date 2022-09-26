"use strict";

// UserStorage 불러오기
const UserStorage = require("./UserStorage");

class User {
    // body 불러오기
    constructor(body) {
        this.body = body;
    }

            // 로그인 확인
    async login(){
        const client = this.body; // client에 this.body(body 받아서 만든 객체) 넣기
        const {id, psword} = await UserStorage.getUserInfo(client.id); 
        // client.id를 받아서 UserStorage의 getUserInfo 메소드로 전달
        
        if (id) { // id 가 UserStorage에 있으면 if 실행 
         if  (id=== client.id && psword === client.psword) {
            return {success: true }; // id와 client id 가 같고 psword와 client paword가 같으면 true
        }
        return {success: false, msg: "비밀번호가 틀렸습니다."};
        } // id는 같으나 psword가 다를 경우 메시지 출력
        return { sucess: false, msg: "존재하지 않는 아이디입니다."};
        } // id가 없는 경우 메시지 출력
        
        // 회원가입
        register() {
            const client = this.body; // 이하 생략
            const response = UserStorage.save(client); // client를 받아서 UserStorage의 save 메소드로 전달
            return response; // UserStorage 에서 받은 값 반환
        }
}

module.exports = User; // 외부에서 사용할 수 있도록 내보내기



// await => promise를 반환할 때만 사용 가능
//       => async 함수 안에서만 사용 가능
//       => 데이터를 다 읽어올 때까지 기다림