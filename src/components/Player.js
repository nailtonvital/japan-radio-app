import React, { useContext } from 'react'
import {

  StyleSheet,
  Text,
  View,

} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { RadioContext } from '../context/RadioContext';


export default function Player() {
const { audioName, isPlaying, playPause, setPlayStatus } = useContext(RadioContext);

if (!audioName){ return null}
  return (
    <View style={styles.player}>
      <Text style={styles.stationTitle}>{audioName}</Text>
      <Icon
        name={isPlaying ? "pausecircleo" : "playcircleo"}
        color="white"
        size={32}
        style={styles.playerIcon}
        onPress={() => {
          playPause(isPlaying, setPlayStatus);
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
    backgroundColor: "rgba(33, 33, 33, 0.9)",
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