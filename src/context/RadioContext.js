import { createContext, useState, useEffect, useCallback } from "react";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import data from "../assets/japan.json";
import getCategories from "../utils/utils";

export const RadioContext = createContext();

SplashScreen.preventAutoHideAsync();

const soundObject = new Audio.Sound();

function RadioProvider({ children }) {
  const [isPlaying, setPlayStatus] = useState(false);
  const [audioName, setAudioName] = useState("");

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

  useEffect(() => {
    // Enable the audio run on background
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      playThroughEarpieceAndroid: false,
    });
    //   removeRadios()
    // getRadios()
  }, []);

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

  const tags = getCategories(data);

  // font if
  if (!fontsLoaded) return null;
  return (
    <RadioContext.Provider
      value={{
        isPlaying,
        setPlayStatus,
        audioName,
        setAudioName,
        tags,
        playPause,
        playRadio,
        data
      }}
      onLayout={onLayoutRootView}
    >
      {children}
    </RadioContext.Provider>
  );
}

export default RadioProvider;
