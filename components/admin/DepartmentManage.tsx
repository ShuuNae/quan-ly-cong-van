import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import { loginReducer } from "../../redux/reducers/loginReducer";
import { IRootState } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TextContainer from "../TextContainer";
import { useLinkTo, useIsFocused } from "@react-navigation/native";
import { Button, Overlay } from "react-native-elements";
import { Input } from "react-native-elements";
import { DataTable } from "react-native-paper";
import fastMessage from "../FastMessage";

const DepartmentManage = () => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const linkTo = useLinkTo();
  const isFocused = useIsFocused();
  const [userList, setUserList] = React.useState<any>();
  const [selectedId, setSelectedId] = React.useState<any>();
  const [visible, setVisible] = React.useState(false);
  const [page, setPage] = React.useState<number>(0);

  const toggleOverlay = () => {
    setVisible((prevState) => !prevState);
  };

  const toggleToDelete = (id: any) => {
    toggleOverlay();
    setSelectedId(id);
  };
  const toAddAccount = () => {
    linkTo("/them-phong-ban");
  };
  const toUpdateAccount = (id: any) => {
    linkTo("/cap-nhat-phong-ban/" + id);
  };

  const deleteItem = async (id: any) => {
    try {
      let res = await axios.delete(
        "https://qlcv-server.herokuapp.com/api/departments/",
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
          data: {
            maPB: id,
          },
        }
      );
      console.log(res);
      if (res.data.success == 1) {
        getUserList();
        toggleOverlay();
        fastMessage("Xóa thành công!", "success");
      } else {
        fastMessage("Xóa thất bại!", "danger");
      }
    } catch (err) {
      fastMessage("Xóa thất bại!", "danger");
    }
  };
  const getUserList = async () => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/departments/",
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
      <Overlay
        ModalComponent={Modal}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{ paddingHorizontal: 20 }}
      >
        <Text style={{ paddingTop: 5, paddingBottom: 35, fontSize: 16 }}>
          Bạn có muốn xóa công văn này?
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            title="Xóa"
            containerStyle={{ width: "40%" }}
            buttonStyle={{ backgroundColor: "#bb2124" }}
            onPress={() => {
              deleteItem(selectedId);
            }}
          />
          <Button
            title="Hủy"
            containerStyle={{ width: "40%" }}
            onPress={toggleOverlay}
          />
        </View>
      </Overlay>
      <Text style={styles.title}>Danh sách phòng ban</Text>
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
            <DataTable.Title>Tên phòng ban</DataTable.Title>
            <DataTable.Title>Ghi chú</DataTable.Title>
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
              keyExtractor={(item) => item.maBM + ""}
              renderItem={({ item }) => (
                <DataTable.Row>
                  <DataTable.Cell>{item.tenphong}</DataTable.Cell>
                  <DataTable.Cell>{item.ghichu}</DataTable.Cell>
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
                        toUpdateAccount(item.maPB);
                      }}
                    >
                      <Text style={styles.row}>Sửa</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => toggleToDelete(item.maPB)}
                    >
                      <Text style={styles.row}>Xóa</Text>
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

export default DepartmentManage;

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
