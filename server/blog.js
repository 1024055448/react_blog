const express=require('express')
const DB_Router=express.Router()
const model=require('./model')
const utils=require('utility')
//用户相关
DB_Router.get('/list',function(req,res){
	Blog.find({},function(err,doc){
		return res.json(doc)
	})
})
//
DB_Router.post('/saveBlog',function(req,res){
	const {username,title,aticleType,aticleContent,editTime}=req.body
	editTime=new Date();
	editTime=editTime.format("YYYY-MM-DD HH:MM:SS")
	Blog.create({username:username,title:title,aticleType:aticleType,aticleContent:aticleContent,editTime:editTime},function(e,d){
		if(e){
			return res.json({code:1,msg:'后台出错了'})
		}
		return res.json({code:0},msg:'创建成功')
	})
})

module.exports = DB_Router