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
import TextContainer from "../TextContainer";
import { path, secretLevel, urgency } from "../../assets/data";

interface IProp {
  id: number;
}

const InternalDetail = (props: IProp) => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const [arriveDetail, setDispatchDetail] = React.useState<any>();
  const [error, setError] = React.useState<boolean>(false);
  const [fileType, setFileType] = React.useState<string>("no-file");

  const getDownloadUrl = async () => {
    if (arriveDetail.tentailieu) {
      let res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/internals/getDownloadUrl",
        {
          params: {
            fileName: arriveDetail.tentailieu,
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

  const getArrive = async () => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/internals/" + props.id,
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

  React.useEffect(() => {
    if (loginReducer.token) {
      getArrive();
    }
  }, [loginReducer.token, props.id]);

  return arriveDetail ? (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết công văn nội bộ</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitles}>Thông tin</Text>
        <View style={styles.infoContent}>
          <View style={{ flex: 1 }}>
            <TextContainer title="Tên văn bản" text={arriveDetail.tenvb} />
            <TextContainer title="Ký hiệu" text={arriveDetail.kyhieu} />
            <TextContainer title="Số hiệu" text={arriveDetail.sohieu} />
            <TextContainer title="Ngày ký" text={arriveDetail.ngayky} />
            <TextContainer title="Ngày lưu" text={arriveDetail.ngayluu} />
          </View>

          <View style={{ flex: 1 }}>
            <TextContainer title="Loại văn bản" text={arriveDetail.tenlvb} />
            <TextContainer title="Biểu mẫu" text={arriveDetail.tenBM} />
            <TextContainer title="Phòng ban nhận" text={arriveDetail.pbnhan} />
            <TextContainer
              title="Tình trạng duyệt"
              text={arriveDetail.tinhtrangduyet}
            />
            <TextContainer title="Người tạo" text={arriveDetail.hoten} />
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.infoTitles}>Nội dung</Text>
        <Text style={{ paddingVertical: 5 }}>{arriveDetail.noidung}</Text>
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
              textDecorationLine: arriveDetail.tentailieu
                ? "underline"
                : "none",
            }}
          >
            {arriveDetail.tentailieu
              ? arriveDetail.tentailieu
              : "Không có tài liệu đính kèm"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={{ alignSelf: "center" }}>
          <Text>Duyệt</Text>
        </TouchableOpacity>
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

export default InternalDetail;

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
    borderTopWidth: 0.5,
    borderColor: "rgba(154,154,154, .5)",
    paddingHorizontal: 15,
    paddingTop: 5,
    justifyContent: "center",
    // alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
  },
});
