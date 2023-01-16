const path = require('path');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ApplyFormStorage = require('../models/ApplyFormStorage');
const app = express();

router.route('/')


router.route('/:id')
.get(async(req,res,next)=>{
    try{
        if(req.session.user!=undefined){
            if(req.session.user.id === "admin"){
                const id = req.params.id;

            ApplyFormStorage.getApplyFormById(id).then(report=>{
                
                if(report.id){
                    if(report.status==false){
                        res.render('admin-matching_aplly_false',{
                            id : report.id,
                            name : report.name,
                            tel : report.tel,
                            address : report.address,
                            motive : report.motive
                        })
                    }
                    else if(report.status==true){
                        
                        res.render('admin-matching_aplly_false',{
                            id : report.id,
                            name : report.name,
                            tel : report.tel,
                            address : report.address,
                            motive : report.motive
                        })
                    }
                    else{
                        res.render('admin-matching_aplly',{
                            id : report.id,
                            name : report.name,
                            tel : report.tel,
                            address : report.address,
                            motive : report.motive
                        })
                    }
                    
                }
                else{
                    res.redirect('/admin/member')
                    
                }
            
        })
            }
            else{
            res.redirect('/');
            }
        }
    else{res.redirect('/');}
        
        
    }catch(err){
        console.log(err)
        next(err);
    }
})   
.post(async (req,res,next)=>{
    // console.log("req.id ==",req.body.id);
    ApplyFormStorage.matchingcf(req.body.id)
    // ApplyFormStorage.getApplyFormById(req.body.id).then(report=>{
// })
res.redirect("/admin/member")
    })   

    

module.exports =router;