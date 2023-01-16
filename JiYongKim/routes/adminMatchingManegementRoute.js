const path = require('path');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Grand = require('../models/grand');
const User = require('../models/User');
const Report = require('../models/Report');
const ReportStorage = require('../models/ReportStorage');
const Matching = require('../models/matching');
const Applyform = require('../models/ApplyForm');
const app = express();

router.route('/')
.get(async (req,res,next)=>{
    if(req.session.user!=undefined){
        if(req.session.user.id === "admin"){
            const grand = new Grand();
        const user = new User();
        const report = new Report();
        const grandinfo = await grand.info();
        const grandindx =[];
        for(i=0;i<grandinfo.name.length;i++){
            if(grandinfo.matching[i]==='없음'){
               grandindx.push(i);
            }
        };
        user.getmemberinfo().then(async result =>{
            const gmidx = [];
            const vidx = [];
            const reportinfo=[];
            for(let i=0;i<result.name.length;i++){
                    // report.userreportread(result.id[i]);
                    await user.getMemberMyApplyForm(result.id[i]).then(data=>{
                        if(data.status === false){
                            reportinfo.push(i)
                        }
                    })
                
            }
            
                res.render('admin-matching_mangement',{
                    granddata : grandinfo,
                    grandindx : grandindx,
                    chdata : result,
                    reportinfo : reportinfo,
                });
            
        })
        }else{
            res.redirect('/');
        }
    }
    else{res.redirect('/');}
    
})
.post(async (req,res,next)=>{
    const grand = new Grand();
    const applyform = new Applyform();
    const user = new User();
    const report = new Report();
    const matching = new Matching();
    const grandinfo = await grand.info();
    const grandindx =[];
    for(i=0;i<grandinfo.name.length;i++){
        if(grandinfo.matching[i]==='없음'){
           grandindx.push(i);
        }
    };
    user.getmemberinfo().then(async result =>{
        const gmidx = [];
        const vidx = [];
        const reportinfo=[];
        for(let i=0;i<result.name.length;i++){
                // report.userreportread(result.id[i]);
                await user.getMemberMyApplyForm(result.id[i]).then(data=>{
                    if(data.status === false){
                        reportinfo.push(i)
                    }
                })
            
        }
    matching.plus(result.id[req.body.choose2],grandinfo.name[req.body.choose1]);//OK
    // console.log("어르신 : "+grandinfo.name[req.body.choose1]);
    // console.log("id : "+result.id[req.body.choose2]);
    // console.log(req.body.choose1);
    grand.matching(req.body.choose1);//ok
    // console.log(req.body.choose2);
    applyform.matching(result.id[req.body.choose2]);//여기 해야됨
    res.redirect('/admin/matching/manegement');
    });
});
module.exports =router;