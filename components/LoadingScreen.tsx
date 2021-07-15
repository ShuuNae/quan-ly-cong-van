import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#00ff00" />
      <Text>Đang tải...</Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
