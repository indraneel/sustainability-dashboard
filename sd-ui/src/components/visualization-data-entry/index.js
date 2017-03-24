import React, { Component } from 'react';
import style from './visualization-data-entry.style.js';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class VisualizationDataEntry extends Component {
  renderPieDataEntry(type, data, xAxisTitle, yAxisTitle){
    if (!data) {
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
      <Table bodyStyle={{width: '500px'}} headerStyle={{width: '500px'}}>
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
      <FlatButton label={'add pair'}/>
    </div>
  }

  renderLineDataEntry(type, data) {

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

  renderBigTextDataEntry(type, data) {
    let [
      lineOne,
      lineTwo,
      lineThree
    ] = data;
    return <div>
      <TextField
        id={'1'}
        floatingLabelText={'Line One'}
        value={lineOne ? lineOne.value : null}
        fullWidth={true}/>
      <TextField
        id={'2'}
        floatingLabelText={'Line Two'}
        value={lineTwo ? lineTwo.value : null}
        fullWidth={true}/>
      <TextField
        id={'3'}
        floatingLabelText={'Line Three'}
        value={lineThree ? lineThree.value : null}
        fullWidth={true}/>
      </div>
  }

  render() {
    let {
      type,
      xAxisTitle,
      yAxisTitle,
      data
    } = this.props.visualization;

    switch(type) {
      case 'pie':
        return this.renderPieDataEntry(type, data, xAxisTitle, yAxisTitle);
      case 'bar':
        return this.renderBarDataEntry(type, data, xAxisTitle, yAxisTitle);
      case 'text':
        return this.renderBigTextDataEntry(type, data);
      default:
        return null;
    }
  }
}

export default VisualizationDataEntry;
