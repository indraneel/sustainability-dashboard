import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import style from './report-card-grid.style.js';

const reportData = [
  {
    id: 1,
    title: "emissions",
    category: "Environment",
    description: "this is about env"
  },
  {
    id: 2,
    title: "emissions",
    category: "Waste",
    description: "this is about env"
  },
  {
    id: 3,
    title: "emissions",
    category: "Environment",
    description: "this is about env"
  },
  {
    id: 4,
    title: "emissions",
    category: "Environment",
    description: "this is about env"
  },
  {
    id: 5,
    title: "emissions",
    category: "Environment",
    description: "this is about env"
  },
  {
    id: 6,
    title: "emissions",
    category: "Environment",
    description: "this is about env"
  },
  {
    id: 7,
    title: "emissions",
    category: "Environment",
    description: "this is about env"
  },
  {
    id: 8,
    title: "emissions",
    category: "Environment",
    description: "this is about env"
  },
];

class ReportCardGrid extends Component {
  render() {
    return (
      <div style={style.root}>
        <GridList
          cellHeight={300}
          cols={3}
          padding={25}
          style={style.gridList}
        >
          {reportData.map((tile) => (
            <GridTile
              key={tile.id}
              title={tile.title}
              subtitle={tile.category}
            >
            </GridTile>
          ))}
          <GridTile
            key={'add'}
            title={'add new'}>
          </GridTile>
        </GridList>
      </div>
    );
  }
}

export default ReportCardGrid;
