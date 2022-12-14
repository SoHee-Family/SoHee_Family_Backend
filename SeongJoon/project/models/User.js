const UserStorage = require("./UserStorage");

class User{
    constructor(body){
    this.body = body;
}

async login(){
    console.log("로그인함수")
    const client = this.body;
    const {id, psword,name} = await UserStorage.getUserInfo(client.id);
    if (id) { 
     if  (id === client.id && psword === client.pw) {
        return {success: true, id: id, name : name}; 
    }
    return {success: false, msg: "비밀번호가 틀렸습니다."};
    } // id는 같으나 psword가 다를 경우 메시지 출력
    return { sucess: false, msg: "존재하지 않는 아이디입니다."};
    } // id가 없는 경우 메시지 출력

    
    async register(){
        const client = this.body;//입력받은 값 변수에 저장
        
        try{const response = await UserStorage.save(client);//입력받은 값을 넣은 변수를 userstorage.save메서드에 태워 보내서 로직실행 후 넘겨받은값 변수에 저장
            return response;}//프로미스로 반한된 값은 넘겨받는 시간이 오래걸려 나타나기에 await-async를 사용하여 값을 넘겨받아야함
        catch(err){
            const a = {success:false,msg:err};
            return a;
        }
        
    }

}

module.exports = User;