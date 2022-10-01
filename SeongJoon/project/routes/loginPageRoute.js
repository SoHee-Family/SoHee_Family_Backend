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
        console.log("dfdfd");
        
    } catch(err){
        console.log(err);
        next(err);
    }
})
.post(async (req, res, next)=>{
    console.log("ffdfdfd");
    try{
        const user = new User(JSON.parse(JSON.stringify(req.body)));
        console.log(user);
        user.login()
        .then(request=>{
            if(request.success){
                const user = {id : request.id, name : request.name}
                req.session.user = user;
                res.redirect('/');
            
            }else{
                console.log(request.msg)
            }
        })
    }catch(err){
        console.log(err);
        next(err);
    }
});

module.exports =router;


