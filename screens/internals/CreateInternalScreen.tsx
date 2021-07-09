import React from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
import NavBar from "../../components/NavBar";
import CreateArrive from "../../components/arrives/CreateArrive";
import CreateInternal from "../../components/internals/CreateInternal";

const HEIGHT = Dimensions.get("window").height;

const CreateInternalScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background3.jpg")}
        style={styles.image}
      >
        <View style={styles.header}>
          <NavBar />
        </View>
        <View style={styles.middle}>
          <CreateInternal />
        </View>
      </ImageBackground>
    </View>
  );
};

export default CreateInternalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT * (3 / 2),
  },
  header: {
    height: HEIGHT / 13.5,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  middle: {
    flex: 8,
    flexDirection: "row",
  },
});
