import React from 'react';
import {
  Layout, Menu, Breadcrumb, Icon,Button
} from 'antd';
import 'antd/dist/antd.css';
import Home from './home';
import '../../css/home-page.css';
const {
  Header, Content, Footer, Sider,
} = Layout;
import PersonInfo from './personinfo';
import Cookies from 'js-cookie';

import SysInfo from './sysinfo';

import {Link} from 'react-router-dom';
const SubMenu = Menu.SubMenu;

export default class SiderRoot extends React.Component {
  state = {
    collapsed: false,
    deviceList:[],
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  onClick(e)
  {
    var url="http://localhost:8070/user/logout";
    var myFetchOptions = {
      method: 'GET',
      // mode:'no-cors',
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      },
      timeout:10000,
    };


    //向服务器发送退出消息
    fetch(url,myFetchOptions)
    .then(
      res=>res.json())
    .then(
      json => {
      console.log(json);
      // 设置状态
      this.setState({
        status: json.status
      });
    });
    //消除sessionStorage中的存取的状态信息
    Cookies.remove('workId', { path: '/' });
    Cookies.remove('player', { path: '/' });
    Cookies.remove('hasLogined', { path: '/' });

  }

  openChange(e)
  {
    // console.log(e);
    if(e=="sub1")
    {
      // console.log('sub1');
      console.log(this.props.children);

    }
    else if(e=="sub2")
    {
      // console.log("sub2");
    }
    else
    {
      // console.log("sub3");
    }
  }
  render() {
    const {children}=this.props;
    return (
      <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="siderlogo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.onClick.bind(this)}
          onOpenChange={this.openChange.bind(this)}
          >
          <PersonInfo/>
          <SubMenu
            key="sub1"
            title={<span><Icon type="appstore"

            /><span>实验设备管理</span></span>}
          >
            <Menu.Item key="1"><Link to="/sys/rootQuery/">系统信息管理</Link></Menu.Item>
          </SubMenu>

            <SubMenu
              key="sub2"
              title={<span><Icon type="desktop" /><span>报废审核</span></span>}
            >
              <Menu.Item key="2"><Link to="/sys/verify/">报废审核</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={<span><Icon type="desktop"
               /><span>系统管理</span></span>}
            >
              <Menu.Item key="4"><Link to="/sys/userApply/">添加新的设备管理员</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/sys/userSearch/">设备管理员列表</Link></Menu.Item>
            </SubMenu>
            <SubMenu
            key="sub4"
            title={<span><Icon type="appstore"/><span>工作交流</span></span>}
            >
            <Menu.Item key="12">
              <Icon type="message" />
              <span><Link to="/sys/conmunication">工作交流</Link></span>
            </Menu.Item>
            </SubMenu>

            <Menu.Item key="14">
              <span><Link to="/sys/info">系统消息查看</Link></span>
            </Menu.Item>

            <Menu.Item key="15">
              <span><Button ghost="true" icon='poweroff' style={{marginTop:15}} href='http://127.0.0.1:8080/#/login' onClick={this.onClick.bind(this)}>退出</Button></span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
      </div>
    );
  }
}
