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

const UpdateInfo = () => {
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
    data.maND = arriveDetail.maND;
    data.taikhoan = arriveDetail.taikhoan;
    data.trangthailamviec = arriveDetail.trangthailamviec;
    data.maPB = arriveDetail.maPB;
    data.maCV = arriveDetail.maCV;
    data.isAdmin = arriveDetail.isAdmin;
    updateAccount(data);
  };

  const updateAccount = async (data: any) => {
    try {
      setLoading(true);
      let res = await axios.patch(
        "https://qlcv-server.herokuapp.com/api/users",
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
        linkTo("/tai-khoan/thong-tin-tai-khoan");
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
        "https://qlcv-server.herokuapp.com/api/users/" + loginReducer.userId,
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );
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
      <Text style={styles.title}>Cập nhật thông tin tài khoản</Text>
      <View style={styles.infoContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.textInput}
              containerStyle={styles.inputContainer}
              onChangeText={(value) => onChange(value)}
              value={value}
              errorMessage={errors.hoten && "Không được để trống"}
              label="Họ và tên"
            />
          )}
          name="hoten"
          rules={{ required: true }}
          defaultValue={arriveDetail.hoten || ""}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputWrapContainer}>
              <Text style={styles.labelStyle}>Năm sinh</Text>
              <DateTimePicker
                value={value}
                onChange={onChange}
                style={{ paddingVertical: 3.5 }}
              />
            </View>
          )}
          name="namsinh"
          rules={{ required: true }}
          defaultValue={arriveDetail.namsinh || ""}
        />
        {errors.namsinh && <Text>Không được để trống</Text>}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputWrapContainer}>
              <Text style={styles.labelStyle}>Giới tính</Text>
              <Picker
                style={styles.itemPicker}
                selectedValue={value}
                onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
              >
                <Picker.Item label="Nam" value={1} />
                <Picker.Item label="Nữ" value={2} />
              </Picker>
            </View>
          )}
          name="gioitinh"
          rules={{ required: true }}
          defaultValue={arriveDetail.gioitinh || ""}
        />
        {errors.gioitinh && <Text>Không được để trống</Text>}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.textInput}
              containerStyle={styles.inputContainer}
              onChangeText={(value) => onChange(value)}
              value={value}
              errorMessage={errors.diachi && "Không được để trống"}
              label="Địa chỉ"
            />
          )}
          name="diachi"
          rules={{ required: true }}
          defaultValue={arriveDetail.diachi || ""}
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

export default UpdateInfo;

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
