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
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Trang chủ" }}
          />
          {/* <Stack.Screen name="Test" component={TestUploadScreen} /> */}
          <Stack.Screen
            name="DispatchDetail"
            component={DispatchDetailScreen}
          />
          <Stack.Screen
            name="CreateDispatch"
            component={CreateDispatchScreen}
          />
          <Stack.Screen
            name="UpdateDispatch"
            component={UpdateDispatchScreen}
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
