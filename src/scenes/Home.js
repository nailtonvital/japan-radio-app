import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useState } from "react";

import data from "../assets/japan.json";

import Player from "../components/Player";
import StationCard from "../components/StationCard";

import HomeText from "../components/HomeText";

SplashScreen.preventAutoHideAsync();

export default function Home({ setAudioName, setPlayStatus, playRadio }) {
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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ScrollView>
        {/* Search */}

        {/* <TextInput
          style={styles.input}
          placeholder="Search Station"
          placeholderTextColor="white"
        /> */}
        <HomeText />

        {/* Categories */}
        {/* <Text
          style={{
            color: "white",
            fontSize: 22,
            fontWeight: "600",
            marginLeft: 27,
            marginBottom: 15,
            fontFamily: "Poppins-Bold",
          }}
        >
          Categories
        </Text>
        <View style={{ marginLeft: 27 }}>
          <ScrollView horizontal>
            {Tags.map((category) => {
              return <CategoryCard categoryName={category} key={category} />;
            })}
          </ScrollView>
        </View> */}

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
            <StationCard
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
            <StationCard
              stationImage={item.item.favicon}
              stationTitle={item.item.name}
              stationUrl={item.item.url}
              setAudioName={setAudioName}
              setPlayStatus={setPlayStatus}
              playRadio={playRadio}
            />
          )}
        />

        {/* Station list */}
        {/* <Text
          style={{
            color: "white",
            fontSize: 22,
            fontWeight: "600",
            marginLeft: 27,
            fontFamily: "Poppins-Bold",
          }}
        >
          All Stations
        </Text>
        <View style={styles.radioStations}>
          {data
            .sort(function (a, b) {
              return a.clicktrend - b.clicktrend;
            })
            .slice(0, 10)
            .map((item) => {
              const imgEl = lazy(() =>
                require("./src/assets/adaptive-icon.png")
              );
              return (
                <TouchableOpacity
                  key={item.stationuuid}
                  style={styles.card}
                  onPress={() => {
                    playRadio(
                      item.url_resolved,
                      item.name,
                      item.favicon,
                      setPlayStatus,
                      setAudioName
                    );
                  }}
                >
                  {item.favicon !== "" ? (
                    <Image
                      source={{ uri: item.favicon }}
                      style={{
                        width: "auto",
                        height: 90,
                        resizeMode: "contain",
                        justifyContent: "center",
                        marginVertical: 15,
                      }}
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      source={imgEl}
                      style={{
                        width: "auto",
                        height: 90,
                        resizeMode: "contain",
                        marginVertical: 15,
                      }}
                    />
                  )}

                  <Text style={styles.cardTitle}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
        </View> */}
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
