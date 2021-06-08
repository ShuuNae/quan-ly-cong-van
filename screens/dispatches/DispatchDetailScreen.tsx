import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DispatchDetail from "../../components/dispatches/DispatchDetail";
import { IRootState } from "../../redux/reducers";

const HEIGHT = Dimensions.get("window").height;

interface IProps {
  navigation: any;
  route: any;
}

const DispatchDetailScreen = (props: IProps) => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  console.log(props.route.params.id);
  const id = props.route.params.id;
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.middle}>
        <DispatchDetail id={id} />
      </View>
    </View>
  );
};

export default DispatchDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT * 1.1,
    // height: HEIGHT + 500,
    // in case u want to expand the screen height, use this
  },
  header: {
    // flex: 0.5,
    height: 50,
    backgroundColor: "blue",
    borderWidth: 0.5,
    borderColor: "black",
  },

  middle: {
    flex: 8,
    flexDirection: "row",
  },
});
