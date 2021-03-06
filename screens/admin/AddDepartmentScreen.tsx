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
import AddAccount from "../../components/admin/AddAccount";
import AddDocument from "../../components/admin/AddDocument";
import AddForm from "../../components/admin/AddForm";
import AddDepartment from "../../components/admin/AddDepartment";

const HEIGHT = Dimensions.get("window").height;

interface IProps {
  navigation: any;
  route: any;
}

const AddDepartmentScreen = (props: IProps) => {
  const { loginReducer } = useSelector((state: IRootState) => state);
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
          <AddDepartment />
        </View>
      </ImageBackground>
    </View>
  );
};

export default AddDepartmentScreen;

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
