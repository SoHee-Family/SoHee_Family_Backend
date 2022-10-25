const path = require('path');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const User = require('../models/User');
const ReportStorage = require('../models/ReportStorage');

router.route('/')
.get(async (req,res,next)=>{
    try{
        if(req.session.user!=undefined){
            const user = new User(req.session.user);
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var newDate =  year + "/" +month + "/" + day;
            
            user.getMyApplyForm().then(data=>{
                if(data){
                    ReportStorage.getReportByDate(req.session.user.id, newDate).then(reports=>{
                        if(data.status == true){
                            res.render('mypage',{
                                name : req.session.user.name,
                                older_name : "독거노인이 매칭된 상황인데 독거노인 매칭이 현재 미완료 되어있음",
                                reports : reports,
                                month : month
                            });
                        }else if(data.status == false){
                            res.render('mypage',{
                                name : req.session.user.name,
                                older_name : "현재 신청서 심사중",
                                reports : reports,
                                month : month
                            });
                        }else{
                            res.render('mypage',{
                                name : req.session.user.name,
                                older_name : null,
                                reports : reports,
                                month : month
                            });
                        }
                    })
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
.post(async (req,res,next)=>{
    try{
        if(req.session.user!=undefined){
            const user = new User(req.session.user);
            // const reports = ReportStorage.getReportByDate(req.session.user.id, '2022/'+req.body.month+'/1');
            
            user.getMyApplyForm().then(data=>{
                if(data){
                    ReportStorage.getReportByDate(req.session.user.id, '2022/'+req.body.month+'/1').then(reports=>{
                        if(data.status == true){
                            res.render('mypage',{
                                name : req.session.user.name,
                                older_name : "독거노인이 매칭된 상황인데 독거노인 매칭이 현재 미완료 되어있음",
                                reports : reports,
                                month : req.body.month
                            });
                        }else if(data.status == false){
                            res.render('mypage',{
                                name : req.session.user.name,
                                older_name : "현재 신청서 심사중",
                                reports : reports,
                                month : req.body.month
                            });
                        }else{
                            res.render('mypage',{
                                name : req.session.user.name,
                                older_name : null,
                                reports : reports,
                                month : req.body.month
                            });
                        }
                    })
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