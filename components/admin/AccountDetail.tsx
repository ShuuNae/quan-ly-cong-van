import axios from "axios";
import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-elements";
import { useSelector } from "react-redux";
import { approveRight, path, secretLevel, urgency } from "../../assets/data";
import { IRootState } from "../../redux/reducers";
import fastMessage from "../FastMessage";
import TextContainer from "../TextContainer";

interface IProp {
  id: number;
}

const AccountDetail = (props: IProp) => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const [arriveDetail, setDispatchDetail] = React.useState<any>();
  const [error, setError] = React.useState<boolean>(false);
  const [fileType, setFileType] = React.useState<string>("no-file");
  const [failed, setFailed] = React.useState<boolean>(false);

  const getArrive = async () => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/users/" + props.id,
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );
      console.log(res);
      if (res.data.success == 1) {
        let responseData = { ...res.data.data };
        setDispatchDetail(responseData);
      } else {
        setError(true);
      }
    } catch (e) {
      setDispatchDetail(null);
    }
  };

  React.useEffect(() => {
    if (loginReducer.token) {
      getArrive();
    }
  }, [loginReducer.token, props.id]);

  return arriveDetail ? (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết tài khoản</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitles}>Thông tin</Text>
        <View style={styles.infoContent}>
          <View style={{ flex: 1 }}>
            <TextContainer title="Họ và tên" text={arriveDetail.hoten} />
            <TextContainer
              title="Giới tính"
              text={arriveDetail.gioitinh == 1 ? "Nam" : "Nữ"}
            />
            <TextContainer title="Năm sinh" text={arriveDetail.namsinh} />
            <TextContainer title="Địa chỉ" text={arriveDetail.diachi} />
          </View>

          <View style={{ flex: 1 }}>
            <TextContainer title="Chức vụ" text={arriveDetail.tencv} />
            <TextContainer title="Phòng ban" text={arriveDetail.tenphong} />
            <TextContainer
              title="Trạng thái làm việc"
              text={
                arriveDetail.trangthailamviec == 1
                  ? "Đang hoạt động"
                  : "Ngừng hoạt động"
              }
            />
            {loginReducer.isAdmin == 1 ? (
              <>
                <TextContainer
                  title="Tên tài khoản"
                  text={arriveDetail.taikhoan}
                />
                <TextContainer
                  title="Quyền duyệt"
                  text={approveRight[arriveDetail.quyenduyet]}
                />
                <TextContainer
                  title="Vai trò"
                  text={
                    arriveDetail.isAdmin == 1 ? "Quản trị viên" : "Người dùng"
                  }
                />
              </>
            ) : null}
          </View>
        </View>
      </View>
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

export default AccountDetail;

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
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  infoContainer: {
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: "rgba(154,154,154, .5)",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  infoTitleContainer: {
    borderBottomWidth: 0.5,
    borderColor: "rgba(154,154,154, .3)",
  },
  infoTitles: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContent: {
    flexDirection: "row",
    paddingTop: 5,
  },
  contentContainer: {
    borderBottomWidth: 0.5,
    borderColor: "rgba(154,154,154, .5)",
    paddingHorizontal: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  fileContainer: {
    borderColor: "rgba(154,154,154, .5)",
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 5,
  },
  buttonContainer: {
    width: "10%",
    alignSelf: "center",
    padding: 5,
  },
  image: {
    width: 90,
    height: 90,
  },
});
