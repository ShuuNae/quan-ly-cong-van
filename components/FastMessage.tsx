import React from "react";
import { showMessage, hideMessage } from "react-native-flash-message";
const fastMessage = (message: string, type: any) => {
  showMessage({
    message: message,
    type: type,
    style: {
      width: "25%",
      alignSelf: "flex-end",
      marginTop: "5%",
      marginRight: "1%",
      borderRadius: 6,
    },
  });
};
export default fastMessage;
