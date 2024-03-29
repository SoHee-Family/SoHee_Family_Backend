const path = require('path');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const Report = require('../models/Report');
const User = require('../models/User');
const ReportStorage = require('../models/ReportStorage');

router.route('/')
.get(async (req,res,next)=>{
    if(req.session.user!=undefined){
        if(req.session.user.id ==="admin"){
            const reports = new Report();
            const reportsdata = await reports.userreportread();
            // console.log(reportsdata);
            res.render('admin-report',{
                    reportsdata : reportsdata,
                });
        }else{
            res.redirect('/');
        }
    }
    else{res.redirect('/');}
    
        
})
.post(async (req,res,next)=>{
        
    })


module.exports =router;