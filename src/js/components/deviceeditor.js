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

class DeviceEditor extends React.Component {
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
    // form.validateFields((err, values) => {
    //   if(err){
    //     message.warn(err);
    //     return;
    //   }
    // }

      var formData= this.props.form.getFieldsValue();
      console.log(formData);
      var assetId=formData.assetId; //资产编号
      var asset_name=formData.asset_name; //资产名称
      var asset_class=formData.asset_class;  //资产分类
      var asset_big_class=formData.asset_big_class; //资产大类
      var area=formData.area  //面积
      var count=formData.count;  //数量
      var finace_type=formData.finace_type; //价值类型
      var gb_class=formData.gb_class;  //国标分类
      var gb_big_class=formData.gb_big_clas;  //国标大类
      var get_method=formData.get_method; //获取方式
      var type_specification=formData.type_specification; //规格类型
      var user=formData.user;  //使用者
      var using_department=formData.using_department;  //使用部门
      var value=formData.value;  //价值
      var value_type=formData.value_type;  //价值类型
      var edu_using=formData.edu_using;
      var get_date=formData.get_Date;
      // 默认值
      let editType = '添加';
      let apiUrl = 'http://127.0.0.1:8070/device/deviceApply?assetId='+assetId+
      '&asset_name='+asset_name+
      '&asset_class='+asset_class+
      '&area='+area+
      '&finace_type='+finace_type+
      '&count='+count+
      '&gb_class='+gb_class+
      '&gb_big_class='+gb_big_class+
      '&get_method='+get_method+
      '&type_specification='+type_specification+
      '&user='+user+
      '&using_department='+using_department+
      '&value='+value+
      '&value_type='+value_type+
      '&get_Date='+get_date+
      '&asset_big_class='+asset_big_class+
      '&edu_using='+edu_using;
      let method = 'post';
      // 判断类型
      if(editTarget){
        editType = '编辑';
        apiUrl += '/' + editTarget.id;
        method = 'put';
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
    var url="http://127.0.0.1:8070/device/deviceSearchByAssetId?assetId="+assetId;
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

      this.setState({status:json.deviceApply});
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
          {getFieldDecorator('asset_name',{
            rules: [
              {
                required: true,
                message: '请输入设备名称',
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


        <FormItem label="国标分类" {...formLayout}>
          {getFieldDecorator('gb_class',{
            rules: [
              {
                required: true,
                message: '请输入国标分类'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="国标大类:" {...formLayout}>
          {getFieldDecorator('gb_big_class',{
            rules: [
              {
                required: true,
                message: '请输入国标大类'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>

        <FormItem label="资产分类:" {...formLayout}>
          {getFieldDecorator('asset_class',{
            rules: [
              {
                required: true,
                message: '请输入设备所属财资产分类'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="资产大类:" {...formLayout}>
          {getFieldDecorator('asset_big_class',{
            rules: [
              {
                required: true,
                message: '请输入设备所属财资产大类'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="数量:" {...formLayout}>
          {getFieldDecorator('count',{
            rules: [
              {
                required: true,
                message: '请输入设备数量'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="设备面积:" {...formLayout}>
          {getFieldDecorator('area',{
            rules: [
              {
                required: true,
                message: '请输入设备面积'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="设备价值:" {...formLayout}>
          {getFieldDecorator('value',{
            rules: [
              {
                required: true,
                message: '请输入设备价值'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="获取日期:" {...formLayout}>
          {getFieldDecorator('get_Date',{
            rules: [
              {
                required: true,
                message: '请输入设备获取日期'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="教育方向:" {...formLayout}>
          {getFieldDecorator('edu_using',{
            rules: [
              {
                required: true,
                message: '请输入教育方向'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="设备的价值类型:" {...formLayout}>
          {getFieldDecorator('value_type',{
            rules: [
              {
                required: true,
                message: '请输入设备的价值类型'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>

        <FormItem label="财务类型:" {...formLayout}>
          {getFieldDecorator('finace_type',{
            rules: [
              {
                required: true,
                message: '请输入设备财务类型'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="获取方式:" {...formLayout}>
          {getFieldDecorator('get_method',{
            rules: [
              {
                required: true,
                message: '请输入设备的获取方式'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="使用部门:" {...formLayout}>
          {getFieldDecorator('using_department',{
            rules: [
              {
                required: true,
                message: '请输入设备的使用部门'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="使用人:" {...formLayout}>
          {getFieldDecorator('user',{
            rules: [
              {
                required: true,
                message: '请输入使用人'
              }
            ]
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="规格型号" {...formLayout}>
          {getFieldDecorator('type_specification',{
            rules: [
              {
                required: true,
                message: '请输入该设备的规格型号'
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
DeviceEditor.contextTypes = {
  router: PropTypes.object.isRequired
};

DeviceEditor = Form.create()(DeviceEditor);

export default DeviceEditor;
