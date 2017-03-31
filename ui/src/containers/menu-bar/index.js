import React, { Component } from 'react';
import style from './menu-bar.style.js';
import COLORS from '../../constants/colors';
import fuzzy from 'fuzzy';
import { browserHistory } from 'react-router'

import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import ActionHome from 'material-ui/svg-icons/action/home';

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.searchFilter = this.searchFilter.bind(this);
  }

  searchFilter(searchText, key) {
    return searchText !== '' && fuzzy.match(searchText, key);
  }
  render() {
    let isRootPath = browserHistory.getCurrentLocation().pathname === '/' ||
      browserHistory.getCurrentLocation().pathname === '/app';
    let topLeftButton =<FloatingActionButton
        onTouchTap={isRootPath ? null : browserHistory.goBack}
        backgroundColor={isRootPath ? COLORS.SILVER.hex : COLORS.DARK_BLUE.hex}>
        {
          isRootPath ?
          <ActionHome />
          : <NavigationBack />
        }
      </FloatingActionButton>;

    let actionEditorButtonClassName = this.props.actionEditorOpen ?
      'Dash-ActionEditor-Button-Opened' : 'Dash-ActionEditor-Button-Closed';

    let actionEditorButtonStyle = this.props.actionEditorOpen ?
      style.closeActionEditorButton
      : style.openActionEditorButton;

    let actionEditorButton = this.props.actionEditorOpen ?
      <FloatingActionButton
        onTouchTap={this.props.toggleActionEditor}
        backgroundColor={this.props.actionEditorOpen ? COLORS.LIGHT_RED.hex : COLORS.PINK.hex}
        className={actionEditorButtonClassName}>
        { this.props.actionEditorOpen ?
          <NavigationClose />
          : <ContentAdd />
        }
      </FloatingActionButton>
      : null;

    return (
      <div style={style.root}>
      <AppBar
        style={style.appBar}
        iconElementLeft={this.props.actionEditorOpen ? actionEditorButton : topLeftButton}
        title={<div>
          <img alt={'logo'} style={style.logo} src={'http://www.sustainablejersey.com/typo3conf/ext/t3site/Sites/Main/Resources/Public/Images/logo-sj.png'}/>
        </div>}
        iconElementRight={<div style={style.title}>{this.props.municipalityName}</div>}
        titleStyle={style.title}
        showMenuIconButton={true}>
        {
          this.props.showSearch ?
            <AutoComplete
              hintText="Which town are you looking for?"
              dataSource={this.props.municipalityNames}
              style={style.searchBar}
              fullWidth={true}
              onNewRequest={this.props.handleMunicipalitySelected}
              onUpdateInput={this.props.handleMunicipalityDeselected}
              textFieldStyle={{fontSize: '28px', lineHeight: '35px', fontColor: COLORS.YELLOW.hex}}
              underlineStyle={{borderColor: COLORS.SILVER.hex}}
              underlineFocusStyle={{borderColor: COLORS.YELLOW.hex}}
              filter={this.searchFilter}/>
          : null
        }
      </AppBar>
      { this.props.showLoader ?
        <LinearProgress mode="indeterminate" />
        : null
      }
      </div>
    )
  }
}

export default MenuBar;
