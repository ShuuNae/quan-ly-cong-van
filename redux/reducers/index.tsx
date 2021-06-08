import { combineReducers } from "redux";
import { AuthenticationState, loginReducer } from "./loginReducer";

export interface IRootState {
  readonly loginReducer: AuthenticationState,
}

const rootReducer = combineReducers({
  loginReducer: loginReducer,
});

export default rootReducer;
