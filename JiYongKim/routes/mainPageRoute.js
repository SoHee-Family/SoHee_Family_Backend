const path = require('path');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const User = require('../models/User');
const matchingStorage = require('../models/matchingStorage');
router.route('/')
.get(async (req,res,next)=>{
    try{
        
        if(req.session.user){
        
            // res.render('loggedMainPage',{
            //     name : req.session.user.name,
            //     us_mall : process.env.SHOPPING_MALL_URL
            // });
            const user = new User(req.session.user);
            user.getMyApplyForm().then(data=>{
            if(data){

                if(data.status == true){

                    matchingStorage.getuserInfo2(req.session.user.id).then(result =>{
                        // console.log(JSON.stringify(result));
                        res.render('loggedMainPage',{
                            name : req.session.user.name,
                            older_name : ' 매칭 완료 ( 이름 : '+ result.older+' )' ,
                            us_mall : process.env.SHOPPING_MALL_URL
                        });
                    })

                }else if(data.status == false){
                    res.render('loggedMainPage',{
                        name : req.session.user.name,
                        older_name : "매칭 진행중",
                        us_mall : process.env.SHOPPING_MALL_URL
                    });

                }else if(data.status == null){
                    if(data.id == null){
                        res.render('loggedMainPage',{
                            name : req.session.user.name,
                            us_mall : process.env.SHOPPING_MALL_URL
                        });
                    }else{
                        res.render('loggedMainPage',{
                            name : req.session.user.name,
                            older_name : "현재 신청서 심사중",
                            us_mall : process.env.SHOPPING_MALL_URL
                        });
                    }
                }

            }
        });



        }else{
            res.render('mainPage',{
                us_mall : process.env.SHOPPING_MALL_URL
            });
        }
        
    } catch(err){
        console.log(err);
        next(err);
    }
})
module.exports =router;