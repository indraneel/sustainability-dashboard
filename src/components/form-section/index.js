import React, { Component } from 'react';
import style from './form-section.style.js';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

class FormSection extends Component {
  render() {
    return (
      <div style={style.root} className={'Dash-ActionEditor-Form-Section'}>
        <div style={style.label}>Label:</div>
        <SelectField />
      </div>
    )
  }
}

export default FormSection;
