import React from 'react'; //导入React类
import ReactDOM from 'react-dom'; //导入ReactDom对象
import {Route,Router,HashRouter,Switch,HashHistory,DatePicker} from 'react-router-dom'; //导入路由组件工具
import {Button} from 'antd';

import UserPane from './components/userpane';
import RootPane from './components/rootpane';
import Login from './components/login';
import PCFooter from './components/pc_footer';
import PCHeader from './components/pc_header';
import { CookiesProvider } from 'react-cookie';
import moment from 'moment'
// const easyMonitor = require('easy-monitor');
// easyMonitor('FrontPoint2');

import 'moment/locale/zh-cn';
moment.locale('zh-cn');
<DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />;
let hashHistory = Router.hashHistory;
export default class Root extends React.Component {

	render() { //组件配置方法 render
		console.log(hashHistory);
		return (  //返回一个dom节点或者是ReactElement
			<div>
				<PCHeader/>
					<HashRouter>
							<Route  path="/login" component={Login}/>
							 <Route path="/sys" component={RootPane}/>
							 <Route path="/user" component={UserPane}/>
					</HashRouter>
				<PCFooter/> 
			</div>
		);
	};
}
ReactDOM.render(
	<Root/>, document.getElementById('mainContainer'));  //返回Root组件附属的dom节点，以root为根组件
