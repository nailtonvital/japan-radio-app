import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {LinearGradient} from 'expo-linear-gradient';


export function CategoryCard({ categoryName }) {
  return (
    <TouchableOpacity style={styles.card}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[
          "hsla(" + Math.floor(Math.random() * 340) + ", 100%, 38%, 0.8)",
          "hsla(" + Math.floor(Math.random() * 340) + ", 100%, 38%, 0.8)",
        ]}
        style={styles.linearGradient}
      >
        <Text style={styles.categoryText}>
          {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: "44%",
    maxWidth: "44%",
    borderRadius: 8,
    marginHorizontal: "1%",
    marginVertical: 8,
    height: 68,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 5,
  },
  categoryText: {
    color: "white",

    textAlign: "center",
    fontSize: 17,
    fontFamily: "Poppins-Bold",
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    height: 68,
    justifyContent: "center",
    borderRadius: 5,
  },
  justifyContent: "center",
});

export const MemoizedCategoryCard = memo(CategoryCard);