const path = require('path');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const Report = require('../models/Report');
const ReportStorage = require('../models/ReportStorage');


try {
	fs.readdirSync('uploads'); // 폴더 확인
} catch(err) {
	console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.');
    fs.mkdirSync('uploads'); // 폴더 생성
}

const upload = multer({
    storage: multer.diskStorage({ // 저장한공간 정보 : 하드디스크에 저장
        destination(req, file, done) { // 저장 위치
            done(null, 'uploads/'); // uploads라는 폴더 안에 저장
        },
        filename(req, file, done) { // 파일명을 어떤 이름으로 올릴지
            const ext = path.extname(file.originalname); // 파일의 확장자
            // done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 파일이름 + 날짜 + 확장자 이름으로 저장
            done(null, uuidv4()+ ext); // 파일이름 + 날짜 + 확장자 이름으로 저장
        }
    }),
    limits: { fileSize: 10 * 1024 * 1024 } // 10메가로 용량 제한
});


router.route('/')
.get(async (req,res,next)=>{
    try{
        if(req.session.user!=undefined){
            // console.log(req.session.user.belong);
            res.render('reportApplyPage',{
                name : req.session.user.name,
                belong : req.session.user.belong
            });
        }else{
            res.redirect('/');
        }
        
    } catch(err){
        console.log(err);
        next(err);
    }
})

.post(upload.fields([{ name: 'activity_img', limits: 2 }, { name: 'design_img' }]), // 배열 객체를 넣는다.
(req, res) => {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var newDate =  year + "/" +month + "/" + day + "  " +hour+":"+minute;
    
    const reportForm = {
        date : newDate,
        id : req.session.user.id,
        name : req.body.name,
        older_name : req.body.older_name,
        belong : req.body.belong,
        report : req.body.report
    }
    
    const report = new Report(reportForm);
    try{
        report.submit(req.files.activity_img[0].filename,req.files.design_img[0].filename).then(result =>{
            if(result.success){
                res.redirect('/mypage');
            }else{
                console.log(result.msg);
                res.redirect('/mypage')
            }
        })
    }catch(err){
        // console.log(err);
        res.send("<script>alert('모든 항목을 작성해 주세요.');location.href='/report';</script>");
    }
    
});


router.route('/:uuid')
.get(async(req,res,next)=>{
    const uuid = req.params.uuid;
    try{
        ReportStorage.getReportByUUID(uuid).then(report=>{
        res.render('reportGetPage',{
            name : req.session.user.name,
            date : report.date,
            older_name : report.older_name,
            belong : report.belong,
            activity_img : report.activity_img,
            design_img : report.design_img,
            report : report.report,
            uuid : report.uuid
        })
        })

    }catch(err){
        console.log(err)
        next(err);
    }
    
})

router.route('/update/:uuid')
.get(async(req,res,next)=>{
    try{
        const uuid = req.params.uuid;
        ReportStorage.getReportByUUID(uuid).then(report=>{
        res.render('reportUpdatePage',{
            name : req.session.user.name,
            date : report.date,
            older_name : report.older_name,
            belong : report.belong,
            activity_img : report.activity_img,
            design_img : report.design_img,
            report : report.report,
            uuid : report.uuid
        })
    })
    }catch(err){
        console.log(err)
        next(err);
    }
})
.post(upload.fields([{ name: 'activity_img', limits: 2 }, { name: 'design_img' }]), // 배열 객체를 넣는다.
(req, res) => {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var newDate =  year + "/" +month + "/" + day + "  " +hour+":"+minute;
    
    const reportForm = {
        date : newDate,
        id : req.session.user.id,
        name : req.body.name,
        older_name : req.body.older_name,
        belong : req.body.belong,
        report : req.body.report
    }
    
    const report = new Report(reportForm);
    const uuid = req.params.uuid;
    try{
        report.submit(req.files.activity_img[0].filename,req.files.design_img[0].filename).then(saveResult =>{
            if(saveResult.success){
                
                ReportStorage.delete(uuid, req.session.user.id).then(deleteResult=>{
                    if(deleteResult.success){
                        res.redirect(`/report/${saveResult.uuid}`);
                    }else{
                        res.send("<script>alert('모든 항목을 작성해 주세요.');location.href='/report/update/"+uuid+"';</script>");
                        next(result.msg);
                    }
                }) 

                
            }else{
                res.send("<script>alert('모든 항목을 작성해 주세요.');location.href='/report/update/"+uuid+"';</script>");
                // console.log(result.msg);
                // res.redirect('/mypage')
            }
        })
    }catch(err){
        // console.log(err);
        res.send("<script>alert('모든 항목을 작성해 주세요.');location.href='/report/update/"+uuid+"';</script>");
    }
    
});


router.route('/remove/:uuid')
.get(async(req,res,next)=>{
    
    const uuid = req.params.uuid;
    ReportStorage.delete(uuid, req.session.user.id).then(result=>{
        if(result.success){
            res.redirect('/mypage')
        }else{
            next(result.msg);
        }
    })    
})


module.exports =router;