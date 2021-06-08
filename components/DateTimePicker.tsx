import React from "react";
import { createElement } from "react-native-web";

export default function DateTimePicker({ value, onChange, style }: any) {
  return createElement("input", {
    type: "date",
    value: value,
    onChange: onChange,
    style: style,
  });
}
