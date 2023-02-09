import { useContext } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { RadioContext } from "../context/RadioContext";
import { getRadios } from "../utils/recentPlayed";


export default function Page() {
  const {data} = useContext(RadioContext)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Categories</Text>
      </View>

      {/* Station list */}
      <View style={styles.radioStations}>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#121212",

  },
  header: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 55,

  },
  label:{
    color:'white'
  },
  radioStations: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingBottom: 225,
  },
});
