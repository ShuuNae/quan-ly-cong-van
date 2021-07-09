import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { loginReducer } from "../../redux/reducers/loginReducer";
import { IRootState } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TextContainer from "../TextContainer";
import { Input, Button } from "react-native-elements";

const ChangePassword = () => {
  const { loginReducer } = useSelector((state: IRootState) => state);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đổi mật khẩu</Text>
      <View style={styles.infoContainer}>
        <Input
          style={styles.textInput}
          containerStyle={styles.inputContainer}
          secureTextEntry={true}
          label="Nhập mật khẩu hiện tại"
        />
        <Input
          style={styles.textInput}
          containerStyle={styles.inputContainer}
          secureTextEntry={true}
          label="Nhập mật khẩu mới"
        />
        <Input
          style={styles.textInput}
          containerStyle={styles.inputContainer}
          secureTextEntry={true}
          label="Xác nhận mật khẩu mới"
        />
      </View>
      <Button
        title="Đổi mật khẩu"
        type="outline"
        containerStyle={{
          width: "20%",
          borderLeftWidth: 0.5,
          borderRightWidth: 0.5,
          borderColor: "rgba(154,154,154, .3)",
          margin: 10,
        }}
        titleStyle={{ fontSize: 16, fontWeight: "bold" }}
        buttonStyle={{ padding: 5 }}
      />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    backgroundColor: "white",
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: "gray",
  },
  title: {
    textTransform: "uppercase",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  infoContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "rgba(154,154,154, .5)",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textInput: {
    fontSize: 14,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: "80%",
  },
});
