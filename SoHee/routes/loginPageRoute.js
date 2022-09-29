const User = require("../models/User");
const path = require('path');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();

router.route('/')
.get(async (req,res,next)=>{
    try{
        res.render('login');

    }catch(err){
        console.log(err)
        next(err);
    }
    
})

.post(async(req,res,next)=>{
    try{
        const user = new User(req.body);
        user.login().then(result => {
            if(result.success){
                const user = {id:result.id , name:result.name};
                req.session.user = user;
                res.redirect('/');
            }
            else{
                // res.render('login')
                res.redirect('/login')
            }
        })

    }catch(err){
        console.log(err)
        next(err);
    }

})

module.exports =router;