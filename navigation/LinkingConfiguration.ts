/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from "expo-linking";
import { path } from "../assets/data";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      // Root: {
      //   screens: {
      //     TabOne: {
      //       screens: {
      //         TabOneScreen: "one",
      //       },
      //     },
      //     TabTwo: {
      //       screens: {
      //         TabTwoScreen: "two",
      //       },
      //     },
      //   },
      // },
      Root: "QLCV",
      NotFound: "*",
      Home: "Home",
      DispatchDetail: {
        path: "cong-van-di/:id",
      },
      Login: "Login",
      Test: "Test",
      CreateDispatch: "tao-cong-van-di",
      UpdateDispatch: {
        path: "cap-nhat-cong-van-di/:id/:userId",
      },
      Arrives: "cong-van-den",
      ArriveDetail: {
        path: "chi-tiet-cong-van-den/:id",
      },
      CreateArrive: "tao-cong-van-den",
      UpdateArrive: {
        path: "cap-nhat-cong-van-den/:id/:userId",
      },
      Account: {
        path: "tai-khoan",
        screens: {
          "Thông tin tài khoản": "thong-tin-tai-khoan",
          "Đổi mật khẩu": "doi-mat-khau",
          "Thông tin cơ quan": "thong-tin-co-quan",
        },
      },
      UpdateAccountInfo: "cap-nhat-tai-khoan",
      Admin: {
        path: "quan-tri-vien",
        screens: {
          "Quản lý tài khoản": "quan-ly-tai-khoan",
          "Quản lý loại văn bản": "quan-ly-loai-van-ban",
          "Quản lý biểu mẫu": "quan-ly-bieu-mau",
          "Quản lý chức vụ": "quan-ly-chuc-vu",
          "Quản lý phòng ban": "quan-ly-phong-ban",
          "Quản lý cơ quan": "quan-ly-co-quan",
        },
      },
      AddAccount: "them-tai-khoan",
      UpdateAccount: { path: "cap-nhat-tai-khoan-admin/:id" },
      AccountDetailAdmin: {
        path: "chi-tiet-tai-khoan/:id",
      },
      Internals: "cong-van-noi-bo",
      CreateInternal: "tao-cong-van-noi-bo",
      InternalDetail: {
        path: "chi-tiet-cong-van-noi-bo/:id",
      },
      UpdateInternal: {
        path: "cap-nhat-cong-van-noi-bo/:id/:userId",
      },
      AddDocument: "them-loai-van-ban",
      UpdateDocument: {
        path: "cap-nhat-loai-van-ban/:id",
      },
      AddForm: "them-bieu-mau",
      UpdateForm: {
        path: "cap-nhat-bieu-mau/:id",
      },
      AddPosition: "them-chuc-vu",
      UpdatePosition: { path: "cap-nhat-chuc-vu/:id" },
      AddDepartment: "them-phong-ban",
      UpdateDepartment: { path: "cap-nhat-phong-ban/:id" },
      UpdateOg: { path: "cap-nhat-co-quan/:id" },
    },
  },
};
