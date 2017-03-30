import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import isEmpty from 'lodash/isEmpty';
import style from './report-card-grid.style.js';
import ReportCardTile from '../../components/report-card-tile';
import CategoryMapper from '../../constants/category-map';

class ReportCardGrid extends Component {
  renderTiles(selectedCategory, completedActions, displaySpecificCard, displayCardId, municipalityName) {
    let output = [];

    Object.keys(completedActions).map((key, index) => {
      let actionData = completedActions[key];
      if (isEmpty(actionData.visualization)) {
        return;
      }

      if (displaySpecificCard) {
        if (actionData.id === displayCardId) {
          output.push(<ReportCardTile
            key={index}
            actionData={actionData}
            municipalityName={municipalityName}
            handleBuildViz={this.props.handleBuildViz}/>);
        }
      }
      else {
        if (selectedCategory) {
          let mappedCategory = CategoryMapper(actionData.category);
          if (selectedCategory.title === mappedCategory) {
            output.push(<ReportCardTile
              key={index}
              actionData={actionData}
              municipalityName={municipalityName}
              handleBuildViz={this.props.handleBuildViz}/>);
          }
        } else {
          output.push(<ReportCardTile
            key={index}
            actionData={actionData}
            municipalityName={municipalityName}
            handleBuildViz={this.props.handleBuildViz}/>);
        }
    }
    });

    Object.keys(completedActions).map((key, index) => {
      let actionData = completedActions[key];
      if (!isEmpty(actionData.visualization)) {
        return;
      }

      if (displaySpecificCard) {
        if (actionData.id === displayCardId) {
          output.push(<ReportCardTile
            key={index}
            actionData={actionData}
            municipalityName={municipalityName}
            handleBuildViz={this.props.handleBuildViz}/>);
        }
      }
      else {
        if (selectedCategory) {
          let mappedCategory = CategoryMapper(actionData.category);
          if (selectedCategory.title === mappedCategory) {
            output.push(<ReportCardTile
              key={index}
              actionData={actionData}
              municipalityName={municipalityName}
              handleBuildViz={this.props.handleBuildViz}/>);
          }
        } else {
          output.push(<ReportCardTile
            key={index}
            actionData={actionData}
            municipalityName={municipalityName}
            handleBuildViz={this.props.handleBuildViz}/>);
        }
    }
    });

    return output;
  }
  render() {
    let selectedCategory = null;
    if (this.props.selectedCategoryID) {
      selectedCategory = this.props.categories[this.props.selectedCategoryID-1];
    }
    let displaySpecificCard = this.props.displayActionId && Object.keys(this.props.completedActionIDs).map(Number).includes(this.props.displayActionId);
    let tiles = this.renderTiles(selectedCategory, this.props.completedActions, displaySpecificCard, this.props.displayActionId, this.props.municipalityName);

    return (
      <div style={style.root}>
        <GridList
          cellHeight={300}
          cols={displaySpecificCard ? 1 : 3}
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
