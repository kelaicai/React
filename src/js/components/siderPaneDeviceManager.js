import React from 'react';
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import 'antd/dist/antd.css';
import Home from './home';
import '../../css/home-page.css';
const {
  Header, Content, Footer, Sider,
} = Layout;

import {Link} from 'react-router-dom';
const SubMenu = Menu.SubMenu;

export default class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    deviceList:[],
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  onClick=(e)=>{
    console.log(e.key);
  };

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
            <Menu.Item key="1"><Link to="/deviceApply/">新设备提交</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/deviceSearch/">设备信息</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={<span><Icon type="desktop"
             /><span>设备使用</span></span>}
          >
            <Menu.Item key="3"><Link to="/deviceUsingApply">使用记录提交</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/deviceUsingSearch">使用记录</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={<span><Icon type="desktop"
             /><span>设备维护</span></span>}
          >
            <Menu.Item key="5"><Link to="/deviceMaintenanceApply/">维护记录提交</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/deviceMaintenanceSearch/">维护情况</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={<span><Icon type="desktop"
             /><span>设备报废</span></span>}
          >
            <Menu.Item key="7"><Link to="/deviceDiscardApply">报废记录提交</Link></Menu.Item>
            <Menu.Item key="8"><Link to="/deviceDiscardSearch">报废查看</Link></Menu.Item>
          </SubMenu>
            <SubMenu
              key="sub5"
              title={<span><Icon type="desktop" /><span>数据查询</span></span>}
            >
              <Menu.Item key="10">数据查询</Menu.Item>
              <Menu.Item key="11">数据审核</Menu.Item>
              <Menu.Item key="12">生成报表</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={<span><Icon type="desktop"
               /><span>设备管理员管理</span></span>}
            >
              <Menu.Item key="13"><Link to="/userApply">添加新的设备管理员</Link></Menu.Item>
              <Menu.Item key="14"><Link to="/userSearch">设备管理员列表</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="15">
              <Icon type="file" />
              <span>File</span>
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
