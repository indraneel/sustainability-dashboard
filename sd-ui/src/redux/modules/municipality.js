// imported actions
import {
  ACTION_EDITOR_SAVED
} from './actionEditor';
import CategoryData from '../../constants/categories';
import CompletedActions from '../../constants/completed-actions';

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
  id: 0,
  completedActions: CompletedActions,
  completedActionIDs: CompletedActions.reduce((arr, CompletedAction) => {
    return arr.concat(CompletedAction.id);
  }, []),
  categories: CategoryData,
  categoryIDs: CategoryData.reduce((arr, Category) => {
    return arr.concat(Category.categoryId);
  }, []),
  totalPoints: 0,
  selectedCategoryID: null
};

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_EDITOR_SAVED:
      let newId = state.completedActions[state.completedActions.length-1].id+1;
      let newCompletedAction = Object.assign({},
        action.payload,
        { id: newId }
      );
      let completedActionIDs = state.completedActionIDs.concat(newId);
      let completedActions = state.completedActions.concat(newCompletedAction);

      return Object.assign({},
        { ...state },
        {
          completedActions,
          completedActionIDs
        }
      );

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
