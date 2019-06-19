import React from 'react';
import {
  Input,
  Radio,
  Table,
  Menu,
  Badge,
  Dropdown,
  Icon
} from 'antd';
const Search = Input.Search;
const RadioGroup = Radio.Group;
/**
查询模块代码
*/
//有一个查询的输入框，然后下面是设备基础信息，变更信息，维护信息，报废信息的选项，下面是一个表格，默认显示的是设备的全部信息
const typeList = {
  'device': 'device',
  'using': 'using',
  'change': 'change',
  'maintenance': 'maintenance',
  'discard': 'discard',
  'store': 'store',
  '':'device'
};

class NestedTableDevice extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
      resultList:[]
    };
  }

  componentWillMount()
  {
    this.setState({resultList:this.props});
  }
  render()
  {
     const {resultList}=this.props;
     console.log('resultList in nested device');
     console.log(resultList[0]);
     console.log(Array.isArray(resultList[0]));
      var data=Array.isArray(resultList[0])?resultList[0]:new Array();
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
                title: '数量',
                dataIndex: 'count',
              },
              {
                title: '使用人',
                dataIndex: 'user',
              },
              {
                title: '是否在用',
                dataIndex: 'isUsed',
              },
              {
                title: '是否报废',
                dataIndex: 'isDiscard',
              },
              {
                title: '使用部门',
                dataIndex: 'usingDepartment',
              },
              ];

     return(
       <Table
        columns={columns}
        expandedRowRender={
        record=>
        <p style={{ margin: 0 }}>
        资产分类：{record.assetClass},
        资产大类:{record.assetBigClass},
        国标分类:{record.gbClass},
        国标大类:{record.gbBigClass},
        价值:{record.value_type}
        </p>}
        dataSource={data}

        bordered

        rowKey={record => record.id}
        />);
     }
}

class NestedTableMaintenance extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
      resultList:[]
    };
  }
  render()
  {
     const {resultList}=this.props;
     console.log('resultList in nested');
     console.log(resultList[0]);
      var data=Array.isArray(resultList[0])?resultList[0]:new Array();
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
                title: '维护内容',
                dataIndex: 'content',
              },
              {
                title: '维护人',
                dataIndex: 'maintenancer',
              },
              {
                title: '维护日期',
                dataIndex: 'date',
              },
              {
                title: '其他',
                dataIndex: 'otehr',
              },

              ];

     return(
       <Table
        columns={columns}

        dataSource={data}

        bordered

        rowKey={record => record.id}
        />);
     }
}

class NestedTableChange extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
      resultList:[]
    };
  }
  render()
  {
     const {resultList}=this.props;
     console.log('resultList in nested');
     console.log(resultList[0]);
      var data=Array.isArray(resultList[0])?resultList[0]:new Array();
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
                title: '变更日期',
                dataIndex: 'date',
              },
              {
                title: '原地',
                dataIndex: 'oldPlace',
              },
              {
                title: '新地',
                dataIndex: 'newPlace',
              },
              {
                title: '申请人',
                dataIndex: 'proposer',
              },
              {
                title: '变更原因',
                dataIndex: 'reason',
              },

              ];

     return(
       <Table
        columns={columns}

        dataSource={data}

        bordered

        rowKey={record => record.id}
        />);
     }
}

class NestedTableStore extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
      resultList:[]
    };
  }
  render()
  {
     const {resultList}=this.props;
     console.log('resultList in nested');
     console.log(resultList[0]);
      var data=Array.isArray(resultList[0])?resultList[0]:new Array();
     const columns = [
              {
                title: '实验设备编号',
                dataIndex: 'assetId',
              },
              {
                title: '实验设备名称',
                dataIndex: 'assetName'
              },
              {
                title: '数量',
                dataIndex: 'count',
              },

              ];

     return(
       <Table
        columns={columns}

        dataSource={data}

        bordered

        rowKey={record => record.id}
        />);
     }
}

class NestedTableDiscard extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
      resultList:[]
    };
  }
  render()
  {
     const {resultList}=this.props;
     console.log('resultList in nested');
     console.log(resultList[0]);
      var data=Array.isArray(resultList[0])?resultList[0]:new Array();
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
                title: '报废提交日期',
                dataIndex: 'date',
              },
              {
                title: '申请人',
                dataIndex: 'petitioner',
              },
              {
                title: '报废原因',
                dataIndex: 'reason',
              },

              ];

     return(
       <Table
        columns={columns}

        dataSource={data}

        bordered

        rowKey={record => record.id}
        />);
     }
}

class NestedTableUsing extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
      resultList:[]
    };
  }
  render()
  {
     const {resultList}=this.props;
     console.log('resultList in nested');
     console.log(resultList[0]);
      var data=Array.isArray(resultList[0])?resultList[0]:new Array();
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
                title: '使用者',
                dataIndex: 'deviceUser',
              },
              {
                title: '指导老师',
                dataIndex: 'teacher',
              },
              {
                title: '使用日期',
                dataIndex: 'time',
              },
              {
                title: '使用时长',
                dataIndex: 'timeLong',
              },

              ];

     return(
       <Table
        columns={columns}

        dataSource={data}

        bordered

        rowKey={record => record.id}
        />);
     }
}

class NestedTableUsingAndMaintenance extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
      resultList:[]
    };
  }
  render()
  {
     const {resultList}=this.props;
     console.log('resultList in nested');
     console.log(resultList[0]);
      var data=Array.isArray(resultList[0])?resultList[0]:new Array();
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
                title: '使用次数',
                dataIndex: 'usingCount',
              },
              {
                title: '维护次数',
                dataIndex: 'maintenanceCount',
              },

              ];

     return(
       <Table
        columns={columns}

        dataSource={data}

        bordered

        rowKey={record => record.id}
        />);
     }
}

const tableList={
  'device':NestedTableDevice,
  'using':NestedTableUsing,
  'discard':NestedTableDiscard,
  'change':NestedTableChange,
  'maintenance':NestedTableMaintenance,
  'store':NestedTableStore,
  'usingandmain':NestedTableUsingAndMaintenance
};

export default class UserQuery extends React.Component {
          constructor(props) {
            super(props);
            this.state = {
              assetId: '',
              type: 'device',
              resultList:[],
              pane:NestedTableDevice,
            };
          }

          componentWillMount() {
            // const {
            //   type,
            //   assetId
            // } = this.props;
            const {type,assetId}=this.state;
            console.log(type,assetId);
            var url = assetId!="" ? 'http://127.0.0.1:8070/data/query?assetId=' + assetId + '&type=' + type : 'http://127.0.0.1:8070/data/queryByType?type=' + type;
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
                this.setState({resultList:json});
              }).catch(e => console.log('错误:', e));
              console.log('resultList in will');
              console.log(this.state.resultList);
          };

          onChange(e){
            e.preventDefault();
            console.log('onChange');
            this.setState({type:e.target.value,pane:tableList[e.target.value]});
            console.log(e.target.value);
            console.log('type');
            console.log(this.state.type);


            var url = 'http://127.0.0.1:8070/data/queryByType?type=' +e.target.value;
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
                this.setState({resultList:json});
              }).catch(e => console.log('错误:', e));
          };




          searchHandler(value){
            console.log('Search');
            console.log(value);
            const {assetId,type}=this.state;
            var url ='http://127.0.0.1:8070/data/query?assetId=' + value+ '&type=' + type;
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
                this.setState({resultList:json});
              }).catch(e => console.log('错误:', e));
          };


          render() {



            return (
              <div>
              <Search
              placeholder = "请输入设备编号"
              onSearch = {
                this.searchHandler.bind(this)
              }
              enterButton />

              <RadioGroup name = "radiogroup"
              defaultValue = {"device"}
              onChange = {
                this.onChange.bind(this)
              }
              >
              <
              Radio value = {
                "device"
              } > 基本状况 < /Radio> <
              Radio value = {
                "maintenance"
              } > 维护情况 < /Radio> <
              Radio value = {
                "change"
              } > 变更情况 < /Radio>
               <
              Radio value = {
                "using"
              } > 使用情况 < /Radio>
              {/*<
              Radio value = {
                "store"
              } > 库存信息 < /Radio>
*/
              }
               <
              Radio value = {
                "discard"
              } > 报废信息 < /Radio>

               <
              /RadioGroup>
              <div>
              <
              this.state.pane resultList={this.state.resultList}
              />
              </div>
              <
              /div>
            );
          }
  }
