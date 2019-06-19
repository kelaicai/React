/**
 * 图书编辑器组件
 */
import React from 'react';
// 引入 antd 组件
import { Input, InputNumber, Form, Button, message,DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
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

class DeviceDiscardEditor extends React.Component {
  // 构造器
  constructor(props) {
    super(props);

    this.state = {
      recommendUsers: [],
      deviceDiscard:[],
      status:'',
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
    console.log(this.props);
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
      // this.props.history.push("/user/deviceUsingSearch");
  }

  // 按钮提交事件
  handleSubmit(e){
    // 阻止submit默认行为
    e.preventDefault();
    // 定义常量
    const { form, editTarget } = this.props; // 组件传值
    // 验证
    form.validateFields((err,value)=>{
     if(!err){

      var formData= this.props.form.getFieldsValue();
      console.log(formData);
      var assetId=formData.assetId; //资产编号
      var deviceUser=formData.deviceUser; //使用人
      var teacher=formData.teacher;  //指导老师
      var date=formData.date;
      var time=formData.time;
      var timeLong=formData.timeLong;
      var assetName=formData.assetName;
      // 默认值
      let editType = '添加';
      console.log(editTarget);
      console.log(editTarget==undefined);
      var dataMethod=editTarget==undefined?"usingApply":"updateUsing";
      console.log(dataMethod);
      let apiUrl = 'http://127.0.0.1:8070/deviceUsing/'+dataMethod+'?assetId='+assetId+
      '&deviceUser='+deviceUser+
      '&teacher='+teacher+
      '&date='+date+
      '&time='+time+
      '&timeLong='+timeLong
      +'&assetName='+assetName;
      let method = 'GET';
      // 判断类型
      if(editTarget){
        editType = '编辑';
      var  url = 'http://localhost:8080/#/user/deviceUsingEdit/' + editTarget.id;
        method = 'put';

        console.log('status'+this.state.status);
      }

      console.log(apiUrl);
      var myFetchOptions = {
        method: 'GET',
        // mode:'no-cors',
        headers:{
          'Content-Type':'application/json;charset=UTF-8'
        },
        timeout:10000,
      };


      fetch(apiUrl, myFetchOptions)
      .then(res => res.json())
      .then(json=>{

        this.setState({status:json.status});
        console.log(json);
        if(json.status=='success')
        {
          editTarget?message.success('设备信息修改成功'):message.success('设备信息提交成功');
          window.history.back();
        }
      }).catch(e => console.log('错误:', e));

  }})
  };


  // 获取推荐用户信息partialUserId
      getRecommendUsers (assetId) {

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
    const {editTarget,form} = this.props;
    const {getFieldDecorator} = form;

    return (
      <Form onSubmit={this.handleSubmit} style={{width:'400'}}>
        <FormItem label="设备编号:" {...formLayout}>
          {getFieldDecorator('assetId',{
            rules: [
              {
                required: true,
                message: '请输入设备编号'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>

        <FormItem label="设备名称:" {...formLayout}>
          {getFieldDecorator('assetName',{
            rules: [
              {
                required: true,
                message: '请输入设备名称'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>

        <FormItem label="使用班级:" {...formLayout}>
          {getFieldDecorator('deviceUser',{
            rules: [
              {
                required: true,
                message: '请输入设备使用者',
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


        <FormItem label="指导老师:" {...formLayout}>
          {getFieldDecorator('teacher',{
            rules: [
              {
                required: true,
                message: '请输入指导老师'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="日期:" {...formLayout}>
          {getFieldDecorator('date',{
            rules: [
              {
                required: true,
                message: '请输入日期'
              }
            ]
          })(

            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="时间:" {...formLayout}>
          {getFieldDecorator('time',{
            rules: [
              {
                required: true,
                message: '请输入时间'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>

        <FormItem label="使用时长" {...formLayout}>
          {getFieldDecorator('timeLong',{
            rules: [
              {
                required: true,
                message: '请输入使用时长'
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
DeviceDiscardEditor.contextTypes = {
  router: PropTypes.object.isRequired
};

DeviceDiscardEditor = Form.create()(DeviceDiscardEditor);

export default DeviceDiscardEditor;
