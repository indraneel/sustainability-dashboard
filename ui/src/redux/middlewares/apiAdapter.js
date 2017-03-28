const stateToPost = (state, endpoint, method) => {
  switch (endpoint) {
    case 'action':
      if (method === 'POST') {
        return {
          id: state.actionEditor.actionData.id,
          action: state.actionEditor.actionData.action,
          category: state.actionEditor.actionData.category,
          visualization: {
            type: state.visualizationEditor.type,
            data: state.visualizationEditor.data
          },
        };
      }
      break;
    default:
      return state;
  }
};

export default {
  stateToPost
};
