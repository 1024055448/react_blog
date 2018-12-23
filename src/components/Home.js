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
import {
  Layout, Menu, Breadcrumb, Icon,Table, Button
} from 'antd';

import EditBlog from './EditBlog.js';
import HomeContent from './Home/HomeContent.js';
import HomeDetails from './Home/HomeDetails.js';

import storage from '../utils/storage.js';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			list:[

			],
			username:''
		}
	}
	componentDidMount=()=>{
		  //let username=this.props.location.state.state.username
		  this.setState({
          username: storage.get('username')
      })
	}
	render(){
		return(
			<Layout>
  			    <Header className="header">

  			      <div className="home">欢迎您 , {this.state.username}</div>
  			      <Menu
  			        theme="dark"
  			        mode="horizontal"
  			        defaultSelectedKeys={['1']}
  			        style={{ lineHeight: '64px' }}
  			      >
  			      	<Menu.Item key="1"><Link to="/home">主页</Link></Menu.Item>
              		<Menu.Item key="2"><Link to="/home/edit"> 编辑</Link></Menu.Item>
  			        <Menu.Item key="3"><Link to="/usermain/">个人中心</Link></Menu.Item>
  			        <div className="Logout"><Link to ="/">退出</Link></div>

  			      </Menu>
  			    </Header>
  			    <Layout>
  			      <Sider width={200} style={{ background: '#fff' }}>
  			        <Menu
  			          mode="inline"
  			          defaultSelectedKeys={['1']}
  			          defaultOpenKeys={['sub1']}
  			          style={{ height: '100%', borderRight: 0 }}
  			        >
  			          <SubMenu key="sub1" title={<span><Icon type="user" />列表 1</span>}>
  			            <Menu.Item key="1">列表1</Menu.Item>
  			            <Menu.Item key="2">列表2</Menu.Item>
  			            <Menu.Item key="3">列表3</Menu.Item>
  			            <Menu.Item key="4">列表4</Menu.Item>
  			          </SubMenu>
  			          <SubMenu key="sub2" title={<span><Icon type="laptop" />列表 2</span>}>
  			            <Menu.Item key="5">列表5</Menu.Item>
  			            <Menu.Item key="6">列表6</Menu.Item>
  			            <Menu.Item key="7">列表7</Menu.Item>
  			            <Menu.Item key="8">列表8</Menu.Item>
  			          </SubMenu>
  			          <SubMenu key="sub3" title={<span><Icon type="notification" />列表 3</span>}>
  			            <Menu.Item key="9">列表9</Menu.Item>
  			            <Menu.Item key="10">列表10</Menu.Item>
  			            <Menu.Item key="11">列表11</Menu.Item>
  			            <Menu.Item key="12">列表12</Menu.Item>
  			          </SubMenu>
  			        </Menu>
  			      </Sider>
  			      <Layout style={{ padding: '0 24px 24px' }}>

  			        <Content style={{
  			          background: '#fff', padding: 24, margin: 0, minHeight: 280,
  			        }}
  			        >  			   
  			        <Route exact path="/home" breadcrumbName="/home" component={HomeContent}/>
  			        <Route path="/home/edit" breadcrumbName="/home/edit" component={EditBlog}/>
                <Route path="/home/detail/:id" breadcrumbName="/home/detail" component={HomeDetails}/>
  			        
  			        </Content>
  			      </Layout>
  			    </Layout>
  			</Layout>
		)
	}
}
export default Home;