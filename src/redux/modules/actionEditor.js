// actions
const ACTION_PREFIX = 'sustainability-dashboard/actionEditor/';

const ACTION_EDITOR_OPENED = ACTION_PREFIX + 'ACTION_EDITOR_OPENED';
const ACTION_EDITOR_CLOSED = ACTION_PREFIX + 'ACTION_EDITOR_CLOSED';
const ACTION_EDITOR_SAVING = ACTION_PREFIX + 'ACTION_EDITOR_SAVING';
const ACTION_EDITOR_SAVED = ACTION_PREFIX + 'ACTION_EDITOR_SAVED';

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

// initial state
const initialState = {
  actionEditorOpen: true,
  actionData: {
    actionName: "",
    actionCategory: "",
    actionId: null,
    actionCategoryId: null,
    actionDescription: "",
    actionImage: "",
  }
};

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_EDITOR_OPENED:
    case ACTION_EDITOR_CLOSED:
    let actionEditorOpen = state.actionEditorOpen;
    return Object.assign({},
      { ...state },
      { actionEditorOpen: !actionEditorOpen }
    );
    default:
      return state;
  }
}
