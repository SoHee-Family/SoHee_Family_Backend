
const path = require('path'); // 경로 설정 모듈 
const express = require('express'); // 서버 구성 모듈
const bodyParser = require('body-parser');
const http = require('http');

const session = require('express-session');
const dotenv = require('dotenv'); // env 파일 사용을 위한 모듈
const nunjucks = require('nunjucks'); // view engine 모듈
const cookieParser = require('cookie-parser');
const app = express();
const server = http.createServer(app);

dotenv.config();

app.set('port',process.env.PORT || 3000);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    httpOnly: true,
    secure: false,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : false,
    cookie:{
        httpOnly: false,
        secure: false
    }
}));




app.set('view engine', 'html');
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
});




// route

const mainPageRoute = require('./routes/mainPageRoute');
const loginPageRoute = require('./routes/loginPageRoute');
const logoutPageRoute = require('./routes/logoutPageRoute');
const signUpPageRoute = require('./routes/signUpPageRoute');
const adminMemberRoute = require('./routes/adminMemberRoute');
const adminRoute = require('./routes/adminRoute');
const adminReportRoute= require('./routes/adminReportRoute');
const myPageRoute = require('./routes/myPageRoute');
const matchingApplyRoute = require('./routes/matchingApplyPageRoute');
const reportRoute = require('./routes/reportPageRoute');
const adminMatchingMenegement = require('./routes/adminMatchingManegementRoute');
const adminMatchingStatus=require('./routes/adminMatchingStatusRoutes')
const adminMatching=require('./routes/adminMatchingRoutes');
const adminapply=require('./routes/adminmatchingapplyRoute');

app.use('/admin/member/aplly',adminapply);
app.use('/admin/matching',adminMatching);
app.use('/admin/matching/manegement',adminMatchingMenegement);
app.use('/admin/matching/status',adminMatchingStatus);
app.use('/mypage', myPageRoute);
app.use('/apply',matchingApplyRoute);
app.use('/admin/report',adminReportRoute)
app.use('/report',reportRoute);
app.use('/',mainPageRoute);
app.use('/login',loginPageRoute);
app.use('/logout',logoutPageRoute);
app.use('/signup',signUpPageRoute);
app.use('/admin/member',adminMemberRoute);
app.use('/admin',adminRoute);


server.listen(process.env.PORT, () => console.log(process.env.PORT+`Port Server is open!!`))

module.exports = app;