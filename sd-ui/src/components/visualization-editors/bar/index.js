import React, { Component } from 'react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class BarVisualizationDataEntry extends Component {
  constructor(props) {
    super(props);
    this.handleVizEntryFieldsChanged = this.handleVizEntryFieldsChanged.bind(this);
  }

  handleVizEntryFieldsChanged(e, payload) {
      this.props.handleVisualizationValueChanged('entryFields', payload)
  }
  
  renderBarDataEntry(type, data, xAxisTitle, yAxisTitle) {
    if(!data) {
      return null;
    }

    let existingDataRows = data.reduce((acc, val, index) => {
      return acc.concat(
        <TableRow
          key={index}
          selectable={false}>
          <TableRowColumn key={index+'-1'}>
            <TextField value={val.x}></TextField>
          </TableRowColumn>
          <TableRowColumn key={index+'-2'}>
            <TextField value={val.y}></TextField>
          </TableRowColumn>
          <TableRowColumn key={index+'-3'}>
            <FlatButton label={'delete row'} secondary={true}/>
          </TableRowColumn>
        </TableRow>
      );
    }, []);

    return <div>
      <Table
        height={'300px'}
        bodyStyle={{width: '500px'}}
        headerStyle={{width: '500px'}}>
        <TableHeader>
          <TableHeaderColumn><TextField value={xAxisTitle} fullWidth={true}/></TableHeaderColumn>
          <TableHeaderColumn><TextField value={yAxisTitle} fullWidth={true}/></TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}>
          {existingDataRows}
          <TableRow>
            <TableRowColumn><TextField id={'x'} fullWidth={true}/></TableRowColumn>
            <TableRowColumn><TextField id={'y'} fullWidth={true}/></TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
      <FlatButton label={'save pair'}/>
    </div>
  }

  render(){
    let {
      type,
      data,
      entryFields
    } = this.props.visualization;

    if (!data) {
      return null;
    }
    let existingDataRows = data.reduce((acc, val, index) => {
      return acc.concat(
        <TableRow
          key={index}
          selectable={false}>
          <TableRowColumn key={index+'-1'}>
            <TextField
              floatingLabelText={'label'}
              value={val.x}
              onChange={this.handleVizDataChanged}/>
          </TableRowColumn>
          <TableRowColumn key={index+'-2'}>
            <TextField
              floatingLabelText={'value'}
              value={val.y}
              onChange={this.handleVizDataChanged}/>
          </TableRowColumn>
          <TableRowColumn key={index+'-3'}>
            <FlatButton label={'delete row'} secondary={true}/>
          </TableRowColumn>
        </TableRow>
      );
    }, []);

    return <div>
      <Table bodyStyle={{width: '500px'}} headerStyle={{width: '500px'}}>
        <TableHeader>
          <TableHeaderColumn>Label</TableHeaderColumn>
          <TableHeaderColumn>Value</TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}>
          {existingDataRows}
          <TableRow>
            <TableRowColumn>
              <TextField
                id={'x'}
                fullWidth={true}
                value={entryFields.pie.label}/>
            </TableRowColumn>
            <TableRowColumn>
              <TextField
                id={'y'}
                fullWidth={true}
                value={entryFields.pie.value}/>
            </TableRowColumn>
          </TableRow>

        </TableBody>
      </Table>
      <FlatButton label={'add pair'}/>
    </div>
  }
}

export default BarVisualizationDataEntry;
