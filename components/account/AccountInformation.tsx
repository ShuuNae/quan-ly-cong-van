import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { loginReducer } from "../../redux/reducers/loginReducer";
import { IRootState } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TextContainer from "../TextContainer";
import { useLinkTo } from "@react-navigation/native";
import { Button } from "react-native-elements";

const AccountInformation = () => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const linkTo = useLinkTo();

  const toUpdateInfo = () => {
    linkTo("/cap-nhat-tai-khoan");
  };

  const getUserDetails = async () => {
    const res = await axios.get(
      "https://qlcv-server.herokuapp.com/api/users/" + loginReducer.userId,
      {
        headers: {
          Authorization: `Bearer ${loginReducer.token}`,
        },
      }
    );
    console.log(res);
  };

  React.useEffect(() => {
    if (loginReducer.token) {
      getUserDetails();
    }
  }, [loginReducer.token]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin tài khoản</Text>
      <View style={styles.infoContainer}>
        <TextContainer title="Tên tài khoản" text="levana1100" />
        <TextContainer title="Họ và tên" text="Lê Văn A" />
        <TextContainer title="Giới tính" text="Nam" />
        <TextContainer title="Năm sinh" text="15-09-1992" />
        <TextContainer
          title="Địa chỉ"
          text="15 Mai Xuân Thưởng, Nha Trang, Khánh Hòa"
        />
        <TextContainer title="Chức vụ" text="Nhân viên" />
        <TextContainer title="Phòng ban" text="Cơ sở" />
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
        onPress={toUpdateInfo}
      />
    </View>
  );
};

export default AccountInformation;

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
});
