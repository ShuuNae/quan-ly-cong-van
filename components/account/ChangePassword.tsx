import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { loginReducer } from "../../redux/reducers/loginReducer";
import { IRootState } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import TextContainer from "../TextContainer";
import { Input, Button } from "react-native-elements";
import { useLinkTo } from "@react-navigation/native";
import fastMessage from "../FastMessage";
import { logout } from "../../redux/actions/AuthActions";

const ChangePassword = () => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const linkTo = useLinkTo();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    if (data.matkhaumoi === data.matkhaumoi2) {
      data.taikhoan = loginReducer.data.taikhoan;
      data.maND = loginReducer.userId;
      updatePassword(data);
    } else {
      fastMessage("Xác nhận mật khẩu chưa khớp!", "danger");
    }
  };

  const updatePassword = async (data: any) => {
    try {
      setLoading(true);
      let res = await axios.patch(
        "https://qlcv-server.herokuapp.com/api/users/changePassword",
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
        dispatch(logout());
      } else {
        fastMessage("Cập nhật thất bại!", "danger");
        setLoading(false);
      }
    } catch (e) {
      fastMessage("Cập nhật thất bại!", "danger");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đổi mật khẩu</Text>
      <View style={styles.infoContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.textInput}
              containerStyle={styles.inputContainer}
              onChangeText={(value) => onChange(value)}
              secureTextEntry={true}
              value={value}
              errorMessage={errors.matkhau && "Không được để trống"}
              label="Nhập mật khẩu hiện tại"
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
              secureTextEntry={true}
              value={value}
              errorMessage={errors.matkhaumoi && "Không được để trống"}
              label="Nhập mật khẩu mới"
            />
          )}
          name="matkhaumoi"
          rules={{ required: true }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.textInput}
              containerStyle={styles.inputContainer}
              secureTextEntry={true}
              onChangeText={(value) => onChange(value)}
              value={value}
              errorMessage={errors.matkhaumoi2 && "Không được để trống"}
              label="Xác nhận mật khẩu mới"
            />
          )}
          name="matkhaumoi2"
          rules={{ required: true }}
          defaultValue=""
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
          title="Đổi mật khẩu"
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

export default ChangePassword;

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
  textInput: {
    fontSize: 14,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: "80%",
  },
});
