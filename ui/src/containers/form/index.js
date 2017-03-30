import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FileAttachment from 'material-ui/svg-icons/file/attachment';

import style from './form.style.js';
import FormSection from '../../components/form-section';
import Visualization from '../../components/visualization';
import VisualizationEditor from '../../containers/visualization-editor';
import CategoryMapper from '../../constants/category-map';
import SJCategories from '../../constants/sj-categories';
import COLORS from '../../constants/colors';
import VIZ_TYPES from '../../constants/visualization-types';

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleValueChanged = this.handleValueChanged.bind(this);
    this.handleCategoryChanged = this.handleCategoryChanged.bind(this);
    this.handleVizTypeChanged = this.handleVizTypeChanged.bind(this);
  }
  handleValueChanged(e, value) {
    this.props.handleValueChanged(e.target.id, value);
  }
  handleCategoryChanged(e, key, payload) {
    this.props.handleValueChanged('categoryId', payload);
  }
  handleVizTypeChanged(e, key, payload) {
    this.props.visualizationEditorTypeChanged(payload);
  }
  render() {
    let {
      id,
      action,
      category,
      categoryId,
      description,
      image,
      assets,
    } = this.props.actionData;

    let mappedCategory = CategoryMapper(category);
    let selectedCategory = null;
    if (this.props.categoryId) {
      selectedCategory = this.props.categories[this.props.categoryId-1];
    }
    let categories = [];
    this.props.categories.forEach((category, index) => {
      categories.push(<MenuItem
        key={index}
        id={'category'}
        value={category.categoryId}
        primaryText={category.title}/>
      );
    });

    let viz_types = [
      <MenuItem
        value={null}
        primaryText=""/>
    ];
    Object.keys(VIZ_TYPES).forEach((viz, index) => {
      viz_types.push(<MenuItem
        key={index}
        id={'visualization'}
        value={VIZ_TYPES[viz].type}
        primaryText={VIZ_TYPES[viz].title}/>);
    });

    let assetList = [
      <Subheader inset={true}>Attachments</Subheader>
    ];
    Object.keys(assets).forEach((filename) => {
      assetList.push(
        <ListItem
          primaryText={filename}
          leftAvatar={<FileAttachment />}>
        </ListItem>
      );
    });
    assetList.push(<Divider />);

    return (
    <Paper style={style.paper}>
      <div style={style.root} className={'Dash-ActionEditor-Form'}>
        <div style={style.section}>
          <SelectField
            id={'category'}
            floatingLabelText={'Category Name'}
            floatingLabelStyle={style.floatingLabel}
            multiple={false}
            value={categoryId}
            onChange={this.handleCategoryChanged}
            fullWidth={true}>
              {categories}
          </SelectField>
        </div>
        <div style={style.section}>
          <TextField
            id={'action'}
            floatingLabelText={'Action Name'}
            value={action}
            floatingLabelFixed={true}
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
          <List>
            {assetList}
          </List>
        </div>
        <div style={style.section}>
          <SelectField
            id={'visualization'}
            floatingLabelText={'Visualization'}
            floatingLabelStyle={style.label}
            multiple={false}
            value={this.props.visualizationEditor.type}
            onChange={this.handleVizTypeChanged}
            fullWidth={true}>
              {viz_types}
          </SelectField>
        </div>
        {
          this.props.visualizationEditor.type ?
          <div>
            <div style={style.visualizationSection}>
              <Visualization
                visualization={this.props.visualizationEditor}/>
            </div>
            <div style={style.section}>
              <VisualizationEditor />
            </div>
          </div>
          : null
        }
        <div style={style.section}>
          <RaisedButton
            label={'Save'}
            fullWidth={true}
            backgroundColor={COLORS.MINT_GREEN.hex}
            onTouchTap={this.props.handleSave}/>
        </div>
      </div>
      </Paper>
    )
  }
}

export default Form;
