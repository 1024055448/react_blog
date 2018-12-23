const express=require('express')
const userRouter=require('./server/user')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')

const app=express()
app.use(cookieParser())
app.use(bodyParser())
app.use('/user',userRouter)
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type=application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', true) //支持跨域传cookie
  // res.header("X-Powered-By", ' 3.2.1')
  // res.header("Content-Type", "application/json;charset=utf-8");

  if (req.method == 'OPTIONS') {
    console.log('option');
    //res.sendStatus(200); /让options请求快速返回/
  }
  else {
    next();
  }
});
app.listen(3000,function(){
	console.log('start 3000')
})