import React, { Component } from 'react';
import style from './menu-bar.style.js';
import COLORS from '../../constants/colors';

import { browserHistory } from 'react-router'

import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import ActionHome from 'material-ui/svg-icons/action/home';

class MenuBar extends Component {

  render() {
    let isRootPath = browserHistory.getCurrentLocation().pathname === '/';
    let topLeftButton =<FloatingActionButton
        onTouchTap={isRootPath ? null : browserHistory.goBack}>
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
        backgroundColor={this.props.actionEditorOpen ? COLORS.PURPLE.hex : COLORS.PINK.hex}
        className={actionEditorButtonClassName}>
        { this.props.actionEditorOpen ?
          <NavigationClose />
          : <ContentAdd />
        }
      </FloatingActionButton>
      : null;

    return (
      <AppBar
        style={style.root}
        iconElementLeft={this.props.actionEditorOpen ? actionEditorButton : topLeftButton}
        title={<div>
          <img alt={'logo'} style={style.logo} src={'http://www.sustainablejersey.com/typo3conf/ext/t3site/Sites/Main/Resources/Public/Images/logo-sj.png'}/>
        </div>}
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
              onUpdateInput={this.props.handleMunicipalityDeselected}/>
          : null
        }
      </AppBar>
    )
  }
}

export default MenuBar;
