import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MenuBar from '../../containers/menu-bar';
import CategoryBar from '../../containers/category-bar';
import ReportCardGrid from '../../containers/report-card-grid';
import ActionEditor from '../action-editor';
import {
  municipalityLoaded,
  selectCategory,
  deselectCategory
} from '../../redux/modules/municipality';
import {
  actionEditorOpened,
  actionEditorClosed
} from '../../redux/modules/actionEditor';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleToggleActionEditor = this.handleToggleActionEditor.bind(this);
  }

  handleSelectCategory(categoryID) {
    if (this.props.municipality.selectedCategoryID && this.props.municipality.selectedCategoryID === categoryID) {
      this.props.deselectCategory(categoryID);
    } else {
      this.props.selectCategory(categoryID);
    }
  }

  handleToggleActionEditor() {
    if (this.props.actionEditor.actionEditorOpen) {
      this.props.actionEditorClosed();
    } else {
      this.props.actionEditorOpened();
    }
  }

  render() {
    let {
      municipality: {
        name,
        completedActionIDs,
        categoryIDs,
        categories,
        sustainabilityActions,
        selectedCategoryID
      },
      actionEditor: {
        actionEditorOpen
      }
    } = this.props;
    return (
      <div style={{height: '100%'}} className={'Dash'}>
        <MenuBar
          municipalityName={name}
          toggleActionEditor={this.handleToggleActionEditor}
          actionEditorOpen={actionEditorOpen}/>
        {actionEditorOpen ?
          <ActionEditor />
          :
          <div>
            <CategoryBar
              categories={categories}
              categoryIDs={categoryIDs}
              handleSelectCategory={this.handleSelectCategory}
              selectedCategoryID={selectedCategoryID}/>
            <ReportCardGrid
              categories={categories}
              completedActionIDs={completedActionIDs}
              sustainabilityActions={sustainabilityActions}
              selectedCategoryID={selectedCategoryID}/>
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
    municipalityLoaded: bindActionCreators(municipalityLoaded, dispatch),
    selectCategory: bindActionCreators(selectCategory, dispatch),
    deselectCategory: bindActionCreators(deselectCategory, dispatch),
    actionEditorOpened: bindActionCreators(actionEditorOpened, dispatch),
    actionEditorClosed: bindActionCreators(actionEditorClosed, dispatch),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
