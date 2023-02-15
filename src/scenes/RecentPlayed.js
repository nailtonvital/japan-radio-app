import { useContext, useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MemoizedStationCard } from "../components/StationCard";
import { RadioContext } from "../context/RadioContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setRecentPlayed } from "../utils/recentPlayed";

const recentCard = ({item})=>{

}

export default function RecentPlayed() {
  const [radioStations, setRadioStations] = useState([]);
  const { setAudioName, setPlayStatus, playRadio } = useContext(RadioContext);

  const insets = useSafeAreaInsets();

  function removeDuplicates(array) {
    return [...new Set(array)];
  }

  useEffect(() => {
    const fetchRadioStations = async () => {
      try {
        const radioStationsData = await AsyncStorage.getItem("radios");
        const uniqueRadios = removeDuplicates(JSON.parse(radioStationsData));
        useMemo(setRadioStations(uniqueRadios));
      } catch (error) {
        console.error(error);
      }
    };
    fetchRadioStations();
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#121212",
        paddingBottom: insets.top + insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#5f2c82", "#49a09d"]}
          style={styles.header}
        >
          <Text style={styles.headerText}>Recent Played</Text>
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
        {radioStations.reverse().map((radioStation, index) => (
          <TouchableOpacity
            key={index}
            style={styles.radioContainer}
            onPress={() => {
              playRadio(
                radioStation.url,
                radioStation.name,
                setPlayStatus,
                setAudioName
              );
              setRecentPlayed(
                radioStation.radio,
                radioStation.name,
                radioStation.img,
                radioStation.url
              );
            }}
          >
            <Text style={styles.radioName}>{radioStation.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Station list
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          paddingBottom: insets.top,
        }}
      >
        {typeof tags == "undefined"
          ? null
          : tags.map((item, index) => {
              return <CategoryCard categoryName={item} key={index} />;
            })}
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categories: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 55,
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
  label: {
    color: "white",
    marginVertical: 5,
    marginLeft: 22,
    textAlign: "left",
    fontSize: 17,
    fontFamily: "Poppins-Bold",
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
