import React, { Component } from 'react';
import style from './form.style.js';
import FormSection from '../../components/form-section';
import Divider from 'material-ui/Divider';

class Form extends Component {
  render() {
    return (
      <div style={style.root} className={'Dash-ActionEditor-Form'}>
        <FormSection />
        <Divider />
        <FormSection />
        <Divider />
      </div>
    )
  }
}

export default Form;
