import { useLinkTo } from "@react-navigation/native";
import React from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import UpdateOg from "../../components/admin/UpdateOg";
import NavBar from "../../components/NavBar";
import { IRootState } from "../../redux/reducers";

const HEIGHT = Dimensions.get("window").height;

interface IProps {
  navigation: any;
  route: any;
}

const UpdateOgScreen = (props: IProps) => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const linkTo = useLinkTo();
  const id = props.route.params.id;

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
          <UpdateOg id={id} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default UpdateOgScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT * 1.6,
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
