import React, { Component } from 'react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class PieVisualizationDataEntry extends Component {
  constructor(props) {
    super(props);
    this.handleVizEntryFieldChanged = this.handleVizEntryFieldChanged.bind(this);
    this.handleVizEntryValueAdded = this.handleVizEntryValueAdded.bind(this);
  }

  handleVizEntryValueAdded(e) {
    this.props.visualizationEditorDataAdded('pie');
  }

  handleVizEntryFieldChanged(e, newValue) {
    let payload = {
      id: [e.target.id],
      newValue
    }
    this.props.visualizationEditorEntryFieldChanged('pie', payload)
  }

  render(){
    let {
      type,
      data,
      entryValues,
      entryFields
    } = this.props.visualizationEditor;

    let {
      xAxisField,
      yAxisField
    } = entryFields.pie;

    if (!data) {
      return null;
    }
    let existingDataRows = (xAxisField, yAxisField) => data.reduce((acc, val, index) => {
      return ((xAxisField, yAxisField, acc, val, index) =>
        {
          return acc.concat(
            <TableRow
              key={index}
              selectable={false}>
              <TableRowColumn key={index+'-1'}>
                <TextField
                  floatingLabelText={'label'}
                  value={val[xAxisField]}
                  onChange={this.handleVizDataChanged}/>
              </TableRowColumn>
              <TableRowColumn key={index+'-2'}>
                <TextField
                  floatingLabelText={'value'}
                  value={val[yAxisField]}
                  onChange={this.handleVizDataChanged}/>
              </TableRowColumn>
              <TableRowColumn key={index+'-3'}>
                <FlatButton label={'delete row'} secondary={true}/>
              </TableRowColumn>
            </TableRow>
          );
        })(xAxisField, yAxisField, acc, val, index);
    }, []);

    return <div>
      <Table
        bodyStyle={{width: '500px'}}
        headerStyle={{width: '500px'}}
        selectable={false}>
        <TableHeader>
          <TableHeaderColumn>Label</TableHeaderColumn>
          <TableHeaderColumn>Value</TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}>
          {existingDataRows(xAxisField, yAxisField)}
          <TableRow>
            <TableRowColumn>
              <TextField
                id={'label'}
                fullWidth={true}
                value={entryValues.pie.label}
                onChange={this.handleVizEntryFieldChanged}/>
            </TableRowColumn>
            <TableRowColumn>
              <TextField
                id={'value'}
                fullWidth={true}
                value={entryValues.pie.value}
                onChange={this.handleVizEntryFieldChanged}/>
            </TableRowColumn>
          </TableRow>

        </TableBody>
      </Table>
      <FlatButton
        label={'add pair'}
        onTouchTap={this.handleVizEntryValueAdded}/>
    </div>
  }
}

export default PieVisualizationDataEntry;
