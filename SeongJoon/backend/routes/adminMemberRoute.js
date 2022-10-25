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
const app = express();

router.route('/')
.get(async (req,res,next)=>{
    
    const grand = new Grand();
    const user = new User();
    const report = new Report();
    
    const grandinfo = await grand.info();
    user.getmemberinfo().then(async result =>{
        const gmidx = [];
        const vidx = [];
        const gmreportinfo={"result":[]};
        const vreportinfo={"result":[]};
        for(let i=0;i<result.name.length;i++){
            if(result.belong[i]==="소년소녀가장"){
                // report.userreportread(result.id[i]);
                await user.getMemberMyApplyForm(result.id[i]).then(data=>{
                    console.log(data)
                    if(data.status === false){
                        gmreportinfo.result.push("승인완료")
                    }else if(data.status === null){
                        gmreportinfo.result.push("승인대기")
                    }else if(data.status === true ){
                        gmreportinfo.result.push("매칭완료")
                    }
                    else{
                        gmreportinfo.result.push("미작성")
                    }
                })
                gmidx.push(i)
            }
        }
        for(let i=0;i<result.name.length;i++){
            if(result.belong[i]==="봉사자"){
                await user.getMemberMyApplyForm(result.id[i]).then(data=>{
                    console.log(data)
                    if(data.status === false){
                        vreportinfo.result.push("승인완료")
                    }else if(data.status === null){
                        vreportinfo.result.push("승인대기")
                    }else if(data.status === true ){
                        vreportinfo.result.push("매칭완료")
                    }
                    else{
                        vreportinfo.result.push("미작성")
                    }
                })
                vidx.push(i)
            }
        }
            res.render('admin-member',{
                granddata : grandinfo,
                chdata : result,
                gmidx : gmidx,
                vidx : vidx,
                gmreportinfo : gmreportinfo,
                vreportinfo : vreportinfo,
            });
        
    })
    
    
    
        
})
.post(async(req,res,next)=>{
    if(!req.body.delidx){
        console.log("플러서")
        try{
            if(req.body.name == '' || req.body.address==''|| req.body.specialNote==''){
                const grand = new Grand(req.body);
                const info = grand.info();
                res.send("<script>alert('모든 정보를 입력해주세요.');location.href='/admin/member';</script>");
                
            }
            else{
                const grand = new Grand(req.body);
            
                grand.register().then(result =>{
                    if(result.success){
                        res.redirect('/admin/member')
                    }else{
                        const info = grand.info();
                        res.send("<script>alert('정보 저장 실패');location.href='/admin/member';</script>");
    
    
                }
            })
            }
        }catch(err){
            next(err);
        }
    }
    else{
        const grand = new Grand(req.body);
            console.log("1: "+req.body.delidx)
                grand.delete().then(result =>{
                    if(result.success){
                        res.redirect('/admin/member')
                    }else{
                        const info = grand.info();
                        res.send("<script>alert('정보 저장 실패');location.href='/admin/member';</script>");
    
    
                }
            })
    }
    
})
module.exports =router;