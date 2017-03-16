import { createStore, applyMiddleware, combineReducers } from 'redux';
import municipality from './modules/municipality';
import actionEditor from './modules/actionEditor';
import createLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

// initialize logger
const loggerMiddleware = createLogger();

 // apply logger to redux
const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(loggerMiddleware))(createStore);

const reducer = combineReducers({
  municipality,
  actionEditor
});

const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState);
export default configureStore;
