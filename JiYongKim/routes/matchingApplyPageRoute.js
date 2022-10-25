const path = require('path');
const express = require('express');
const router = express.Router();
const ApplyForm = require('../models/ApplyForm');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();


router.route('/')
.get(async (req,res,next)=>{
    try{
        if(req.session.user!=undefined){
            res.render('matchingApplyPage',{
                id : req.session.user.id,
                name : req.session.user.name
            });
        }else{
            res.redirect('/');
        }
        
    } catch(err){
        console.log(err);
        next(err);
    }
})

.post(async (req,res,next)=>{
    try{
        if(req.session.user!=undefined){
            const form = new ApplyForm(req.body);
            form.submit().then(result =>{
                if(result.success){
                    res.redirect('/myPage')
                }else{
                    res.send("<script>alert('"+result.msg+"');location.href='/login';</script>");
                }
            })

        }else{
            res.redirect('/login');
        }

        
    }catch(err){
        console.log(err);
        next(err);
    }
})


module.exports =router;