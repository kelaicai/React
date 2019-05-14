import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route,BrowserRouter,HashRouter,Switch,HashHistory,IndexRoute,Redirect} from 'react-router-dom';
import {Button} from 'antd';
import MobileIndex from './components/mobile_index';
import MediaQuery from 'react-responsive';
import UserPane from './components/userpane';
import RootPane from './components/rootpane';
import Login from './components/login';
import DeviceList from './components/devicelist';
import DeviceEdit from './components/deviceedit';
import DeviceDiscardList from './components/devicediscardlist';
import DeviceDiscardEditor from './components/devicediscardeditor';
import DeviceUsingList from './components/deviceusinglist';
import DeviceUsingEditor from './components/deviceusingeditor';
import DeviceMaintenanceEditor from './components/devicemaintenanceeditor';
import DeviceMaintenanceList from './components/devicemaintenancelist';
import DeviceChangeList from './components/devicechangelist';
import DeviceChangeEditor from './components/devicechangeeditor';
import UserList from './components/userlist';
import UserEditor from './components/usereditor';
import UserEdit from './components/useredit';
import DeviceEditor from './components/deviceeditor';
import PCFooter from './components/pc_footer';
import PCHeader from './components/pc_header';




let hashHistory = Router.hashHistory;
export default class Root extends React.Component {
	// constructor()
	// {
	// 	this.state={
	// 		hasLogined:'none',
	// 		visible:'false'
	// 	};
	// };

	render() {
		console.log(hashHistory);
		return (
			<div>
				<PCHeader/>
				<MediaQuery query='(min-device-width: 1224px)'>
					<HashRouter history={HashHistory}>
							<Route  path="/login" component={Login}/>
							 <Route path="/sys" component={RootPane}/>
							 <Route path="/user" component={UserPane}/>
					</HashRouter>
				</MediaQuery>
				<MediaQuery query='(max-device-width: 1224px)'>
					<MobileIndex/>
				</MediaQuery>
				<PCFooter/>
			</div>
		);
	};
}
ReactDOM.render(
	<Root/>, document.getElementById('mainContainer'));
