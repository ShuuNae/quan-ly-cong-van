import axios from "axios";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import { set } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/reducers";
import { Entypo } from "@expo/vector-icons";
import DispatchesList from "./DispatchesList";
import TextContainer from "../TextContainer";
import { path, secretLevel, urgency } from "../../assets/data";
import { Input, Button } from "react-native-elements";
import fastMessage from "../FastMessage";

interface IProp {
  id: number;
}

const DispatchDetail = (props: IProp) => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const [dispatchDetail, setDispatchDetail] = React.useState<any>();
  const [error, setError] = React.useState<boolean>(false);
  const [fileType, setFileType] = React.useState<string>("no-file");
  const [failed, setFailed] = React.useState<boolean>(false);

  const getDownloadUrl = async () => {
    if (dispatchDetail.tentailieu) {
      let res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/dispatches/getDownloadUrl",
        {
          params: {
            fileName: dispatchDetail.tentailieu,
          },
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );
      if (res.data) {
        window.open(res.data);
      }
    }
  };

  const getDispatch = async () => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/dispatches/" + props.id,
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );
      let responseData = { ...res.data.data };

      if (res.data.success == 0) {
        setError(true);
      } else {
        if (responseData.tentailieu) {
          let type = responseData.tentailieu.split(".").pop();
          if (type == "docx" || type == "pdf" || type == "doc") {
            setFileType(type);
          }
        }
        console.log(responseData);
        setDispatchDetail(responseData);
      }
    } catch (e) {
      setDispatchDetail(null);
    }
  };

  const approve = async (tinhtrangduyet: any, id: any) => {
    let data: any = {};
    data.tinhtrangduyet = tinhtrangduyet;
    data.maVB = id;
    try {
      let res = await axios.patch(
        "https://qlcv-server.herokuapp.com/api/dispatches/approve",
        data,
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        getDispatch();
        saveApproveLog();
        fastMessage("Duyệt thành công!", "success");
      } else {
        setFailed(true);
        fastMessage("Duyệt thất bại!", "danger");
      }
    } catch (e) {
      setFailed(true);
      fastMessage("Duyệt thất bại!", "danger");
    }
  };

  const saveApproveLog = async () => {
    let data: any = {};
    let day = new Date();
    let dayTime = day.toLocaleString();
    data.maCVDi = dispatchDetail.maVB;
    data.maND = loginReducer.userId;
    data.thoigianduyet = dayTime;
    try {
      let res = await axios.post(
        "https://qlcv-server.herokuapp.com/api/approves",
        data,
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );
      console.log(res);
    } catch (e) {
      setFailed(true);
      return e;
    }
  };

  React.useEffect(() => {
    if (loginReducer.token) {
      getDispatch();
    }
  }, [loginReducer.token, props.id]);

  return dispatchDetail ? (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết công văn đi</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitles}>Thông tin</Text>
        <View style={styles.infoContent}>
          <View style={{ flex: 1 }}>
            <TextContainer title="Tên văn bản" text={dispatchDetail.tenvb} />
            <TextContainer title="Ký hiệu" text={dispatchDetail.kyhieu} />
            <TextContainer title="Số hiệu" text={dispatchDetail.sohieu} />
            <TextContainer title="Nơi nhận" text={dispatchDetail.cqnhan} />
            <TextContainer title="Ngày ký" text={dispatchDetail.ngayky} />
            <TextContainer title="Ngày đi" text={dispatchDetail.ngaydi} />
            <TextContainer
              title="Đường đi"
              text={path[dispatchDetail.duongdi - 1]}
            />
          </View>

          <View style={{ flex: 1 }}>
            <TextContainer
              title="Mức độ mật"
              text={secretLevel[dispatchDetail.mucdomat - 1]}
            />
            <TextContainer
              title="Mức độ khẩn"
              text={urgency[dispatchDetail.mucdokhan - 1]}
            />
            <TextContainer title="Loại văn bản" text={dispatchDetail.tenlvb} />
            <TextContainer title="Biểu mẫu" text={dispatchDetail.tenBM} />
            <TextContainer title="Nhân viên giao" text={dispatchDetail.tennv} />
            <TextContainer
              title="Tình trạng duyệt"
              text={dispatchDetail.tinhtrangduyet}
            />
            <TextContainer title="Người tạo" text={dispatchDetail.hoten} />
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.infoTitles}>Nội dung</Text>
        <Text style={{ paddingVertical: 5 }}>{dispatchDetail.noidung}</Text>
      </View>
      <View style={styles.fileContainer}>
        <Text style={styles.infoTitles}>Tài liệu đính kèm</Text>
        <TouchableOpacity
          style={{ alignSelf: "flex-start", paddingVertical: 5 }}
          onPress={getDownloadUrl}
        >
          <Image
            style={styles.image}
            source={require(`../../assets/images/${fileType}.png`)}
          />
          <Text
            style={{
              textAlign: "center",
              color: "blue",
              textDecorationLine: dispatchDetail.tentailieu
                ? "underline"
                : "none",
            }}
          >
            {dispatchDetail.tentailieu
              ? dispatchDetail.tentailieu
              : "Không có tài liệu đính kèm"}
          </Text>
        </TouchableOpacity>
      </View>
      {loginReducer.data.quyenduyet == 1 &&
      dispatchDetail.tinhtrangduyet == "Chưa duyệt" ? (
        <Button
          title="Duyệt"
          containerStyle={styles.buttonContainer}
          onPress={() => approve("Phòng ban đã duyệt", dispatchDetail.maVB)}
        />
      ) : null}
      {loginReducer.data.quyenduyet == 2 &&
      dispatchDetail.tinhtrangduyet == "Phòng ban đã duyệt" ? (
        <Button
          title="Duyệt"
          containerStyle={styles.buttonContainer}
          onPress={() => approve("Cơ quan đã duyệt", dispatchDetail.maVB)}
        />
      ) : null}
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

export default DispatchDetail;

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
    // borderTopWidth: 0.5,
    // borderColor: "rgba(154,154,154, .5)",
    // paddingHorizontal: 15,
    // paddingTop: 5,
    // justifyContent: "center",
    // // alignItems: "center",
    width: "10%",
    alignSelf: "center",
    padding: 5,
  },
  image: {
    width: 90,
    height: 90,
  },
});
