"use strict";
//클래스화를 시킴
const fs = require("fs").promises;//file system 모듈선언
class UserStorage{//UserStorage클래스 선언
    static #getUserInfo(data,id){//은닉화된 메서드
        const users = JSON.parse(data);//databases.json에서 전달받은 정보 파싱하고 변수에 저장
        const idx = users.id.indexOf(id);//아이디 인덱스 알아내서
        const userKeys = Object.keys(users);//users에 저장된 유저정보 키값을 뽑아 변수에 저장
        const userInfo = userKeys.reduce((newUser,info)=>{//reduce함수를 사용해서 새로운 유저 변수를 저장
        newUser[info]=users[info][idx]//
        return newUser;
        },{});
    return userInfo;//데이터베이스에서 뽑아낸 변수 리턴
    }
    static #getUsers(data, isAll, fields){
        const users = JSON.parse(data);
        if(isAll) return users;
        const newUsers= fields.reduce((newUsers,field)=>{
            if(users.hasOwnProperty(field)){
                newUsers[field]=users[field];
            }
            return newUsers;
        },{});
        return newUsers;
    }
    static getUsers(isAll,...fields){//인자를 여러개 받아올 수 있다.
        return fs.readFile("./databases/user.json")
        .then((data)=>{
            return this.#getUsers(data,isAll,fields);
        })
        .catch(console.error);

    }
//user정보를 제이슨데이터베이스에서 가져옮
    static getUserInfo(id){//유저가 입력한 아이디값을 매개변수로 가져와서
        return fs.readFile("./databases/user.json")//database에서 json 가져와서
            .then((data)=>{
                return this.#getUserInfo(data,id);//데이터랑 아이디 #getuserinfo함수로 전달 5번째줄
            })
            .catch(console.error);
    }

    static async save(userInfo){
        const users = await this.getUsers(true);
        //데이터 추가
        console.log("유저데이터 확인1"+JSON.stringify(users))
        if(users.id.includes(userInfo.id)){
            throw "이미 존재하는 아이디입니다.";
        }
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        console.log(users)
        fs.writeFile("./databases/user.json",JSON.stringify(users));
        
        return {success:true};
    }
}
module.exports = UserStorage;