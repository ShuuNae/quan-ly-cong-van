/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from "expo-linking";

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
    },
  },
};
