import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route,BrowserRouter,HashHistory,HashRouter,Switch,hashHistory} from 'react-router-dom';
import {Button} from 'antd';
import PCIndex from './components/pc_index';
import PCNewsDetails from './components/pc_news_details';
import MobileIndex from './components/mobile_index';
import DeviceEditor from './components/deviceeditor';
import SiderDemo from './components/siderPaneDeviceManager';
import PCHeader from './components/pc_header';
import PCFooter from './components/pc_footer';
import Home from './components/home';
// import Login from './components/login';
import HomePage from './components/homepage';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import DeviceList from './components/devicelist';
import DeviceEdit from './components/deviceedit';
import DeviceDiscardList from './components/devicediscardlist';
import DeviceDiscardEditor from './components/devicediscardeditor';
import DeviceUsingList from './components/deviceusinglist';
import DeviceUsingEditor from './components/deviceusingeditor';
import DeviceMaintenanceEditor from './components/devicemaintenanceeditor';
import DeviceMaintenanceList from './components/devicemaintenancelist';
import UserList from './components/userlist';
import UserEditor from './components/usereditor';
export default class Root extends React.Component {
	render() {
		return (
			<div>
				<MediaQuery query='(min-device-width: 1224px)'>
					<PCHeader/>
					<HashRouter history={hashHistory}>
						<SiderDemo>
							<Route exact path="/"  component={Home}/>
							<Route path="/deviceApply/" component={DeviceEditor}/>
							<Route path="/deviceSearch/" component={DeviceList}/>
							<Route path="/deviceUsingApply/" component={DeviceUsingEditor}/>
							<Route path="/deviceUsingSearch/" component={DeviceUsingList}/>
							<Route path="/deviceMaintenanceApply/" component={DeviceMaintenanceEditor}/>
							<Route path="/deviceMaintenanceSearch/" component={DeviceMaintenanceList}/>
							<Route path="/deviceDiscardApply" component={DeviceDiscardEditor}/>
							<Route path="/deviceDiscardSearch" component={DeviceDiscardList}/>
							<Route path="/deviceEdit/:id" component={DeviceEdit}/>
							<Route path="/userApply" component={UserEditor}/>
							<Route path="/userSearch" component={UserList}/>
						</SiderDemo>
					</HashRouter>
					<PCFooter/>
				</MediaQuery>
				<MediaQuery query='(max-device-width: 1224px)'>
					<MobileIndex/>
				</MediaQuery>
			</div>
		);
	};
}
ReactDOM.render(
	<Root/>, document.getElementById('mainContainer'));
