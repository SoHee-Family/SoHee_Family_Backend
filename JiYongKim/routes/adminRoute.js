const path = require('path');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();


router.route('/')
.get(async (req,res,next)=>{
    if(req.session.user!=undefined){
        // console.log(req.session)
    if(req.session.user.id ==="admin"){
        res.render('admin',{
        });
    }else{
        res.redirect('/');
    }
    }
    else{res.redirect('/');}
    
        })


module.exports =router;