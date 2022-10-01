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
const PORT = 3000;

dotenv.config();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.json())
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

//라우트
const mainPageRoute = require('./routes/mainPageRoute');
const loginPageRoute = require('./routes/loginPageRoute');
const logoutPageRoute = require('./routes/logoutPageRoute');
const signupPageRoute = require('./routes/signupPageRoute');

app.use('/',mainPageRoute);
app.use('/login',loginPageRoute);
app.use('/logout',logoutPageRoute);
app.use('/signup',signupPageRoute);







server.listen(PORT, () => console.log(PORT+`Port Server is open!!`))

module.exports = app;