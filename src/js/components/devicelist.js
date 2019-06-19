/**
 * 图书列表页面
 */
import React from 'react';
// 引入 antd 组件
import { message, Table, Button, Popconfirm } from 'antd';
// 引入 prop-types
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
// 引入 封装fetch工具类
// import { get, del } from '../utils/request';

class DeviceList extends React.Component {
  // 构造器
  constructor(props) {
    super(props);
    // 定义初始化状态
    this.state = {
      deviceList: []
    };
  }

  /**
   * 生命周期
   * componentWillMount
   * 组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次
   */
  componentWillMount(){
    var myFetchOptions = {
      method: 'GET',
      // mode:'no-cors',
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      },
      timeout:10000,
    };

    //var workId=Cookies.get("workId");
    var workId=localStorage.getItem("workId");
    console.log("workId in deviceList");
    console.log(workId);
    var temp=workId!=undefined?message.success('获取用户信息成功'):message.error('获取用户信息失败');
    var url="http://127.0.0.1:8070/device/findDeviceByWorkId?workId="+workId;
    console.log(url);
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
      this.setState({deviceList:json});
      console.log(json);
    }).catch(e => console.log('错误:', e));


  }


  noOp()
  {

  }
  // 生命周期--组件加载完毕
  componentDidMount(){
    /**
     * 在componentWillMount里使用form.setFieldsValue无法设置表单的值
     * 所以在componentDidMount里进行赋值
     */
    const {editTarget, form} = this.props;
    if(editTarget){
      setTimeout(form.setFieldsValue(editTarget),10000);
    }
  }
  /**
   * 编辑
   */
  handleEdit(device){
    // 跳转编辑页面
    console.log("this.context:"+this.context);
    console.log("this.context.history:"+this.context.history);
    console.log(device);
    this.props.history.push({pathname:'/user/deviceEdit/'+device.id, state:{device:device}});
  }



  /**
   * 删除
   */
  handleDel(device){
    // 执行删除数据操作
    var myFetchOptions = {
      method: 'GET',
      // mode:'no-cors',
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      },
      timeout:10000,
    };
    fetch('http://127.0.0.1:8070/device/deleteDeviceById?id=' + device.id, myFetchOptions)
      .then(res => {
        /**
         * 设置状态
         * array.filter
         * 把Array的某些元素过滤掉，然后返回剩下的元素
         */
        this.setState({
          deviceList: this.state.deviceList.filter(item => item.id !== device.id)
        });
        message.success('删除设备成功');
      })
      .catch(err => {
        console.error(err);
        message.error('删除设备失败');
      });
  }

  render() {
    // 定义变量
    const { deviceList } = this.state;
    console.log('deviceList');
    console.log(deviceList);
    // antd的Table组件使用一个columns数组来配置表格的列
    const columns = [
      {
        title: '设备编号',
        dataIndex: 'assetsId'
      },
      {
        title: '设备名称',
        dataIndex: 'assetsName'
      },
      {
        title: '使用部门',
        dataIndex: 'usingDepartment',
      },
      {
        title: '资产分类',
        dataIndex: 'assetsClass'
      },
      {
        title: '资产大类',
        dataIndex: 'assetsBigClass'
      },
      {
        title: '获取日期',
        dataIndex: 'getDate'
      },
      {
        title: '规格类型',
        dataIndex: 'typeSpecification'
      },
      {
        title: '使用人',
        dataIndex: 'user'
      },
      {
        title: '操作',
        render: (text, record) => (
          <Button.Group type="ghost">
            <Button size="small" onClick={() => {this.handleEdit(record)}}>编辑</Button>
            <Popconfirm
              title="确定要删除吗?"
              okText="确定"
              cancelText="取消"
              onConfirm={() => this.handleDel(record)}>
              <Button size="small">删除</Button>
            </Popconfirm>
          </Button.Group>
        )
      }
    ];

    return (
      <Table columns={columns}
      dataSource={deviceList}
      bordered
      rowKey={row => row.id} />
    );
  }
}

/**
 * 任何使用this.context.xxx的地方，必须在组件的contextTypes里定义对应的PropTypes
 */
// DeviceList.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default DeviceList;
