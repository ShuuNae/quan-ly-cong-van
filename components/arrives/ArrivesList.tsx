import axios from "axios";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLinkTo } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getLoginToken } from "../../redux/actions/AuthActions";
import { IRootState } from "../../redux/reducers";
import { Button } from "react-native-elements";
import { DataTable } from "react-native-paper";
import { Input } from "react-native-elements";

const ArrivesList = () => {
  const dispatch = useDispatch();
  const { loginReducer } = useSelector((state: IRootState) => state);
  const [DispatchesList, setDispatchesList] = React.useState<any>();
  const [page, setPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<any>(1);
  const linkTo = useLinkTo();

  const goToArriveDetail = (id: any) => {
    linkTo("/chi-tiet-cong-van-den/" + id);
    // console.log("/cong-van-di/" + id);
  };

  const toCreate = () => {
    linkTo("/tao-cong-van-den");
  };

  const goToUpdateArrive = (id: any, userId: any) => {
    linkTo(`/cap-nhat-cong-van-den/${id}/${userId}`);
  };

  const getArrivesList = async () => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/arrives/",
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );
      //   console.log(res);
      let ResponseData = [...res.data.data];
      console.log(ResponseData);
      setDispatchesList(ResponseData);
    } catch (e) {
      setDispatchesList(null);
    }
  };
  const getListPagination = async () => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/internals/pagination",
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
      getArrivesList();
      // getListPagination();
    }
  }, [loginReducer.token, loginReducer.reloadPageName]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách công văn đến</Text>
      <View style={styles.addContainer}>
        <View style={{ flexDirection: "row" }}>
          <Input
            placeholder="Tìm kiếm"
            // leftIcon={<Icon name="user" size={24} color="black" />}
          />
          <Button
            title="Tìm kiếm"
            type="outline"
            // containerStyle={{ width: "10%" }}
            titleStyle={{ fontSize: 16 }}
          />
        </View>
        <Button
          title="Thêm mới"
          type="outline"
          containerStyle={{ width: "10%" }}
          titleStyle={{ fontSize: 16 }}
          onPress={toCreate}
        />
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Ký hiệu</DataTable.Title>
          <DataTable.Title>Số hiệu</DataTable.Title>
          <DataTable.Title>Tên văn bản</DataTable.Title>
          <DataTable.Title>Ngày ký</DataTable.Title>
          <DataTable.Title>Ngày đến</DataTable.Title>
          <DataTable.Title>Nơi gửi</DataTable.Title>
          <DataTable.Title
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Tình trạng duyệt
          </DataTable.Title>
          <DataTable.Title
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Thao tác
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
                  {item.ngayden}
                </DataTable.Cell>
                <DataTable.Cell style={styles.row}>
                  {item.noigui}
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
                  {/* <View style={styles.buttonContainer}> */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      goToUpdateArrive(item.maVB, item.maND);
                    }}
                  >
                    <Text style={styles.row}>Sửa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => goToArriveDetail(item.maVB)}
                  >
                    <Text style={styles.row}>Xem</Text>
                  </TouchableOpacity>
                  {/* </View> */}
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
          label={`Trang ${page + 1}`}
          showFastPaginationControls
        />
      </DataTable>
    </View>
  );
};

export default ArrivesList;

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
});
