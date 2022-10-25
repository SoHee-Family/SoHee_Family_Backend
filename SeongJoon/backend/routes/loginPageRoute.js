const path = require('path');

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const User = require('../models/User');
const app = express();

router.route('/')
.get(async (req,res,next)=>{
    try{
        res.render('login');
        
    } catch(err){
        console.log(err);
        next(err);
    }
})

.post(async (req, res, next)=>{
    try{
        const user = new User(req.body);

        user.login().then(result=>{
            // console.log("결과")
            // console.log(JSON.stringify(result))
            if(result.success){
                const user = {id : result.id, name : result.name};
                req.session.user = user;
                // console.log("이름 :"+result.name)
                // req.session.id = result.id;
                // req.session.name = result.name;
                if(result.id==="admin"){res.redirect('/admin');}
                else{res.redirect('/');}
                
                // res.render('loggedMainPage', {
                //     name : result.name
                // });

                
            }else{
                
                // res.render('login',{
                //     msg : result.msg
                // });
                res.send("<script>alert('아이디 혹은 비밀번호를 잘 못 입력하셨습니다.');location.href='/login';</script>");
            }
        })
        
    

        
    }catch(err){
        console.log(err);
        next(err);
    }
})

module.exports =router;