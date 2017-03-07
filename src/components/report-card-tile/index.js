import React, { Component } from 'react';
import {GridTile} from 'material-ui/GridList';
import style from './report-card-tile.style.js';

class ReportCardTile extends Component {
  render() {
    return (
      <GridTile
        key={this.props.tile.id}
        title={this.props.tile.title} />
    );
  }
}

export default ReportCardTile;
