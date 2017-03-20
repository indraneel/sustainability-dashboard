import React, { Component } from 'react';
import style from './menu-bar.style.js';

import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class MenuBar extends Component {
  render() {
    let actionEditorButtonClassName = this.props.actionEditorOpen ?
      'Dash-ActionEditor-Button-Opened' : 'Dash-ActionEditor-Button-Closed';

    let actionEditorButtonStyle = this.props.actionEditorOpen ?
      style.closeActionEditorButton
      : style.openActionEditorButton;

    let actionEditorButton = <FloatingActionButton
        onTouchTap={this.props.toggleActionEditor}
        secondary={this.props.actionEditorOpen}
        style={actionEditorButtonStyle}
        className={actionEditorButtonClassName}>
        { this.props.actionEditorOpen ?
          <NavigationClose />
          : <ContentAdd />
        }
      </FloatingActionButton>;

    return (
      <AppBar
        style={style.root}
        iconElementRight={actionEditorButton}
        title={<div>
          <img alt={'logo'} style={style.logo} src={'http://www.sustainablejersey.com/typo3conf/ext/t3site/Sites/Main/Resources/Public/Images/logo-sj.png'}/>
        </div>}
        titleStyle={style.title}
        showMenuIconButton={false}>
      </AppBar>
    )
  }
}

export default MenuBar;
