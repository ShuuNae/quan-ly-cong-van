import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Link } from "@react-navigation/native";
import { useLinkTo } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/reducers";
import { getLoginToken, logout } from "../redux/actions/AuthActions";
import CustomSidebar from "../components/CustomSidebar";
import DispatchesList from "../components/dispatches/DispatchesList";
import NavBar from "../components/NavBar";

const HEIGHT = Dimensions.get("window").height;

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loginReducer } = useSelector((state: IRootState) => state);
  const linkTo = useLinkTo();
  const handleLogout = () => {
    dispatch(logout());
    // linkTo("/Login");
    // console.log("hello");
  };

  const toCreate = () => {
    linkTo("/tao-cong-van-di");
  };

  const handleLink = () => {
    // Linking.openURL("https://google.com");
    // window.open("https://google.com");
    linkTo("/Test");
  };
  React.useEffect(() => {
    dispatch(getLoginToken());
  }, []);

  return loginReducer.isLoggedIn ? (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background3.jpg")}
        style={styles.image}
      >
        <View style={styles.header}>
          <NavBar />
        </View>
        <View style={styles.middle}>
          <DispatchesList />
        </View>
      </ImageBackground>
    </View>
  ) : (
    <View></View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C1C8E4",
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
  content: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
});
