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
  renderTiles(selectedCategory, reportData) {
    let output = [];
    reportData.map((tile) => {
      if (selectedCategory) {
         if (selectedCategory === tile.category) {
             output.push(<GridTile
               key={tile.id}
               title={tile.title}
               subtitle={tile.category}
             />);
         }
      } else {
        output.push(<GridTile
          key={tile.id}
          title={tile.title}
          subtitle={tile.category}
        />);
      }
    });
    output.push(<GridTile
      key={'add'}
      title={'add new'}>
    </GridTile>);

    return output;
  }
  render() {
    let selectedCategory = null;
    if (this.props.selectedCategoryID) {
      selectedCategory = this.props.categories[this.props.selectedCategoryID];
    }

    let tiles = this.renderTiles(selectedCategory, reportData);

    return (
      <div style={style.root}>
        <GridList
          cellHeight={300}
          cols={3}
          padding={25}
          style={style.gridList}
        >
        {tiles}
        </GridList>
      </div>
    );
  }
}

export default ReportCardGrid;
