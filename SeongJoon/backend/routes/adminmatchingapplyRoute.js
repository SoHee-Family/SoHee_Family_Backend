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
        const id = req.params.id;
        console.log(id)
        ApplyFormStorage.getApplyFormById(id).then(report=>{
            console.log(report.motive)
        res.render('admin-matching_aplly',{
            id : report.id,
            name : report.name,
            tel : report.tel,
            address : report.address,
            motive : report.motive
        })
    })
    }catch(err){
        console.log(err)
        next(err);
    }
})     
.post(async (req,res,next)=>{
    console.log("req.id ==",req.body.id);
    ApplyFormStorage.matchingcf(req.body.id)
    // ApplyFormStorage.getApplyFormById(req.body.id).then(report=>{
// })
res.redirect("/admin/member")
    })   

    

module.exports =router;