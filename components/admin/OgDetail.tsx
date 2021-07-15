import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { loginReducer } from "../../redux/reducers/loginReducer";
import { IRootState } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TextContainer from "../TextContainer";
import { useLinkTo, useIsFocused } from "@react-navigation/native";
import { Button } from "react-native-elements";

const AccountInformation = () => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const linkTo = useLinkTo();
  const [userList, setUserList] = React.useState<any>();
  const [error, setError] = React.useState<boolean>(false);
  const isFocused = useIsFocused();

  const toUpdateInfo = (id: any) => {
    linkTo("/cap-nhat-co-quan/" + id);
  };

  const getUserList = async () => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/organizations/",
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );
      if (res.data.success == 1) {
        let responseData = { ...res.data.data };
        setUserList(responseData[1]);
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
      setUserList(null);
    }
  };

  React.useEffect(() => {
    if (loginReducer.token) {
      getUserList();
    }
  }, [loginReducer.token, isFocused]);

  return userList ? (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin cơ quan</Text>
      <View style={styles.infoContainer}>
        <TextContainer title="Tên cơ quan" text={userList.tencq} />
        <TextContainer title="Địa chỉ" text={userList.diachi} />
        <TextContainer title="Điện thoại" text={userList.dienthoai} />
        <TextContainer title="Email" text={userList.email} />
        <TextContainer title="FAX" text={userList.fax} />
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
        onPress={() => toUpdateInfo(userList.maCQ)}
      />
    </View>
  ) : error ? (
    <View style={styles.container}>
      <Text>Không có dữ liệu</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
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
