"use strict"
//다른 파일을 읽어옴(모듈화를 위한)
const User = require("../../models/User");
const UserStorage=require("../../models/UserStorage")

const output={
   home : (req,res)=>{
        res.render("home/index");//index.ejs파일을 렌더링
    },
    
     login : (req,res)=>{
        res.render("home/login");//login.ejs파일을 렌더링
    },
};
const process ={
    login:(req,res)=>{
        const user = new User(req.body);
        // const response = user.login();
        // return res.json(response);
        
        const id = req.body.id,
        psword=req.body.psword;
        const users = UserStorage.getUsers("id","psword");
        
        const response ={};

        if(users.id.includes(id)){
            const idx = users.id.indexOf(id);
            if(users.psword[idx]===psword){
                response.success=true
                return res.json(response)
            }
        }
        response.success=false;
        response.msg="로그인에 실패하셨습니다.";
        return res.json(response)
    },
};
//모듈화로인해 다른 파일에서 함수를 사용할 수 있게 export
module.exports = {
    output,
    process,
}