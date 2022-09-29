const path = require('path');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();


router.route('/')
.get(async (req,res,next)=>{
    try{
        if(req.session.user){
            res.render('loggedMainPage',{
                name: req.session.user.name})
        }
        else { 
             res.render('mainPage');
        }
    }catch(err){
        console.log(err);
        next(err);
    }
    
})


module.exports = router ;