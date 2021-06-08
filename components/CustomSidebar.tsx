import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IProps {
  title: string;
  onPress?: any;
}

const CustomSidebar = (props: IProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomSidebar;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginTop: "3%",
    paddingHorizontal: "3%",
    backgroundColor: "white",
    borderRadius: 4,
  },
  title: {
    textTransform: "uppercase",
  },
});
