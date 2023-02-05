import React from "react";
import { View, StyleSheet, Text, TextInput, ScrollView } from "react-native";
import CategoryCard from "../components/CategoryCard";

export default function Categories({ tags }) {
  return (
    <ScrollView style={styles.categories}>
      <TextInput
        style={styles.input}
        placeholder="Search Station"
        placeholderTextColor="white"
      />
      <Text style={styles.label}>Categories</Text>

      {/* Station list */}
      <View style={styles.radioStations}>
        {typeof tags == "undefined"
          ? null
          : tags.map((item, index) => {
              return <CategoryCard categoryName={item} key={index} />;
            })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categories: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 55,
    paddingBottom: 105,
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
    color: "white",
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
    paddingBottom: 225,
  },
});
