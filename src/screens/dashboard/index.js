import React, { Component } from 'react';
import MenuBar from '../../containers/menu-bar';
import CategoryBar from '../../containers/category-bar';
import ReportCardGrid from '../../containers/report-card-grid';
import ActionEditor from '../action-editor';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  municipalityLoaded,
  selectAction,
  deselectAction
} from '../../redux/modules/municipality';
import {
  actionEditorOpened,
  actionEditorClosed
} from '../../redux/modules/actionEditor';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleSelectAction = this.handleSelectAction.bind(this);
    this.handleToggleActionEditor = this.handleToggleActionEditor.bind(this);
  }

  handleSelectAction(categoryID) {
    if (this.props.municipality.selectedCategoryID && this.props.municipality.selectedCategoryID === categoryID) {
      this.props.deselectAction(categoryID);
    } else {
      this.props.selectAction(categoryID);
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
      },
      handleSelectAction,
      handleDeselectAction,
      actionEditorOpened,
      actionEditorClosed
    } = this.props;
    return (
      <div style={{height: '100%'}} className={'Dash'}>
        <MenuBar
          municipalityName={name}
          toggleActionEditor={this.handleToggleActionEditor}/>
        {actionEditorOpen ?
          <ActionEditor />
          :
          <div>
            <CategoryBar
              categories={categories}
              categoryIDs={categoryIDs}
              handleSelectAction={this.handleSelectAction}
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
    selectAction: bindActionCreators(selectAction, dispatch),
    deselectAction: bindActionCreators(deselectAction, dispatch),
    actionEditorOpened: bindActionCreators(actionEditorOpened, dispatch),
    actionEditorClosed: bindActionCreators(actionEditorClosed, dispatch),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
