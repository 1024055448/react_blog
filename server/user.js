const express=require('express')
const DB_Router=express.Router()
const model=require('./model')
const User=model.getModel('user')
const Blog=model.getModel('blog')
var mongoose = require('mongoose');
const utils=require('utility')
//用户相关
DB_Router.get('/list',function(req,res){
	User.find({},function(err,doc){
		return res.json(doc)
	})
})
//登录
DB_Router.post('/login',function(req,res){
	const {username,password}=req.body
	User.findOne({username:username},function(err,doc){
		if(!doc){
			return res.json({code:1,msg:'用户名错误,请注册或重新登录！'})
		}
		if(md5Pwd(req.body.password)==doc.password){
			res.cookie('userid',doc._id)
			return res.json({code:0,data:doc})
		}else{
			return res.json({code:2,msg:'密码错误'})
			//alert('密码错误')
		}
		
	})
})
//注册
DB_Router.post('/register',function(req,res){
	//res.header('Access-Control-Allow-Origin', "http://localhost:3000");
	console.log(req+'-------'+res)
	const {username,password}=req.body
	User.findOne({username},function(err,doc){
		if(doc){
			return res.json({code:1,msg:'用户名重复'})
		}
		User.create({username:username,password:md5Pwd(password)},function(e,d){
			if(e){
				return res.json({code:1,msg:'后端出错了'})
			}
			return res.json({code:0})
		})
	})
})
DB_Router.get('/info',function(req,res){
	return res.json({code:1})
})
//获取所有的list
DB_Router.post('/blog/list',function(req,res){
	var usr=req.body.username
	Blog.find({'username':usr},function(err,doc){
		return res.json(doc)
	})
})
//获取某个id的list
DB_Router.post('/blog/findOneBlog',function(req,res){
	const id=req.body.id
	var fid=mongoose.Types.ObjectId(id);

	Blog.findOne({'_id':fid},function(err,doc){
		if(!err){
			return res.json({code:0,data:doc})
		}else{
			console.log(err)
		}
	})
})
//保存blog的list
DB_Router.post('/blog/saveBlog',function(req,res){
	const {username,title,aticleType,aticleContent}=req.body
	console.log(req.body)
	let editTime=new Date();
	//editTime=editTime.format("YYYY-MM-DD HH:MM:SS")
	editTime.toLocaleString();
	console.log(editTime)
	Blog.create({username:username,title:title,aticleType:aticleType,aticleContent:aticleContent,editTime:editTime},function(e,d){
		if(e){
			return res.json({code:1,msg:'后台出错了'})
		}
		return res.json({code:0,msg:d})
	})
})
function md5Pwd(pwd){
    const salt = 'th_is_good_5555dsd54567!2##~!ww'
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = DB_Router