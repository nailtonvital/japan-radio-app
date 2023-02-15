import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Settings({ navigation }) {
  const insets = useSafeAreaInsets();

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
          colors={["#642B73", "#C6426E"]}
          style={styles.header}
        >
          <Text style={styles.headerText}>Settings</Text>
        </LinearGradient>
      </View>

      <View
        style={[
          { paddingBottom: insets.top + insets.top },
          styles.contentSection,
        ]}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Contact us</Text>
          <Text style={styles.subTitle}>nailtonvital35@gmail.com</Text>
          <Text
            style={{
              fontSize: 17,
              color: "white",
              fontFamily: "Poppins-Regular",
              alignSelf: "center",
              marginTop:15
            }}
          >
            App build with ❤️ by Nailton Vital
          </Text>
        </View>
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
  },
  card: {
    flex: 0,
    width: "87%",
    backgroundColor: "#3C3C3E",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 19,
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  subTitle: {
    fontSize: 19,
    color: "white",
    fontFamily: "Poppins-Regular",
  },
});
