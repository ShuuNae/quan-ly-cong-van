import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useLinkTo } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/reducers";
import UpdateDispatch from "../../components/dispatches/UpdateDispatch";
import { loginReducer } from "../../redux/reducers/loginReducer";
import NavBar from "../../components/NavBar";
import ArrivesList from "../../components/arrives/ArrivesList";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AccountInformation from "../../components/account/AccountInformation";
import ChangePassword from "../../components/account/ChangePassword";

const HEIGHT = Dimensions.get("window").height;

interface IProps {
  navigation: any;
  route: any;
}

const AccountScreen = (props: IProps) => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const Drawer = createDrawerNavigator();
  const linkTo = useLinkTo();

 
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
          <Drawer.Navigator drawerType="permanent">
            <Drawer.Screen
              name="Thông tin tài khoản"
              component={AccountInformation}
              options={{ title: "Thông tin tài khoản" }}
            />
            <Drawer.Screen
              name="Đổi mật khẩu"
              component={ChangePassword}
              options={{ title: "Đổi mật khẩu" }}
            />
            {/* <Drawer.Screen
              name="Thông tin cơ quan"
              component={AccountInformation}
              options={{ title: "Thông tin cơ quan" }}
            /> */}
          </Drawer.Navigator>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: HEIGHT * 1.6,
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
