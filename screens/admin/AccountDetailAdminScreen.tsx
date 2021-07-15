import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DispatchDetail from "../../components/dispatches/DispatchDetail";
import NavBar from "../../components/NavBar";
import { IRootState } from "../../redux/reducers";
import ArriveDetail from "../../components/arrives/ArriveDetail";
import AccountDetail from "../../components/admin/AccountDetail";

const HEIGHT = Dimensions.get("window").height;

interface IProps {
  navigation: any;
  route: any;
}

const AccountDetailAdminScreen = (props: IProps) => {
  const { loginReducer } = useSelector((state: IRootState) => state);
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
          <AccountDetail id={id} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default AccountDetailAdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT * 1.1,
    // height: HEIGHT + 500,
    // in case u want to expand the screen height, use this
  },
  header: {
    // flex: 0.5,
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
