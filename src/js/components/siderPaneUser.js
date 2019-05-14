import React from 'react';
import {
  Layout, Menu, Breadcrumb, Icon,Button,
} from 'antd';
import 'antd/dist/antd.css';
import Home from './home';
import '../../css/home-page.css';
const {
  Header, Content, Footer, Sider,
} = Layout;

import {Link} from 'react-router-dom';
const SubMenu = Menu.SubMenu;

export default class SiderUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    collapsed: false,
    deviceList:[],
  }
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
    })
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
          <SubMenu
            key="sub1"
            title={<span><Icon type="appstore"

            /><span>实验设备管理</span></span>}
          >
          <Menu.Item key="1"><Link to="/user/userQuery/">设备整体信息管理</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/user/deviceApply/">新设备提交</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/user/deviceSearch/">设备信息</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={<span><Icon type="desktop"
             /><span>设备使用</span></span>}
          >
            <Menu.Item key="4"><Link to="/user/deviceUsingApply">使用记录提交</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/user/deviceUsingSearch">使用记录</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={<span><Icon type="desktop"
             /><span>设备维护</span></span>}
          >
            <Menu.Item key="6"><Link to="/user/deviceMaintenanceApply/">维护记录提交</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/user/deviceMaintenanceSearch/">维护情况</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={<span><Icon type="desktop"
             /><span>设备报废</span></span>}
          >
            <Menu.Item key="8"><Link to="/user/deviceDiscardApply">报废记录提交</Link></Menu.Item>
            <Menu.Item key="9"><Link to="/user/deviceDiscardSearch">报废查看</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub5"
            title={<span><Icon type="desktop"
             /><span>设备变更</span></span>}
          >
            <Menu.Item key="10"><Link to="/user/deviceChangeApply">变更记录提交</Link></Menu.Item>
            <Menu.Item key="11"><Link to="/user/deviceChangeSearch">变更记录查看</Link></Menu.Item>
          </SubMenu>


            <SubMenu
            key="sub5"
            title={<span><Icon type="appstore"/><span>工作交流</span></span>}
            >
            <Menu.Item key="12">
              <Icon type="message" />
              <span><Link to="/sys/conmunication">工作交流</Link></span>
            </Menu.Item>
            </SubMenu>
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
