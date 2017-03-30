import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';

import style from './municipalities-grid.style.js';
import MunicipalitiesGridTile from '../../components/municipalities-grid-tile';
import CategoryMapper from '../../constants/category-map';
import {LoadingIndicator} from 'lucid-ui';

class MunicipalitiesGrid extends Component {
  renderTiles(municipalities, selectedMunicipality = null) {
    let output = [];
    if (!selectedMunicipality) {
      municipalities.forEach((muniObj) => {
        output.push(
          <MunicipalitiesGridTile
          municipality={muniObj}
          />
        );
      });
    } else {
      municipalities.forEach((muniObj) => {
        if (muniObj.town === selectedMunicipality) {
          output.push(
            <MunicipalitiesGridTile
            municipality={muniObj}
            />
          );
        }
      });
    }

    return output;
  }
  render() {
    let tiles = this.renderTiles(this.props.municipalities, this.props.selectedMunicipality);
    return(
      <div style={style.root}>
        <LoadingIndicator isLoading={this.props.isFetching}>
        <GridList
          cellHeight={'auto'}
          cols={3}
          padding={25}
          style={style.gridList}
        >
          {tiles}
        </GridList>
        </LoadingIndicator>
      </div>
    )
  }
}

export default MunicipalitiesGrid;
