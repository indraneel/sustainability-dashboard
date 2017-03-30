import api from '../services/api';
// actions
const ACTION_PREFIX = 'sd/municipality-selector/';


const MUNICIPALITY_SELECTOR_LOADED = ACTION_PREFIX + 'MUNICIPALITY_SELECTOR_LOADED';
const MUNICIPALITY_SELECTED = ACTION_PREFIX + 'MUNICIPALITY_SELECTED';
const MUNICIPALITIES_REQUESTED = ACTION_PREFIX + 'MUNICIPALITIES_REQUESTED';
const MUNICIPALITIES_RECEIVED = ACTION_PREFIX + 'MUNICIPALITIES_RECEIVED';

export function municipalitySelectorLoaded() {
  return {
    type: MUNICIPALITY_SELECTOR_LOADED
  };
}
export function municipalitySelected(municipalityName) {
  return {
    type: MUNICIPALITY_SELECTED,
    payload: {
      municipalityName
    }
  };
}

export function municipalitiesRequested() {
  return {
    type: MUNICIPALITIES_REQUESTED
  };
}

export function municipalitiesReceived(response) {
  return {
    type: MUNICIPALITIES_RECEIVED,
    payload: {
      response
    }
  };
}

const initialState = {
  isFetching: false,
  didInvalidate: false,
  municipalities: [],
  municipalityNames: [],
  municipalityIDs: [],
  selectedMunicipality: null
};

// thunks
export function getMunicipalities() {
  return dispatch => {
    dispatch(municipalitySelectorLoaded());
    dispatch(municipalitiesRequested());
    return api('town', 'GET')
    .then(response => response.json())
    .then(json => dispatch(municipalitiesReceived(json)));
  }
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case MUNICIPALITY_SELECTED:
      return Object.assign({},
        { ...state },
        {
          selectedMunicipality: action.payload.municipalityName
        }
      );
    case MUNICIPALITIES_REQUESTED:
      return Object.assign({},
        { ...state },
        {
          isFetching: true
        }
      );

    case MUNICIPALITIES_RECEIVED:
      let names = [];
      action.payload.response.forEach((val, index) => {
        names.push(val.town);
      });
      return Object.assign({},
        { ...state },
        {
          isFetching: false,
          municipalities: action.payload.response,
          municipalityNames: names
        }
      );
    default:
      return state;
  }
}
