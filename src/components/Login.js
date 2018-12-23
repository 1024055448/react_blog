import React, { Component } from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import '../css/index.css';
import storage from '../utils/storage.js';
const FormItem = Form.Item;

class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			loginFlag:false
		}
	}
	doLogin=(e)=>{
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
      		if (!err) {
        		console.log('Received values of form: ', values);
        		axios.post('/user/login',{
        			username:values.username,
        			password:values.password
        		})
        		.then((res)=>{
      				if(res.status===200&&res.data.code===0){
      					storage.set('username',values.username);
      					this.props.history.push('/home');
      					//this.props.history.push('/home',{
      					//	state:{
      					//		username:values.username
      					//	}
      					//});
      					//<Link to={`/pcontent/${v._id}`}></Link>
						//this.props.history.push('/user/'+'2' )
      				}else if(res.data.code===1){
      					alert('用户名错误,请注册或重新登录！')
      				}else if(res.data.code===2){
      					alert('密码错误，请重新输入')
      				}
      			})
      		}
    	});
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="login">

				<div className="login-form">
					<Form onSubmit={this.doLogin}>
						<center><h2>登&nbsp;&nbsp;录</h2></center>
						<br/>
						<FormItem>
							{
								getFieldDecorator('username',{
									rules: [{required:true,message:'请输入用户名'}],
								})
								(
									<Input prefix={<Icon type="user" style={{ color:'rgba(0,0,0,.25)' }} />} placeholder="用户名" /> 
								)
							}
						</FormItem>
						<FormItem>
							{
								getFieldDecorator('password',{
									rules:[{required:true,message:'请输入密码'}],
								})
								(
									<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />} type="password" placeholder="密码" />
								)
							}
						</FormItem>
						<FormItem>
							{
								getFieldDecorator('remember',{
									valuePropName:'checked',
									initialValue:true,
								})
								(
									<Checkbox>记住我</Checkbox>
								)
							}
							<a className="login-form-forgot" href="">忘记密码</a>
							<Button type="primary" htmlType="submit" className="login-form-button">
								登录
							</Button>
							或者<a href="/register">注册</a>
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
}
const WrappedNormalLoginForm = Form.create()(Login);


export default WrappedNormalLoginForm;