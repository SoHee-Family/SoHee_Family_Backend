const path = require('path');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Matching = require('../models/matching');
const ApplyForm = require('../models/ApplyForm');
const Grand = require('../models/grand');
const app = express();
router.route('/')

.get(async (req,res,next)=>{
    if(req.session.user!=undefined){
        if(req.session.user.id ==="admin"){
            const matching = new Matching();
                const info = await matching.info();
                // console.log(info)
                res.render('admin-matching_status',{
                    info : info,
                });
        }else{
            res.redirect('/');
        }
    }
    else{res.redirect('/');}
    
            
        })
.post(async (req,res,next)=>{
    const matching = new Matching(req.body);
    const applyForm = new ApplyForm();
    const grand = new Grand();
    const info = await matching.info();
    const id = info.id[req.body.delidx]
    // console.log(id)
    grand.del(info.older[req.body.delidx]);
    applyForm.delete(id)
    matching.delete().then(result =>{   
    res.redirect('/admin/matching/status')
    
            })
})

module.exports =router;