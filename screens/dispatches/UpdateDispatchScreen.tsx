import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useLinkTo } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/reducers";
import UpdateDispatch from "../../components/dispatches/UpdateDispatch";

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

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.middle}>
        <UpdateDispatch />
      </View>
    </View>
  );
};

export default UpdateDispatchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT * (3 / 2),
  },
  header: {
    height: HEIGHT / 13,
    backgroundColor: "blue",
    borderWidth: 0.5,
    borderColor: "black",
  },

  middle: {
    flex: 8,
    flexDirection: "row",
  },
});
