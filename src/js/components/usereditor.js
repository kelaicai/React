/**
 * 图书编辑器组件
 */
import React from 'react';
// 引入 antd 组件
import { Input, InputNumber, Form, Button, message } from 'antd';
// 引入 prop-types
import PropTypes from 'prop-types';
// 引入自动完成组件
import AutoComplete from './autocomplete'; // 也可以写为 './AutoComplete'
// 引入 封装fetch工具类

// const Option = AutoComplete.Option;
const FormItem = Form.Item;
// 表单布局
const formLayout = {
  // label 标签布局，同 <Col> 组件
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
};

class UserEditor extends React.Component {
  // 构造器
  constructor(props) {
    super(props);

    this.state = {
      recommendUsers: [],
      status:''
    };
    // 绑定this
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOwnerIdChange = this.handleOwnerIdChange.bind(this);
  }

  // 生命周期--组件加载完毕
  componentDidMount(){
    /**
     * 在componentWillMount里使用form.setFieldsValue无法设置表单的值
     * 所以在componentDidMount里进行赋值
     */
    const {editTarget, form} = this.props;
      console.log('this.props: '+this.props);
    if(editTarget){
      form.setFieldsValue(editTarget);
    }
  }

  /*
  该方法在更新发生之后被调用，第一次render的时候并不会被调用；可以通过该方法在组件更新后操作DOM，
  同样也是一个很好的发送网络请求的位置，当然这个的前提是，有对新的props和原来的props进行比较不同后再发送请求；
  同样的当shouldComponentUpdate方法返回false时，该方法不会被调用
  */
  componentDidUpdate(prevProps, prevState, snapshot)
  {
    // if(this.state.status=='success')
    // {
    //   this.props.history.push("/sys/userSearch/");
    // }
  }
  // 按钮提交事件
  handleSubmit(e){
    // 阻止submit默认行为
    e.preventDefault();
    // 定义常量
    const { form, editTarget } = this.props; // 组件传值
    console.log(this.props);
    //验证
    // form.validateFields((err,values)=> {
    //   if(err){
    //     message.warn(err);
    //     return;
    //   }
    //   console.log(values);
    // });

      var formData= this.props.form.getFieldsValue();
      console.log(formData);
      var workId=formData.workId; //资产编号
      var name=formData.name; //资产名称
      var age=formData.age;
      var mail=formData.mail;
      var telphone=formData.telphone;
      var passwd=formData.passwd;
      var role=formData.role;
      // 默认值
      let editType = '添加';
      console.log(editTarget);
      console.log(editTarget==undefined);
      var dataMethod=editTarget==undefined?"userApply":"updateUser";
      console.log(dataMethod);
      let apiUrl = 'http://127.0.0.1:8070/user/'+dataMethod+'?workId='+workId+
      '&name='+name+
      '&age='+age+
      '&mail='+mail+
      '&telphone='+telphone+
      '&passwd='+passwd+
      '&role='+role;

      let method = 'post';
      // 判断类型


      console.log(apiUrl);
      var myFetchOptions = {
        method: 'GET',
        // mode:'no-cors',
        headers:{
          'Content-Type':'application/json;charset=UTF-8'
        },
        timeout:10000,
      };
      if(editTarget){
        editType = '编辑';
        var url = 'http://localhost:8080/#/sys/userEdit/' + editTarget.id;
        method = 'PUT';
        fetch(url, myFetchOptions)
        .then(res => res.json())
        .catch(e => console.log('错误:', e));
        console.log('status'+this.state.status);

      }

      fetch(apiUrl, myFetchOptions)
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
      console.log('status'+this.state.status);
      if(this.state.status=='success')
      {
        message.success("设备管理员添加成功");
        this.props.history.push("/sys/usersSearch/");
      }
      // 发送请求
    //   request(method,apiUrl,values)
    //     // 成功的回调
    //     .then((res) => {
    //       // 当添加成功时,返回的json对象中应包含一个有效的id字段
    //       // 所以可以使用res.id来判断添加是否成功
    //       if(res.id){
    //         message.success(editType + '添加图书成功!');
    //         // 跳转到用户列表页面
    //         this.context.router.push('/book/list');
    //       }else{
    //         message.error(editType + '添加图书失败!');
    //       }
    //     })
    //     // 失败的回调
    //     .catch((err) => console.error(err));
    // });
  };


  // 获取推荐用户信息partialUserId
  getRecommendUsers (assetId) {
    // 请求数据
    // get('http://localhost:8000/user?id_like=' + partialUserId)
    // .then((res) => {
    //   if(res.length === 1 && res[0].id === partialUserId){
    //     // 如果结果只有1条且id与输入的id一致,说明输入的id已经完整了,没必要再设置建议列表
    //     return;
    //   }
    var myFetchOptions = {
      method: 'GET',
      // mode:'no-cors',
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      },
      timeout:10000,
    };
    var url="http://127.0.0.1:8070/user/deviceSearchByAssetId?assetId="+assetId;
    fetch(url, myFetchOptions)
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

      // 设置建议列表
    //   this.setState({
    //     recommendUsers: res.map((user) => {
    //       return {
    //         text: `${user.id}(${user.name})`,
    //         value: user.id
    //       }
    //   })
    // })
  }

  // 计时器
  timer = 0;
  handleOwnerIdChange(value){
    this.setState({
      recommendUsers: []
    });

    // 使用"节流"的方式进行请求,防止用户输入的过程中过多地发送请求
    if(this.timer){
      // 清除计时器
      clearTimeout(this.timer);
    }

    if(value){
      // 200毫秒内只会发送1次请求
      this.timer = setTimeout(() => {
        // 真正的请求方法
        this.getRecommendUsers(value);
        this.timer = 0;
      }, 200);
    }
  }

  onClick(e)
  {
    console.log(this.context.router);
    console.log();
  }

  render() {
    // 定义常量
    const {recommendUsers} = this.state;
    const {form} = this.props;
    const {getFieldDecorator} = form;

    return (
      <Form onSubmit={this.handleSubmit} style={{width:'400'}}>
        <FormItem label="工号:" {...formLayout}>
          {getFieldDecorator('workId',{
            rules: [
              {
                required: true,
                message: '请输入工号'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>

        <FormItem label="设备管理员:" {...formLayout}>
          {getFieldDecorator('name',{
            rules: [
              {
                required: true,
                message: '请输入设备管理员名称',
              }
              // {
              //   min: 1,
              //   max: 99999,
              //   type: 'number',
              //   message: '请输入1~99999的数字'
              // }
            ]
          })(
            // <InputNumber />
            <Input type='text'/>
          )}
        </FormItem>


        <FormItem label="年龄:" {...formLayout}>
          {getFieldDecorator('age',{
            rules: [
              {
                required: true,
                message: '请输入设备管理员年龄'
              },
              {
                min: 1,
                max: 100,
                type: 'number',
                message: '请输入1~100的数字'
              }
            ]
          })(
             <InputNumber />
          )}
        </FormItem>

        <FormItem label="邮箱:" {...formLayout}>
          {getFieldDecorator('mail',{
            rules: [
              {
                required: true,
                message: '请输入设备管理员邮箱'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>

        <FormItem label="角色:" {...formLayout}>
          {getFieldDecorator('role',{
            rules: [
              {
                required: true,
                message: '请输入用户的角色'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>

        <FormItem label="手机号码:" {...formLayout}>
          {getFieldDecorator('telphone',{
            rules: [
              {
                required: true,
                message: '请输入维护内容',
              }
              // {
              //   min: 1,
              //   max: 99999,
              //   type: 'number',
              //   message: '请输入1~99999的数字'
              // }
            ]
          })(
            // <InputNumber />
            <Input type='text'/>
          )}
        </FormItem>

        <FormItem label="密码" {...formLayout}>
          {getFieldDecorator('passwd',{
            rules: [
              {
                required: true,
                message: '其他'
              }
              // {
              //   pattern: /^\d*$/,
              //   message: '请输入正确的ID'
              // }
            ]
          })(
            <AutoComplete
              options={recommendUsers}
              onChange={this.handleOwnerIdChange}
            />
          )}
        </FormItem>

        <FormItem wrapperCol={{span: formLayout.wrapperCol.span, offset: formLayout.labelCol.span}}>
          <Button type="primary" htmlType="submit" onClick={this.onClick.bind(this)}>提交</Button>
        </FormItem>
      </Form>
    );
  }
}

// 必须给BookEditor定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
UserEditor.contextTypes = {
  router: PropTypes.object.isRequired
};

UserEditor = Form.create()(UserEditor);

export default UserEditor;
