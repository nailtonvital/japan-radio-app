import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function IconText({icon, text, actionFunction, currentScreen}) {
  return (
    <TouchableOpacity style={styles.iconText}>
      <AntDesign name={icon} size={24} color="#858386" />
      <Text style={{ color: "#858386", fontSize: 12, marginTop:3 }}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconText: {
    display: "flex",
    flex: 0,
    alignItems: "center",
  },
});