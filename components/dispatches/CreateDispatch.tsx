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

const CreateDispatch = () => {
  const { loginReducer } = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  const linkTo = useLinkTo();

  const [documentType, setDocumentType] = React.useState<any>();
  const [formList, setFormList] = React.useState<any>();
  const [urgencyList, setUrgencyList] = React.useState<any>(urgency);
  const [file, setFile] = React.useState<any>();
  const [failed, setFailed] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const pickFile = async () => {
    try {
      const res: any = await DocumentPicker.getDocumentAsync({
        type: "application/msword,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      if (res.size * Math.pow(10, -6) < 50) {
        setFile(res);
        console.log(res);
      } else {
        setFile(null);
      }
    } catch (e) {
      setFile(null);
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    data.maND = loginReducer.userId;
    data.tinhtrangduyet = "Ch??a duy???t";
    if (file) {
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
          let resultCreateDispatch: any = await createDispatch(data);
          if (resultCreateDispatch.status === 200) {
            setLoading(false);
            fastMessage("T???o th??nh c??ng!", "success");
            dispatch(reloadPage("Home"));
            linkTo("/Home");
          } else {
            setLoading(false);
            fastMessage("T???o th???t b???i!", "danger");
          }
        } else {
          setLoading(false);
          fastMessage("T???o th???t b???i!", "danger");
        }
      } else {
        fastMessage("T???o th???t b???i!", "danger");
      }
    } else {
      let result: any = await createDispatch(data);
      if (result.status === 200) {
        fastMessage("T???o th??nh c??ng!", "success");
        setLoading(false);
        dispatch(reloadPage("Home"));
        linkTo("/Home");
      } else {
        fastMessage("T???o th???t b???i!", "danger");
      }
    }
  };

  const getSignedUrl = async (fileName: any, fileType: any) => {
    try {
      const res = await axios.get(
        "https://qlcv-server.herokuapp.com/api/dispatches/getSignedUrl",
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

  const createDispatch = async (data: any) => {
    try {
      let res = await axios.post(
        "https://qlcv-server.herokuapp.com/api/dispatches",
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
      console.log(responseData);
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
      console.log(responseData);
    } catch (e) {
      setFormList(null);
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
      return <Picker.Item label="??ang t???i" value="0" />;
    }
  };

  const UrgencyList = () => {
    return urgencyList.map((item: any, index: number) => {
      return <Picker.Item label={item} value={index + 1} key={index} />;
    });
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

  React.useEffect(() => {
    if (loginReducer.token) {
      getDocumentType();
      getForms();
    }
  }, [loginReducer.token]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Th??m c??ng v??n ??i</Text>
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
                  errorMessage={errors.tenvb && "Kh??ng ???????c ????? tr???ng"}
                  label="T??n v??n b???n"
                />
              )}
              name="tenvb"
              rules={{ required: true }}
              defaultValue=""
            />
            {/* {errors.tenvb && <Text>Kh??ng ???????c ????? tr???ng</Text>} */}

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
                  keyboardType="number-pad"
                  errorMessage={errors.sohieu && "Kh??ng ???????c ????? tr???ng"}
                  label="S??? hi???u"
                />
              )}
              name="sohieu"
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
                  errorMessage={errors.kyhieu && "Kh??ng ???????c ????? tr???ng"}
                  label="K?? hi???u"
                />
              )}
              name="kyhieu"
              rules={{ required: true }}
              defaultValue=""
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
                  <Text style={styles.labelStyle}>Ng??y k??</Text>
                  <DateTimePicker
                    value={value}
                    onChange={onChange}
                    style={{ paddingVertical: 3.5 }}
                  />
                </View>
              )}
              name="ngayky"
              rules={{ required: true }}
              defaultValue=""
            />
            {errors.ngayky && <Text>Kh??ng ???????c ????? tr???ng</Text>}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrapContainer}>
                  <Text style={styles.labelStyle}>Ng??y ??i</Text>
                  <DateTimePicker
                    value={value}
                    onChange={onChange}
                    style={{ paddingVertical: 3.5 }}
                  />
                </View>
              )}
              name="ngaydi"
              rules={{ required: true }}
              defaultValue=""
            />
            {errors.ngaydi && <Text>Kh??ng ???????c ????? tr???ng</Text>}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.textInput}
                  containerStyle={styles.inputContainer}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  errorMessage={errors.cqnhan && "Kh??ng ???????c ????? tr???ng"}
                  label="C?? quan nh???n"
                />
              )}
              name="cqnhan"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrapContainer}>
                  <Text style={styles.labelStyle}>Lo???i v??n b???n</Text>
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
              defaultValue=""
            />
            {errors.maLVB && <Text>Kh??ng ???????c ????? tr???ng</Text>}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrapContainer}>
                  <Text style={styles.labelStyle}>M???c ????? kh???n</Text>
                  <Picker
                    style={styles.itemPicker}
                    selectedValue={value}
                    onValueChange={(itemValue, itemIndex) =>
                      onChange(itemValue)
                    }
                  >
                    <UrgencyList />
                  </Picker>
                </View>
              )}
              name="mucdokhan"
              rules={{ required: true }}
              defaultValue="1"
            />
            {errors.mucdokhan && <Text>Kh??ng ???????c ????? tr???ng</Text>}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrapContainer}>
                  <Text style={styles.labelStyle}>M???c ????? m???t</Text>
                  <Picker
                    style={styles.itemPicker}
                    selectedValue={value}
                    onValueChange={(itemValue, itemIndex) =>
                      onChange(itemValue)
                    }
                  >
                    <SecretLevelList />
                  </Picker>
                </View>
              )}
              name="mucdomat"
              rules={{ required: true }}
              defaultValue="1"
            />
            {errors.mucdomat && <Text>Kh??ng ???????c ????? tr???ng</Text>}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrapContainer}>
                  <Text style={styles.labelStyle}>Bi???u m???u</Text>
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
              defaultValue=""
            />
            {errors.maBM && <Text>Kh??ng ???????c ????? tr???ng</Text>}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrapContainer}>
                  <Text style={styles.labelStyle}>???????ng ??i</Text>
                  <Picker
                    style={styles.itemPicker}
                    selectedValue={value}
                    onValueChange={(itemValue, itemIndex) =>
                      onChange(itemValue)
                    }
                  >
                    <PathList />
                  </Picker>
                </View>
              )}
              name="duongdi"
              rules={{ required: true }}
              defaultValue=""
            />
            {errors.duongdi && <Text>Kh??ng ???????c ????? tr???ng</Text>}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.textInput}
                  containerStyle={styles.inputContainer}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  errorMessage={errors.tennv && "Kh??ng ???????c ????? tr???ng"}
                  label="Nh??n vi??n giao"
                  // multiline={true}
                  // numberOfLines={5}
                />
              )}
              name="tennv"
              rules={{ required: true }}
              defaultValue=""
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
                errorMessage={errors.noidung && "Kh??ng ???????c ????? tr???ng"}
                label="N???i dung"
                multiline={true}
                numberOfLines={5}
              />
            )}
            name="noidung"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
        <View style={styles.fileContainer}>
          <Text style={styles.labelStyle}>T??i li???u ????nh k??m</Text>
          <View style={styles.uploadFileContainer}>
            <Button title="Ch???n File" type="outline" onPress={pickFile} />
            <Text style={styles.fileName}>
              {file ? file.file.name : "Kh??ng c?? file ???????c ch???n"}
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
            title="T???o"
            containerStyle={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
          />
        )}
      </View>
    </View>
  );
};

export default CreateDispatch;

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
    paddingVertical: "4%",
  },
  submitButton: {
    width: "10%",
  },
});
