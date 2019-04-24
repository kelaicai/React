import React from 'react';
import {Col,Row,Tabs,Carousel,Form, Icon, Input, Button,Checkbox,message,} from 'antd';
const TabPane=Tabs.TabPane;
import PCNewsBlock from './news_block';
import style from '../../css/style.css';
import 'antd/dist/antd.css'
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
class NormalLoginForm extends React.Component {
  constructor()
  {
    super();
      this.state={
      action:'login',
      hasLogined:false,
      realpasswd:'',
      status:'none',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }



  ClickHandle(e)
  {

     e.preventDefault();
     var formData= this.props.form.getFieldsValue();
     var userId=formData.userId;
     var passwd=formData.password;

      console.log(userId);
      console.log(passwd);


      var myFetchOptions = {
        method: 'GET',
        // mode:'no-cors',
        headers:{
          'Content-Type':'application/json;charset=UTF-8'
        },
        timeout:10000,
      };


      fetch("http://127.0.0.1:8070/user/login?id="+userId+"&passwd="+passwd, myFetchOptions)
      // .then(function(response) {
      //     return response.json();
      //   }).then(function(data) {
      //       console.log(data);
      //       this.setState({status:data.status})
      //   }).catch(function(e) {
      //     console.log("Oops, error"+e);
      // });
      .then(res => res.json())
      .then(json=>{

        this.setState({status:json.status});
        console.log(json);
      }).catch(e => console.log('错误:', e));

      // if (this.state.action=="login") {
      //   this.setState({hasLogined:true});
      // }
      //message.success("请求成功！");
      console.log(this.state);
      if(this.state.status=="right")
      {
        message.success("登陆成功");
      }else {
        message.error("登陆失败");
      }
       this.context.router.push('/index'); 跳转到index界面
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={style.loginform} style={{marginTop:'80px',height:'60px'}}>
        <Form.Item>
          {getFieldDecorator('userId', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="工号" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className={style.loginformforgot} href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className={style.loginformbutton} onClick={this.ClickHandle.bind(this)}>
            登入
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);



export default class HomePage extends React.Component
{
  constructor() {
    super();
    this.state = {
      mode: 'top',
    };
  };
  handleModeChange = (e) => {
  const mode = e.target.value;
  this.setState({ mode });
  };
  render()
  {
    const settings={
      dots:true,
      infinite:true,
      speed:500,
      slidesToShow:1,
      autoplay:true
    };



      function callback(key) {
        console.log(key);
      }

    return(

      <div>
        <PCHeader/>
        <Row  aligin="center">
        <Col span={2}></Col>
        <Col span={20}>
        <div aligin="center">
          <WrappedNormalLoginForm />
        </div>
        </Col>
        <Col span={2}></Col>
        </Row>
      </div>
    );
  }

}
