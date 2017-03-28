import VISUALIZATION_ENTRY_FIELDS from '../../constants/visualization-entry-fields';
import {
  ACTION_EDITOR_SAVED
} from './actionEditor';

// actions
const ACTION_PREFIX = 'sustainability-dashboard/visualizationEditor/';

export const VISUALIZATION_EDITOR_TYPE_CHANGED = ACTION_PREFIX + 'VISUALIZATION_EDITOR_TYPE_CHANGED';
export const VISUALIZATION_EDITOR_DATA_CHANGED = ACTION_PREFIX + 'VISUALIZAION_EDITOR_DATA_CHANGED';
export const VISUALIZATION_EDITOR_DATA_ADDED = ACTION_PREFIX + 'VISUALIZAION_EDITOR_DATA_ADDED';
export const VISUALIZATION_EDITOR_DATA_REMOVED = ACTION_PREFIX + 'VISUALIZAION_EDITOR_DATA_REMOVED';
export const VISUALIZATION_EDITOR_ENTRY_FIELD_CHANGED = ACTION_PREFIX + 'VISUALIZAION_EDITOR_ENTRY_FIELD_CHANGED';
export const VISUALIZATION_EDITOR_ENTRY_FIELD_ADDED = ACTION_PREFIX + 'VISUALIZAION_EDITOR_ENTRY_FIELD_ADDED';
export const VISUALIZATION_EDITOR_ENTRY_FIELD_REMOVED = ACTION_PREFIX + 'VISUALIZAION_EDITOR_ENTRY_FIELD_REMOVED';

// action creators
export function visualizationEditorTypeChanged(value) {
  return {
    type: VISUALIZATION_EDITOR_TYPE_CHANGED,
    payload: {
      value
    }
  };
}

export function visualizationEditorDataChanged(key, value) {
  return {
    type: VISUALIZATION_EDITOR_DATA_CHANGED,
    payload: {
      key,
      value
    }
  };
}

export function visualizationEditorDataAdded(key) {
  return {
    type: VISUALIZATION_EDITOR_DATA_ADDED,
    payload: {
      key
    }
  };
}

export function visualizationEditorDataRemoved(key, value) {
  return {
    type: VISUALIZATION_EDITOR_DATA_REMOVED,
    payload: {
      key,
      value
    }
  };
}

export function visualizationEditorEntryFieldChanged(key, value) {
  return {
    type: VISUALIZATION_EDITOR_ENTRY_FIELD_CHANGED,
    payload: {
      key,
      value
    }
  };
}

// initial state
const initialState = {
  type: 'pie',
  data: [],
  entryFields: VISUALIZATION_ENTRY_FIELDS,
  entryValues: {
    pie: {
      label: '',
      value: ''
    },
    line: {
      xValue: '',
      yValue: ''
    },
    bar: {
      xValue: '',
      yValue: ''
    },
    text: {
      lineOne: '',
      lineTwo: '',
      lineThree: ''
    }
  }
};

// reducer
export default function reducer(state = initialState, action = {}) {
  let actionData = {};
  switch (action.type) {
    case ACTION_EDITOR_SAVED:
      return initialState;

    case VISUALIZATION_EDITOR_DATA_ADDED:
      return Object.assign({},
        {...state},
        {
          data: [
            ...state.data,
            state.entryValues[action.payload.key]
          ],
          entryValues: Object.assign({},
            {...state.entryValues},
            {[action.payload.key]: initialState.entryValues[action.payload.key]}
          )
        }
      );
    case VISUALIZATION_EDITOR_TYPE_CHANGED:
      return Object.assign({},
        {...state},
        {
          data: [],
          ['type']: action.payload.value
        }
      );

    case VISUALIZATION_EDITOR_ENTRY_FIELD_CHANGED:
      return Object.assign({},
        {...state},
        {
          entryValues: {
            ...state.entryValues,
            [action.payload.key]: {
              ...state.entryValues[action.payload.key],
              [action.payload.value.id]: action.payload.value.newValue
            }
          }
        }
      );
    // case ACTION_EDITOR_VISUALIZATION_DATA_CHANGED:
    //   let visualization = Object.assign({},
    //     state.actionData.visualization,
    //     { [action.payload.key]: action.payload.value });
    //   actionData = Object.assign({},
    //     state.actionData,
    //     { visualization }
    //   );
    //   return Object.assign({},
    //     { ...state},
    //     { actionData }
    //   );
    default:
      return state;
  }
}
