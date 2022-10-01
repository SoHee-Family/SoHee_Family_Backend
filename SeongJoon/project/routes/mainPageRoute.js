const path = require('path');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();


router.route('/')
.get(async (req,res,next)=>{
    try{console.log("세션검사")
        if(req.session.user){
        
            res.render('loggedMainPage',{
                name : req.session.user.name
            });
        }else{
            res.render('mainPage');
        }
        
    } catch(err){
        console.log(err);
        next(err);
    }
})


module.exports =router;