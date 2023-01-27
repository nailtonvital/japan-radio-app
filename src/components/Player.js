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

export default function Player(imageUrl, stationTitle, playFunction) {
  return (
    <View>
      <View style={styles.player}>
        {/* <Image source={imageUrl} /> */}
        <Text style={styles.stationTitle}>
          Jangadeiro BandNews FM Fortaleza 101.7
        </Text>
        <Icon
          name="pausecircleo"
          color="white"
          size={32}
          style={styles.playerIcon}
        ></Icon>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  player: {
      backgroundColor: "#434343",
      width: "100%",
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    minHeight: 75,
    opacity: 25
  },
  stationTitle:{
    color: "white",
    fontSize: 20,

  },
  playerIcon:{
    paddingRight: 10
  }
});