const express = require('express')
const path = require('path');
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');


//创建服务器
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
// console.log(express.static(path.join(__dirname, 'public')))


app.set('view engine', 'ejs')
app.use(expressLayouts);


app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));


app.set('layout', './layouts/main')

const routes =  require('./routes/mtRoutes.js')
app.use('/',routes)

app.listen(port ,() => {
    console.log('监听的端口是' + port)
})