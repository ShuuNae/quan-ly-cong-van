import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import CreateDispatch from "../../components/dispatches/CreateDispatch";

const HEIGHT = Dimensions.get("window").height;

const CreateDispatchScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.middle}>
        <CreateDispatch />
      </View>
    </View>
  );
};

export default CreateDispatchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT * (3 / 2),
  },
  header: {
    height: HEIGHT / 13,
    backgroundColor: "blue",
    borderWidth: 0.5,
    borderColor: "black",
  },

  middle: {
    flex: 8,
    flexDirection: "row",
  },
});
