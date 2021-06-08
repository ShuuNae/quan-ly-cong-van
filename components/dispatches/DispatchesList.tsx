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

const DispatchesList = () => {
  const dispatch = useDispatch();
  const { loginReducer } = useSelector((state: IRootState) => state);
  const [DispatchesList, setDispatchesList] = React.useState<any>();
  const linkTo = useLinkTo();

  const goToDispatchDetail = (id: any) => {
    linkTo("/cong-van-di/" + id);
    // console.log("/cong-van-di/" + id);
  };

  const goToUpdateDispatch = (id: any, userId: any) => {
    linkTo(`/cap-nhat-cong-van-di/${id}/${userId}`);
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

  React.useEffect(() => {
    if (
      loginReducer.token ||
      (loginReducer.reloadPageName && loginReducer.reloadPageName === "Home")
    ) {
      getDispatchesList();
    }
  }, [loginReducer.token, loginReducer.reloadPageName]);

  return DispatchesList ? (
    <View style={styles.container}>
      <Text>Danh sách công văn đi</Text>
      <View style={styles.table}>
        <Text style={styles.row}>Ký hiệu</Text>
        <Text style={styles.row}>Số hiệu</Text>
        <Text style={styles.row}>Tên văn bản</Text>
        <Text style={styles.row}>Ngày ký</Text>
        <Text style={styles.row}>Ngày đi</Text>
        <Text style={styles.row}>Nơi nhận</Text>
        <Text style={styles.row}> Tình trạng duyệt</Text>
        <Text style={styles.row}>Thao tác</Text>
      </View>
      <FlatList
        data={DispatchesList}
        keyExtractor={(item) => item.maVB + ""}
        renderItem={({ item }) => (
          <View style={styles.table}>
            <Text style={styles.row}>{item.kyhieu}</Text>
            <Text style={styles.row}>{item.sohieu}</Text>
            <Text style={styles.row}>{item.tenvb}</Text>
            <Text style={styles.row}>{item.ngayky}</Text>
            <Text style={styles.row}>{item.ngaydi}</Text>
            <Text style={styles.row}>{item.cqnhan}</Text>
            <Text style={styles.row}>{item.tinhtrangduyet}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  goToUpdateDispatch(item.maVB, item.maND);
                }}
              >
                <Text style={styles.row}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => goToDispatchDetail(item.maVB)}>
                <Text style={styles.row}>Xem</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
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
    fontSize: 13,
    paddingHorizontal: 2,
    paddingVertical: 5,
    textAlign: "center",
  },
});
