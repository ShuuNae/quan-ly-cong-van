import React from "react";
import { ShadowPropTypesIOS, StyleSheet, Text, View } from "react-native";

interface IProps {
  title: string;
  text: string;
}

const TextContainer = (props: IProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}:</Text>
      <Text style={styles.text}>{props.text ? props.text : ""}</Text>
    </View>
  );
};

export default TextContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: "1%",
  },
  title: {
    flex: 3,
    fontWeight: "bold",
  },
  text: {
    flex: 7,
    color: "#71B388",
    fontWeight: "600",
  },
});
