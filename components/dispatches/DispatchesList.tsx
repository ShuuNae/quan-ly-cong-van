import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useLinkTo, useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getLoginToken } from "../../redux/actions/AuthActions";
import { IRootState } from "../../redux/reducers";
import { Button, Overlay } from "react-native-elements";
import { Input } from "react-native-elements";
import { DataTable, Dialog, Portal, Provider } from "react-native-paper";
import fastMessage from "../FastMessage";

const DispatchesList = () => {
  const dispatch = useDispatch();
  const { loginReducer } = useSelector((state: IRootState) => state);
  const [DispatchesList, setDispatchesList] = React.useState<any>();
  const [page, setPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<any>(1);
  const [searchText, setSearchText] = React.useState<string>("");
  const linkTo = useLinkTo();
  const isFocused = useIsFocused();
  const [selectedId, setSelectedId] = React.useState<any>();

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible((prevState) => !prevState);
  };

  const toggleToDelete = (id: any) => {
    toggleOverlay();
    setSelectedId(id);
  };

  const goToDispatchDetail = (id: any) => {
    linkTo("/cong-van-di/" + id);
    // console.log("/cong-van-di/" + id);
  };

  const toCreate = () => {
    linkTo("/tao-cong-van-di");
  };

  const goToUpdateDispatch = (id: any, userId: any) => {
    linkTo(`/cap-nhat-cong-van-di/${id}/${userId}`);
  };

  const deleteItem = async (id: any) => {
    try {
      let res = await axios.delete(
        "https://qlcv-server.herokuapp.com/api/dispatches/",
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
          data: {
            maVB: id,
          },
        }
      );
      if (res.data.success == 1) {
        getListPagination();
        getListCount();
        toggleOverlay();
        fastMessage("X??a th??nh c??ng!", "success");
      } else {
        fastMessage("X??a th???t b???i!", "danger");
      }
    } catch (err) {
      fastMessage("X??a th???t b???i!", "danger");
    }
  };

  const searchButton = async () => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/dispatches/search",
        {
          params: {
            page: page,
            searchData: searchText,
          },
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );
      let ResponseData = [...res.data.data];
      console.log(ResponseData);
      setDispatchesList(ResponseData);
    } catch (e) {}
  };

  const getDispatchesList = async () => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/dispatches/",
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );
      //   console.log(res);
      let ResponseData = [...res.data.data];
      // console.log(ResponseData);
      setDispatchesList(ResponseData);
    } catch (e) {
      setDispatchesList(null);
    }
  };
  const getListCount = async () => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/dispatches/getCount",
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );
      let ResponseData: any = { ...res.data.data };
      let total: number = ResponseData.tong;
      if (total) {
        let totalPage = Math.ceil(total / 20);
        setTotalPages(totalPage);
      }
    } catch (e) {}
  };

  const getListPagination = async () => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/dispatches/pagination",
        {
          params: {
            page: page,
          },
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );
      console.log(res);
      let ResponseData = [...res.data.data];
      console.log(ResponseData);
      setDispatchesList(ResponseData);
    } catch (e) {
      setDispatchesList(null);
    }
  };

  React.useEffect(() => {
    if (loginReducer.token) {
      // getDispatchesList();
      getListPagination();
      getListCount();
    }
  }, [loginReducer.token, loginReducer.reloadPageName, page, isFocused]);

  React.useEffect(() => {
    console.log(visible);
  }, [visible]);

  return (
    <>
      <Overlay
        ModalComponent={Modal}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{ paddingHorizontal: 20 }}
      >
        <Text style={{ paddingTop: 5, paddingBottom: 35, fontSize: 16 }}>
          B???n c?? mu???n x??a c??ng v??n n??y?
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            title="X??a"
            containerStyle={{ width: "40%" }}
            buttonStyle={{ backgroundColor: "#bb2124" }}
            onPress={() => {
              deleteItem(selectedId);
            }}
          />
          <Button
            title="H???y"
            containerStyle={{ width: "40%" }}
            onPress={toggleOverlay}
          />
        </View>
      </Overlay>
      <View style={styles.container}>
        <Text style={styles.title}>Danh s??ch c??ng v??n ??i</Text>
        <View style={styles.addContainer}>
          <View style={{ flexDirection: "row" }}>
            <Input
              placeholder="T??m ki???m"
              // leftIcon={<Icon name="user" size={24} color="black" />}
              value={searchText}
              onChangeText={setSearchText}
            />
            <Button
              title="T??m ki???m"
              type="outline"
              // containerStyle={{ width: "10%" }}
              titleStyle={{ fontSize: 16 }}
              onPress={searchButton}
            />
          </View>
          <Button
            title="Th??m m???i"
            type="outline"
            containerStyle={{ width: "10%" }}
            titleStyle={{ fontSize: 16 }}
            onPress={toCreate}
          />
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>K?? hi???u</DataTable.Title>
            <DataTable.Title>S??? hi???u</DataTable.Title>
            <DataTable.Title>T??n v??n b???n</DataTable.Title>
            <DataTable.Title>Ng??y k??</DataTable.Title>
            <DataTable.Title>Ng??y ??i</DataTable.Title>
            <DataTable.Title>N??i nh???n</DataTable.Title>
            <DataTable.Title
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              T??nh tr???ng duy???t
            </DataTable.Title>
            <DataTable.Title
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Thao t??c
            </DataTable.Title>
          </DataTable.Header>
          {DispatchesList ? (
            <FlatList
              data={DispatchesList}
              keyExtractor={(item) => item.maVB + ""}
              renderItem={({ item }) => (
                <DataTable.Row>
                  <DataTable.Cell>{item.kyhieu}</DataTable.Cell>
                  <DataTable.Cell>{item.sohieu}</DataTable.Cell>
                  <DataTable.Cell>{item.tenvb}</DataTable.Cell>
                  <DataTable.Cell>{item.ngayky}</DataTable.Cell>
                  <DataTable.Cell style={styles.row}>
                    {item.ngaydi}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.row}>
                    {item.cqnhan}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.tinhtrangduyet}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.maND == loginReducer.userId && (
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          goToUpdateDispatch(item.maVB, item.maND);
                        }}
                      >
                        <Text style={styles.row}>S???a</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => goToDispatchDetail(item.maVB)}
                    >
                      <Text style={styles.row}>Xem</Text>
                    </TouchableOpacity>
                    {loginReducer.isAdmin == 1 && (
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => toggleToDelete(item.maVB)}
                      >
                        <Text style={styles.row}>X??a</Text>
                      </TouchableOpacity>
                    )}
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
            numberOfPages={totalPages}
            onPageChange={(page) => setPage(page)}
            label={`Trang ${page + 1} tr??n ${totalPages}`}
            showFastPaginationControls
          />
        </DataTable>
      </View>
    </>
  );
};

export default DispatchesList;

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
  table: {
    flexDirection: "row",
    borderBottomWidth: 0.3,
    flexWrap: "wrap",
    borderTopWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "space-around",
  },
  row: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 2,
    paddingVertical: 5,
    textAlign: "center",
  },
  addContainer: {
    paddingTop: "0.5%",
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
  containeralt: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#eee",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    height: 300,
    margin: "auto",
    padding: 30,
    width: 300,
  },
});
