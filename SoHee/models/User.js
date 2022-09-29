const UserStorage = require("./UserStorage");

class User{
    constructor(body){
    this.body = body;
}

async login(){
    const client = this.body; 
    const {id, psword, name} = await UserStorage.getUserInfo(client.id);

    if (id) { 
     if (id === client.id && psword === client.pw) {
        return {success: true, name: name}; 
    }
    return {success: false, msg: "비밀번호가 틀렸습니다."};
    } // id는 같으나 psword가 다를 경우 메시지 출력
    return { sucess: false, msg: "존재하지 않는 아이디입니다."};
    } // id가 없는 경우 메시지 출력


}

module.exports = User;