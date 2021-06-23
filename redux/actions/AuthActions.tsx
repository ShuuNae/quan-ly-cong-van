import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  LOGOUT,
  SET_JWT_TOKEN,
  SET_LOGIN_STATE,
  SET_RELOAD_PAGE,
} from "../actionTypes";

export const login =
  (username: string, password: string) => async (dispatch: any) => {
    const result = await dispatch({
      type: SET_LOGIN_STATE,
      payload: axios.post("https://qlcv-server.herokuapp.com/api/users/login", {
        taikhoan: username,
        matkhau: password,
      }),
    });
    const bearerToken = result.value.data.token;
    const userProfile = result.value.data.data.userID;
    console.log(result);
    if (bearerToken) {
      const jwt = `${bearerToken}`;
      await AsyncStorage.setItem("AUTH_TOKEN_KEY", jwt);
      await AsyncStorage.setItem("AUTH_PROFILE_KEY", userProfile);
    }
  };

export const getLoginToken = () => async (dispatch: any) => {
  const token = await AsyncStorage.getItem("AUTH_TOKEN_KEY");
  const account = await AsyncStorage.getItem("AUTH_PROFILE_KEY");
  await dispatch({
    type: SET_JWT_TOKEN,
    payload: {
      token: token,
      userID: account,
      isLoggedIn: token && token.length > 0 ? true : false,
    },
  });
};

export const clearAuthToken = () => {
  AsyncStorage.removeItem("AUTH_TOKEN_KEY");
  AsyncStorage.removeItem("AUTH_PROFILE_KEY");
};

export const logout = () => (dispatch: any) => {
  clearAuthToken();
  dispatch({
    type: LOGOUT,
  });
};

export const reloadPage = (pageName: any) => (dispatch: any) => {
  dispatch({
    type: SET_RELOAD_PAGE,
    payload: {
      pageName: pageName,
    },
  });
};
