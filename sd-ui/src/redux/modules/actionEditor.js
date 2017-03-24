// actions
const ACTION_PREFIX = 'sustainability-dashboard/actionEditor/';

export const ACTION_EDITOR_OPENED = ACTION_PREFIX + 'ACTION_EDITOR_OPENED';
export const ACTION_EDITOR_CLOSED = ACTION_PREFIX + 'ACTION_EDITOR_CLOSED';
export const ACTION_EDITOR_SAVING = ACTION_PREFIX + 'ACTION_EDITOR_SAVING';
export const ACTION_EDITOR_SAVED = ACTION_PREFIX + 'ACTION_EDITOR_SAVED';
export const ACTION_EDITOR_DELETING = ACTION_PREFIX + 'ACTION_EDITOR_DELETING';
export const ACTION_EDITOR_DELETED = ACTION_PREFIX + 'ACTION_EDITOR_DELETED';
export const ACTION_EDITOR_VALUE_CHANGED = ACTION_PREFIX + 'ACTION_EDITOR_VALUE_CHANGED';
export const ACTION_EDITOR_VISUALIZATION_VALUE_CHANGED = ACTION_PREFIX + 'ACTION_EDITOR_VISUALIZATION_VALUE_CHANGED';

// action creators
export function actionEditorOpened() {
  return {
    type: ACTION_EDITOR_OPENED
  };
}

export function actionEditorClosed() {
  return {
    type: ACTION_EDITOR_CLOSED
  };
}

export function actionEditorSaved(completedAction) {
  return {
    type: ACTION_EDITOR_SAVED,
    payload: completedAction
  };
}

export function actionEditorDeleted() {
  return {
    type: ACTION_EDITOR_DELETED
  };
}

export function actionEditorValueChanged(key, value) {
  return {
    type: ACTION_EDITOR_VALUE_CHANGED,
    payload: {
      key,
      value
    }
  };
}

export function actionEditorVisualizationValueChanged(key, value) {
  return {
    type: ACTION_EDITOR_VISUALIZATION_VALUE_CHANGED,
    payload: {
      key,
      value
    }
  };
};

// initial state
const initialState = {
  actionEditorOpen: false,
  actionData: {
    id: null,
    name: "",
    category: "",
    categoryId: null,
    description: "",
    image: "",
    visualization: {
      type: 'pie',
      xAxisTitle: 'x-axis',
      yAxisTitle: 'y-axis',
      data: [
        { x: 'Leslie', y: 80 },
        { x: 'Tom', y: 20 },
        { x: 'Ron', y: 10 },
        { x: 'Ann', y: 30 },
      ],
    }
  }
};

// reducer
export default function reducer(state = initialState, action = {}) {
  let actionData = {};
  switch (action.type) {
    case ACTION_EDITOR_OPENED:
    case ACTION_EDITOR_CLOSED:
      let actionEditorOpen = state.actionEditorOpen;
      return Object.assign({},
        { ...state },
        { actionEditorOpen: !actionEditorOpen }
      );

    case ACTION_EDITOR_SAVED:
    case ACTION_EDITOR_DELETED:
      return Object.assign({},
        initialState,
        { actionEditorOpen: true }
      );

    case ACTION_EDITOR_VALUE_CHANGED:
      actionData = Object.assign({},
        { ...state.actionData },
        { [action.payload.key]: action.payload.value }
      );
      return Object.assign({},
        { ...state },
        { actionData }
      );

    case ACTION_EDITOR_VISUALIZATION_VALUE_CHANGED:
      let visualization = Object.assign({},
        state.actionData.visualization,
        { [action.payload.key]: action.payload.value });
      actionData = Object.assign({},
        state.actionData,
        { visualization }
      );
      return Object.assign({},
        { ...state},
        { actionData }
      );
    default:
      return state;
  }
}
