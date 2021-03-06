import _ from 'lodash';
import React, { PureComponent } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import FontAwesome from 'react-fontawesome';
import autoBind from "react-autobind";

import { deleteItems, showModal } from '../../actions/appActions';

class InventoryList extends PureComponent {

	constructor(props) {
		super(props);
        this.state = {
            selectedRows: {}
        }
        const self = this;
        this.selectRowProp = {
            mode: 'checkbox',
            onSelect: self.onRowSelect,
            onSelectAll: self.onSelectAll,
            self
        };
        /**
         * <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
<TableHeaderColumn dataField='label' width="200">Item</TableHeaderColumn>
<TableHeaderColumn dataField='category'>Category</TableHeaderColumn>
<TableHeaderColumn dataField='quality' width="100">Quality</TableHeaderColumn>
<TableHeaderColumn dataField='sellIn' width="100">Sell In (Days)</TableHeaderColumn>
         */
        this.columnConfig = [
            {
                id: 'id',
                key: true,
                hidden: true,
                label: "ID"
            },
            {
                id: 'label',
                label: "Item"
            },
            {
                id: 'category',
                label: "Category"
            },
            {
                id: 'quality',
                label: "Quality",
                width: "100"
            },
            {
                id: 'sellIn',
                label: "Sell In (Days)",
                width: "100"
            }
        ]
		autoBind(this);
    }

    onRowSelect(row, isSelected) {
        const self = this.self;
        self.state.selectedRows[row.id] = isSelected;
        // Need to clone deep since PureComponent is being used
        self.setState(_.cloneDeep(self.state));
    }

    onSelectAll(isSelected, rows) {
        const self = this.self;
        rows.forEach((row) => {
            self.state.selectedRows[row.id] = isSelected;
        });
         // Need to clone deep since PureComponent is being used
        self.setState(_.cloneDeep(self.state));
    }

    deleteSelected() {
        if ((this.props.deleteWarning && window.confirm("These items are still good, are you sure you want to vanish them?")) || !this.props.deleteWarning) {
            deleteItems(this.state.selectedRows);
        }
    }

    showAddItemModal() {
        showModal();
    }

    render() {
        const self = this;
        if (this.props.hideColumns) {
            this.props.hideColumns.forEach((hideColumnId) => {
                self.columnConfig.forEach((column) => {
                    if (column.id === hideColumnId) {
                        column.hidden = true;
                    }
                })
            })
        }

        const columnHeaders = [];
        this.columnConfig.forEach((column) => {
            const isKey = column.key;
            const hidden = column.hidden;
            const dataField = column.id;
            const label = column.label;
            const width = column.width ? column.width : '*';
            columnHeaders.push(<TableHeaderColumn key={"col-" + dataField} dataField={dataField} isKey={isKey} hidden={hidden} width={width}>{label}</TableHeaderColumn>)
        })



        const deleteDisabled = (_.indexOf(_.values(this.state.selectedRows),true)===-1);
        console.log("VALUES:",_.values(this.state.selectedRows));

        let addButton = <span/>
        if (this.props.addButton) {
           addButton = <Button bsStyle="success" onClick={this.showAddItemModal}><FontAwesome name='magic'/> Manifest Item</Button>
        }

        return (
            <div>
                <Row>
                    <Col lg={12} style={{marginBottom:'10px'}}>
                        {addButton}&nbsp;<Button bsStyle="danger" onClick={this.deleteSelected} disabled={deleteDisabled}><FontAwesome name='fire'/> Vanish Selected Inventory</Button>
                    </Col>
                    <Col lg={12}>
                        <BootstrapTable data={this.props.inventory} striped hover condensed pagination selectRow={this.selectRowProp}>
                            {columnHeaders}
                        </BootstrapTable>
                    </Col>
                </Row>
            </div>

        )
    }
}

export default InventoryList;