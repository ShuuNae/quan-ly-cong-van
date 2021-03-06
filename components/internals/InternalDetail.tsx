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
import { Input, Button } from "react-native-elements";
import fastMessage from "../FastMessage";

interface IProp {
  id: number;
}

const InternalDetail = (props: IProp) => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const [arriveDetail, setDispatchDetail] = React.useState<any>();
  const [error, setError] = React.useState<boolean>(false);
  const [fileType, setFileType] = React.useState<string>("no-file");
  const [failed, setFailed] = React.useState<boolean>(false);

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

  const approve = async (tinhtrangduyet: any, id: any) => {
    let data: any = {};
    data.tinhtrangduyet = tinhtrangduyet;
    data.maVB = id;
    try {
      let res = await axios.patch(
        "https://qlcv-server.herokuapp.com/api/internals/approve",
        data,
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        getArrive();
        saveApproveLog();
        fastMessage("Duy???t th??nh c??ng!", "success");
      } else {
        setFailed(true);
        fastMessage("Duy???t th???t b???i!", "danger");
      }
    } catch (e) {
      setFailed(true);
      fastMessage("Duy???t th???t b???i!", "danger");
      return e;
    }
  };

  const saveApproveLog = async () => {
    let data: any = {};
    let day = new Date();
    let dayTime = day.toLocaleString();
    data.maCVNB = arriveDetail.maVB;
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
      getArrive();
    }
  }, [loginReducer.token, props.id]);

  return arriveDetail ? (
    <View style={styles.container}>
      <Text style={styles.title}>Chi ti???t c??ng v??n n???i b???</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitles}>Th??ng tin</Text>
        <View style={styles.infoContent}>
          <View style={{ flex: 1 }}>
            <TextContainer title="T??n v??n b???n" text={arriveDetail.tenvb} />
            <TextContainer title="K?? hi???u" text={arriveDetail.kyhieu} />
            <TextContainer title="S??? hi???u" text={arriveDetail.sohieu} />
            <TextContainer title="Ng??y k??" text={arriveDetail.ngayky} />
            <TextContainer title="Ng??y l??u" text={arriveDetail.ngayluu} />
          </View>

          <View style={{ flex: 1 }}>
            <TextContainer title="Lo???i v??n b???n" text={arriveDetail.tenlvb} />
            <TextContainer title="Bi???u m???u" text={arriveDetail.tenBM} />
            <TextContainer title="Ph??ng ban nh???n" text={arriveDetail.pbnhan} />
            <TextContainer
              title="T??nh tr???ng duy???t"
              text={arriveDetail.tinhtrangduyet}
            />
            <TextContainer title="Ng?????i t???o" text={arriveDetail.hoten} />
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.infoTitles}>N???i dung</Text>
        <Text style={{ paddingVertical: 5 }}>{arriveDetail.noidung}</Text>
      </View>
      <View style={styles.fileContainer}>
        <Text style={styles.infoTitles}>T??i li???u ????nh k??m</Text>
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
              : "Kh??ng c?? t??i li???u ????nh k??m"}
          </Text>
        </TouchableOpacity>
      </View>
      {loginReducer.data.quyenduyet == 1 &&
      arriveDetail.tinhtrangduyet == "Ch??a duy???t" ? (
        <Button
          title="Duy???t"
          containerStyle={styles.buttonContainer}
          onPress={() => approve("Ph??ng ban ???? duy???t", arriveDetail.maVB)}
        />
      ) : null}
      {loginReducer.data.quyenduyet == 2 &&
      arriveDetail.tinhtrangduyet == "Ph??ng ban ???? duy???t" ? (
        <Button
          title="Duy???t"
          containerStyle={styles.buttonContainer}
          onPress={() => approve("C?? quan ???? duy???t", arriveDetail.maVB)}
        />
      ) : null}
    </View>
  ) : error ? (
    <View style={styles.container}>
      <Text>Kh??ng c?? d??? li???u</Text>
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
    width: "10%",
    alignSelf: "center",
    padding: 5,
  },
  image: {
    width: 90,
    height: 90,
  },
});
