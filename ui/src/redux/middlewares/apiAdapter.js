const postSaveAction = (state) => {
  return {
    id: state.actionEditor.actionData.id,
    action: state.actionEditor.actionData.action,
    category: state.actionEditor.actionData.category,
    visualization: {
      type: state.visualizationEditor.type,
      data: state.visualizationEditor.data,
      entryFields: state.visualizationEditor.entryFields,
      entryValues: state.visualizationEditor.entryValues,
    },
  };
};

export default {
  postSaveAction
};
