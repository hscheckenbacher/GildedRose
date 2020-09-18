import { root } from 'baobab-react/higher-order';
import React, { PureComponent } from 'react';

import { Route, Router } from 'react-router';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './App.css';
import AddItemModal from './components/modal/addItemModal';
import NavBar from './components/nav/navBar';
import Spinner from './components/spinner/spinner';
import browserHistory from "./state/browserHistory";
import state from './state/state';

import currentInventoryPage from './pages/currentInventory';
import expiredInventoryPage from './pages/expiredInventory';
import homePage from './pages/home';



class App extends PureComponent {

  render() {
    return (
		<div style={{width:"100vw",height:"100vh"}}>

			<Spinner>
			<AddItemModal />

			<Router history={browserHistory}>
				<NavBar />
				<div className="container-fluid">
						<Route exact path="/" component={homePage} />
						<Route path='/currentInventory' component={currentInventoryPage} />
					<Route path='/expiredInventory' component={expiredInventoryPage} />


				</div>
				</Router>
				</Spinner>
      </div>
    );
  }
}

const RootedApp = root(state, App);

export default RootedApp;
