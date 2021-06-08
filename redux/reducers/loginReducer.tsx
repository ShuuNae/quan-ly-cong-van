import { AnyAction, Dispatch } from "redux";
import {
  SET_LOGIN_STATE,
  SET_LOGIN_STATE_PENDING,
  SET_LOGIN_STATE_FULFILLED,
  SET_LOGIN_STATE_REJECTED,
  SET_JWT_TOKEN,
  LOGOUT,
  SET_RELOAD_PAGE,
} from "../actionTypes";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  userId: "",
  token: "",
  refreshToken: "",
  expiresOn: "",
  data: "",
  error: false,
  getTokenStatus: false,
  reloadPageName: "",
};

export type AuthenticationState = Readonly<typeof initialState>;

export const loginReducer = (state: any = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_LOGIN_STATE_PENDING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SET_LOGIN_STATE_FULFILLED: {
      // const newState = [...action.payload];
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        isLoggedIn: true,
      };
    }
    case SET_LOGIN_STATE_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case SET_JWT_TOKEN: {
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userID,
        isLoggedIn: action.payload.isLoggedIn,
        getTokenStatus: true,
      };
    }
    case LOGOUT: {
      return {
        ...initialState,
        getTokenStatus: true,
      };
    }
    case SET_RELOAD_PAGE: {
      return {
        ...state,
        reloadPageName: action.payload.pageName,
      };
    }
    default:
      return state;
  }
};
