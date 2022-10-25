const path = require('path');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/User');
const app = express();

router.route('/')
.get(async (req,res,next)=>{
    try{
        req.session.destroy(err=>{
            if(err){
                console.log(err);
            }
            res.redirect('/');
        })


    }catch(err){
        console.log(err);
        next(err);
    }

})






module.exports =router;