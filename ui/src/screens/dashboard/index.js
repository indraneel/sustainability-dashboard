import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import style from './dashboard-style.js';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

import MenuBar from '../../containers/menu-bar';
import CategoryBar from '../../containers/category-bar';

import ReportCardGrid from '../../containers/report-card-grid';
import ActionEditor from '../action-editor';
import {
  selectCategory,
  deselectCategory,
  getMunicipality,
  selectAction
} from '../../redux/modules/municipality';
import {
  actionEditorOpened,
  actionEditorClosed,
  toggleActionEditor
} from '../../redux/modules/actionEditor';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleBuildViz = this.handleBuildViz.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleToggleActionEditor = this.handleToggleActionEditor.bind(this);
  }

  componentDidMount() {
    const {
      getMunicipality,
      location: {
        pathname
      },
      params: {
        municipalityName
      }
    } = this.props;

    getMunicipality(municipalityName);
  }

  handleSelectCategory(categoryID) {
    if (this.props.municipality.selectedCategoryID && this.props.municipality.selectedCategoryID === categoryID) {
      this.props.deselectCategory(categoryID);
    } else {
      this.props.selectCategory(categoryID);
    }
  }

  handleBuildViz(id) {
    this.props.selectAction(id);
    this.props.toggleActionEditor();
  }

  handleToggleActionEditor() {
    this.props.toggleActionEditor();
  }

  render() {
    let {
      location: {
        pathname
      },
      params: {
        municipalityName,
        displayActionId
      },
      municipality: {
        name,
        completedActions,
        completedActionIDs,
        categoryIDs,
        categories,
        selectedCategoryID,
        isFetching
      },
      actionEditor: {
        actionEditorOpen
      }
    } = this.props;

    displayActionId = parseInt(displayActionId);
    let displaySpecificCard = displayActionId && Object.keys(completedActionIDs).map(Number).includes(displayActionId);

    return (
      <div style={style.root} className={'Dash'}>
        <MenuBar
          municipalityName={name}
          toggleActionEditor={this.handleToggleActionEditor}
          actionEditorOpen={actionEditorOpen}/>
        {
          isFetching ?
          <LinearProgress mode="indeterminate" />
          : null
        }
        {actionEditorOpen ?
          <ActionEditor />
          :
          <div>
            { !displaySpecificCard ?
              <CategoryBar
                municipalityName={name}
                categories={categories}
                categoryIDs={categoryIDs}
                handleSelectCategory={this.handleSelectCategory}
                selectedCategoryID={selectedCategoryID}/>
              : <RaisedButton
                  label='Back to all actions'
                  secondary={false}
                  href={'/#/dashboard/'+municipalityName}/>
            }
            <ReportCardGrid
              displaySpecificCard={displaySpecificCard}
              displayActionId={displayActionId}
              categories={categories}
              completedActions={completedActions}
              completedActionIDs={completedActionIDs}
              handleBuildViz={this.handleBuildViz}
              selectedCategoryID={selectedCategoryID}
              municipalityName={name}/>
          </div>
         }
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    municipality: state.municipality,
    actionEditor: state.actionEditor,
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    getMunicipality: bindActionCreators(getMunicipality, dispatch),
    selectAction: bindActionCreators(selectAction, dispatch),
    selectCategory: bindActionCreators(selectCategory, dispatch),
    deselectCategory: bindActionCreators(deselectCategory, dispatch),
    actionEditorOpened: bindActionCreators(actionEditorOpened, dispatch),
    actionEditorClosed: bindActionCreators(actionEditorClosed, dispatch),
    toggleActionEditor: bindActionCreators(toggleActionEditor, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
