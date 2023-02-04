import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useState } from "react";
import { Audio } from "expo-av";
import data from "./src/assets/japan.json";

import getCategories from "./src/utils/utils";
import Player from "./src/components/Player";
import Home from "./src/scenes/Home";
import Navbar from "./src/components/Navbar";

SplashScreen.preventAutoHideAsync();

const soundObject = new Audio.Sound();

async function playPause(isPlaying, setPlayStatus) {
  try {
    if (isPlaying) {
      await soundObject.pauseAsync();
      setPlayStatus(false);
    } else {
      await soundObject.playAsync();
      setPlayStatus(true);
    }
  } catch (error) {
    console.log(error);
  }
}

async function playRadio(uri, name, setPlayStatus, setAudioName) {
  try {
    await soundObject.unloadAsync();
    await soundObject.loadAsync({ uri });
    await soundObject.playAsync();
    setPlayStatus(true);
    setAudioName(name);
    await Audio.setIsEnabledAsync(true);
  } catch (error) {
    console.log(error);
  }
}

export default function App() {
  // Audio
  const [isPlaying, setPlayStatus] = useState(false);
  const [audioName, setAudioName] = useState("");

  // Font
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const Tags = getCategories(data);

  // font if
  if (!fontsLoaded) return null;
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Home
        setAudioName={setAudioName}
        setPlayStatus={setPlayStatus}
        playRadio={playRadio}
        playPause={playPause}
      />

      {audioName ? (
        <Player
          playFunction={playPause}
          stationTitle={audioName}
          isPlaying={isPlaying}
          setPlayStatus={setPlayStatus}
        />
      ) : null}
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  radioStations: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginHorizontal: 18,
    marginTop: 8,
  },
});
