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
        res.render('signup');
        
    } catch(err){
        console.log(err);
        next(err);
    }
})
.post(async (req, res, next)=>{
    try{
        const user = new User(JSON.parse(JSON.stringify(req.body)));
        user.register().then(result=>{
            // console.log("결과")
            // console.log(JSON.stringify(result))
            if(result.success){
                // console.log("이름 :"+result.name)
                // req.session.id = result.id;
                // req.session.name = result.name;
                // res.render('loggedMainPage', {
                //     name : result.name
                // });

                res.redirect('/login');
            }else{
            }
        })
    }catch(err){
        console.log(err);
        next(err);
    }
})

module.exports =router;