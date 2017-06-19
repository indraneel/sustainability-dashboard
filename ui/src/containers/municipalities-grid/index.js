import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';

import style from './municipalities-grid.style.js';
import MunicipalitiesGridTile from '../../components/municipalities-grid-tile';
import CategoryMapper from '../../constants/category-map';
import {LoadingIndicator} from 'lucid-ui';
import orderBy from 'lodash/orderBy';

class MunicipalitiesGrid extends Component {
  sortMunicipalities(actions) {
    let output = [];
    output = orderBy(actions, [function(o) { return Number.parseInt(o.points); }], ['desc']);
    console.log(actions);
    return output;
  }

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
    let municipalities = this.sortMunicipalities(this.props.municipalities);
    let tiles = this.renderTiles(municipalities, this.props.selectedMunicipality);
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
