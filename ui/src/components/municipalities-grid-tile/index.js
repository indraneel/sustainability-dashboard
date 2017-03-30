import React, { Component } from 'react';
import style from '../tile-style.js';
import { Link } from 'react-router'

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ContentLink from 'material-ui/svg-icons/content/link';

import COLORS from '../../constants/colors';

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;


`;

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 10px;
  &:hover {
    border-top: 1px solid ${COLORS.PURPLE.hex};
  }
`;

class MunicipalitiesGridTile extends Component {
  render() {
    let {
      points,
      town
    } = this.props.municipality;

    let pointStyle = {
      fontSize: '60px'
    };
    if (Number(points)) {
      if (Number(points) >= 0 && Number(points)<200){
        pointStyle.color = COLORS.RED.hex;
      } else if (Number(points) >= 200 & Number(points)<500) {
        pointStyle.color = COLORS.YELLOW.hex;
      } else if (Number(points)>=500) {
        pointStyle.color = COLORS.LIGHT_GREEN.hex;
      }
    }

    return (
      <StyledLink to={'/dashboard/'+town}>
        <StyledPaper>
          <div style={style.bigText}>
            <span style={pointStyle}>{points}</span>
            <span style={{fontSize: '24px'}}>points</span>
          </div>
          <div style={style.titleBar}>
            <Divider />
            <div style={style.title}>{town}</div>
          </div>
        </StyledPaper>
      </StyledLink>
    )
  }
}

export default MunicipalitiesGridTile;
