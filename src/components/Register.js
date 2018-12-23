import React, { Component } from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import '../css/index.css';
const FormItem = Form.Item;

class Register extends Component{
	constructor(props){
		super(props);
		this.state={
			registerFlag:false,
			username:'',
			password:''
		}
	}
	doReg=(e)=>{
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
      		if (!err) {
        		console.log('Received values of form: ', values);
      		}
    	});
	}
	RegVaild=(e)=>{
		e.preventDefault();
		this.props.form.validateFields((err,values) => {
      		if (!err) {
      			console.log(values)
      			if(values.repassword==values.password){
     				//  this.setState({
					// 	registerFlag:true
					// })
      				//if(this.state.registerFlag){
      					this.setState({
      						username:values.username,
      						password:values.password
      					})
      					axios.post('/user/register',{username:values.username,password:values.password})
      					.then((res)=>{
      						if(res.status===200&&res.data.code===0){
      							this.props.history.push('/');
      						}else if(res.data.code===1){
      							alert('用户名重复，请重新注册')
      						}else{
      							console.log('xxxxx')
      						}
      					})
      						
					//}
				}else{
					alert('两次输入密码不正确，请重新输入')
				}
      		}
    	});
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="register">
				<div className="register-form">
					<Form onSubmit={this.doReg}>
						<center><h2>注&nbsp;&nbsp;册</h2></center>
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
								getFieldDecorator('repassword',{
									rules:[{required:true,message:'请输入密码'}],
								})
								(
									<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />} type="password" placeholder="确认密码" />
								)
							}
							<Button type="primary" htmlType="submit" onClick={this.RegVaild} className="login-form-button">
								注册
							</Button>
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
}
const WrappedNormalRegForm = Form.create()(Register);


export default WrappedNormalRegForm;