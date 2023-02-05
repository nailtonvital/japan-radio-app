import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Greetings from "../ui/Greetings";

export default function HomeText() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 25,
        marginBottom: 5,
        marginHorizontal: 27,
      }}
    >
      <View style={{ width: "70%" }}>
        <Greetings />
        <Text
          style={{
            color: "white",
            fontSize: 17,
            fontWeight: "400",
            fontFamily: "Poppins-Regular",
          }}
        >
          Listen radio from and about Brazil!
        </Text>
      </View>

      <View
        style={{
          width: "30%",
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          alignContent: "center",
          paddingLeft: 12,
        }}
      >
        <Entypo name="back-in-time" size={26} color="white" />
        <AntDesign name="staro" size={26} color="white" />
        <AntDesign name="setting" size={26} color="white" />
      </View>
    </View>
  );
}
