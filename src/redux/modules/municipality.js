
// actions
const ACTION_PREFIX = 'sustainability-dashboard/municipality/';

const MUNICIPALITY_LOADED = ACTION_PREFIX + 'MUNICIPALITY_LOADED';
const MUNICIPALITY_SELECT_ACTION = ACTION_PREFIX + 'SELECT_ACTION';
const MUNICIPALITY_DESELECT_ACTION = ACTION_PREFIX + 'DESELECT_ACTION';

// action creators
export function municipalityLoaded() {
  return {
    type: MUNICIPALITY_LOADED
  };
}

export function selectAction(categoryID) {
  return {
    type: MUNICIPALITY_SELECT_ACTION,
    payload: {
      categoryID
    }
  };
}

export function deselectAction(categoryID) {
  return {
    type: MUNICIPALITY_DESELECT_ACTION,
    payload: categoryID
  };
}

// initial state
const initialState = {
  name: "Haddonfield",
  completedActionIDs: [],
  categoryIDs: [],
  points: 0,
  categories: {},
  sustainabilityActions: {},
  selectedCategoryID: null
};

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case MUNICIPALITY_LOADED:
    case MUNICIPALITY_SELECT_ACTION:
      let selectedCategoryID = action.payload.categoryID;
      return Object.assign({},
        { ...state },
        { selectedCategoryID }
      );
    case MUNICIPALITY_DESELECT_ACTION:
    return Object.assign({},
      { ...state },
      { selectedCategoryID: null }
    );
    default:
      return state;
  }
}
