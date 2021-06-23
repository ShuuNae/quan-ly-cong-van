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

const HEIGHT = Dimensions.get("window").height;

interface IProps {
  navigation: any;
  route: any;
}

const UpdateDispatchScreen = (props: IProps) => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const linkTo = useLinkTo();
  const id = props.route.params.id;
  const userId = props.route.params.userId;

  React.useEffect(() => {
    if (loginReducer.getTokenStatus) {
      if (userId != loginReducer.userId) {
        linkTo("/Home");
      }
    }
  }, [loginReducer.userId]);

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
          <UpdateDispatch id={id} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default UpdateDispatchScreen;

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
