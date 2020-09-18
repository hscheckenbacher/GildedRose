import React, { PureComponent } from 'react';
import {branch} from 'baobab-react/higher-order';
import { PageHeader } from 'react-bootstrap';

import InventoryList from '../components/inventory/inventoryList';

class CurrentInventory extends PureComponent {

    render() {
        return (
            <div>
                <PageHeader>Current Inventory <small>All items that can be safely sold by the Inn</small></PageHeader>
                <InventoryList inventory={this.props.inventory} deleteWarning addButton/>
            </div>

        )
    }
}

export default branch({
    inventory: ['inventory', 'good']
}, CurrentInventory);