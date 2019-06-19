import React from 'react';
import  {Tag,message,Col,Row} from 'antd';

export default class SysInfo extends React.Component
{
  constructor()
  {
    super();
    this.state={
      infoList:'',
    }
  }


  componentWillMount()
  {
    var url ='http://127.0.0.1:8070/env';
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
        this.setState({infoList:json});
      }).catch(e => {
        console.log('错误:', e)
        message.error('服务器连接异常');
      });
  }
    render()
    {
      const {infoList}=this.state;
      console.log('sys info');
      console.log(infoList);

      var pane=infoList!='' && infoList!=undefined?
      <div>
      <Tag color="magenta" style={{width:80,marginTop:30}} >进程PID:{infoList.systemProperties['PID']}</Tag>
      <Tag color="magenta" style={{width:100}}>服务器系统名称:{infoList.systemProperties['os.name']}</Tag>
      <Tag color="red" style={{width:100}}>服务器系统结构:{infoList.systemProperties['os.arch']}</Tag>
      <Tag color="volcano" style={{width:100}}>服务器操作系统版本:{infoList.systemProperties['os.version']}</Tag>
      <Tag color="orange" style={{width:100}}>文件编码:{infoList.systemProperties['file.encoding']}</Tag>
      <Tag color="gold" style={{width:80}}>进程等级:{infoList.systemEnvironment['PROCESSOR_LEVEL']}</Tag>
      <Tag color="lime" style={{width:80}}>监听端口:{infoList['server.ports']['local.server.port']}</Tag>
      <Tag color="green" style={{width:80}}>进程编号:{infoList.systemEnvironment['NUMBER_OF_PROCESSORS']}</Tag>
      <Tag color="green" style={{width:160}}>jre目录:{infoList.systemProperties['java.home']}</Tag>
      <Tag color="green" style={{width:100}}>java版本:{infoList.systemProperties['java.version']}</Tag>
      <Tag color="green" style={{width:100}}>java虚拟机版本:{infoList.systemProperties['java.vm.specification.version']}</Tag>
      <Tag color="green" style={{width:100}}>运行环境系统:{infoList.systemEnvironment['OS']}</Tag>

      <Tag color="cyan" style={{width:100}}>IP地址:{infoList['applicationConfig: [classpath:/application.properties]']['local.ip']}</Tag>

      <Tag color="blue" style={{width:100}}>数据库使用人:{infoList['applicationConfig: [classpath:/application.properties]']['spring.datasource.username']}</Tag>
      <Tag color="geekblue" style={{width:100}}>数据库:{ infoList['applicationConfig: [classpath:/application.properties]']['spring.jpa.database']}</Tag>
      </div>:<span>数据加载中，请等待</span>;
      return(
        pane
      );
    }
}
