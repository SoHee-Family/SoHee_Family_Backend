// User정보 확인하는 코드
"use strict";
const UserStorage = require("./UserStorage");//유저 정보를 사용하기 위해 storage파일을 읽어옴

class User{
    constructor(body){
        this.body = body;
    }
//로그인하면 회원정보를 확인하는 코드
    login(){
        const {id, psword} = UserStorage.getUsers("id","psword");
        if(id===this.body.id&&psword===this.body.psword){
    }
}
}

module.exports = User;