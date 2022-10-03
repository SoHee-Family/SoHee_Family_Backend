const path = require('path');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const User = require('../models/User');

router.route('/')
.get(async (req,res,next)=>{
    try{
        // console.log(req.session.user);
        if(req.session.user!=undefined){
            const user = new User(req.session.user);
            
            user.getMyApplyForm().then(data=>{
                if(data){
                    
                    if(data.status == true){
                        res.render('mypage',{
                            name : req.session.user.name,
                            older_name : "독거노인이 매칭된 상황인데 독거노인 매칭이 현재 미완료 되어있음"
                        });
                    }else if(data.status == false){
                        res.render('mypage',{
                            name : req.session.user.name,
                            older_name : "현재 신청서 심사중"
                        });
                    }else{
                        res.render('mypage',{
                            name : req.session.user.name,
                            older_name : null
                        });
                    }
                }
            })

           
        }else{
            res.redirect('/');
        }
        
    } catch(err){
        console.log(err);
        next(err);
    }
})


module.exports =router;