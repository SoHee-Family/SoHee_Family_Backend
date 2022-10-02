const path = require('path');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();


router.route('/')
.get(async (req,res,next)=>{
    try{
        if(req.session.user!=undefined){
            res.render('matchingApplyPage',{
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


module.exports =router;