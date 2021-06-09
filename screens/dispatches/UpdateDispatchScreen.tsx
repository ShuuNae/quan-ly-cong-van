import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useLinkTo } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/reducers";
import UpdateDispatch from "../../components/dispatches/UpdateDispatch";
import { loginReducer } from "../../redux/reducers/loginReducer";

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
      <View style={styles.header}></View>
      <View style={styles.middle}>
        <UpdateDispatch id={id} />
      </View>
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
