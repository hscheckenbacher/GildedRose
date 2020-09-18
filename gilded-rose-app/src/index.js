import React from "react";
import ReactDOM from 'react-dom';

import { getInventory } from "./actions/appActions";
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

getInventory().then(()=>{
	ReactDOM.render(<App/>, document.getElementById('root'));
}).catch(err=>{
    alert("Unable to get initial inventory, please check console for more detailed error message.")
})

registerServiceWorker();

