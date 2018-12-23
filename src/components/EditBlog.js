import React, { Component } from 'react';
import axios from 'axios';
import '../css/index.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
    } from "react-router-dom";
import '../css/index.css';
import { Row, Col,Input,Icon,Select,Form,Button } from 'antd';

import storage from '../utils/storage.js';

const {TextArea}=Input;
const Option = Select.Option;
const FormItem = Form.Item;

class EditBlog extends Component{
	constructor(props){
		super(props);
		this.state={
			list:[
				//<Col span={6}>col-6</Col>
			],
			loading:false
		}
	}
	handleChange=(value)=>{
	  console.log();
	}        
	handleBlur=()=> {
	  console.log('blur');
	}
	
	handleFocus=()=> {
	  console.log('focus');
	}
	editSubmit=(e)=>{
		e.preventDefault();
    this.props.form.validateFields((err,values) => {
        axios.post('/user/blog/saveBlog',{
            username:storage.get('username'),
            title:values.title,
            aticleType:values.editType,
            aticleContent:values.edit_content
        })
        .then((res)=>{
            if(res.status===200&&res.data.code===0){
                this.setState({ 
                    loading: true 
                })
                this.props.history.push('/home');
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    })
		
		

	}
	render(){
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="editBlog">
				<h2>Edit</h2>
				<div>
				  <Form onSubmit={this.editSubmit}>
  				  	<Row>
  				  		<FormItem>
  				  			{
  				  				getFieldDecorator('editType', {
    						  		initialValue: 'emotion',
    							})(
    							<Select
  								  showSearch
  								  style={{ width: 200,float:'right' }}
  								  placeholder="选择一个种类"
  								  optionFilterProp="children"
  								  onChange={this.handleChange}
  								  onFocus={this.handleFocus}
  								  onBlur={this.handleBlur}
  								  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  								>
  					  				<Option value="emotion">情感</Option>
  					  				<Option value="game">游戏</Option>
  					  				<Option value="technology">技术</Option>
  					  				<Option value="riji">随笔日记</Option>
  					  				<Option value="other">其他</Option>
  								</Select>

    							)

  				  			}
  				  			<span style={{ float:'right',fontSize:'18px'}}>请选择类别：</span>
							{
								getFieldDecorator('title',{
									rules: [{required:true,message:'请输入文章标题！'}],
								})
								(
									<Input prefix={<Icon type="user" style={{ color:'rgba(0,0,0,.25)' }} />} placeholder="用户名" style={{ width: '70%',float:'left' }} /> 
								)
							}
						</FormItem>
  				  	</Row>
  				  	<Row>
  				     	<div style={{ margin: '24px 0' }} />
  				     	<FormItem>
  				     		{
  				     			getFieldDecorator('edit_content',{
  				     				rules: [{required:true,message:'请输入内容！'}],
  				     			})
  				     			(
  				     				<TextArea placeholder="请在此处输入文章内容" autosize={{ minRows: 6, maxRows: 12 }} />
  				     			)
  				     		}
  				     	</FormItem>
  				  	</Row>
  				  	<Row>
  				   		<Button type="primary" htmlType="submit" loading={this.state.loading}>
        				   提交文章
        				</Button>
  				  	</Row>
  				  </Form>
  				</div>
			</div>
		)
	}
}
const WrappedNormalEditForm = Form.create()(EditBlog);


export default WrappedNormalEditForm;