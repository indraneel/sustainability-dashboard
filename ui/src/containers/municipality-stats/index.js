import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';

import styled from 'styled-components';
import MunicipalityStatTile from '../../components/municipality-stat-tile';

const StatContainer = styled.div`
  margin: 0 auto;
  width: 800px;
  display: flex;
  flexDirection: column;
  justifyContent: space-around;
`;

const Title = styled.div`
  margin: 0 auto;
  font-size: 26px;
  font-weight: bold;
`;

class MunicipalityStats extends Component {
  renderTiles(stats) {
    let output = [];
    stats.forEach((viz) => {
      output.push(
        <MunicipalityStatTile stat={viz}/>
      );
    });

    return output;
  }

  render() {
    // let tiles = this.renderTiles(this.props.municipalities, this.props.selectedMunicipality);
    let tiles = this.renderTiles(this.props.stats);
    return(
      <StatContainer>
        <Title>{this.props.municipalityName} Stats</Title>
        <GridList
          cellHeight={500}
          cols={2}
          padding={10}
          width={{width: '900px'}}>
          {tiles}
        </GridList>
      </StatContainer>
    )
  }
}

export default MunicipalityStats;
