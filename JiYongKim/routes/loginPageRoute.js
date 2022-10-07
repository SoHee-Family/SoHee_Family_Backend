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
        
        // console.log("님이 작성한 id : "+req.body.id);
        // console.log("님이 작성한 pw : "+req.body.pw);


        user.login().then(result=>{
       
            if(result.success){
               
                const user = {id : result.id, name : result.name, tel : result.tel, region : result.region, belong : result.belong };
                req.session.user = user;
               

                res.redirect('/');
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