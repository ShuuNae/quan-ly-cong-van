import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { loginReducer } from "../../redux/reducers/loginReducer";
import { IRootState } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TextContainer from "../TextContainer";
import { useLinkTo, useIsFocused } from "@react-navigation/native";
import { Button } from "react-native-elements";
import { Input } from "react-native-elements";
import { DataTable } from "react-native-paper";

const AccountManagament = () => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const linkTo = useLinkTo();
  const isFocused = useIsFocused();
  const [userList, setUserList] = React.useState<any>();

  const toAddAccount = () => {
    linkTo("/them-tai-khoan");
  };
  const toUpdateAccount = (id: any) => {
    linkTo("/cap-nhat-tai-khoan-admin/" + id);
  };
  const goToDetail = (id: any) => {
    linkTo("/chi-tiet-tai-khoan/" + id);
    // console.log("/cong-van-di/" + id);
  };

  const [page, setPage] = React.useState<number>(0);

  const getUserList = async () => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/users/",
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );
      let ResponseData = [...res.data.data];
      console.log(ResponseData);
      setUserList(ResponseData);
    } catch (e) {
      setUserList(null);
    }
  };

  React.useEffect(() => {
    if (loginReducer.token) {
      getUserList();
    }
  }, [loginReducer.token, loginReducer.reloadPageName, page, isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách tài khoản</Text>
      <View style={styles.addContainer}>
        <View style={{ flexDirection: "row" }}>
          <Input placeholder="Tìm kiếm" />
          <Button
            title="Tìm kiếm"
            type="outline"
            titleStyle={{ fontSize: 16 }}
          />
        </View>
        <Button
          title="Thêm mới"
          type="outline"
          containerStyle={{ width: "10%" }}
          titleStyle={{ fontSize: 16 }}
          onPress={toAddAccount}
        />
      </View>
      <View style={styles.infoContainer}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Tên tài khoản</DataTable.Title>
            <DataTable.Title>Họ tên</DataTable.Title>
            <DataTable.Title>Tình trạng hoạt động</DataTable.Title>
            <DataTable.Title
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Thao tác
            </DataTable.Title>
          </DataTable.Header>
          {userList ? (
            <FlatList
              data={userList}
              keyExtractor={(item) => item.maND + ""}
              renderItem={({ item }) => (
                <DataTable.Row>
                  <DataTable.Cell>{item.taikhoan}</DataTable.Cell>
                  <DataTable.Cell>{item.hoten}</DataTable.Cell>
                  <DataTable.Cell>
                    {item.trangthailamviec == 1
                      ? "Hoạt động"
                      : "Ngừng hoạt động"}
                  </DataTable.Cell>

                  <DataTable.Cell
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        toUpdateAccount(item.maND);
                      }}
                    >
                      <Text style={styles.row}>Sửa</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => goToDetail(item.maND)}
                    >
                      <Text style={styles.row}>Xem</Text>
                    </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>
              )}
            />
          ) : (
            <View style={styles.container}>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          )}

          <DataTable.Pagination
            page={page}
            numberOfPages={1}
            onPageChange={(page) => setPage(page)}
            showFastPaginationControls
          />
        </DataTable>
      </View>
    </View>
  );
};

export default AccountManagament;

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
  addContainer: {
    paddingTop: "1%",
    paddingHorizontal: "1%",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    borderColor: "rgba(154,154,154, .5)",
    borderTopWidth: 0.5,
  },
  button: {
    paddingHorizontal: 8,
  },
  row: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 2,
    paddingVertical: 5,
    textAlign: "center",
  },
});
