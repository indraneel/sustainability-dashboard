import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import style from './report-card-grid.style.js';
import {RadialChart} from 'react-vis';
import ReportCardTile from '../../components/report-card-tile';
const reportData = [
  {
    id: 1,
    title: "emissions",
    category: "Governance",
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
    category: "Governance",
    description: "this is about env"
  },
  {
    id: 4,
    title: "emissions",
    category: "Governance",
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

  renderTiles(selectedCategory, reportData) {
    let output = [];

    reportData.map((actionData) => {
      if (selectedCategory) {
         if (selectedCategory === actionData.category) {
             output.push(<ReportCardTile actionData={actionData}/>);
         }
      } else {
        output.push(<ReportCardTile actionData={actionData}/>);
      }
    });

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
