import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ContentLink from 'material-ui/svg-icons/content/link';

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

import style from './report-card-tile.style.js';

import Visualization from '../visualization';

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
      title,
      visualization
    } = this.props.actionData;

    const shareUrl = '/#/'+id;
    return (
      <Paper style={style.root}>
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

        <Divider />
        <div style={style.viz}>
          <Visualization visualization={visualization}/>
        </div>
        <Divider />
        <div style={style.titleBar}>
          {title}
        </div>
      </Paper>
    );
  }
}

export default ReportCardTile;
