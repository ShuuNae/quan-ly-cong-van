import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Input, Button } from "react-native-elements";
import DateTimePicker from "../DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { IRootState } from "../../redux/reducers";
import { path, secretLevel, urgency } from "../../assets/data";
import * as DocumentPicker from "expo-document-picker";
import { useLinkTo } from "@react-navigation/native";
import { reloadPage } from "../../redux/actions/AuthActions";
import fastMessage from "../FastMessage";

///////////////////////IF U WANT SET MAX DAY FOR INPUT DATE ////////////////////
// const day = new Date().toISOString().split("T")[0];
// console.log(day);
////////////////////////////////////////////////////////////////////////////////
interface IProp {
  id: number;
}
const UpdateForm = (props: IProp) => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const [positionList, setPositionList] = React.useState<any>();
  const [departmentList, setDepartmentList] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [arriveDetail, setDispatchDetail] = React.useState<any>();
  const dispatch = useDispatch();
  const linkTo = useLinkTo();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    data.trangthai = 1;
    data.maBM = arriveDetail.maBM;
    updateAccount(data);
  };

  const updateAccount = async (data: any) => {
    try {
      setLoading(true);
      let res = await axios.patch(
        "https://qlcv-server.herokuapp.com/api/forms",
        data,
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );
      if (res.status === 200) {
        setLoading(false);
        fastMessage("Cập nhật thành công!", "success");
        linkTo("/quan-tri-vien/quan-ly-bieu-mau");
      } else {
        fastMessage("Cập nhật thất bại!", "danger");
        setLoading(false);
      }
    } catch (e) {
      fastMessage("Cập nhật thất bại!", "danger");
      setLoading(false);
    }
  };

  const getArrive = async () => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/forms/" + props.id,
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
      setError(true);
      setDispatchDetail(null);
    }
  };

  React.useEffect(() => {
    if (loginReducer.token) {
      getArrive();
    }
  }, [loginReducer.token]);

  return arriveDetail ? (
    <View style={styles.container}>
      <Text style={styles.title}>Cập nhật biểu mẫu</Text>
      <View style={styles.infoContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.textInput}
              containerStyle={styles.inputContainer}
              onChangeText={(value) => onChange(value)}
              value={value}
              errorMessage={errors.tenBM && "Không được để trống"}
              label="Tên biểu mẫu"
            />
          )}
          name="tenBM"
          rules={{ required: true }}
          defaultValue={arriveDetail.tenBM || 0}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.textInput}
              containerStyle={styles.inputContainer}
              onChangeText={(value) => onChange(value.replace(/[^0-9]/g, ""))}
              value={value}
              errorMessage={errors.soluong && "Không được để trống"}
              label="Số lượng"
            />
          )}
          name="soluong"
          rules={{ required: true }}
          defaultValue={arriveDetail.soluong || 0}
        />
      </View>
      {loading ? (
        <Button
          containerStyle={{
            width: "20%",
            borderLeftWidth: 0.5,
            borderRightWidth: 0.5,
            borderColor: "rgba(154,154,154, .3)",
            margin: 10,
          }}
          title="Loading button"
          loading
        />
      ) : (
        <Button
          title="Cập nhật"
          type="outline"
          containerStyle={{
            width: "20%",
            borderLeftWidth: 0.5,
            borderRightWidth: 0.5,
            borderColor: "rgba(154,154,154, .3)",
            margin: 10,
          }}
          titleStyle={{ fontSize: 16, fontWeight: "bold" }}
          buttonStyle={{ padding: 5 }}
          onPress={handleSubmit(onSubmit)}
        />
      )}
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

export default UpdateForm;

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
  contentContainer: {
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: "rgba(154,154,154, .5)",
    paddingHorizontal: 15,
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
  inputTitle: {
    fontWeight: "bold",
  },
  textInput: {
    fontSize: 14,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: "40%",
  },
  labelStyle: {
    fontSize: 16,
    color: "rgb(134, 147, 158)",
    fontWeight: "bold",
    paddingBottom: 10,
  },
  inputWrapContainer: {
    width: "40%",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  itemPicker: {
    paddingVertical: 6,
  },
  dispatchContentContainer: {
    borderBottomWidth: 0.5,
    borderColor: "rgba(154,154,154, .5)",
  },
  fileContainer: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  uploadFileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fileName: {
    fontSize: 16,
    paddingLeft: "1%",
  },
  submitContainer: {
    alignItems: "center",
    paddingVertical: "5%",
  },
  submitButton: {
    width: "10%",
  },
});
