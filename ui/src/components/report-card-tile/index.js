import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ContentLink from 'material-ui/svg-icons/content/link';

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

import style from '../tile-style.js';
import CategoryMapper from '../../constants/category-map';
import categories from '../../constants/categories';
import COLORS from '../../constants/colors';
import Visualization from '../visualization';
import VisualizationPlaceholder from '../visualization/placeholder';

const {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  LinkedinShareButton
} = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const WhatsappIcon = generateShareIcon('whatsapp');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');

class ReportCardTile extends Component {

  render() {
    let {
      id,
      category,
      description,
      action,
      visualization
    } = this.props.actionData;
    const mappedCategory = CategoryMapper(category);
    let colorForCategory = '';
    categories.forEach((obj) => {
      if (obj.title === mappedCategory) {
        colorForCategory = COLORS[obj.color].hex;
      }
    });

    const shareUrl = '/app/dashboard/'+this.props.municipalityName+'/'+id;
    return (
      <Paper style={style.root}>
        { !isEmpty(visualization) ?
          <div style={style.social}>
                <FacebookShareButton
                  url={shareUrl}>
                  <FacebookIcon size={32}/>
                </FacebookShareButton>
                <TwitterShareButton
                  url={shareUrl}>
                  <TwitterIcon size={32}/>
                </TwitterShareButton>
                <WhatsappShareButton
                  url={shareUrl}>
                  <WhatsappIcon size={32}/>
                </WhatsappShareButton>
                <PinterestShareButton
                  url={shareUrl}>
                  <PinterestIcon size={32}/>
                </PinterestShareButton>
                <LinkedinShareButton
                  url={shareUrl}>
                  <LinkedinIcon size={32}/>
                </LinkedinShareButton>

            <a href={shareUrl} style={style.permalink}>
              <ContentLink />
            </a>
          </div>
          : <VisualizationPlaceholder id={id} handleBuildViz={this.props.handleBuildViz}/>
        }

        <Divider />
        <div style={style.viz}>
          {
              !isEmpty(visualization) ?
              <Visualization visualization={visualization}/>
              : null
          }

        </div>
        <div style={{...style.titleBar}, {backgroundColor: colorForCategory}}>
          <Divider />
          <div style={style.title}>{action}</div>
        </div>
      </Paper>
    );
  }
}

export default ReportCardTile;
