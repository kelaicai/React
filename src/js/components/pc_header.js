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
        status:''
      };
    };

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

    render()
    {
      let {getFieldProps} = this.props.form;
      return ( <
        header >
        <Row >
        <Col span = {2} > < /Col>
        <Col span = {4} >
        <a href = "/"class = "logo" >
        <img src = "./src/images/logo.png" alt = "logo" / >
        <span > 实验设备管理系统 < /span> < /a > </Col>
        <Col span = {16} >
        < /
        Col >
         <Col span = {2} >< /Col>
         < /Row > <
        /header>);
      }
    }
export default PCHeader = Form.create({})(PCHeader);
