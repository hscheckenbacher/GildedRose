import React, { PureComponent } from 'react';
import { branch } from 'baobab-react/higher-order';
import autoBind from "react-autobind";

import { Navbar, Nav, NavItem, Button, Image, Badge } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';


import {nextDay, resetInventories} from '../../actions/appActions';

class NavBar extends PureComponent {

	constructor(props) {
		super(props);
		autoBind(this);
    }

    endDay() {
        nextDay();
    }

    reset() {
        if (window.confirm("Warning! This will move us back to day one, time travel has certain side effects you should seriously consider. Just let me know if you are ok with it and the journey will begin.")) {
        resetInventories();
        }
    }

    showProfile() {
        alert("Allisons Profile was not completed by the lazy gnomes!");
    }

    render() {

        // Add a bad badge here
        let badBadge = <Badge>0</Badge>;
        if (this.props.inventory.length > 0) {
            badBadge = <Badge bsStyle="danger">{this.props.inventory.length}</Badge>;
        }

        return (
            <Navbar inverse collapseOnSelect fluid style={{ backgroundColor: 'black', borderRadius: '0' }}>
                <Navbar.Header>
                    <Navbar.Brand style={{ padding: '0px' }}>
                        <img alt="Gilded Rose Logo" src="assets/images/logo3.png" style={{ width: '108px', height: '50px', padding: '0px' }} />
                    </Navbar.Brand>
                    <Navbar.Brand>
						<Link key="home" to="/" style={{ fontSize: '1em', cursor: 'pointer' }}><span className="App-title">The Gilded Rose Inn</span></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
						<NavItem eventKey={1} href="#"><Link key="currentInventory" to="/currentInventory"><FontAwesome name="list" /> Current Inventory</Link></NavItem>
						<NavItem eventKey={2} href="#"><Link key="expiredInventory" to="/expiredInventory"><FontAwesome name="trash-o" /> Expired Invetory {badBadge}</Link></NavItem>
                        <Button bsStyle="warning" style={{ float: "left", marginTop: "8px" }} onClick={this.endDay}><FontAwesome name="sun-o" /> End Day</Button>
                        <Button bsStyle="danger" style={{ float: "left", marginTop: "8px", marginLeft: "5px" }} onClick={this.reset}><FontAwesome name="undo" /> Reset</Button>
                        <NavItem eventKey={3} href="#" className="profile-link" onClick={this.showProfile}><Image style={{ width: '40px', height: '40px' }} src="assets/images/allison.png" circle /></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default branch({
    inventory: ['inventory', 'bad']
}, withRouter(NavBar));
