import React, { PureComponent } from 'react';
import {branch} from 'baobab-react/higher-order';
import Loadable from 'react-loading-overlay';

class Spinner extends PureComponent {

    render() {
        let spinnerDisplay = this.props.spinner.show ? 'block' : 'none';
        let spinnerText = this.props.spinner.text ? this.props.spinner.text : '';
        return (
            <Loadable
                active={this.props.spinner.show}
				spinner
                spinnerSize="100px"
                text={spinnerText}
                style={{ position: 'fixed', width: '100vw', height: '100vh', left: '0', top: '0', zIndex: 99999, display: spinnerDisplay, display:"flex", justifyContent:"center", alignItems:"center" }}
			>
				{this.props.children}
            </Loadable>
        )
    }

}

export default branch({
    spinner: ['ui','spinner']
}, Spinner)