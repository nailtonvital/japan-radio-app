import React from 'react'
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function Player({ stationTitle, playFunction, isPlaying, setPlayStatus }) {
  return (
    <View style={styles.player}>
      <Text style={styles.stationTitle}>{stationTitle}</Text>
      <Icon
        name={isPlaying ? "pausecircleo" : "playcircleo"}
        color="white"
        size={32}
        style={styles.playerIcon}
        onPress={() => {
          playFunction(isPlaying, setPlayStatus);
        }}
      ></Icon>
    </View>
  );
}

const styles = StyleSheet.create({
  player: {
    flex: 0,
    alignSelf: "center",
    position: "absolute",
    bottom: 92,
    backgroundColor: "#212121",
    width: "95%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 18,
    minHeight: 75,
    opacity: 25,
    borderRadius: 8,
  },
  stationTitle: {
    color: "white",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
  },
  playerIcon: {
    paddingRight: 10,
  },
});