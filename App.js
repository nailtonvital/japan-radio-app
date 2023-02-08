import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";


import data from "./src/assets/japan.json";

import getCategories from "./src/utils/utils";
import Player from "./src/components/Player";
import Home from "./src/scenes/Home";

import Categories from "./src/scenes/Categories";
import Page from "./src/scenes/Page";
import { getRadios, removeRadios } from "./src/utils/recentPlayed";
import RecentPlayed from "./src/scenes/RecentPlayed";

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



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  // Audio
  const [isPlaying, setPlayStatus] = useState(false);
  const [audioName, setAudioName] = useState("");


  function HomeStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home">
          {(props) => (
            <Home
              {...props}
              playRadio={playRadio}
              setAudioName={setAudioName}
              setPlayStatus={setPlayStatus}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="RecentPlayed">
          {(props) => <RecentPlayed {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
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
    <SafeAreaProvider style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "home") {
                iconName = focused ? "home" : "home";
              } else if (route.name === "search") {
                iconName = focused ? "search1" : "search1";
              }

              return <AntDesign name={iconName} size={size} color={color} />;
            },
            tabBarPressColor: "rgba(0,0,0,0)",
            tabBarItemStyle: {
              width: 70,
              alignSelf: "center",
              height: 45,
            },
            tabBarStyle: {
              height: 80,
              justifyContent: "space-between",
              borderTopColor: "#212121",
              backgroundColor: "#212121",
            },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "#858386",
          })}
        >
          <Tab.Screen name="home" component={HomeStack} />

          <Tab.Screen name="search">
            {(props) => <Categories {...props} tags={Tags} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      {audioName ? (
        <Player
          playFunction={playPause}
          stationTitle={audioName}
          isPlaying={isPlaying}
          setPlayStatus={setPlayStatus}
        />
      ) : null}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
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
});
