import React from 'react'
import {

  Text,
  StyleSheet,
  View

} from "react-native";

export default function Greetings() {
      const currentTime = new Date().getHours()
  return (
    <View>
      {currentTime >= 5 && currentTime <= 12 ? (
        <Text style={styles.greetings}>Good Morning</Text>
      ) : currentTime > 12 && currentTime <= 19 ? (
        <Text style={styles.greetings}>Good Afternoon</Text>
      ) : currentTime > 19 && currentTime < 5 ? (
        <Text style={styles.greetings}>Good Evening</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  greetings: {
    color: "white",
    fontSize: 27,
    fontWeight: "600",
    fontFamily: "Poppins-Bold",
  },
});