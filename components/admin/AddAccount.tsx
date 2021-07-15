import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
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

const AddAccount = () => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const [positionList, setPositionList] = React.useState<any>();
  const [departmentList, setDepartmentList] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const linkTo = useLinkTo();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    data.trangthailamviec = 1;
    createAccount(data);
  };

  const createAccount = async (data: any) => {
    try {
      setLoading(true);
      let res = await axios.post(
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
        fastMessage("Tạo thành công!", "success");
        linkTo("/quan-tri-vien/quan-ly-tai-khoan");
      } else {
        fastMessage("Tạo thất bại!", "danger");
        setLoading(false);
      }
    } catch (e) {
      fastMessage("Tạo thất bại!", "danger");
      setLoading(false);
    }
  };

  const getPositionList = async () => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/positions/",
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );

      let responseData = [...res.data.data];
      setPositionList(responseData);
      console.log(responseData);
    } catch (e) {
      setPositionList(null);
    }
  };

  const getDepartmentList = async () => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/departments/",
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );

      let responseData = [...res.data.data];
      setDepartmentList(responseData);
      console.log(responseData);
    } catch (e) {
      setDepartmentList(null);
    }
  };

  const PositionList = () => {
    if (positionList) {
      return positionList.map((item: any) => {
        return (
          <Picker.Item
            label={item.tencv}
            value={item.maCV}
            key={item.maCV + ""}
          />
        );
      });
    } else {
      return <Picker.Item label="Đang tải" value="0" />;
    }
  };

  const DepartmentList = () => {
    if (departmentList) {
      return departmentList.map((item: any) => {
        return (
          <Picker.Item
            label={item.tenphong}
            value={item.maPB}
            key={item.maPB + ""}
          />
        );
      });
    } else {
      return <Picker.Item label="Đang tải" value="0" />;
    }
  };

  React.useEffect(() => {
    if (loginReducer.token) {
      getPositionList();
      getDepartmentList();
    }
  }, [loginReducer.token]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm tài khoản</Text>
      <View style={styles.infoContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.textInput}
              containerStyle={styles.inputContainer}
              onChangeText={(value) => onChange(value)}
              value={value}
              errorMessage={errors.taikhoan && "Không được để trống"}
              label="Tên tài khoản"
            />
          )}
          name="taikhoan"
          rules={{ required: true }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.textInput}
              containerStyle={styles.inputContainer}
              onChangeText={(value) => onChange(value)}
              value={value}
              secureTextEntry={true}
              errorMessage={errors.matkhau && "Không được để trống"}
              label="Mật khẩu"
            />
          )}
          name="matkhau"
          rules={{ required: true }}
          defaultValue=""
        />
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
          defaultValue=""
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
          defaultValue=""
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
          defaultValue="1"
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
          defaultValue=""
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputWrapContainer}>
              <Text style={styles.labelStyle}>Chức vụ</Text>
              <Picker
                style={styles.itemPicker}
                selectedValue={value}
                onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
              >
                <PositionList />
              </Picker>
            </View>
          )}
          name="maCV"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.maCV && <Text>Không được để trống</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputWrapContainer}>
              <Text style={styles.labelStyle}>Phòng ban</Text>
              <Picker
                style={styles.itemPicker}
                selectedValue={value}
                onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
              >
                <DepartmentList />
              </Picker>
            </View>
          )}
          name="maPB"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.maPB && <Text>Không được để trống</Text>}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputWrapContainer}>
              <Text style={styles.labelStyle}>Loại tài khoản</Text>
              <Picker
                style={styles.itemPicker}
                selectedValue={value}
                onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
              >
                <Picker.Item label="Người dùng" value={0} />
                <Picker.Item label="Quản trị viên" value={1} />
              </Picker>
            </View>
          )}
          name="isAdmin"
          rules={{ required: true }}
          defaultValue="0"
        />
        {errors.isAdmin && <Text>Không được để trống</Text>}
      </View>
      {loading ? (
        <Button
          containerStyle={styles.submitButton}
          title="Loading button"
          loading
        />
      ) : (
        <Button
          title="Tạo"
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
  );
};

export default AddAccount;

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
