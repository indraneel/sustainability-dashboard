import React, { Component } from 'react';
import style from './menu-bar.style.js';
import AppBar from 'material-ui/AppBar';


class MenuBar extends Component {
  render() {
    return (
      <AppBar
        style={style.root}
        iconElementLeft={<img alt={'logo'} style={style.logo} src={'http://www.sustainablejersey.com/typo3conf/ext/t3site/Sites/Main/Resources/Public/Images/logo-sj.png'}/>}
        title={this.props.municipalityName}
        titleStyle={style.title}>
      </AppBar>
    )
  }
}

export default MenuBar;
