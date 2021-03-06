import { branch } from 'baobab-react/higher-order';
import React, { PureComponent } from 'react';
import autoBind from "react-autobind";
import { PageHeader } from 'react-bootstrap';
import { deleteItems } from '../actions/appActions';
import InventoryList from '../components/inventory/inventoryList';



class ExpiredInventory extends PureComponent {

	constructor(props) {
		super(props);
        this.state={
            selectedRows:{}
        }
        const self = this;
        this.selectRowProp = {
            mode: 'checkbox',
            onSelect: self.onRowSelect,
            onSelectAll: self.onSelectAll,
            self
        };
		autoBind(this);
    }

    onRowSelect(row, isSelected) {
        this.self.state.selectedRows[row.id] = isSelected;
    }

    onSelectAll(isSelected, rows) {
        const self = this.self;
        rows.forEach((row)=>{
            self.state.selectedRows[row.id] = isSelected;
        });
    }

    deleteSelected() {
        deleteItems(this.state.selectedRows);
    }


    render() {
        return (
            <div>
                <PageHeader>Expired Inventory <small>These shall never see the light of day nor the shelves of the Inn again!</small></PageHeader>
                <InventoryList inventory={this.props.inventory} hideColumns={['sellIn','quality']}/>
            </div>

        )
    }
}

export default branch({
    inventory: ['inventory', 'bad']
}, ExpiredInventory);