import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LinearProgress from 'material-ui/LinearProgress';

import MenuBar from '../../containers/menu-bar';
import MunicipalitiesGrid from '../../containers/municipalities-grid';

import {
  getMunicipalities,
  municipalitySelected
} from '../../redux/modules/municipalitySelector';

class MunicipalitySelector extends Component {
  constructor(props) {
    super(props);
    this.handleMunicipalitySelected = this.handleMunicipalitySelected.bind(this);
    this.handleMunicipalityDeselected = this.handleMunicipalityDeselected.bind(this);
  }

  componentDidMount() {
    const {
      getMunicipalities
    } = this.props;

    getMunicipalities();
  }

  handleMunicipalitySelected(name, index) {
    this.props.municipalitySelected(name);
  }

  handleMunicipalityDeselected(name, data, params) {
    if (!name || name === '') {
      this.props.municipalitySelected(null);
    }
  }

  render() {
    let {
      municipalitySelector: {
        isFetching,
        municipalities,
        municipalityNames,
        selectedMunicipality,
        municipalitySelected
      }
    } = this.props;

    return (
      <div className={'SD-Selector'}>
        <MenuBar
          showSearch={true}
          municipalityNames={municipalityNames}
          handleMunicipalitySelected={this.handleMunicipalitySelected}
          handleMunicipalityDeselected={this.handleMunicipalityDeselected}/>
        {
          isFetching ?
          <LinearProgress mode="indeterminate" />
          : <MunicipalitiesGrid
            municipalities={municipalities}
            selectedMunicipality={selectedMunicipality}/>
        }
      </div>
    )
  }
}


let mapStateToProps = (state) => {
  return {
    municipalitySelector: state.municipalitySelector
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    getMunicipalities: bindActionCreators(getMunicipalities, dispatch),
    municipalitySelected: bindActionCreators(municipalitySelected, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MunicipalitySelector);
