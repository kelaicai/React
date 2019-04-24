import React from 'react';
import {
  Row,
  Col
} from 'antd';

import {
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Checkbox,
  Modal,
  Button
} from 'antd';


import {Link} from 'react-router-dom';
const TabPane=Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;

class PCHeader extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        current: 'top',
        modalVisible: false,
        action: 'login',
        hasLogined: false,
        userNickName: '',
        userid: 0
      };
    };


      setModalVisible(value)
	    {
		     this.setState({modalVisible: value});
	    };

      setModalUnvisible()
	    {
		      this.setState({modalVisible: false});
	    };

    	handleClick(e)
      {
    		if(e.key == "register")
         {
    			this.setState({current: 'register'});
    			this.setModalVisible(true);
    		  }
          else
    			{
    				this.setState({current: e.key});
    			}
    	};

    	handleSubmit(e)
    	{
    		//页面开始向 API 进行提交数据
    		e.preventDefault();
    		var myFetchOptions = {
    			method: 'GET'
    		};
    		var formData= this.props.form.getFieldsValue();
    		console.log(formData);
    		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
    		+ "&username="+formData.userName+"&password="+formData.password
    		+"&r_userName=" + formData.r_userName + "&r_password="
    		+ formData.r_password + "&r_confirmPassword="
    		+ formData.r_confirmPassword, myFetchOptions)
    		.then(response => response.json())
    		.then(json => {
    			this.setState({userNickName: json.NickUserName, userid: json.UserId});
    		});
    		if (this.state.action=="login") {
    			this.setState({hasLogined:true});
    		}
    		message.success("请求成功！");
    		this.setModalVisible(false);
    	};

    	login()
      {
    		this.setModalVisible(true);
    	};

    	callback(key)
      {
    		if (key == 1) {
    			this.setState({action: 'login'});
    		} else if (key == 2) {
    			this.setState({action: 'register'});
    		}
    	};


    render()
    {
      let {getFieldProps} = this.props.form;
      const userShow = this.state.hasLogined ?
        < Menu.Item key = 'logout' class = 'register' >
        < Button type = 'primary' htmlType = 'button' >
         {this.state.userNickName}
         < /Button>
        &nbsp; & nbsp;
        <Link to = '_blank '>
        <Button type = 'dashed' htmlType = 'button' >个人中心 </Button>
        </Link> &nbsp; & nbsp;
        <Button type = 'ghost' htmlType = 'button' >退出 </Button> </Menu.Item>:<Menu.Item key = 'register'class = 'register' >
        <Icon type = 'appstore' / > 注册 / 登录 </Menu.Item>;
      return ( <
        header >
        <Row >
        <Col span = {2} > < /Col>
        <Col span = {4} >
        <a href = "/"class = "logo" >
        <img src = "./src/images/logo.png" alt = "logo" / >
        <span > 实验设备管理系统 < /span> < /a > </Col>
        <Col span = {16} >
        <Menu mode = 'horizontal' selectedKeys = {[this.state.current]} onClick={this.handleClick.bind(this)} >
        {userShow}
        </Menu>
        <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
         onCancel= {this.setModalUnvisible.bind(this)} onOk={this.setModalUnvisible.bind(this)} okText = "关闭">
							<Tabs type="card">
								<TabPane tab="注册" key="2">
									<Form horizontal="true" onSubmit={this.handleSubmit.bind(this)}>
                  <FormItem label="账户">
											<Input placeholder="请输入您的账号" {...getFieldProps('r_userName')}/>
										</FormItem>
										<FormItem label="密码">
											<Input type="new-password" placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
										</FormItem>
										<FormItem label="确认密码">
											<Input type="new-password" placeholder="请再次输入您的密码" {...getFieldProps('r_confirmPassword')}/>
										</FormItem>
										<Button type="primary" htmlType="submit" >注册</Button>
									</Form>
								</TabPane>

                <TabPane tab="登陆" key="1">
									<Form horizontal="true" onSubmit={this.handleSubmit.bind(this)}>
                  <FormItem label="账户">
											<Input placeholder="请输入您的账号" {...getFieldProps('r_userName')}/>
										</FormItem>
										<FormItem label="密码">
											<Input type="new-password" placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
										</FormItem>
										<Button type="primary" htmlType="submit" >登陆</Button>
									</Form>
								</TabPane>
							</Tabs>
						</Modal>
        < /
        Col > <
        Col span = {
          2
        } > < /Col> < /
        Row > <
        /header>);
      }
    }
export default PCHeader = Form.create({})(PCHeader);
