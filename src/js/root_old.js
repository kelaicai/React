import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,HashHistory} from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Button } from 'antd';
import 'antd/dist/antd.css';
import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index';
import MediaQuery from 'react-responsive';

const customHistory = createBrowserHistory();

export default class Root extends React.Component{
  render(){
    return (
      //这里替换了之前的 Index，变成了程序的入口
      <div>
      <MediaQuery query='(min-device-width:1224px)'>
        <PCIndex/>
      </MediaQuery>
      <MediaQuery query='(max-device-width:1224px)'>
        <MobileIndex/>
      </MediaQuery>
      </div>
    );
  };
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
