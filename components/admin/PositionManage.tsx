import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { loginReducer } from "../../redux/reducers/loginReducer";
import { IRootState } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TextContainer from "../TextContainer";
import { useLinkTo } from "@react-navigation/native";
import { Button } from "react-native-elements";
import { Input } from "react-native-elements";
import { DataTable } from "react-native-paper";

const PositionManage = () => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const linkTo = useLinkTo();

  const toAddAccount = () => {
    linkTo("/them-tai-khoan");
  };
  const toUpdateAccount = () => {
    linkTo("/cap-nhat-tai-khoan-admin");
  };

  const [page, setPage] = React.useState<number>(0);

  React.useEffect(() => {
    console.log(page);
  }, [page]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách chức vụ</Text>
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
            <DataTable.Title>Tên chức vụ</DataTable.Title>
            <DataTable.Title>Ghi chú</DataTable.Title>
            <DataTable.Title>Thao tác</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>Nhân viên</DataTable.Cell>
            <DataTable.Cell>Không</DataTable.Cell>
            <DataTable.Cell>Sửa | Xóa</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Trưởng phòng</DataTable.Cell>
            <DataTable.Cell>Không</DataTable.Cell>
            <DataTable.Cell>Sửa | Xóa</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Kế toán</DataTable.Cell>
            <DataTable.Cell>Không</DataTable.Cell>
            <DataTable.Cell>Sửa | Xóa</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Pagination
            page={page}
            numberOfPages={4}
            onPageChange={(page) => setPage(page)}
            label="1-2 of 6"
            showFastPaginationControls
          />
        </DataTable>
        {/* <Button
          title="Thêm mới"
          type="outline"
          containerStyle={{ width: "10%" }}
          titleStyle={{ fontSize: 16 }}
          onPress={toUpdateAccount}
        /> */}
      </View>
    </View>
  );
};

export default PositionManage;

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
});
