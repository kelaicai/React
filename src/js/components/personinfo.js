import React from 'react';
import { Card,message } from 'antd';
import $ from 'jquery';
import Cookies from 'js-cookie';


class PersonInfo extends React.Component{
  constructor(){
    super();
    this.state={
      workId:Cookies.get('workId'),
      player:Cookies.get('player'),
      userName:'',
      hasLogined:Cookies.get('hasLogined'),
    };
  };

  componentWillMount()
  {

    console.log('componentWillMount in personinfo');
    const {workId}=this.state;
    console.log(workId);
    var _this=this;
    var url='http://127.0.0.1:8070/user/findUserByWorkId?workId='+workId;
    $.ajax({
                    type:"GET",
                    url:url,
                    dataType:"json",
                    success:function (result) {
                      console.log('result');
                      console.log(result);
                      console.log(_this);
                      _this.setState({userName:result.userName});
                    },
                    error:function(result){
                      console.log('getUserInfo error');
                      message.error('用户信息获取失败');
                    }
                  });
  }

  componentDidMount()
  {
    if(this.state.hasLogined==undefined || !this.state.hasLogined)
    {
      message.console.warning('用户信息获取失败，正在跳转到登陆页面');
      window.location.replace("http://localhost:8080/#/login");
    }
    console.log('person infos componentDidMount');
    console.log(localStorage.getItem("workId"));
  }

  render(){
    console.log('person info render state:');
    console.log(this.state);
    const {workId,player,userName,hasLogined}=this.state;
    return(
      <div style={{ background: '#ECECEC',width:'200px'}}>
      <Card title="个人信息" bordered={false} style={{ width: 200 }}>
        <p>工号:{workId}</p>
        <p>当前用户:{userName}</p>
        <p>身份:{player=='user'?'设备管理员':'系统管理员'}</p>
        <p>状态:{hasLogined?'已登录':'未登录'}</p>
      </Card>
    </div>
    );
  }
};

export default PersonInfo;
