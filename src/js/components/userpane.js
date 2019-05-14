
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route,BrowserRouter,HashHistory,HashRouter,Switch} from 'react-router-dom';
import {Button} from 'antd';
import MobileIndex from './mobile_index';
import DeviceEditor from './deviceeditor';
import SiderUser from './siderPaneUser';
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
import DeviceUsingEdit from './deviceusingedit';
import UserQuery from './userquery';
import DeviceMaintenanceEdit from './devicemaintenanceedit';
import DeviceDiscardEdit from './devicediscardedit';
import DeviceChangeEdit from './deviceChangeedit';
import Conmunication from './conmunication';
export default class UserPane extends React.Component {
	constructor()
	{
		super();
		this.state={
			hasLogined:'none',
			visible:'false'
		};
	};

	render() {

		return (
			<div>
				<MediaQuery query='(min-device-width: 1224px)'>
						   <SiderUser>
							 	<Route  path="/user"   exact component={Home}/>
								<Route  path="/user/userQuery/"  component={UserQuery}/>
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
								<Route path="/user/deviceEdit/:id" component={DeviceEdit}/>
								<Route path="/user/deviceUsingEdit/:id" component={DeviceUsingEdit}/>
								<Route path="/user/deviceMaintenanceEdit/:id" component={DeviceMaintenanceEdit}/>
								<Route path="/user/deviceDiscardEdit/:id" component={DeviceDiscardEdit}/>
								<Route path="/user/deviceChangeEdit/:id" component={DeviceChangeEdit}/>
								<Route path="/user/Conmunication/" component={Conmunication}/>
							 </SiderUser>
				</MediaQuery>
				<MediaQuery query='(max-device-width: 1224px)'>
					<MobileIndex/>
				</MediaQuery>
			</div>
		);
	};
};
