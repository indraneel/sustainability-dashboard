import React, { Component } from 'react';
import style from '../tile-style.js';
import { Link } from 'react-router'

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ContentLink from 'material-ui/svg-icons/content/link';

import Visualization from '../visualization';

import COLORS from '../../constants/colors';

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  maxHeight: 500px;
  maxWidth: 400px;

  &:hover {
    border-top: 2px solid red;
  }
`;

class MunicipalityStatTile extends Component {
  render() {
    let {
      visualization,
      title
    } = this.props.stat;

    return (
      <Paper style={style.root}>
        <Visualization visualization={visualization}/>
        <div style={style.titleBar}>
          <Divider />
          <div style={style.title}>{title}</div>
        </div>
      </Paper>
    )
  }
}

export default MunicipalityStatTile;
