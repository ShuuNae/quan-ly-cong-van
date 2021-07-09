import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Button } from "react-native-elements";
import { useLinkTo } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/AuthActions";
import { IRootState } from "../redux/reducers";
const NavBar = () => {
  const dispatch = useDispatch();
  const linkTo = useLinkTo();
  const { loginReducer } = useSelector((state: IRootState) => state);

  const toDispatch = () => {
    linkTo("/Home");
  };

  const toArrive = () => {
    linkTo("/cong-van-den");
  };

  const toInternal = () => {
    linkTo("/cong-van-noi-bo");
  };

  const toAccount = () => {
    linkTo("/tai-khoan");
  };

  const toAdmin = () => {
    linkTo("/quan-tri-vien");
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  React.useEffect(() => {
    console.log(loginReducer.isAdmin);
  }, [loginReducer]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/navbar2.jpg")}
        style={styles.image}
      >
        <Button
          title="Quản lý công văn đi"
          type="clear"
          containerStyle={{
            flex: 1,
            // width: "20%",
            borderLeftWidth: 0.5,
            borderRightWidth: 0.5,
            borderColor: "rgba(154,154,154, .3)",
          }}
          titleStyle={{ fontSize: 16, fontWeight: "bold" }}
          buttonStyle={{ padding: 5 }}
          onPress={toDispatch}
        />
        <Button
          title="Quản lý công văn đến"
          type="clear"
          containerStyle={{
            flex: 1,
            // width: "20%",
            borderLeftWidth: 0.5,
            borderRightWidth: 0.5,
            borderColor: "rgba(154,154,154, .3)",
          }}
          titleStyle={{ fontSize: 16, fontWeight: "bold" }}
          buttonStyle={{ padding: 5 }}
          onPress={toArrive}
        />
        <Button
          title="Quản lý công văn nội bộ"
          type="clear"
          containerStyle={{
            flex: 1,
            // width: "20%",
            borderLeftWidth: 0.5,
            borderRightWidth: 0.5,
            borderColor: "rgba(154,154,154, .3)",
          }}
          titleStyle={{ fontSize: 16, fontWeight: "bold" }}
          buttonStyle={{ padding: 5 }}
          onPress={toInternal}
        />
        {loginReducer.isAdmin == 1 ? (
          <Button
            title="Admin"
            type="clear"
            containerStyle={{
              flex: 1,
              // width: "20%",
              borderLeftWidth: 0.5,
              borderRightWidth: 0.5,
              borderColor: "rgba(154,154,154, .3)",
            }}
            titleStyle={{ fontSize: 16, fontWeight: "bold" }}
            buttonStyle={{ padding: 5 }}
            onPress={toAdmin}
          />
        ) : (
          <View style={{ flex: 1 }}></View>
        )}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Button
            icon={
              <MaterialIcons name="account-circle" size={24} color="#5680E9" />
            }
            containerStyle={{
              flex: 1,
              // width: "20%",
              borderLeftWidth: 0.5,
              borderRightWidth: 0.5,
              borderColor: "rgba(154,154,154, .3)",
            }}
            type="clear"
            title="Tài khoản"
            titleStyle={{ fontSize: 16, paddingLeft: 5, fontWeight: "bold" }}
            buttonStyle={{ padding: 5 }}
            onPress={toAccount}
          />
          <Button
            icon={<Octicons name="sign-out" size={22} color="#5680E9" />}
            containerStyle={{
              flex: 1,
              // width: "20%",
              borderLeftWidth: 0.5,
              borderRightWidth: 0.5,
              borderColor: "rgba(154,154,154, .3)",
            }}
            iconRight
            type="clear"
            title="Đăng xuất"
            titleStyle={{ fontSize: 16, paddingRight: 5, fontWeight: "bold" }}
            buttonStyle={{ padding: 5 }}
            onPress={handleLogout}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    flexDirection: "row",
    alignItems: "center",
  },
});
