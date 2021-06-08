import { createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "../redux/reducers";
export function configureStore() {
  const enhancer = composeWithDevTools(applyMiddleware(thunk, promise));
  const store = createStore(rootReducer, enhancer);

  return store;
}
