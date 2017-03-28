import React, { Component } from 'react';
import style from './form-section.style.js';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

class FormSection extends Component {
  render() {
    return (
      <div style={style.root} className={'Dash-ActionEditor-Form-Section'}>
        <span style={style.label}>{this.props.label}</span>
        <SelectField />
      </div>
    )
  }
}

export default FormSection;
