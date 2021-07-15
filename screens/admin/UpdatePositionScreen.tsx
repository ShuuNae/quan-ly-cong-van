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
import UpdateArrive from "../../components/arrives/UpdateArrive";
import { loginReducer } from "../../redux/reducers/loginReducer";
import NavBar from "../../components/NavBar";
import UpdateAccount from "../../components/admin/UpdateAccount";
import Updatedocument from "../../components/admin/UpdateDocument";
import UpdateForm from "../../components/admin/UpdateForm";
import UpdatePosition from "../../components/admin/UpdatePosition";

const HEIGHT = Dimensions.get("window").height;

interface IProps {
  navigation: any;
  route: any;
}

const UpdatePositionScreen = (props: IProps) => {
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
          <UpdatePosition id={id} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default UpdatePositionScreen;

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
