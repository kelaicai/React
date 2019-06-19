import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route,BrowserRouter,HashHistory,HashRouter,Switch} from 'react-router-dom';
import {Button} from 'antd';
import MobileIndex from './mobile_index';
import DeviceEditor from './deviceeditor';
import SiderRoot from './siderPaneRoot';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import Home from './home';
import Login from './Login';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import DeviceList from './devicelist';
import DeviceEdit from './deviceedit';
import DeviceDiscardList from './devicediscardlist';
import DeviceDiscardEditor from './devicediscardeditor';
import DeviceUsingList from './deviceusinglist';
import DeviceUsingEditor from './deviceusingeditor';
import DeviceMaintenanceEditor from './devicemaintenanceeditor';
import DeviceMaintenanceList from './devicemaintenancelist';
import DeviceChangeList from './devicechangelist';
import DeviceChangeEditor from './devicechangeeditor';
import UserList from './userlist';
import UserEditor from './usereditor';
import UserEdit from './useredit';
import RootQuery from './rootquery';
import Verify from './verify';
import Conmunication from './conmunication';
import SysInfo from './sysinfo';
let hashHistory = Router.hashHistory;
export default class RootPane extends React.Component {
	// constructor()
	// {
	// 	this.state={
	// 		hasLogined:'none',
	// 		visible:'false'
	// 	};
	// };

	render() {

		return (
			<div>
				<MediaQuery query='(min-device-width: 1224px)'>
						   <SiderRoot>
							 	<Route path="/sys" exact component={Home}/>
								<Route  path="/sys/rootQuery/"  component={RootQuery}/>
								<Route path="/user/deviceApply/" component={DeviceEditor}/>
								<Route path="/user/deviceSearch/" component={DeviceList}/>
								<Route path="/user/deviceUsingApply/" component={DeviceUsingEditor}/>
								<Route path="/user/deviceUsingSearch/" component={DeviceUsingList}/>
								<Route path="/user/deviceMaintenanceApply/" component={DeviceMaintenanceEditor}/>
								<Route path="/user/deviceMaintenanceSearch/" component={DeviceMaintenanceList}/>
								<Route path="/user/deviceDiscardApply" component={DeviceDiscardEditor}/>
								<Route path="/user/deviceDiscardSearch" component={DeviceDiscardList}/>
								<Route path="/user/deviceChangeApply" component={DeviceChangeEditor}/>
								<Route path="/user/deviceChangeSearch" component={DeviceChangeList}/>
								<Route path="/sys/userApply/" component={UserEditor}/>
								<Route path="/sys/userSearch/" component={UserList}/>
								<Route path="/user/deviceEdit/:id" component={DeviceEdit}/>
								<Route path="/sys/userEdit/:id" component={UserEdit}/>
								<Route path="/sys/verify/" component={Verify}/>
								<Route path="/sys/info" component={SysInfo}/>
								<Route path="/sys/conmunication/" component={Conmunication}/>
							 </SiderRoot>
				</MediaQuery>
				<MediaQuery query='(max-device-width: 1224px)'>
					<MobileIndex/>
				</MediaQuery>
			</div>
		);
	};
};
