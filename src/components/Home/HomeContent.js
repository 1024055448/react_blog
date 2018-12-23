import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import { Card, Col, Row } from 'antd';
import '../../css/index.css';
import moment from "moment";
import storage from '../../utils/storage.js';

class HomeContent extends Component{
	constructor(props){
		super(props);
		this.state={
			list:[
				
			]
		}
	}
	componentDidMount(){
		let usr=storage.get('username')
		axios.post('/user/blog/list',{
			username:usr
		})
		.then((res)=>{
			console.log(res.data)
			this.setState({
				list:res.data
			})
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	render(){
		return (
			<div className="homeContent">
				<h2>文章列表</h2>
				<Row gutter={16}>
  			        {
  			        	this.state.list.map((value,key)=>{
  			         		if(!value){
  			        			return (<p key={key}>没有数据</p>)
  			        		}
  			           		let time=moment(value.editTime).format('YYYY-MM-DD HH:mm:ss')
  			        		return (
  			        		      <Col span={8}>
  			        			 <Card key={key}
 								  title={<div><h2>{value.title}</h2><br/>文章类型:{value.aticleType}</div>}
 								  extra={<div><p className={value._id}>{value.username}</p><Link to ={`/home/detail/${value._id}`}>More...</Link></div>}
 								  style={{ width: 300 }}
 								>
  			        				文章内容:<p>{value.aticleContent}</p>
  			        				<p style={{float: 'right',fontSize:'10px'}}>{time}</p>
 								</Card>
 								</Col>
  			        		)
  			        	})
  			        }
  			    </Row>
			</div>
		)
	}
}
export default HomeContent;