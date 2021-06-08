import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import { useLinkTo } from "@react-navigation/native";

const isLogin = false;

const RootScreen = () => {
  const linkTo = useLinkTo();

  if (isLogin) {
    linkTo("/Home");
  } else {
    linkTo("/Login");
  }
  return <View></View>;
};

export default RootScreen;

const styles = StyleSheet.create({});
