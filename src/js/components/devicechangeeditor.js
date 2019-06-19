/**
 * 图书编辑器组件
 */
import React from 'react';
// 引入 antd 组件
import { Input, InputNumber, Form, Button, message,DatePicker} from 'antd';
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

class DeviceChangeEditor extends React.Component {
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

  componentWillMount()
  {
    // console.log("willMount");
    // if(this.state.status=='success')
    // {
    //   this.props.history.push("/user/deviceChangeSearch");
    // }
  }

  // 生命周期--组件加载完毕
  componentDidMount(){
    /**
     * 在componentWillMount里使用form.setFieldsValue无法设置表单的值
     * 所以在componentDidMount里进行赋值
     */
    const {editTarget, form} = this.props;
    if(editTarget){
      form.setFieldsValue(editTarget);
    }
  }

  // 按钮提交事件
  handleSubmit(e){
    // 阻止submit默认行为
    e.preventDefault();
    // 定义常量
    const { form, editTarget } = this.props; // 组件传值
    // 验证
   form.validateFields((err, values) => {
    //   if(err){
    //     message.warn(err);
    //     return;
    //   }
    // }

      var formData= this.props.form.getFieldsValue();
      console.log(formData);
      var assetId=formData.assetId; //资产编号
      var assetName=formData.assetName; //资产名称
      var date=formData.date;
      var proposer=formData.proposer;
      var reason=formData.reason;
      var oldPlace=formData.oldPlace;
      var newPlace=formData.newPlace;
      // 默认值
      let editType = '添加';
      console.log(editTarget);
      console.log(editTarget==undefined);
      var dataMethod=editTarget==undefined?"deviceChangeApply":"updateChange";
      console.log(dataMethod);
      let apiUrl = 'http://127.0.0.1:8070/deviceChange/'+dataMethod+'?assetId='+assetId+
      '&assetName='+assetName+
      '&date='+date+
      '&proposer='+proposer+
      '&reason='+reason+
      '&oldPlace='+oldPlace+
      '&newPlace='+newPlace;

      let method = 'post';

      var myFetchOptions = {
        method: 'GET',
        // mode:'no-cors',
        headers:{
          'Content-Type':'application/json;charset=UTF-8'
        },
        timeout:10000,
      };
      // 判断类型
      if(editTarget){
        editType = '编辑';
        var url = 'http://localhost:8080/#/deviceChange/devicehangeEdit/' + editTarget.id;
        method = 'PUT';
        message.success('您正在进行相关信息的修改');
        // fetch(url, myFetchOptions)
        // .then(res => res.json())
        // .then(res=>{
        //   if(res!='404' || res.status!='404'){
        //     this.setState({status:res.status});
        //   }
        // }
        // )
        // .catch(e => console.log('错误:'+e));
      }


      console.log(apiUrl);


      console.log(this.props);
      fetch(apiUrl, myFetchOptions)
      .then(res => res.json())
      .then(json=>{
        this.setState({status:json.status});
        console.log(json);
        window.history.back();
      }).catch(e => console.log('错误:'+e));
    });
  };


  // 获取推荐用户信息partialUserId
  getRecommendUsers (assetId) {
    var myFetchOptions = {
      method: 'GET',
      // mode:'no-cors',
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      },
      timeout:10000,
    };
    // var url="http://127.0.0.1:8070/user/deviceSearchByAssetId?assetId="+assetId;
    // fetch(url, myFetchOptions)
    // .then(res => res.json())
    // .then(json=>{
    //
    //   this.setState({status:json.status});
    //   console.log(json);
    // }).catch(e => console.log('错误:', e));
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
                message: '请输入设备名称',
              }
            ]
          })(
            // <InputNumber />
            <Input type='text'/>
          )}
        </FormItem>


        <FormItem label="变更原因:" {...formLayout}>
          {getFieldDecorator('reason',{
            rules: [
              {
                required: true,
                message: '请输入变更原因'
              }
            ]
          })(
            <Input type='text'/>
          )}
        </FormItem>

        <FormItem label="申请人:" {...formLayout}>
          {getFieldDecorator('proposer',{
            rules: [
              {
                required: true,
                message: '请输入申请人'
              }
            ]
          })(
            <Input type='text'/>
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

        <FormItem label="旧地方:" {...formLayout}>
          {getFieldDecorator('oldPlace',{
            rules: [
              {
                required: true,
                message: '请输入旧地方',
              }
            ]
          })(
            <Input type='text'/>
          )}
        </FormItem>

        <FormItem label="新地方" {...formLayout}>
          {getFieldDecorator('newPlace',{
            rules: [
              {
                required: true,
                message: '新地方'
              }
            ]
          })(
            <AutoComplete
              options={recommendUsers}
              onChange={this.handleOwnerIdChange}
            />
          )}
        </FormItem>

        <FormItem wrapperCol={{span: formLayout.wrapperCol.span, offset: formLayout.labelCol.span}}>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

// 必须给BookEditor定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
DeviceChangeEditor.contextTypes = {
  router: PropTypes.object.isRequired
};

DeviceChangeEditor = Form.create()(DeviceChangeEditor);

export default DeviceChangeEditor;
