import React from "react";
import { createElement } from "react-native-web";

export default function DateTimePicker({
  value,
  onChange,
  style,
  defaultValue,
}: any) {
  return createElement("input", {
    type: "date",
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    style: style,
  });
}
