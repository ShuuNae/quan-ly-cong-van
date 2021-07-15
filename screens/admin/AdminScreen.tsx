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
import AccountManagament from "../../components/admin/AccountManagament";
import DocumentTypeManage from "../../components/admin/DocumentTypeManage";
import FormManage from "../../components/admin/FormManage";
import PositionManage from "../../components/admin/PositionManage";
import DepartmentManage from "../../components/admin/DepartmentManage";
import OgDetail from "../../components/admin/OgDetail";

const HEIGHT = Dimensions.get("window").height;

interface IProps {
  navigation: any;
  route: any;
}

const AdminScreen = (props: IProps) => {
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
              name="Quản lý tài khoản"
              component={AccountManagament}
              options={{ title: "Quản lý tài khoản" }}
            />
            <Drawer.Screen
              name="Quản lý loại văn bản"
              component={DocumentTypeManage}
              options={{ title: "Quản lý loại văn bản" }}
            />
            <Drawer.Screen
              name="Quản lý biểu mẫu"
              component={FormManage}
              options={{ title: "Quản lý biểu mẫu" }}
            />
            <Drawer.Screen
              name="Quản lý chức vụ"
              component={PositionManage}
              options={{ title: "Quản lý chức vụ" }}
            />
            <Drawer.Screen
              name="Quản lý phòng ban"
              component={DepartmentManage}
              options={{ title: "Quản lý phòng ban" }}
            />
            <Drawer.Screen
              name="Quản lý cơ quan"
              component={OgDetail}
              options={{ title: "Quản lý cơ quan" }}
            />
          </Drawer.Navigator>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AdminScreen;

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
