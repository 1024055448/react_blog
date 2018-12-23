const mongoose=require('mongoose')
const DB_URL='mongodb://localhost:27017/fz_db';
mongoose.connect(DB_URL)
// mongoose.connection.on('connected',function(){
//     console.log('mongo connect success');
// })
const models={
	user:{
		'username':{'type':String,'require':true},
		'password':{'type':String,'require':true}
	},
	blog:{
		'username':{'type':String,'require':true},
		'title':{'type':String,'require':true},
		'aticleType':{'type':String,'require':true},
		'aticleContent':{'type':String,'require':true},
		'editTime':{'type':Date,'require':true}
	}
}
for(let m in models){
	mongoose.model(m,new mongoose.Schema(models[m]))
}
module.exports={
	getModel:function(name){
		return mongoose.model(name)
	}
}