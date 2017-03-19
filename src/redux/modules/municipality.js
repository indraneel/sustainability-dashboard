// imported actions
import {
  ACTION_EDITOR_SAVED
} from './actionEditor';
import CategoryData from '../../constants/categories';

// actions
const ACTION_PREFIX = 'sustainability-dashboard/municipality/';

const MUNICIPALITY_LOADED = ACTION_PREFIX + 'MUNICIPALITY_LOADED';
const MUNICIPALITY_SELECT_CATEGORY = ACTION_PREFIX + 'SELECT_CATEGORY';
const MUNICIPALITY_DESELECT_CATEGORY = ACTION_PREFIX + 'DESELECT_CATEGORY';

// action creators
export function municipalityLoaded() {
  return {
    type: MUNICIPALITY_LOADED
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

// initial state
const initialState = {
  name: "Haddonfield",
  completedActionIDs: [],
  categoryIDs: [],
  points: 0,
  categories: CategoryData,
  sustainabilityActions: {},
  selectedCategoryID: null
};

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_EDITOR_SAVED:
      return state;

    case MUNICIPALITY_LOADED:
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
    default:
      return state;
  }
}
