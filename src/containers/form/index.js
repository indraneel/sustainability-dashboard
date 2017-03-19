import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import style from './form.style.js';
import FormSection from '../../components/form-section';
import SJCategories from '../../constants/sj-categories';

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleValueChanged = this.handleValueChanged.bind(this);
  }
  handleValueChanged(e, value) {
    this.props.handleValueChanged(e.target.id, value);
  }
  render() {
    let {
      id,
      name,
      category,
      categoryId,
      description,
      image
    } = this.props.actionData;

    let categories = [];
    SJCategories.forEach((category, index) => {
      categories.push(<MenuItem
        value={index}
        primaryText={category}/>
      );
    });

    return (
      <div style={style.root} className={'Dash-ActionEditor-Form'}>
        <div style={style.section}>
          <SelectField
            id={'category'}
            floatingLabelText={'Category Name'}
            multiple={true}
            value={category}
            onChange={this.handleValueChanged}
            fullWidth={true}>
            {categories}
          </SelectField>
        </div>
        <div style={style.section}>
          <TextField
            id={'name'}
            floatingLabelText={'Action Name'}
            value={name}
            onChange={this.handleValueChanged}
            fullWidth={true}/>
        </div>
        <div style={style.section}>
          <TextField
            id={'description'}
            floatingLabelText={'Action Description'}
            multiLine={true}
            value={description}
            onChange={this.handleValueChanged}
            fullWidth={true}/>
        </div>
        <div style={style.section}>
          <RaisedButton
            label={'Save'}
            fullWidth={true}
            primary={true}/>
        </div>
      </div>
    )
  }
}

export default Form;
