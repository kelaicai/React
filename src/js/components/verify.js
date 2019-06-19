import React from 'react';
import {
  Input,
  Button,
  Table,
  Menu,
  Icon
} from 'antd';

export default class Verify extends React.Component
{
  constructor(props)
  {
      super(props);
      this.state={
        recordList:[],
        prograss:''
      };
  }

  componentWillMount()
  {
    var url ='http://127.0.0.1:8070/verify/findAllVerify';
    var myFetchOptions = {
      method: 'GET',
      // mode:'no-cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      timeout: 10000,
    };
    fetch(url, myFetchOptions)
      .then(res => res.json())
      .then(json => {
        console.log(url);
        console.log(json);
        this.setState({recordList:json});
      }).catch(e => console.log('错误:', e));
      console.log('recordList in will');
      console.log(this.state.recordList);
  }


  //审核通过
  handlePass(record,choice)
  {
    console.log(record);
    var assetId=record.assetId;
    var choice="pass";
    var url ='http://127.0.0.1:8070/verify/updateVerify?assetId='+record.assetId+"&choice="+choice;
    var myFetchOptions = {
      method: 'GET',
      // mode:'no-cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      timeout: 10000,
    };
    fetch(url, myFetchOptions)
      .then(res => res.json())
      .then(json => {
        console.log(url);
        console.log(json);
        this.setState({prograss:json.status});
      }).catch(e => console.log('错误:', e));
      console.log('this.state in will');
      console.log(this.state);
  }

  handleUnPass(record)
  {

  }

  render()
  {
    const columns = [
             {
               title: '实验设备编号',
               dataIndex: 'assetId',
             },
             {
               title: '实验设备名称',
               dataIndex: 'assetName',
             },

             {
               title: '报废原因',
               dataIndex: 'reason',
             },
             {
               title: '申请人',
               dataIndex: 'petitioner',
             },
             {
               title:'申请日期',
               dateIndex:'date'
             },
             {
               title: 'Action',
               render:(text, record) => (
                 <Button.Group type="ghost">
                   <Button size="small" onClick={() => this.handlePass(record,"pass")}>过审</Button>
                   <Button size="small" onClick={() => this.handleUnPass(record,"unpass")}>不通过</Button>
                 </Button.Group>)
             }];


    return(
      <Table
       columns={columns}

       bordered={true}

       dataSource={this.state.recordList.filter((item)=>item.prograss!='finish')}

       rowKey={record => record.id}
       />
    );
  }



}
