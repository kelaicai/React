import React from 'react';


import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import Login from './homepage';
import CenterPane from './center';
import DeviceMangerMain from './device_manager';
import SiderDemo from './siderPaneDeviceManager';
export default class PCIndex extends React.Component{

  render(){
  return(
  <div>
    <PCHeader/>
      <SiderDemo/>
    <PCFooter/>
  </div>
    );
  }
}
