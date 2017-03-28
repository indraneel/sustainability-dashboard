import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk'

import municipality from './modules/municipality';
import actionEditor from './modules/actionEditor';
import visualizationEditor from './modules/visualizationEditor';
import createLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

// initialize logger
const loggerMiddleware = createLogger();

 // apply logger to redux
const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
))(createStore);

const reducer = combineReducers({
  municipality,
  actionEditor,
  visualizationEditor
});

const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState);
export default configureStore;
