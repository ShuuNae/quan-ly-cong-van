import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Input, Button } from "react-native-elements";
import DateTimePicker from "../DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { IRootState } from "../../redux/reducers";
import { path, secretLevel, urgency } from "../../assets/data";
import * as DocumentPicker from "expo-document-picker";
import { useLinkTo } from "@react-navigation/native";
import { reloadPage } from "../../redux/actions/AuthActions";

const UpdateInfo = () => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  const linkTo = useLinkTo();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cập nhật thông tin tài khoản</Text>
      <View style={styles.infoContainer}>
        <Input
          style={styles.textInput}
          containerStyle={styles.inputContainer}
          value="Lê Văn A"
          label="Họ và tên"
        />
        <View style={styles.inputWrapContainer}>
          <Text style={styles.labelStyle}>Giới tính</Text>
          <Picker style={styles.itemPicker} selectedValue="Nam">
            <Picker.Item label="Nam" value={1} />
          </Picker>
        </View>
        <View
          style={{
            width: "40%",
            paddingHorizontal: 10,
            paddingBottom: 10,
          }}
        >
          <Text style={styles.labelStyle}>Năm sinh</Text>
          <DateTimePicker value="1992-09-05" style={{ paddingVertical: 3.5 }} />
        </View>
        <Input
          style={styles.textInput}
          containerStyle={styles.inputContainer}
          value="15 Mai Xuân Thưởng, Nha Trang, Khánh Hòa"
          label="Địa chỉ"
        />
      </View>

      <Button
        title="Cập nhật thông tin"
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

export default UpdateInfo;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "white",
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: "gray",
  },
  title: {
    textTransform: "uppercase",
    fontSize: 22,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  contentContainer: {
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: "rgba(154,154,154, .5)",
    paddingHorizontal: 15,
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
  inputTitle: {
    fontWeight: "bold",
  },
  textInput: {
    fontSize: 14,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: "40%",
  },
  labelStyle: {
    fontSize: 16,
    color: "rgb(134, 147, 158)",
    fontWeight: "bold",
    paddingBottom: 10,
  },
  inputWrapContainer: {
    width: "40%",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  itemPicker: {
    paddingVertical: 6,
  },
  dispatchContentContainer: {
    borderBottomWidth: 0.5,
    borderColor: "rgba(154,154,154, .5)",
  },
  fileContainer: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  uploadFileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fileName: {
    fontSize: 16,
    paddingLeft: "1%",
  },
  submitContainer: {
    alignItems: "center",
    paddingVertical: "5%",
  },
  submitButton: {
    width: "10%",
  },
});
