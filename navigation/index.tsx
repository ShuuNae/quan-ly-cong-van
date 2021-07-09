/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import TestUploadScreen from "../screens/TestUploadScreen";
import { useDispatch, useSelector } from "react-redux";

import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { IRootState } from "../redux/reducers";
import DispatchDetailScreen from "../screens/dispatches/DispatchDetailScreen";
import { getLoginToken, logout } from "../redux/actions/AuthActions";
import CreateDispatchScreen from "../screens/dispatches/CreateDispatchScreen";
import UpdateDispatchScreen from "../screens/dispatches/UpdateDispatchScreen";
import Arrives from "../screens/arrives/Arrives";
import ArriveDetail from "../screens/arrives/ArriveDetailScreen";
import ArriveDetailScreen from "../screens/arrives/ArriveDetailScreen";
import CreateArriveScreen from "../screens/arrives/CreateArriveScreen";
import UpdateArriveScreen from "../screens/arrives/UpdateArriveScreen";
import AccountScreen from "../screens/account/AccountScreen";
import UpdateAccountInfoScreen from "../screens/account/UpdateAccountInfoScreen";
import { loginReducer } from "../redux/reducers/loginReducer";
import AdminScreen from "../screens/admin/AdminScreen";
import AddAccountScreen from "../screens/admin/AddAccountScreen";
import UpdateAccountScreen from "../screens/admin/UpdateAccountScreen";
import Internals from "../screens/internals/Internals";
import CreateInternalScreen from "../screens/internals/CreateInternalScreen";
import InternalDetailScreen from "../screens/internals/InternalDetailScreen";
import UpdateInternalScreen from "../screens/internals/UpdateInternalScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DefaultTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getLoginToken());
  }, []);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {loginReducer.isLoggedIn == false &&
      loginReducer.getTokenStatus == true ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Đăng nhập" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Trang chủ" }}
          />
          <Stack.Screen
            name="DispatchDetail"
            component={DispatchDetailScreen}
            options={{ title: "Chi tiết công văn đi" }}
          />
          <Stack.Screen
            name="CreateDispatch"
            component={CreateDispatchScreen}
            options={{ title: "Tạo công văn đi" }}
          />
          <Stack.Screen
            name="UpdateDispatch"
            component={UpdateDispatchScreen}
            options={{ title: "Cập nhật công văn đi" }}
          />
          <Stack.Screen
            name="Arrives"
            component={Arrives}
            options={{ title: "Quản lý công văn đến" }}
          />
          <Stack.Screen
            name="ArriveDetail"
            component={ArriveDetailScreen}
            options={{ title: "Chi tiết công văn đến" }}
          />
          <Stack.Screen
            name="CreateArrive"
            component={CreateArriveScreen}
            options={{ title: "Tạo công văn đến" }}
          />
          <Stack.Screen
            name="UpdateArrive"
            component={UpdateArriveScreen}
            options={{ title: "Cập nhật công văn đến" }}
          />
          <Stack.Screen
            name="Account"
            component={AccountScreen}
            options={{ title: "Thông tin tài khoản" }}
          />
          <Stack.Screen
            name="UpdateAccountInfo"
            component={UpdateAccountInfoScreen}
            options={{ title: "Cập nhật tài khoản" }}
          />
          <Stack.Screen
            name="Internals"
            component={Internals}
            options={{ title: "Quản lý công văn nội bộ" }}
          />
          <Stack.Screen
            name="CreateInternal"
            component={CreateInternalScreen}
            options={{ title: "Tạo công văn nội bộ" }}
          />
          <Stack.Screen
            name="InternalDetail"
            component={InternalDetailScreen}
            options={{ title: "Chi tiết công văn nội bộ" }}
          />
          <Stack.Screen
            name="UpdateInternal"
            component={UpdateInternalScreen}
            options={{ title: "Cập nhật công văn nội bộ" }}
          />

          {/* {loginReducer.isAdmin == 1 && loginReducer.getTokenStatus == true && ( */}
          <Stack.Screen
            name="Admin"
            component={AdminScreen}
            options={{ title: "Quản trị viên" }}
          />
          <Stack.Screen
            name="AddAccount"
            component={AddAccountScreen}
            options={{ title: "Thêm tài khoản" }}
          />
          <Stack.Screen
            name="UpdateAccount"
            component={UpdateAccountScreen}
            options={{ title: "Cập nhật tài khoản" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

{
  /* <Stack.Screen name="Login" component={LoginScreen} />
<Stack.Screen name="Home" component={HomeScreen} />
<Stack.Screen name="Test" component={TestUploadScreen} /> */
}
