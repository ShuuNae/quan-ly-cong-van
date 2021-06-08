import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import { Link } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getLoginToken, login } from "../redux/actions/AuthActions";
import { IRootState } from "../redux/reducers";
import { useLinkTo } from "@react-navigation/native";
import { loginReducer } from "../redux/reducers/loginReducer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loginReducer } = useSelector((state: IRootState) => state);
  const linkTo = useLinkTo();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const onSubmit = (data: any) => {
    dispatch(login(data.accountName, data.password));
    // reset();
  };

  React.useEffect(() => {
    dispatch(getLoginToken());
  }, []);

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        accountName: "",
        password: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  // React.useEffect(() => {
  //   if (loginReducer.isLoggedIn) {
  //     linkTo("/Home");
  //   }
  // }, [loginReducer.isLoggedIn]);
  return !loginReducer.isLoggedIn ? (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://hscv.monre.gov.vn/domcfg.nsf/logo.png?OpenImageResource",
          }}
        />
        <Text style={styles.headerTitle}>hệ thống quản lý hồ sơ, công văn</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.loginContainer}>
          <View style={styles.loginContent}>
            <Text style={styles.loginTitle}>Đăng nhập hệ thống</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.textInputContainer}>
                  <MaterialCommunityIcons
                    name="account"
                    size={28}
                    color="white"
                    style={{ paddingRight: 5 }}
                  />
                  <TextInput
                    style={styles.textInput}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="Tên đăng nhập"
                    maxLength={25}
                  />
                </View>
              )}
              name="accountName"
              rules={{ required: true }}
              defaultValue=""
            />
            {errors.accountName && <Text>Chưa điền tài khoản</Text>}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.textInputContainer}>
                  <Entypo
                    name="lock"
                    size={28}
                    color="white"
                    style={{ paddingRight: 5 }}
                  />
                  <TextInput
                    style={styles.textInput}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    secureTextEntry={true}
                    placeholder="Mật khẩu"
                    maxLength={35}
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                </View>
              )}
              name="password"
              rules={{ required: true }}
              defaultValue=""
            />
            {errors.password && <Text>Chưa điền mật khẩu</Text>}
            <Button title="Đăng nhập" onPress={handleSubmit(onSubmit)} />
            {loginReducer.error && <Text>Sai mật khẩu hoặc tài khoản</Text>}
          </View>
        </View>
      </View>
    </View>
  ) : (
    <View></View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8EE0AB",
  },
  headerContainer: {
    flex: 1.5,
    paddingVertical: "2%",
    backgroundColor: "rgba(52, 52, 52, 0.0)",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 6,
    backgroundColor: "rgba(52, 52, 52, 0.0)",
  },
  logo: {
    width: 89,
    height: 90,
  },
  headerTitle: {
    paddingTop: "1%",
    textTransform: "uppercase",
    fontSize: 25,
    fontWeight: "bold",
  },

  loginContainer: {
    backgroundColor: "#71B388",
    marginHorizontal: "30%",
    // alignItems: "center",
    // justifyContent: "center",
  },

  loginContent: {
    marginHorizontal: "10%",
    marginVertical: "5%",
  },

  loginTitle: {
    alignSelf: "center",
    fontSize: 20,
    color: "white",
  },

  textInputContainer: {
    flexDirection: "row",
    paddingTop: "3%",
    // marginHorizontal: "15%",
  },

  textInput: {
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 18,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "white",
  },
});
