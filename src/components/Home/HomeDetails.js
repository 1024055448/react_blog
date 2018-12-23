import React, { Component } from 'react';
import axios from 'axios';
import '../../css/index.css';

class HomeDetails extends Component{
	constructor(props){
		super(props);
		this.state={
			list:[
				
			]
		}
	}
	componentWillMount(){	
		let id=this.props.match.params.id
		console.log(id)
		axios.post('/user/blog/findOneBlog',{ id:id })
		.then((res)=>{
      		if(res.status===200&&res.data.code===0){
      			this.setState({
      				list:res.data.data
      			})
      		}
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	render(){
		//console.log(this.state.list)
		return(
			<div className="homeDetails">
				{
					<div>
						<h2 style={{paddingLeft:'20px;'}}>文章标题：{this.state.list.title}<span style={{float:'right',fontSize:'10px'}}>类型：{this.state.list.aticleType}</span></h2>
						<p style={{float:'right',fontSize:'10px'}}>作者：{this.state.list.username}</p>
						内容：<p style={{fontSize:'20px',background:'#000',color:'#fff'}}>{this.state.list.aticleContent}</p>
						<p className="editTime">编辑日期:{this.state.list.editTime}</p>
					</div>
				}
			</div>
		)
	}
}
export default HomeDetails;