const express=require('express')
const userRouter=require('./user')
const blogRouter=require('./blog')

const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')

const app=express()
app.use(cookieParser())
app.use(bodyParser())
app.use('/user',userRouter)
app.use('/blog',blogRouter)
app.listen(80,function(){
	console.log('start 80')
})