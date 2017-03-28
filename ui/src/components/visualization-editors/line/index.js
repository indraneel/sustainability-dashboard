import React, { Component } from 'react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class LineVisualizationDataEntry extends Component {
  constructor(props) {
    super(props);
    this.handleVizEntryFieldChanged = this.handleVizEntryFieldChanged.bind(this);
    this.handleVizEntryValueAdded = this.handleVizEntryValueAdded.bind(this);
  }

  handleVizEntryValueAdded(e) {
    this.props.visualizationEditorDataAdded('line');
  }

  handleVizEntryFieldChanged(e, newValue) {
    let payload = {
      id: [e.target.id],
      newValue
    }
    this.props.visualizationEditorEntryFieldChanged('line', payload)
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
    } = entryFields.line;

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
                  floatingLabelText={'xValue'}
                  value={val[xAxisField]}
                  onChange={this.handleVizDataChanged}/>
              </TableRowColumn>
              <TableRowColumn key={index+'-2'}>
                <TextField
                  floatingLabelText={'yValue'}
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
          <TableHeaderColumn>xValue</TableHeaderColumn>
          <TableHeaderColumn>yValue</TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}>
          {existingDataRows(xAxisField, yAxisField)}
          <TableRow>
            <TableRowColumn>
              <TextField
                id={'xValue'}
                fullWidth={true}
                value={entryValues.line.xAxisField}
                onChange={this.handleVizEntryFieldChanged}/>
            </TableRowColumn>
            <TableRowColumn>
              <TextField
                id={'yValue'}
                fullWidth={true}
                value={entryValues.line.yAxisField}
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

export default LineVisualizationDataEntry;
