import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Link } from "@react-navigation/native";
import { useLinkTo } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/reducers";
import { getLoginToken, logout } from "../redux/actions/AuthActions";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loginReducer } = useSelector((state: IRootState) => state);
  const linkTo = useLinkTo();
  const isInitialMount = React.useRef(true);

  const [fileName, setFileName] = React.useState<any>({});
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/msword,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      setFileName(res);
    } catch (e) {
      setFileName(null);
    }
  };
  const justUpload = async () => {
    if (fileName) {
      // window.open(fileName.uri);
      console.log(fileName);
      const fileUpload = fileName.file;
      const data = new FormData();
      data.append("name", fileUpload.name);
      data.append("file", fileUpload);

      let res = await axios.post(
        "http://localhost:3000/api/dispatches/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );

      let responseJson = res;
      console.log(responseJson);
    }
    // Linking.openURL(fileName.uri);
    // await WebBrowser.openBrowserAsync(fileName.uri);
  };

  const handleLink = () => {
    // Linking.openURL("https://google.com");
    window.open("https://google.com");
  };
  React.useEffect(() => {
    dispatch(getLoginToken());
  }, []);

  //   React.useEffect(() => {
  //     if (!loginReducer.isLoggedIn && loginReducer.getTokenStatus) {
  //       linkTo("/Login");
  //     }
  //   }, [loginReducer.isLoggedIn, loginReducer.getTokenStatus]);

  return (
    loginReducer.isLoggedIn && (
      <View>
        <Text>Test</Text>
        <TouchableOpacity onPress={pickFile}>
          <Text>choose file</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={justUpload}>
          <Text>file u just upload</Text>
        </TouchableOpacity>
      </View>
    )
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
