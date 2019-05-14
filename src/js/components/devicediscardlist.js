/**
 * 图书列表页面
 */
import React from 'react';
// 引入 antd 组件
import { message, Table, Button, Popconfirm } from 'antd';
// 引入 prop-types
import PropTypes from 'prop-types';
// 引入 封装fetch工具类
// import { get, del } from '../utils/request';

class DeviceDiscardList extends React.Component {
  // 构造器
  constructor(props) {
    super(props);
    // 定义初始化状态
    this.state = {
      deviceDiscardList: [],
      status:'',
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
    fetch("http://127.0.0.1:8070/deviceDiscard/discardAll", myFetchOptions)
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

      this.setState({deviceDiscardList:json});
      console.log(json);
    }).catch(e => console.log('错误:', e));
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
  /**
   * 编辑
   */
  handleEdit(device){
    // 跳转编辑页面
    console.log(this.context);
    console.log(this.context.history);
    console.log(device);
    this.props.history.push({pathname:'/user/deviceDiscardEdit/' + device.id,state:{device:device}});
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
    fetch('http://127.0.0.1:8070/deviceDiscard/deleteDiscardById?id=' + device.id, myFetchOptions)
      .then(res => {
        /**
         * 设置状态
         * array.filter
         * 把Array的某些元素过滤掉，然后返回剩下的元素
         */
        this.setState({
          deviceDiscardList: this.state.deviceDiscardList.filter(item => item.id !== device.id)
        });
        message.success('删除报废记录成功');
      })
      .catch(err => {
        console.error(err);
        message.error('删除报废记录失败');
      });
  }

  render() {
    // 定义变量
    const { deviceDiscardList } = this.state;
    console.log('deviceDiscardList');
    console.log(deviceDiscardList);
    // antd的Table组件使用一个columns数组来配置表格的列
    const columns = [
      {
        title: '设备编号',
        dataIndex: 'assetId'
      },
      {
        title: '设备名称',
        dataIndex: 'assetName'
      },
      {
        title: '申请人',
        dataIndex: 'petitioner',
      },
      {
        title: '报废原因',
        dataIndex: 'reason'
      },
      {
        title: '日期',
        dataIndex: 'date'
      },
      {
        title: '操作',
        render: (text, record) => (
          <Button.Group type="ghost">
            <Button size="small" onClick={() => this.handleEdit(record)}>编辑</Button>
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
      <Table columns={columns} dataSource={deviceDiscardList} rowKey={row => row.id} />
    );
  }
}

/**
 * 任何使用this.context.xxx的地方，必须在组件的contextTypes里定义对应的PropTypes
 */
DeviceDiscardList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default DeviceDiscardList;
