import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Link } from "@react-navigation/native";
import { useLinkTo } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/reducers";
import { getLoginToken, logout } from "../redux/actions/AuthActions";
import CustomSidebar from "../components/CustomSidebar";
import DispatchesList from "../components/dispatches/DispatchesList";

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
      <TouchableOpacity onPress={handleLogout}>
        <Text>log out</Text>
      </TouchableOpacity>
      <View style={styles.header}></View>
      <View style={styles.middle}>
        <View style={styles.sidebar}>
          <CustomSidebar title="Danh sách công văn đi" />
          <CustomSidebar title="Thêm công văn đi" onPress={toCreate} />
        </View>
        <View style={styles.content}>
          <DispatchesList />
        </View>
      </View>
    </View>
  ) : (
    <View></View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.5,
    backgroundColor: "blue",
    borderWidth: 0.5,
    borderColor: "black",
  },

  middle: {
    flex: 8,
    flexDirection: "row",
  },

  content: {
    flex: 5,
    backgroundColor: "#E5E5E5",
  },

  sidebar: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
  },
});
