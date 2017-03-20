import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import style from './report-card-grid.style.js';
import {RadialChart} from 'react-vis';
import ReportCardTile from '../../components/report-card-tile';

class ReportCardGrid extends Component {
  generateViz() {
    return (
       <RadialChart
        innerRadius={100}
        radius={140}
        data={[
          {angle: 2},
          {angle: 6},
          {angle: 2},
          {angle: 3},
          {angle: 1}
        ]}
        width={300}
        height={300}
      />
    );
  }

  renderTiles(selectedCategory, completedActions) {
    let output = [];

    Object.keys(completedActions).map((key, index) => {
      let actionData = completedActions[key];
      if (selectedCategory) {
         if (selectedCategory.title === actionData.category) {
             output.push(<ReportCardTile
               key={index}
               actionData={actionData}/>);
         }
      } else {
        output.push(<ReportCardTile
          key={index}
          actionData={actionData}/>);
      }
    });

    return output;
  }
  render() {
    let selectedCategory = null;
    if (this.props.selectedCategoryID) {
      selectedCategory = this.props.categories[this.props.selectedCategoryID];
    }

    let tiles = this.renderTiles(selectedCategory, this.props.completedActions);

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
