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
    this.handleCategoryChanged = this.handleCategoryChanged.bind(this);
  }
  handleValueChanged(e, value) {
    this.props.handleValueChanged(e.target.id, value);
  }
  handleCategoryChanged(e, key, payload) {
    this.props.handleValueChanged('categoryId', payload);
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
    this.props.categories.forEach((category, index) => {
      categories.push(<MenuItem
        key={index}
        id={'category'}
        value={category.categoryId}
        primaryText={category.title}/>
      );
    });

    return (
      <div style={style.root} className={'Dash-ActionEditor-Form'}>
        <div style={style.section}>
          <SelectField
            id={'category'}
            floatingLabelText={'Category Name'}
            multiple={false}
            value={categoryId}
            onChange={this.handleCategoryChanged}
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
            primary={true}
            onTouchTap={this.props.handleSave}/>
        </div>
      </div>
    )
  }
}

export default Form;
