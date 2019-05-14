import React from 'react';
// 编辑组件
import PropTypes from 'prop-types';
import { get } from '../../utils/request';

import UserEditor from './usereditor';

class UserEdit extends React.Component {

  constructor(props) {
  super(props);
  // 定义初始化状态
  this.state = {
    user: null
  };
  }


  // 生命周期--组件加载中
componentWillMount(){
  // 定义常量
  const recordId = this.props.location.state.user.id;
  console.log(this.props.location.state.user.id);
  /**
   * 发送请求
   * 获取用户数据
   */

   var myFetchOptions = {
     method: 'GET',
     // mode:'no-cors',
     headers:{
       'Content-Type':'application/json;charset=UTF-8'
     },
     timeout:10000,
   };

  fetch('http://localhost:8070/user/findUserById?id=' + recordId,myFetchOptions)
  .then(
    res=>res.json())
  .then(
    json => {
    console.log(json);
    // 设置状态
    this.setState({
      user: json
    });
  })
}

  render() {
    // console.log("this.props.location.state");
    // console.log(this.props.location.state);
    const {user} = this.state;
    console.log('user');
     console.log(user);
     return user ? <UserEditor editTarget={user}/> : <span>加载中...</span>;
  }
};

UserEdit.contextTypes = {
  router: PropTypes.object.isRequired
};

export default UserEdit;
