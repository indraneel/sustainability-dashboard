import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';

import style from './report-card-tile.style.js';

import Visualization from '../visualization';

class ReportCardTile extends Component {

  render() {
    return (
      <Paper style={style.root}>
        <div style={style.social}>
          <IconButton />
        </div>
        <Divider />
        <div style={style.viz}>
          <Visualization />
        </div>
        <Divider />
        <div style={style.titleBar}>
          {this.props.actionData.title}
        </div>
      </Paper>
    );
  }
}

export default ReportCardTile;
