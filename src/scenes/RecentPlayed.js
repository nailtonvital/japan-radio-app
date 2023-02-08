import {useEffect, useState} from "react";
import { View, StyleSheet, Text, TextInput, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import CategoryCard from "../components/CategoryCard";
import { getRadios } from "../utils/recentPlayed";
import StationCard from "../components/StationCard";


export default function RecentPlayed() {
    const [recent, setRecent] = useState([])

  const insets = useSafeAreaInsets();

  useEffect(()=>{
    getRadios().then((item) => {
      setRecent(item);
    }).finally(()=>{

    })
  },[])

 
  
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#121212",

        paddingBottom: insets.bottom + insets.bottom,
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
          minHeight: 415,
          backgroundColor: "#121212",
          marginTop: -20,
          borderRadius: 25,
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          paddingBottom: insets.top,
        }}
      >
        {recent ? recent.map(item=>{
<StationCard/>
        }) : (
          <Text style={{ color: "white", marginTop: "70%", fontSize: 22 }}>
            No radio played recently
          </Text>
        )}
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
    marginTop:'42%',
    fontSize: 27,
    color: "white",
    fontFamily: 'Poppins-Bold'
  },
  label: {
    color: "white",
    marginVertical: 5,
    marginLeft: 22,
    textAlign: "left",
    fontSize: 17,
    fontFamily: "Poppins-Bold",
  },
  radioStations: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
});
