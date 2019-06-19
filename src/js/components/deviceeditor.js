/**
 * 图书编辑器组件
 */
import React from 'react';
// 引入 antd 组件
import { Input, InputNumber, Form, Button, message,Select ,DatePicker} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
// 引入 prop-types
import PropTypes from 'prop-types';
// 引入自动完成组件
import AutoComplete from './autocomplete'; // 也可以写为 './AutoComplete'
// 引入 封装fetch工具类
import request from '../../utils/request';

// const Option = AutoComplete.Option;
const FormItem = Form.Item;
// 表单布局
const formLayout = {
  // label 标签布局，同 <Col> 组件
  labelCol: {
    span: 5
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
    console.log(editTarget);
    if(editTarget){
      form.setFieldsValue(editTarget);
    }
  }

  /*
  该方法在更新发生之后被调用，第一次render的时候并不会被调用；可以通过该方法在组件更新后操作DOM，
  同样也是一个很好的发送网络请求的位置，当然这个的前提是，有对新的props和原来的props进行比较不同后再发送请求；
  同样的当shouldComponentUpdate方法返回false时，该方法不会被调用
  */


  // 按钮提交事件
  handleSubmit(e){
    // 阻止submit默认行为
    e.preventDefault();
    // 定义常量
      const { form, editTarget } = this.props; // 组件传值
     form.validateFields((err,value)=>{


      if(!err){
      var formData= this.props.form.getFieldsValue();
      console.log('this.props='+this.props);
      console.log(formData);
      var assetId=formData.assetId; //资产编号
      var asset_name=formData.assetName; //资产名称
      var asset_class=formData.assetClass;  //资产分类
      var asset_big_class=formData.assetBigClass; //资产大类
      var area=formData.area;  //面积
      var count=formData.count;  //数量
      var fiance_type=formData.fianceType; //价值类型
      var gb_class=formData.gbClass;  //国标分类
      var gb_big_class=formData.gbBigClass;  //国标大类
      var get_method=formData.getMethod; //获取方式
      var type_specification=formData.typeSpecification; //规格类型
      var user=formData.user;  //使用者
      var using_department=formData.usingDepartment;  //使用部门
      var value=formData.value;  //价值
      var value_type=formData.valueType;  //价值类型
      var edu_using=formData.eduUsing;
      var get_date=formData.getDate;
      var isUsed=formData.isUsed;
      var isDiscard=formData.isDiscard;

      console.log('gb_big_class');
      console.log(gb_big_class);

      var prams=formData;
      // 默认值
      let editType = '添加';
      console.log(editTarget);
      console.log(editTarget==undefined);
      var dataMethod=editTarget==undefined?"deviceApply":"updateDevice";
      console.log(dataMethod);
      let apiUrl = 'http://127.0.0.1:8070/device/'+dataMethod+'?assetId='+assetId+
      '&asset_name='+asset_name+
      '&asset_class='+asset_class+
      '&area='+area+
      '&fiance_type='+fiance_type+
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
      '&edu_using='+edu_using+
      '&isUsed='+isUsed+
      '&isDiscard='+isDiscard;
      let method = 'GET';
      // 判断类型
      console.log('apiUrl1');
      console.log(apiUrl);

      var myFetchOptions = {
        method: method,
        // mode:'no-cors',
        headers:{
          'Content-Type':'application/json;charset=UTF-8'
        },
        timeout:10000,
      };
      if(editTarget){
        editType = '编辑';
        var url = 'http://localhost:8080/#/user/deviceEdit/' + editTarget.id;
        method = 'PUT';
          //恢复原来的GET方法获奖更新的数据 发送到服务器
      method='GET';
      }
      console.log(edu_using);
      console.log('apiUrl2');
      console.log(apiUrl);



      fetch(apiUrl, myFetchOptions)
      .then(res => res.json())
      .then(json=>{
        this.setState({status:json.status});
        console.log(json);
        if(json.status=='success')
        {
          editTarget?message.success('设备信息修改成功'):message.success('设备信息提交成功');
          editTarget?window.history.back():this.props.history.push('/user/deviceSearch/');
        }
      }).catch(e => console.log('错误:', e));
      console.log('status'+this.state.status);
    }
  });
  }






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
    const {form,editTarget} = this.props;
    const {getFieldDecorator} = form;
    const value=form.getDate;
    const dateFormat = 'YYYY-MM-DD';
    if(editTarget)
    {
      console.log('修改过程中的数据');
      console.log(form);
    }

    return (
      <Form onSubmit={this.handleSubmit} style={{width:'400'}}>
        <FormItem label="设备编号:" {...formLayout}>
          {getFieldDecorator('assetId',{
            rules: [
              {
                required: true,
                message: '请输入设备编号'
              }
            ],initialValue:form.assetId
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
              // {
              //   min: 1,
              //   max: 99999,
              //   type: 'number',
              //   message: '请输入1~99999的数字'
              // }
            ],initialValue:form.assetName
          })(
            // <InputNumber />
            <Input type='text'/>
          )}
        </FormItem>


        <FormItem label="国标分类" {...formLayout}>
          {getFieldDecorator('gbClass',{
            rules: [
              {
                required: true,
                message: '请输入国标分类'
              }
            ],initialValue:form.gbClass
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="国标大类" {...formLayout}>
          {getFieldDecorator('gbBigClass',{
            rules: [
              {
                required: true,
                message: '请输入国标大类'
              }
            ],initialValue:form.gbBigClass
          })(
          <Select placeholder="请选择国标大类">
          <Option value="china">通用设备</Option>
          </Select>
        )}
        </FormItem>

        <FormItem label="资产分类:" {...formLayout}>
          {getFieldDecorator('assetClass',{
            rules: [
              {
                required: true,
                message: '请输入设备所属财资产分类'
              }
            ],initialValue:form.assetClass
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="资产大类:" {...formLayout}>
          {getFieldDecorator('assetBigClass',{
            rules: [
              {
                required: true,
                message: '请输入设备所属财资产大类'
              },
            ],initialValue:form.assetBigClass
          })(
          <Select placeholder="请选择资产大类">
          <Option value="通用设备 ">通用设备</Option>
        </Select>
        )}
        </FormItem>
        <FormItem label="数量:" {...formLayout}>
          {getFieldDecorator('count',{
            rules: [
              {
                required: true,
                message: '请输入设备数量'
              }
            ],initialValue:form.count
          })(
            <InputNumber style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem label="设备面积:" {...formLayout}>
          {getFieldDecorator('area',{
            rules: [
              {
                required: true,
                message: '请输入设备面积'
              }
            ],initialValue:form.area
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
            ],initialValue:form.value
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="获取日期:" {...formLayout}>
          {getFieldDecorator('getDate',{
            rules: [
              {
                required: true,
                message: '请输入设备获取日期'
              }
            ],initialValue:form.value
          })(

          <Input type="text" />
          )}

        </FormItem>
        <FormItem label="教育方向:" {...formLayout}>
          {getFieldDecorator('eduUsing',{
            rules: [
              {
                required: true,
                message: '请输入教育方向'
              }
            ],initialValue:form.eduUsing
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="是否在用:" {...formLayout}>
          {getFieldDecorator('isUsed',{
            rules: [
              {
                required: true,
                message: '请输入设备在用情况'
              }
            ],initialValue:form.isUsed
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="是否报废:" {...formLayout}>
          {getFieldDecorator('isDiscard',{
            rules: [
              {
                required: true,
                message: '请输入设备报废情况'
              }
            ],initialValue:form.isDiscard
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="价值类型:" {...formLayout}>
          {getFieldDecorator('valueType',{
            rules: [
              {
                required: true,
                message: '价值类型'
              }
            ],initialValue:form.valueType
          })(
            <Input type="text" />
          )}
        </FormItem>

        <FormItem label="存放地点:" {...formLayout}>
          {getFieldDecorator('fianceType',{
            rules: [
              {
                required: true,
                message: '请输入存放地点'
              }
            ],initialValue:form.fianceType
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="获取方式:" {...formLayout}>
          {getFieldDecorator('getMethod',{
            rules: [
              {
                required: true,
                message: '请输入设备的获取方式'
              }
            ],initialValue:form.getMethod
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="使用部门:" {...formLayout}>
          {getFieldDecorator('usingDepartment',{
            rules: [
              {
                required: true,
                message: '请输入设备的使用部门'
              }
            ],initialValue:form.usingDepartment
          })(
          <Select placeholder="请选择使用部门">
          <Option value="光电工程学院">光电工程学院</Option>
          <Option value="材料与化工学院">材料与化工学院</Option>
          <Option value="机械与工程学院">机械与工程学院</Option>
          <Option value="电子信息科学与技术学院">电子信息科学与技术学院</Option>
          <Option value="经济管理学院">经济管理学院</Option>
          <Option value="计算机科学与工程学院">计算机科学与工程学院</Option>
        </Select>
        )}
        </FormItem>
        <FormItem label="使用人:" {...formLayout}>
          {getFieldDecorator('user',{
            rules: [
              {
                required: true,
                message: '请输入使用人'
              }
            ],initialValue:form.user
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="规格型号" {...formLayout}>
          {getFieldDecorator('typeSpecification',{
            rules: [
              {
                required: false,
                message: '请输入该设备的规格型号'
              }
              // {
              //   pattern: /^\d*$/,
              //   message: '请输入正确的ID'
              // }
            ],initialValue:form.typeSpecification
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
