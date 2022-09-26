"use strict";
//클래스화를 시킴
class UserStorage{
    static #users = {
        id: ["asdf","rlatjdwns"],
        psword:["1234","1234"],//회원정보를 입력 데이터베이스로 대체 해야함
        name:["김성준","우리밋"]
    };
    static getUsers(...fields){
        const users=  this.#users;
        const newUsers= fields.reduce((newUsers,field)=>{
            if(users.hasOwnProperty(field)){
                newUsers[field]=users[field];
            }
            return newUsers;
        },{});
        return newUsers;
    }
    static getUserInfo(id){
        const users = this.#users;
        const idx = users.id.indexOf(id);
        const userKeys = Object.keys(users);
        const userInfo = userKeys.reduce((newUser,info)=>{
            newUser[info]=users[info][idx]
        });
        return userInfo;
    }
}
module.exports = UserStorage;
