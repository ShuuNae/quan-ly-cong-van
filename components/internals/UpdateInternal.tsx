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

interface IProp {
  id: number;
}

const UpdateInternal = (props: IProp) => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  const linkTo = useLinkTo();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [documentType, setDocumentType] = React.useState<any>();
  const [formList, setFormList] = React.useState<any>();
  const [file, setFile] = React.useState<any>();
  const [fileName, setFileName] = React.useState<any>();
  const [error, setError] = React.useState<boolean>(false);
  const [arriveDetail, setArriveDetail] = React.useState<any>();
  const [failed, setFailed] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = async (data: any) => {
    data.maND = loginReducer.userId;
    data.tinhtrangduyet = arriveDetail.tinhtrangduyet;
    data.maVB = arriveDetail.maVB;
    data.tentailieu = arriveDetail.tentailieu;
    data.tailieu = arriveDetail.tailieu;
    setLoading(true);

    if (file && file.file.name != arriveDetail.tentailieu) {
      try {
        let fileName = file.file.name;
        let fileType = file.file.type;
        let fileUpload = file.file;
        data.tentailieu = fileName;
        data.tailieu = fileType;

        const res: any = await getSignedUrl(fileName, fileType);
        if (res.status === 200) {
          let signedUrl = res.data;
          let resultUpload: any = await uploadFile(fileUpload, signedUrl);
          if (resultUpload.status === 200) {
            let resultCreateDispatch: any = await updateDispatch(data);
            if (resultCreateDispatch.status === 200) {
              dispatch(reloadPage("Internals update"));
              setLoading(false);
              linkTo("/cong-van-noi-bo");
              fastMessage("Cập nhật thành công!", "success");
            }
          }
        }
      } catch (err) {
        setLoading(false);
        setFailed(true);
        fastMessage("Cập nhật thất bại!", "danger");
      }
    } else {
      try {
        let result: any = await updateDispatch(data);
        if (result.status === 200) {
          setLoading(false);
          fastMessage("Cập nhật thành công!", "success");
          dispatch(reloadPage("Internals update"));
          linkTo("/cong-van-noi-bo");
        }
      } catch (err) {
        setFailed(true);
        fastMessage("Cập nhật thất bại!", "danger");
      }
    }
  };

  const getSignedUrl = async (fileName: any, fileType: any) => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/internals/getSignedUrl",
        {
          params: { fileName: fileName, fileType: fileType },
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );
      // console.log(res);
      return res;
    } catch (e) {
      // console.log(e);
      return e;
    }
  };

  const uploadFile = async (fileUpload: any, signedUrl: any) => {
    try {
      let options = {
        headers: {
          "Content-Type": file.file.type,
          // ContentEncoding: "base64",
        },
      };
      // let fileToUpload = {
      //   uri: fileUpload.uri,
      //   name: fileUpload.file.name,
      //   type: fileUpload.file.type,
      // };
      const res = await axios.put(signedUrl, fileUpload, options);
      return res;
    } catch (e) {
      return e;
    }
  };

  const updateDispatch = async (data: any) => {
    try {
      let res = await axios.patch(
        "https://qlcv-server.herokuapp.com/api/internals/",
        data,
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );
      return res;
    } catch (e) {
      setFailed(true);
      return e;
    }
  };

  React.useEffect(() => {
    if (loginReducer.token) {
      getDispatch();
      getDocumentType();
      getForms();
    }
  }, [loginReducer.token, props.id]);

  const getDispatch = async () => {
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
          setFileName(responseData.tentailieu);
        }
        setArriveDetail(responseData);
      }
    } catch (e) {
      setArriveDetail(null);
    }
  };

  const getDocumentType = async () => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/documentTypes/",
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );

      let responseData = [...res.data.data];
      setDocumentType(responseData);
    } catch (e) {
      setDocumentType(null);
    }
  };

  const getForms = async () => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/forms/",
        {
          headers: {
            Authorization: `Bearer ${loginReducer.token}`,
          },
        }
      );

      let responseData = [...res.data.data];
      setFormList(responseData);
    } catch (e) {
      setFormList(null);
    }
  };

  const pickFile = async () => {
    try {
      const res: any = await DocumentPicker.getDocumentAsync({
        type: "application/msword,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      if (res.size * Math.pow(10, -6) < 50) {
        setFile(res);
        setFileName(res.name);
        console.log(res);
      } else {
        setFile(null);
      }
    } catch (e) {
      setFile(null);
    }
  };

  const DocumentTypeList = () => {
    if (documentType) {
      return documentType.map((item: any) => {
        return (
          <Picker.Item
            label={item.tenlvb}
            value={item.maLVB}
            key={item.maLVB + ""}
          />
        );
      });
    } else {
      return <Picker.Item label="Đang tải" value="0" />;
    }
  };

  const UrgencyList = () => {
    return (
      <>
        {urgency.map((item: any, index: number) => (
          <Picker.Item label={item} value={index + 1} key={index} />
        ))}
      </>
    );
  };

  const SecretLevelList = () => {
    return (
      <>
        {secretLevel.map((item: any, index: number) => (
          <Picker.Item label={item} value={index + 1} key={index} />
        ))}
      </>
    );
  };

  const PathList = () => {
    return (
      <>
        {path.map((item: any, index: number) => (
          <Picker.Item label={item} value={index + 1} key={index} />
        ))}
      </>
    );
  };

  const FormList = () => {
    return (
      <>
        {formList &&
          formList.map((item: any) => (
            <Picker.Item
              label={item.tenBM}
              value={item.maBM}
              key={item.maBM + ""}
            />
          ))}
      </>
    );
  };

  return arriveDetail ? (
    <View style={styles.container}>
      <Text style={styles.title}>Sửa công văn nội bộ</Text>
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.textInput}
                  containerStyle={styles.inputContainer}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  errorMessage={errors.tenvb && "Không được để trống"}
                  label="Tên văn bản"
                />
              )}
              name="tenvb"
              rules={{ required: true }}
              defaultValue={arriveDetail.tenvb || ""}
            />
            {/* {errors.tenvb && <Text>Không được để trống</Text>} */}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.textInput}
                  containerStyle={styles.inputContainer}
                  onChangeText={(value) =>
                    onChange(value.replace(/[^0-9]/g, ""))
                  }
                  value={value}
                  keyboardType="numeric"
                  errorMessage={errors.sohieu && "Không được để trống"}
                  label="Số hiệu"
                />
              )}
              name="sohieu"
              rules={{ required: true }}
              defaultValue={arriveDetail.sohieu}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.textInput}
                  containerStyle={styles.inputContainer}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  errorMessage={errors.kyhieu && "Không được để trống"}
                  label="Ký hiệu"
                />
              )}
              name="kyhieu"
              rules={{ required: true }}
              defaultValue={arriveDetail.kyhieu || ""}
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={{
                    width: "80%",
                    paddingHorizontal: 10,
                    paddingBottom: 10,
                  }}
                >
                  <Text style={styles.labelStyle}>Ngày ký</Text>
                  <DateTimePicker
                    value={value}
                    onChange={onChange}
                    style={{ paddingVertical: 3.5 }}
                  />
                </View>
              )}
              name="ngayky"
              rules={{ required: true }}
              defaultValue={arriveDetail.ngayky || ""}
            />
            {errors.ngayky && <Text>Không được để trống</Text>}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrapContainer}>
                  <Text style={styles.labelStyle}>Ngày lưu</Text>
                  <DateTimePicker
                    value={value}
                    onChange={onChange}
                    style={{ paddingVertical: 3.5 }}
                  />
                </View>
              )}
              name="ngayluu"
              rules={{ required: true }}
              defaultValue={arriveDetail.ngayluu || ""}
            />
            {errors.ngayluu && <Text>Không được để trống</Text>}
          </View>
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrapContainer}>
                  <Text style={styles.labelStyle}>Loại văn bản</Text>
                  <Picker
                    style={styles.itemPicker}
                    selectedValue={value}
                    onValueChange={(itemValue, itemIndex) =>
                      onChange(itemValue)
                    }
                  >
                    <DocumentTypeList />
                  </Picker>
                </View>
              )}
              name="maLVB"
              rules={{ required: true }}
              defaultValue={arriveDetail.maLVB || ""}
            />
            {errors.maLVB && <Text>Không được để trống</Text>}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrapContainer}>
                  <Text style={styles.labelStyle}>Biểu mẫu</Text>
                  <Picker
                    style={styles.itemPicker}
                    selectedValue={value}
                    onValueChange={(itemValue, itemIndex) =>
                      onChange(itemValue)
                    }
                  >
                    <FormList />
                  </Picker>
                </View>
              )}
              name="maBM"
              rules={{ required: true }}
              defaultValue={arriveDetail.maBM || ""}
            />
            {errors.maBM && <Text>Không được để trống</Text>}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.textInput}
                  containerStyle={styles.inputContainer}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  errorMessage={errors.pbnhan && "Không được để trống"}
                  label="Phòng ban nhận"
                />
              )}
              name="pbnhan"
              rules={{ required: true }}
              defaultValue={arriveDetail.pbnhan || ""}
            />
          </View>
        </View>
        <View style={styles.dispatchContentContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.textInput}
                containerStyle={{ paddingHorizontal: 30, paddingVertical: 10 }}
                onChangeText={(value) => onChange(value)}
                value={value}
                errorMessage={errors.noidung && "Không được để trống"}
                label="Nội dung"
                multiline={true}
                numberOfLines={5}
              />
            )}
            name="noidung"
            rules={{ required: true }}
            defaultValue={arriveDetail.noidung || ""}
          />
        </View>
        <View style={styles.fileContainer}>
          <Text style={styles.labelStyle}>Tài liệu đính kèm</Text>
          <View style={styles.uploadFileContainer}>
            <Button title="Chọn File" type="outline" onPress={pickFile} />
            <Text style={styles.fileName}>
              {fileName ? fileName : "Không có file được chọn"}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.submitContainer}>
        {loading ? (
          <Button
            containerStyle={styles.submitButton}
            title="Loading button"
            loading
          />
        ) : (
          <Button
            title="Cập nhật"
            containerStyle={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
          />
        )}
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

export default UpdateInternal;

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
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "rgba(154,154,154, .5)",
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
    width: "80%",
  },
  labelStyle: {
    fontSize: 16,
    color: "rgb(134, 147, 158)",
    fontWeight: "bold",
    paddingBottom: 10,
  },
  inputWrapContainer: {
    width: "80%",
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
