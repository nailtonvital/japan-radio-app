import React, { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RadioContext } from "../context/RadioContext";
import { MemoizedStationCard, StationCard } from "../components/StationCard";
import ImageError from "../assets/error-picture.png";
import { setRecentPlayed } from "../utils/recentPlayed";

export default function Page({ navigation, route }) {
  const insets = useSafeAreaInsets();

  const { setAudioName, setPlayStatus, playRadio, data } =
    useContext(RadioContext);

  const { name } = route.params;

  let result = data.filter((i) => i.tags.includes(name));
  console.log(result);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#121212",
      }}
    >
      <View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#642B73", "#C6426E"]}
          style={styles.header}
        >
          <Text style={styles.headerText}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
        </LinearGradient>
      </View>

      <View
        style={{
          minHeight: 115,
          backgroundColor: "#121212",
          marginTop: -20,
          borderRadius: 25,
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          paddingTop: 35,
          paddingBottom: insets.top + insets.top,
        }}
      >
        {result.map((item,index) => (
          <TouchableOpacity
            key={index}
            style={styles.radioContainer}
            onPress={() => {
              playRadio(item.url, item.name, setPlayStatus, setAudioName);
              setRecentPlayed(item.radio, item.name, item.img, item.url);
            }}
          >
            <Text style={styles.radioName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
  },
  header: {
    flex: 1,
    paddingHorizontal: 35,
    height: 245,
  },
  headerText: {
    flex: 1,
    marginTop: "42%",
    fontSize: 27,
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  contentSection: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginHorizontal: 18,
    marginTop: 8,
  },
  card: {
    backgroundColor: "#2E2E2E",
    width: "45%",
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  cardTitle: {
    backgroundColor: "#3C3C3E",
    padding: 12,
    borderRadius: 8,
    color: "white",
    minHeight: 60,
    fontSize: 17,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  radioContainer: {
    width: "80%",
    marginVertical: 10,
    padding: 20,
    backgroundColor: "#212121",
    borderRadius: 10,
    alignItems: "center",
  },
  radioName: {
    fontSize: 18,
    color: "white",
    fontSize: 17,
    fontFamily: "Poppins-Regular",
  },
});
