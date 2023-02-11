import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import data from "../assets/japan.json";

import { MemoizedStationCard } from "../components/StationCard";
import Greetings from "../ui/Greetings";
import { Entypo } from "@expo/vector-icons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RadioContext } from "../context/RadioContext";

SplashScreen.preventAutoHideAsync();

export default function Home({
  navigation,
  route,
}) {
  const insets = useSafeAreaInsets();

  const { setAudioName, setPlayStatus, playRadio }= useContext(RadioContext)

  // Font
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);



  // font if
  if (!fontsLoaded) return null;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#121212",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      onLayout={onLayoutRootView}
    >
      <ScrollView style={{ paddingBottom: 76 }}>
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
              paddingLeft: 40,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("RecentPlayed")}
            >
              <Entypo name="back-in-time" size={26} color="white" />
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => navigation.navigate("Page")}>
              <AntDesign name="staro" size={26} color="white" />
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <AntDesign name="setting" size={26} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Trending Now */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <Text style={styles.sectionSubtitle}>View all</Text>
        </View>
        <FlatList
          data={data
            .sort(function (a, b) {
              return a.clicktrend - b.clicktrend;
            })
            .slice(0, 10)}
          horizontal={true}
          style={{ height: "100%", marginLeft: 18 }}
          renderItem={(item) => (
            <MemoizedStationCard
              stationImage={item.item.favicon}
              stationTitle={item.item.name}
              stationUrl={item.item.url}
              setAudioName={setAudioName}
              setPlayStatus={setPlayStatus}
              playRadio={playRadio}
              stationId={item.item.changeuuid}
            />
          )}
        />

        {/* Most Popular */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Most Popular</Text>
          <Text style={styles.sectionSubtitle}>View all</Text>
        </View>
        <FlatList
          data={data
            .sort(function (a, b) {
              return a.clickcount - b.clickcount;
            })
            .slice(0, 10)}
          horizontal={true}
          style={{ height: "100%", marginLeft: 18 }}
          renderItem={(item) => (
            <MemoizedStationCard
              stationImage={item.item.favicon}
              stationTitle={item.item.name}
              stationUrl={item.item.url}
              setAudioName={setAudioName}
              setPlayStatus={setPlayStatus}
              playRadio={playRadio}
            />
          )}
        />

        {/* Most Popular */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Stations</Text>
          <Text style={styles.sectionSubtitle}>View all</Text>
        </View>
        <FlatList
          data={data.slice(0, 10)}
          horizontal={true}
          style={{ height: "100%", marginLeft: 18, marginBottom: 85 }}
          renderItem={(item) => (
            <MemoizedStationCard
              stationImage={item.item.favicon}
              stationTitle={item.item.name}
              stationUrl={item.item.url}
              setAudioName={setAudioName}
              setPlayStatus={setPlayStatus}
              playRadio={playRadio}
            />
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 55,
  },
  input: {
    marginTop: 15,
    marginHorizontal: 18,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: 100,
    height: 60,
    marginBottom: 25,
    opacity: 5,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },

  section: {
    flex: 1,
    marginTop: 28,
    marginHorizontal: 27,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",
  },
  sectionTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
    fontFamily: "Poppins-Bold",
  },
  sectionSubtitle: {
    color: "#858386",
    fontSize: 15,
    fontFamily: "Poppins-Regular",
  },
});
