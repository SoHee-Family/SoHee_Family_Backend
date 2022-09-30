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
            console.log(req.session.user.belong);
            res.render('reportPage',{
                name : req.session.user.name,
                belong : req.session.user.belong
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