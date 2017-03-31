import api from '../services/api';

// imported actions
import {
  ACTION_EDITOR_SAVED,
  ACTION_EDITOR_OPENED,
  ACTION_EDITOR_CLOSED
} from './actionEditor';
import CategoryData from '../../constants/categories';
import CompletedActions from '../../constants/completed-actions';

// actions
const ACTION_PREFIX = 'sd/municipality/';

const DASHBOARD_LOADED = ACTION_PREFIX + 'DASHBOARD_LOADED';

const MUNICIPALITY_SELECTED = ACTION_PREFIX + 'MUNICIPALITY_SELECTED';
const MUNICIPALITY_INVALIDATED = ACTION_PREFIX + 'MUNICIPALITY_INVALIDATED';
const MUNICIPALITY_REQUESTED = ACTION_PREFIX + 'MUNICIPALITY_REQUESTED';
const MUNICIPALITY_RECEIVED = ACTION_PREFIX + 'MUNICIPALITY_RECEIVED';

const STATS_INVALIDATED = ACTION_PREFIX + 'STATS_INVALIDATED';
const STATS_REQUESTED = ACTION_PREFIX + 'STATS_REQUESTED';
const STATS_RECEIVED = ACTION_PREFIX + 'STATS_RECEIVED';

const MUNICIPALITY_SELECT_ACTION = ACTION_PREFIX + 'SELECT_ACTION';
const MUNICIPALITY_SELECT_CATEGORY = ACTION_PREFIX + 'SELECT_CATEGORY';
const MUNICIPALITY_DESELECT_CATEGORY = ACTION_PREFIX + 'DESELECT_CATEGORY';

// action creators
export function dashboardLoaded() {
  return {
    type: DASHBOARD_LOADED,
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

export function municipalityInvalidated() {
  return {
    type: MUNICIPALITY_INVALIDATED
  };
}

export function municipalityRequested(municipalityName) {
  return {
    type: MUNICIPALITY_REQUESTED,
    payload: {
      municipalityName
    }
  };
}

export function municipalityReceived(municipalityName, response) {
  return {
    type: MUNICIPALITY_RECEIVED,
    payload: {
      response
    }
  };
}

export function statsInvalidated() {
  return {
    type: STATS_INVALIDATED
  };
}

export function statsRequested(municipalityName) {
  return {
    type: STATS_REQUESTED,
    payload: {
      municipalityName
    }
  };
}

export function statsReceived(municipalityName, response) {
  return {
    type: STATS_RECEIVED,
    payload: {
      response
    }
  };
}

export function selectAction(actionId) {
  return {
    type: MUNICIPALITY_SELECT_ACTION,
    payload: {
      actionId
    }
  };
}

export function selectCategory(categoryID) {
  return {
    type: MUNICIPALITY_SELECT_CATEGORY,
    payload: {
      categoryID
    }
  };
}

export function deselectCategory(categoryID) {
  return {
    type: MUNICIPALITY_DESELECT_CATEGORY,
    payload: categoryID
  };
}

// thunks
export function getMunicipality(municipalityName) {
  if (municipalityName) {
    return dispatch => {
      dispatch(municipalitySelected(municipalityName));
      dispatch(municipalityRequested(municipalityName));
      return api('action', 'GET', {town: municipalityName})
      .then(response => response.json())
      .then(json => dispatch(municipalityReceived(municipalityName, json)));

    }
  }
}

export function getStats(municipalityName) {
  if (municipalityName) {
    return dispatch => {
      dispatch(statsRequested(municipalityName));
      return api('stats', 'GET', {town: municipalityName})
      .then(response => response.json())
      .then(json => dispatch(statsReceived(municipalityName, json)));
    }
  }
}

// initial state
const initialState = {
  isFetching: false,
  didInvalidate: false,
  name: "Haddonfield",
  currentScreenPath: 'dashboard',
  currentActionId: 0,
  completedActions: {},
  completedActionIDs: [],
  categories: CategoryData,
  categoryIDs: CategoryData.reduce((arr, Category) => {
    return arr.concat(Category.categoryId);
  }, []),
  totalPoints: 0,
  selectedCategoryID: null,
  isFetchingStats: null,
  stats: []
};

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_EDITOR_OPENED:
      return Object.assign({},
        {...state},
        {currentScreenPath: 'editor'}
      );
    case ACTION_EDITOR_CLOSED:
    case DASHBOARD_LOADED:
      return Object.assign({},
        {...state},
        {currentScreenPath: 'dashboard'}
      );

    case MUNICIPALITY_SELECT_ACTION:
      return Object.assign({},
        { ...state },
        { currentActionId: action.payload.actionId }
      );

    case MUNICIPALITY_SELECT_CATEGORY:
      let selectedCategoryID = action.payload.categoryID;
      return Object.assign({},
        { ...state },
        { selectedCategoryID }
      );
    case MUNICIPALITY_DESELECT_CATEGORY:
      return Object.assign({},
        { ...state },
        { selectedCategoryID: null }
      );

    case MUNICIPALITY_SELECTED:
      return Object.assign({},
        { ...state },
        {
          name: action.payload.municipalityName
        }
      );

    case STATS_REQUESTED:
      return Object.assign({},
        { ...state },
        {
          isFetchingStats: true
        }
      );

    case STATS_RECEIVED:
      return Object.assign({},
        { ...state },
        {
          isFetchingStats: false,
          stats: action.payload.response.stats
        }
      );

    case MUNICIPALITY_REQUESTED:
      return Object.assign({},
        { ...state },
        {
          isFetching: true
        }
      );

    case MUNICIPALITY_RECEIVED:
      let responseIDs = {};
      action.payload.response.forEach((val, index) => {
        if (!responseIDs[val.id]) {
          responseIDs[val.id] = index;
        }
      });
      return Object.assign({},
        { ...state },
        {
          isFetching: false,
          completedActions: action.payload.response,
          completedActionIDs: responseIDs
        }
      );

    default:
      return state;
  }
}
