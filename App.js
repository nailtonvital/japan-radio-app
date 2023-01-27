import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { lazy, useCallback, setState, useRef, useState } from "react";
import { Audio } from "expo-av";
import data from "./src/assets/japan.json";
import Player from "./src/components/Player";

SplashScreen.preventAutoHideAsync();

export default function App() {
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

  // Audio
  const [playbackObj, setPlaybackObj] = useState(null);
  const [soundObj, setSoundObj] = useState(null);

  async function playRadio(url) {
    
    // first time
    const sound = new Audio.Sound();
    if (soundObj === null) {
      const status = await sound.loadAsync({ uri: url }, { shouldPlay: true });
      setSoundObj(status);
      return setPlaybackObj(sound)
    }
    
    if (soundObj.isLoaded && soundObj.isPlaying) {
      await sound.setStatusAsync({ shouldPlay: false });
      
    }
  }

  // font ir
  if (!fontsLoaded) return null;
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ScrollView>
        {/* Search */}

        <TextInput
          style={styles.input}
          placeholder="Search Station"
          placeholderTextColor="white"
        />

        {/* Categories */}
        <Text
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
        <View>
          <ScrollView
            style={{ marginLeft: 22, marginBottom: 25 }}
            horizontal={true}
          >
            {/* <Button title="Phonk" /> */}
            <View style={styles.categoryButton}>
              <View style={styles.categoryIcon} />
              <Text style={styles.categoryText}>Rock</Text>
            </View>
            <View style={styles.categoryButton}>
              <View style={styles.categoryIcon} />
              <Text style={styles.categoryText}>Phonk</Text>
            </View>
            <View style={styles.categoryButton}>
              <View style={styles.categoryIcon} />
              <Text style={styles.categoryText}>Eletro</Text>
            </View>
            <View style={styles.categoryButton}>
              <View style={styles.categoryIcon} />
              <Text style={styles.categoryText}>Gospel</Text>
            </View>
            <View style={styles.categoryButton}>
              <View style={styles.categoryIcon} />
              <Text style={styles.categoryText}>Pop</Text>
            </View>
          </ScrollView>
        </View>

        <Player />

        {/* Station list */}
        <Text
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
          {data.slice(0, 25).map((item) => {
            const imgEl = lazy(() => require("./src/assets/adaptive-icon.png"));
            return (
              <TouchableOpacity
                key={item.stationuuid}
                style={styles.card}
                onPress={() => {
                  playRadio(item.url_resolved);
                }}
              >
                <View>
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
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202024",
    paddingTop: 55,
  },
  input: {
    marginTop: 15,
    marginHorizontal: 18,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: 100,
    height: 50,
    marginBottom: 25,
    opacity: 5,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  categoryButton: {
    color: "white",
    marginRight: 25,
  },
  categoryIcon: {
    backgroundColor: "#566573",
    borderRadius: 100,
    height: 80,
    width: 80,
    backgroundColor: "#566573",
  },
  categoryText: {
    color: "white",
    marginVertical: 7,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "400",
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
});
