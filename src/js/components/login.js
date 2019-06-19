import React from 'react';
import {Col,Row,Tabs,Carousel,Form, Icon, Input, Button,Checkbox,message,Radio} from 'antd';
const TabPane=Tabs.TabPane;
import PCNewsBlock from './news_block';
import style from '../../css/style.css';
import 'antd/dist/antd.css'
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import {Redirect} from 'react-router-dom';
import UserPane from './userpane';
import RootPane from './rootpane';
import $ from  'jquery';
import Cookies from 'js-cookie';


var redirectable=false;
const RadioGroup = Radio.Group;


const success = (workId,passwd,player) => {
  const hide = message.loading('登录中..', 0);
  // Dismiss manually and asynchronously



  setTimeout(hide, 2500);
};

class NormalLoginForm extends React.Component {
  constructor(props)
  {
    super(props);
      this.state={
      action:'login',
      hasLogined:false,
      realpasswd:'',
      status:'none',
      player:'user',
      redirect:false
    };
  }

  componentWillMount()
  {
    console.log('componentWillMount');
    // console.log('componentwillMount');
    // if(this.state.status=="success")
    // {
    //   this.props.history.push('/'+this.state.player);
    // }
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
     var workId=formData.userId;
     var passwd=formData.password;
     var player=this.state.player;
      console.log('props: '+this.props.history);
      console.log(workId);
      console.log(passwd);
      console.log(player);
      console.log(this.props);


      var myFetchOptions = {
        method: 'GET',
        // mode:'no-cors',
        headers:{
          'Content-Type':'application/json;charset=UTF-8'
        },
        timeout:10000,
      };
      var url="http://127.0.0.1:8070/user/login?workId="+workId+"&passwd="+passwd+"&player="+player;


      var _this=this;
      $.ajax({
                      type:"GET",
                      url:url,
                      dataType:"json",
                      success:function (result) {
                        console.log('result');
                        console.log(result);
                        console.log(_this);

                        if(result.status=="success")
                        {
                          Cookies.set('workId',workId, { expires: 7, path: '/' });
                          Cookies.set('player', player, { expires: 7, path: '/' });
                          Cookies.set('hasLogined', true, { expires: 7, path: '/' });
                          localStorage.setItem("workId",workId);
                          localStorage.setItem("player",player);
                          localStorage.setItem("hasLogined",true);
                          if(_this.state.player=="user")
                          {
                            message.success("登陆成功");
                            _this.props.history.push("/user");
                          }
                          else if(_this.state.player=="sys"){
                          message.success("登陆成功");
                          _this.props.history.push("/sys");

                          }

                        }
                        else if(_this.state.status=="no User")
                        {
                          message.error("用户不存在");
                        }
                        else {
                          message.error("密码错误,请检查密码或者账号重新登录");
                          return <Redirect to='/login'/>
                        }
                      },
                      error:function(xhr,status,err)
                      {
                        message.error('你遇到了：'+err);
                      }
                      // error:function(xhr,status, err) {
                      //     console.error( status, err.toString());
                      //     hashHistory.push('/srmp/v1/contents')
                      //     const win = window.open('/srmp/v1/contents', '_blank');
                      //     win.focus();
                      //     browserHistory.push('/srmp/v1/contents');
                      //     that.props.history.push( '/srmp/v1/contents',null)
                      // }
            });


      console.log(this.state);
        // Dismiss manually and asynchronously



  };

  onClick=()=>
  {
    const hide = message.loading('Action in progress..', 0);
    var time=1500;
    if(this.state.status="success")
    {
      message.success('验证成功');
      time=0;
    }
    setTimeout(hide, time);
  };

  onChange(e)
  {
    e.preventDefault();
    console.log('onChange');
    console.log(e);
    this.setState({player:e.target.value});
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
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

          <RadioGroup onChange={this.onChange.bind(this)} defaultValue={"user"}>
            <Radio value={"user"}>我是实验设备管理员</Radio>
            <Radio value={"sys"}>我是管理员</Radio>
            <a href="mailto:labapply@163.com?cc=15025005925@163.com">我要使用系统</a>
          </RadioGroup>
        </Form.Item>
        <Form.Item>
          {!this.state.hasLogined?<Button
             type="primary" htmlType="submit"
             className={style.loginformbutton}
             onClick={this.ClickHandle.bind(this) }>登入
            </ Button>:<Button onClick={this.onClick.bind(this)}>验证中</ Button>
        }
        </Form.Item>
      </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);



export default class Login extends React.Component
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
        <Row  aligin="center">
        <Col span={2}></Col>
        <Col span={20}>
        <div aligin="center">
          <WrappedNormalLoginForm history={this.props.history}/>
        </div>
        </Col>
        <Col span={2}></Col>
        </Row>
      </div>
    );
  }

}
