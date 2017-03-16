import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import {} from '../../redux/modules/actionEditor';

import Form from '../../containers/form';

var formRows = [];
class ActionEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'Dash-ActionEditor'}>
        <Form
          formSections={formRows} />
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    actionEditor: state.actionEditor
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionEditor);
