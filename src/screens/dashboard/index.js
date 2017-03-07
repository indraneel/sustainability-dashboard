import React, { Component } from 'react';
import MenuBar from '../../containers/menu-bar';
import CategoryBar from '../../containers/category-bar';
import ReportCardGrid from '../../containers/report-card-grid';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import {
  municipalityLoaded,
  selectAction,
  deselectAction
} from '../../redux/modules/municipality';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleSelectAction = this.handleSelectAction.bind(this);
    this.handleDeselectAction = this.handleDeselectAction.bind(this);
  }

  handleSelectAction(category) {
    console.log(category.target);
    this.props.selectAction(category);
  }

  handleDeselectAction(category) {
    console.log(category);
    this.props.deselectAction(category);
  }

  render() {
    let {
      municipality: {
        name,
        completedActionIDs,
        categoryIDs,
        categories,
        sustainabilityActions
      },
      handleSelectAction,
      handleDeselectAction
    } = this.props;
    return (
      <div style={{height: '100%'}}>
        <MenuBar
          municipalityName={name}/>
        <CategoryBar
          categories={categories}
          categoryIDs={categoryIDs}
          handleSelectAction={this.handleSelectAction}
          handleDeselectAction={this.handleDeselectAction}/>
        <Divider />
        <ReportCardGrid
          completedActionIDs={completedActionIDs}
          sustainabilityActions={sustainabilityActions}/>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    municipality: state.municipality
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    municipalityLoaded: () => municipalityLoaded(),
    selectAction: (category) => selectAction(category),
    deselectAction: (category) => deselectAction(category),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
