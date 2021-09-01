/* eslint-disable import/no-anonymous-default-export */
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "../reducers";

const enhancer = composeWithDevTools(applyMiddleware(thunk));

export default (initialState) =>
  createStore(rootReducer, initialState, enhancer);
