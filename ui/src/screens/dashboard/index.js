import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import style from './dashboard-style.js';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Divider from 'material-ui/Divider';
import {LoadingIndicator} from 'lucid-ui';
import MenuBar from '../../containers/menu-bar';
import CategoryBar from '../../containers/category-bar';
import MunicipalityStats from '../../containers/municipality-stats';

import ReportCardGrid from '../../containers/report-card-grid';
import ActionEditor from '../action-editor';
import {
  selectCategory,
  deselectCategory,
  getMunicipality,
  getStats,
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
      getStats,
      location: {
        pathname
      },
      params: {
        municipalityName
      }
    } = this.props;

    getMunicipality(municipalityName);
    getStats(municipalityName);
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
        isFetching,
        isFetchingStats,
        stats
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
          actionEditorOpen={actionEditorOpen}
          showLoader={isFetching}/>
        {actionEditorOpen ?
          <ActionEditor />
          :
          <div style={style.content}>
            { !displaySpecificCard ?
              <div>
                <LoadingIndicator isLoading={isFetchingStats}>
                  <MunicipalityStats
                  municipalityName={municipalityName}
                  stats={stats}/>
                </LoadingIndicator>
                <Divider />
                <CategoryBar
                  municipalityName={name}
                  categories={categories}
                  categoryIDs={categoryIDs}
                  handleSelectCategory={this.handleSelectCategory}
                  selectedCategoryID={selectedCategoryID}/>
              </div>
              : null
            }
            <LoadingIndicator isLoading={isFetching}>
            <ReportCardGrid
              displaySpecificCard={displaySpecificCard}
              displayActionId={displayActionId}
              categories={categories}
              completedActions={completedActions}
              completedActionIDs={completedActionIDs}
              handleBuildViz={this.handleBuildViz}
              selectedCategoryID={selectedCategoryID}
              municipalityName={name}/>
            </LoadingIndicator>
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
    getStats: bindActionCreators(getStats, dispatch),
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
