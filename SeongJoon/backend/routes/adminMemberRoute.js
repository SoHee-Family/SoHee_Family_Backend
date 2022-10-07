const path = require('path');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Grand = require('../models/grand');
const app = express();

router.route('/')
.get(async (req,res,next)=>{
    
    const grand = new Grand();
    const info = await grand.info();
        res.render('admin-member',{
            data : info
        });
        
})
.post(async(req,res,next)=>{
    if(!req.body.delidx){
        console.log("플러서")
        try{
            // if(req.body.psword == null)
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