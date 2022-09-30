const path = require('path');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const User = require('../models/User');
const app = express();


router.route('/')
.get(async (req,res,next)=>{
    try{
       res.render('signUpPage');
        
    } catch(err){
        console.log(err);
        next(err);
    }
})
.post(async(req,res,next)=>{
    try{
        // if(req.body.psword == null)
        if(req.body.id == '' || req.body.id =="admin" || req.body.id=="Admin"){
            // res.render('signUpPage',{
            //     msg : "사용하실 수 없는 ID 입니다."
            // })
            res.send("<script>alert('사용하실 수 없는 ID 입니다.');location.href='/login';</script>");
        }else if (req.body.psword != req.body.psword_check){
            // res.render('signUpPage',{
            //     msg : "비밀번호가 동일하지 않습니다."
            // })
            res.send("<script>alert('비밀번호가 동일하지 않습니다.');location.href='/login';</script>");

        }else if(req.body.region == '' || req.body.belong==''){
            res.render('signUpPage',{
                // msg : "지역과 회원가입 타입을 선택해 주세요"
            })
            res.send("<script>alert('지역과 회원가입 타입을 선택해 주세요.');location.href='/login';</script>");
        }
        else{
            delete req.body.pw_check
            const user = new User(req.body);
        
        user.register().then(result =>{
            if(result.success){
                res.redirect('/login');
            }else{
                res.render('signUpPage',{
                    msg : result.msg
                });

            }
        })
        }

       
        
        




    }catch(err){
        next(err);
    }
})


module.exports =router;